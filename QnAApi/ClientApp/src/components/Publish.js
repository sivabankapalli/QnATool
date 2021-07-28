import React, { Component } from "react";
import { number } from "prop-types";
 
class Publish extends Component {
  displayName = Publish.name

  constructor(props) {
    super(props);
      this.state = {
          forecasts: [], knowledgebases: [], loading: true, kbID: props.location.pathname.charAt(props.location.pathname.length - 1)
      };//kbID: this.props.location.state.kbID };
    //this.showMenu = this.showMenu.bind(this);
    //this.closeMenu = this.closeMenu.bind(this);
      //const url = 'api/Knowledgebase/1';
      if (this.kbID !== number)
          this.setState({ kbID: 0 });
      const uri = 'api/UpdateKnowledgebase/' + this.state.kbID;
    fetch(uri)
      .then(response => response.text())
      .then(data => {
        this.setState({ forecasts: data, loading: false });
      });
      
      const kburi = 'api/Knowledgebase/' + this.state.kbID;
      fetch(kburi)
      .then(response => response.json())
      .then(data => {
        this.setState({ knowledgebases: data, loading: false });
      });
      
}
    
static renderForecastsTable(knowledgebases) {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>index</th>
          <th>Question</th>
          <th>answer</th>          
        </tr>
      </thead>
      <tbody>
        {knowledgebases.map((forecast,Index) =>
          <tr key={Index}>
            <td>{Index+1}</td>
            <td>{forecast.question}</td>
            <td>{forecast.answer}</td>            
          </tr>
        )}
      </tbody>
    </table>
  );
}

render() {
  let contents = this.state.loading
    ? <p><em>Loading...</em></p>
    : Publish.renderForecastsTable(this.state.knowledgebases);

  return (
    <div>
      <h1>QnA Publish</h1>
      <h3><p>Result: {this.state.forecasts}</p></h3>
      
      {contents}
    </div>
  );
}
}
export default Publish;