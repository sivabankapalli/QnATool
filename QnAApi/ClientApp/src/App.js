import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { UserAgentApplication } from 'msal';
import NavBar from './NavBar';
import Home from './Home';
import config from './config';
import { getUserDetails,getUserPhoto } from './GraphService';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.userAgentApplication = new UserAgentApplication(config.appId, config.authority, null);

    var user = this.userAgentApplication.getUser();

    this.state = {
      isAuthenticated: (user !== null),
      user: {},
      error: null
    };

    if (user) {
      // Enhance user object with data from Graph
      this.getUserProfile();
    }
  }

    render() {
        if (this.state.error) {
        }
        if (this.state.isAuthenticated) {
            return (
                <Router>
                    <div className="App">
                        <NavBar
                            isAuthenticated={this.state.isAuthenticated}
                            authButtonMethod={this.state.isAuthenticated ? this.logout.bind(this) : this.login.bind(this)}
                            user={this.state.user} />


                        <Route
                            render={(props) =>
                                <Home {...props}
                                    isAuthenticated={this.state.isAuthenticated}
                                    user={this.state.user}
                                    authButtonMethod={this.login.bind(this)} />
                            } /> 
                    </div>
                </Router>
            );
        }
            return (
                <Router>
                    <div className="App">
                        <NavBar
                            isAuthenticated={this.state.isAuthenticated}
                            authButtonMethod={this.state.isAuthenticated ? this.logout.bind(this) : this.login.bind(this)}
                            user={this.state.user} />
                    </div>
                </Router>
            );

  }

  setErrorMessage(message, debug) {
    this.setState({
      error: {message: message, debug: debug}
    });
  }

  async login() {
    try {
      await this.userAgentApplication.loginRedirect(config.scopes);
      await this.getUserProfile();
    }
    catch(err) {
      var errParts = err.split('|');
      this.setState({
        //isAuthenticated: false,
        //user: {},
        error: { message: errParts[1], debug: errParts[0] }
      });
    }
  }

  logout() {
    this.userAgentApplication.logout();
  }

  async getUserProfile() {
    try {
      // Get the access token silently
      // If the cache contains a non-expired token, this function
      // will just return the cached token. Otherwise, it will
      // make a request to the Azure OAuth endpoint to get a token

      var accessToken = await this.userAgentApplication.acquireTokenSilent(config.scopes);

      if (accessToken) {
        // Get the user's profile from Graph
        var user = await getUserDetails(accessToken);
          //var userPhoto = await getUserPhoto(accessToken);
          //if (userPhoto == 'undefined') {
          //    userPhoto = '';
          //}
        this.setState({
          isAuthenticated: true,
          user: {
            displayName: user.displayName,
            email: user.mail || user.userPrincipalName//,
            //avatar:userPhoto
          },
          error: null
        });
      }
    }
    catch(err) {
      var error = {};
      if (typeof(err) === 'string') {
        var errParts = err.split('|');
        error = errParts.length > 1 ?
          { message: errParts[1], debug: errParts[0] } :
          { message: err };
      } else {
        error = {
          message: err.message,
          debug: JSON.stringify(err)
        };
      }

      this.setState({
        //isAuthenticated: false,
       // user: {},
          isAuthenticated: true,
          user: {
              displayName: user.displayName,
              email: user.mail || user.userPrincipalName//,
              //avatar: userPhoto
          },
        error: error
      });
    }
  }
}

export default App;
