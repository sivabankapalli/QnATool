import React from 'react';
import {
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button } from 'reactstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import './NavBar.css';

function UserAvatar(props) {
  // If a user avatar is available, return an img tag with the pic
  if (props.user.avatar) {
    return <img
            src={props.user.avatar} alt="user"
            className="rounded-circle align-self-center mr-2"
            style={{width: '32px'}}></img>;
  }
 
  // No avatar available, return a default icon
  return <i
          className="far fa-user-circle fa-lg rounded-circle align-self-center mr-2"
          style={{width: '32px'}}></i>;
}

function AuthNavItem(props) {
  // If authenticated, return a dropdown with the user's info and a
  // sign out button
  if (props.isAuthenticated) {
    return (
      <UncontrolledDropdown>
        <DropdownToggle nav caret>
          <UserAvatar user={props.user}/>
        </DropdownToggle>
        <DropdownMenu right>
          <h5 className="dropdown-item-text mb-0">{props.user.displayName}</h5>
          <p className="dropdown-item-text text-muted mb-0">{props.user.email}</p>
          <DropdownItem divider />
          <DropdownItem onClick={props.authButtonMethod}>Sign Out</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>

    );
  }

  // Not authenticated, return a sign in link
  return (
    <NavItem>
      <NavLink onClick={props.authButtonMethod}><Button outline color="primary">Sign In</Button></NavLink>
    </NavItem>
  );
}

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {

    return (
      <div>
        <Navbar color="white" expand="md" fixed="top">
          <Nav navbar>          
          <img src="/banner_logo.png"/>
          </Nav>
          <Nav navbar>
            <table>
              <tbody>
                <tr>
                  <td style={{border: 'none'}}></td>
                  <td style={{border: 'none'}}></td>
                  <td style={{border: 'none'}}></td>
                  <td style={{border: 'none'}}></td>
                  <td style={{border: 'none'}}></td>
                  <td style={{border: 'none'}}></td>
                  <td style={{border: 'none'}}></td>
                  <td style={{border: 'none'}}></td>
                  <td style={{border: 'none'}}></td>
                  <td style={{border: 'none'}}><h1 style={{textalign:'center'}}>QnA TOOL</h1></td>
                  <td style={{border: 'none'}}></td>
                  <td style={{border: 'none'}}></td>
                  <td style={{border: 'none'}}></td>
                  <td style={{border: 'none'}}></td>
                  <td style={{border: 'none'}}></td>
                  <td style={{border: 'none'}}></td>
                  <td style={{border: 'none'}}></td>
                  <td style={{border: 'none'}}></td>
                  <td style={{border: 'none'}}></td>
                  <td style={{border: 'none'}}><h2>{this.props.user.displayName}</h2></td>                
                </tr>
              </tbody>
            </table>
            
          </Nav>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mr-auto" navbar></Nav>
              <Nav className="justify-content-end" navbar>
                <AuthNavItem
                  isAuthenticated={this.props.isAuthenticated}
                  authButtonMethod={this.props.authButtonMethod}
                  user={this.props.user} />
              </Nav>
            </Collapse>
        </Navbar>
      </div>
    );
  }
}