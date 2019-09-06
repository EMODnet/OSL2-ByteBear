import { h, Component } from 'preact';

import Format from '../Format/Format';

import './style.css';

class Explanation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: props.answer
    };

    this.expand = this.expand.bind(this);
  }

  expand(answer) {
    if (this.state.answer === answer) {
      this.setState({
        opened: null
      });
    } else {
      this.setState({
        opened: answer
      });
    }
  }

  render() {
    return (
      <div class="explanations">
        <h2>{this.props.question.title}</h2>
        { this.props.question.answers.map((answer) => (
          <div class={`explanation${answer.value === this.state.opened ? ' open' : ''}`}>
            <div class="title" onClick={() => this.expand(answer.value)}>
              { answer.label }
            </div>
            <Format class="text">
              { answer.impactExplanation }
            </Format>
          </div>
        )) }
      </div>
    );
  }
}
export default Explanation;
