import { h, Component } from 'preact';
import './style.css';

class Question extends Component {
  constructor (props) {
    super(props);

    this.setState({
      question: null,
      answer: {
        answer: null,
        result: null
      }
    });

    this.answer = this.answer.bind(this);
  }

  answer(answer) {
    let newState;

    const rootAnswer = this.state.question === null ? answer : this.state.answer.answer;

    const answerInfo = this.props.question.answers.find((item) => item.value === rootAnswer);

    if (this.state.question === null) {
      newState = {
        answer: {
          answer,
          result: answerInfo.result
        }
      };
    } else {
      newState = {
        answer: {
          ...this.state.answer,
          [answerInfo.questions[this.state.question].id]: answer
        }
      };
    }

    if (answerInfo && answerInfo.questions) {
      if (this.state.question === null) {
        newState.question = 0;
      } else if (this.state.question < answerInfo.questions.length - 1) {
        newState.question = this.state.question++
      } else {
        this.props.onAnswer(newState.answer);
      }
    } else {
      this.props.onAnswer(newState.answer);
    }

    this.setState(newState);
  }

  render () {
    let question;
    if (!this.props.question) {
      return null;
    }

    const rootAnswer = (this.state.question !== null && this.state.answer.answer) || null;

    question = rootAnswer && this.props.question.answers.find((item) => item.value === rootAnswer);

    if (question) {
      question = question.questions[this.state.question];
    } else {
      question = this.props.question;
    }

    return (
      <div class="question">
        <h2>{question.question}</h2>
        <ul>
          { question.answers.map((answer) => (
            <li>
              <button onClick={() => this.answer(answer.value)}>
                {answer.label}
              </button>
            </li>
          )) }
        </ul>
      </div>
    );
  }
};

export default Question;
