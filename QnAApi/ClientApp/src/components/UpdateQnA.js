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
class UpdateQnA extends React.Component {
    displayName = UpdateQnA.name

  constructor(props) {  
    super(props);
    this.state = { knowledgebases:[],
      id:0,
      newquestion:'',
      newanswer:'',
        kbName: '',
        kbID: props.location.pathname.charAt(props.location.pathname.length - 1),
        currentQuestion: this.props.location.state.oldQuestion,
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

        const uri = 'api/UpdateQnA/' + this.state.kbID + '?qid=' + this.props.location.state.qid + '&cqn=' + this.props.location.state.oldQuestion + '&qn=' + this.state.newquestion +'&ans=' + this.props.location.state.oldAnswer+'&source='+this.props.location.state.source;
  
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
            <h1>Update Question and Answer</h1>
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
                                        value={this.state.newquestion}
                                        onChange={this.handleInputChange} />
                                </Label>
                            </div>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <div>
                                <Label for="cqn" sm={4}>Current Question
                                  <Input
                                        name="currentquestion"
                                        type="text"
                                        id="cqn"
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
                                <Button className="buttonCenter">SAVE</Button>
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
                            <th>Current Question</th>
                            <th>Answer</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.state.newquestion}</td>
                            <td>{this.state.currentQuestion}</td>
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
export default UpdateQnA;