import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import ShowKnowledgebase from './components/ShowKnowledgebase';
import ShowKBResponse from './components/ShowKBResponse';
import Publish from './components/Publish';
import DownloadKB from './components/DownloadKB';
import AddQnA from './components/AddQnA';
import UpdateQnA from './components/UpdateQnA';
import DeleteQnA from './components/DeleteQna'; 
import './App.css';

class Home extends Component {
  render() {
    return (
    <Router>
         <div className="App">          
          <ul className="header">
            <li><NavLink exact to="/">Knowledgebase</NavLink></li>                      
          </ul>
          <div className="content">
            <Route exact path="/" component={ShowKnowledgebase}/>
            <Route path="/ShowKBResponse" component={ShowKBResponse}/>
            <Route path="/Publish" component={Publish}/>
            <Route path="/AddQnA" component={AddQnA} />
                    <Route path="/UpdateQnA" component={UpdateQnA} />
                    <Route path="/DeleteQnA" component={DeleteQnA} />
                </div>
        </div>
      </Router>
    );
  }
}

export default Home;