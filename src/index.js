import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import quizService from "./assets/quizService";
import QuestionBox from "./assets/components/QuestionBox";
import Result from "./assets/components/Result";

import * as serviceWorker from "./serviceWorker";

class QuizBee extends Component {
  state = {
    questionBank: [],
    score: 0,
    responses: 0
  };

  getQuestions = () => {
    quizService().then(questions => {
      this.setState({
        questionBank: questions
      });
    });
  };

  computeAnswer = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      this.setState({
        score: this.state.score + 1
      });
    }
    this.setState({
      responses: this.state.responses < 5 ? this.state.responses + 1 : 5
    });
  };

  playAgain = () => {
    this.getQuestions();
    this.setState({
      score: 0,
      responses: 0
    });
  };

  componentDidMount() {
    this.getQuestions();
  }

  render() {
    return (
      <div className="container">
        <div className="title">QuizBee</div>
        {this.state.questionBank.length > 0 &&
          this.state.responses < 5 &&
          this.state.questionBank.map(
            ({ question, answers, correct, questionId }) => (
              <QuestionBox
                question={question}
                options={answers}
                selected={answer => this.computeAnswer(answer, correct)}
                key={questionId}
              />
            )
          )}

        {this.state.responses === 5 ? (
          <Result score={this.state.score} playAgain={this.playAgain} />
        ) : null}
      </div>
    );
  }
}

ReactDOM.render(<QuizBee />, document.getElementById("root"));
serviceWorker.unregister();
