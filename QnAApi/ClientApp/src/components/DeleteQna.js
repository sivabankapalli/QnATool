import React from "react";
import {
    Col, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';
import './buttonadd.css';
import "./AddQnA.css";
import { number } from "prop-types";
import { Redirect } from 'react-router';
class DeleteQnA extends React.Component {
    displayName = DeleteQnA.name

  constructor(props) {  
    super(props);
    this.state = { knowledgebases:[],
      id:0,
      newquestion:'',
      newanswer:'',
        kbName: '',
        kbID: props.location.pathname.charAt(props.location.pathname.length - 1),
        deleteQuestion: this.props.location.state.oldQuestion,
        deleteAnswer: this.props.location.state.oldAnswer,
      //kbID: this.props.location.state.kbID,
      fireRedirect: false
      };
      if (this.kbID !== number)
          this.setState({ kbID : 0 });
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    handleChange(event) {

        this.setState(
            { [event.target.name]: event.target.value }
        );
    }
  handleInputChange(event){

    this.setState(
      {[event.target.name]:event.target.value}
    );
  }
    handleSubmit(event) {

        const uri = 'api/DeleteQnA/' + this.state.kbID + '?qid=' + this.props.location.state.qid+'&qn=' + this.props.location.state.oldQuestion + '&ans=' + this.props.location.state.oldAnswer;
  
    fetch(uri)
        .then(response => response.text())
        .then(data => {
          this.setState({ knowledgebases: data, fireRedirect: true});
        });
    event.preventDefault();    
  }
static SaveQnA(){

}

    render() {
        let question = this.props.location.state.oldQuestion;
        let answer = this.props.location.state.oldAnswer;
        const redirectPage = '/';
    return (
      <div>
            <h1>Add Question and Answer</h1>
            <div className='buttonNew'>
                <Form onSubmit={this.handleSubmit}>
                    <Col>
                        <FormGroup>
                            <div>
                                <Label for="qn" sm={4}>Question
                                  <Input
                                        name="newquestion"
                                        type="text"
                                        id="qn"
                                        defaultValue={question}
                                        readOnly />
                                </Label>
                            </div>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <div>
                                <Label for="ans" sm={4}>Answer
                                  <Input
                                        name="newanswer"
                                        type="text"
                                        id="ans"
                                        defaultValue={answer}
                                        readOnly />
                                </Label>
                            </div>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <div>
                                <Button className="buttonCenter">DELETE</Button>
                            </div>
                        </FormGroup>
                    </Col>
                </Form>
            </div>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Answer</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.state.deleteQuestion}</td>
                            <td>{this.state.deleteAnswer}</td>
                            <td>{this.state.knowledgebases && this.state.fireRedirect && (<Redirect refresh='20' to={redirectPage} />)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
    </div>
    );
  }
}
export default DeleteQnA;