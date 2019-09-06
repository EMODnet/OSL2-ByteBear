import { h, Component } from 'preact';

import Scale from '../Scale/Scale';

import './style.css';

class Tracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };
  }

  toggle() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render () {
    const { answers, open } = this.props;

    let co2 = 0;

    answers.forEach((answer) => {
      if (answer.answer === 'car') {
        co2 += answer.co2;
      }
    });

    return (
      <div class={`tracker${this.state.expanded ? ' open' : ''}`}>
        <div class="history" onClick={() => this.toggle()}>
          <h2>Your Choices</h2>
          <div class="timeline">
            { answers.map((answer) => (
              <div class={`answer ${answer.result}`} />
            )) }
          </div>
        </div>
        <div class="co2">
          <h2>Your monthly CO2 usage</h2>
          <Scale min={0} max={700} value={co2} />
        </div>
      </div>
    );
  }
}

export default Tracker;
