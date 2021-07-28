import React, { Component } from "react";
import {
    Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import button from "./button.css"

class ShowKnowledgebase extends Component {
  displayName = ShowKnowledgebase.name

  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };

    fetch('api/Knowledgebase')
      .then(response => response.json())
      .then(data => {
        this.setState({ forecasts: data, loading: false,Id:props.Index });
      });
}
 
static renderForecastsTable(forecasts) {
  return (
    <table className='table' id='widthmain'>
      <thead>
        <tr>
          <th style={{width:'50%'}}>KB Name</th>
          <th style={{width:'15%'}}>Add Questions</th>
           <th style={{width:'15%'}}>Publish KB</th>
        </tr>
      </thead>
      <tbody>
        {forecasts.map((forecast,Index) =>
          <tr key={Index}>
                      <td><Link className="color" to={{
                          pathname: '/ShowKBResponse/'+Index,
                          state: {
                              kbID: Index
                          }
                      }}>{forecast.name}</Link></td>
                      <td><Link className="color" to={{
                          pathname: '/AddQnA/' + Index,
                          state: {
                              kbID: Index
                          }
                      }}>Add QnA</Link></td>
                      <td><Link className="color" to={{
                          pathname: '/Publish/' + Index,
                          state: {
                              kbID: Index
                          }
                      }}>Publish</Link></td>
                      
          </tr>
        )}
      </tbody>
    </table>
  );
}

    render() {
  let contents = ShowKnowledgebase.renderForecastsTable(this.state.forecasts);
  //let contents = this.state.loading
  //  ? <p><em>Loading...</em></p>
  //  : ShowKnowledgebase.renderForecastsTable(this.state.forecasts);

  return (
    <div>
      {contents}
    </div>
  );
}
}
export default ShowKnowledgebase;