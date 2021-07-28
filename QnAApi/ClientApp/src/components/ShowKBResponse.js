import React, { Component } from "react";
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table'
class ShowKBResponse extends Component {
  displayName = ShowKBResponse.name

  constructor(props) {
    super(props);
      this.state = { forecasts: [], knowledgebases: [], loading: true, kbName: [], kbID: props.location.pathname.charAt(props.location.pathname.length - 1) };
    //this.showMenu = this.showMenu.bind(this);
    //this.closeMenu = this.closeMenu.bind(this);
      //const url = 'api/Knowledgebase/1';
      this.onEditQuestion = this.onEditQuestion.bind(this)
      this.onDeleteQuestion = this.onDeleteQuestion.bind(this)
      const uri = 'api/Knowledgebase/' + this.state.kbID;
    fetch(uri)
      .then(response => response.json())
      .then(data => {
        this.setState({ forecasts: data, loading: false });
      });
      
      fetch('api/Knowledgebase')
      .then(response => response.json())
      .then(data => {
        this.setState({ knowledgebases: data, loading: false });
      });
      
}
/*

showMenu(event) {
  event.preventDefault();
  
  this.setState({ showMenu: true }, () => {
    document.addEventListener('click', this.closeMenu);
  });
}

closeMenu(event) {
  
  if (!this.dropdownMenu.contains(event.target)) {
    
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });  
    
  }
}*/

onEditQuestion(id, question,answer,source) {
  this.props.history.push("/UpdateQnA/"+this.state.kbID, {
        qid: id,
        oldQuestion: question,
        oldAnswer: answer,
        source:source
        });
      }

onDeleteQuestion(id, question,answer) {
  this.props.history.push("/DeleteQnA/"+this.state.kbID, {
        qid: id,
        oldQuestion: question,
        oldAnswer: answer
        });
      }

static ShowKnowledgebase(Index)
{
  const uri = 'api/Knowledgebase/'+Index;
  
  fetch(uri)
      .then(response => response.json())
      .then(data => {
        this.setState({ knowledgebases: data, loading: false });
      });
      
    }/* <td><Link to={{
                    pathname: '/DeleteQnA/' + 1,
                    state: {
                        oldQuestion: forecast.question,
                        oldAnswer: forecast.answer
                    }
                }}>DELETE</Link></td>*/
    static renderForecastsTable(forecasts,kbID) {
  return (
    <table className='table'>
      <thead>
              <tr>
          <th>Question</th>
                  <th>answer</th>          
                  <th>EDIT</th>
                  <th>DELETE</th>
        </tr>
      </thead>
      <tbody>
        {forecasts.map((forecast,Index) =>
                  <tr key={Index}>
            <td>{forecast.question}</td>
            <td>{forecast.answer}</td>           
                <td><Link to={{
                          pathname: '/UpdateQnA/' + kbID,
                          state: {
                              kbID: Index,
                              qid: forecast.id,
                        oldQuestion: forecast.question,
                        oldAnswer: forecast.answer,
                        source:forecast.source
                    }
                      }}>EDIT</Link></td>
                      <td><Link to={{
                          pathname: '/DeleteQnA/' + kbID,
                          state: {
                              qid: forecast.id,
                              oldQuestion: forecast.question,
                              oldAnswer: forecast.answer
                          }
                      }}>DELETE</Link></td>
               
          </tr>
        )}
      </tbody>
    </table>
  );
}

    render() {
        let contents = ShowKBResponse.renderForecastsTable(this.state.forecasts, this.state.kbID);
  //let contents = this.state.loading
  //  ? <p><em>Loading...</em></p>
  //  : ShowKBResponse.renderForecastsTable(this.state.forecasts,this.state.kbID);
  return (
      <div>
          <div className='table'>
              <table>
                  <tbody>
                      <tr>
                          <td style={{ border: 'none' }}><div className='buttonNew'>
                              <Link className="color" to={{
                                  pathname: '/AddQnA/' + this.state.kbID,
                                  state: {
                                      kbID: this.state.kbID
                                  }
                              }}><button className='buttonAdd'>+New</button></Link>
                          </div></td></tr>
                  </tbody>
              </table>             
          </div>
          <div className='table' id='width'>
          <MaterialTable 
                columns={[
                    {
                        title: 'Question',
                        field: 'question',
                    },
                    {
                        title: 'Answer',
                        field: 'answer',
                    },
                ]}
                data={this.state.forecasts}
                title='Question and Answer List'
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Utterance',
                        onClick: (event, rowData) => { this.onEditQuestion(rowData.id, rowData.question,rowData.answer,rowData.source) }
                    },
                    rowData => ({
                        icon: 'delete_box',
                        tooltip: 'Delete Utterance',
                        onClick: (event, rowData) => { this.onDeleteQuestion(rowData.id, rowData.question,rowData.answer) }
                    })
                ]}

                options={{
                    pageSize: 5, headerStyle: {
                        backgroundColor: '#4CAF50',
                        color: '#FFF',
                        fontSize: '1rem',
                        fontFamily: ' -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
                    },
                    rowStyle: {

                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
                    },
                    rowData: {
                        fontSize: '1rem',
                    },
        exportButton: true,
        actionsColumnIndex: -1
    }}
/></div>
    </div>
  );
}
}
 
export default ShowKBResponse;