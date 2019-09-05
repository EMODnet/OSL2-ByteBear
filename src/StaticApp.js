import { h, Component } from 'preact';

import Question from './components/Question/index';
import Box from './components/Box/Box';
import Format from './components/Format/Format';
import Scale from './components/Scale/Scale';
import Tracker from './components/Tracker/Tracker';

import './StaticApp.css';

import iceberg from './static/iceberg.svg';
import polarBear from './static/polarbear_happy1.png';
import polarBearHappy from './static/polarbear_happy2.png';
import polarBearSad from './static/polarbear_sad.png';

import questions from './questions';

const polarBears = {
  neutral: {
    src: polarBear,
    offset: 40
  },
  happy: {
    src: polarBearHappy,
    offset: 40
  },
  sad: {
    src: polarBearSad,
    offset: 50
  }
};

const stats = [
  {
    label: 'Temperature',
    value: 0,
    min: -32,
    max: 8,
    unit: 'C'
  },
  {
    label: 'Sea Temperature',
    value: 0,
    min: -32,
    max: 8,
    unit: 'C'
  },
  {
    label: 'Ice Coverage',
    value: 60,
    min: 10,
    max: 90,
    unit: '%'
  },
  {
    label: 'Atomospheric CO2',
    value: 350,
    min: 200,
    max: 350,
    unit: 'ppm'
  }
];


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: [],
      questionAsked: null,
      showingExplanation: false,
      showingQuestion: false
    };


    // Preload bears
    Object.entries(polarBears).forEach((polarBear) => {
      const image = new Image();
      image.src = polarBear.src;
    });

    this.answer = this.answer.bind(this);
  }

  answer(answer) {
    console.log('App answer', answer);
    this.setState({
      answers: [ ...this.state.answers, answer ]
    });

    this.toggleShowing('Question');

    console.log('hid question, show explanation');

    setTimeout(() => {
      this.toggleShowing('Explanation');
    }, 1000);
  }

  toggleShowing(type) {
    const key = `showing${type}`;

    this.setState({
      [key]: !this.state[key]
    });
  }

  render() {
    let bear = polarBears.neutral;
    let result = 'neutral';
    let answer;
    if (this.state.answers.length) {
      const lastAnswer = this.state.answers[this.state.answers.length - 1].answer;
      answer = questions[0].answers.find((answer) => answer.value === lastAnswer);
      if (answer) {
        result = answer.result;
      }
    }

    return (
      <div class="app">
        <div class="background">
          <img class="iceberg" src={iceberg} />
          <div class="sea"></div>
        </div>
        <main>
          <Tracker answers={this.state.answers} />
          { result === 'bad' ? (<img class="bear" src={polarBearSad}
            style={{ top: `calc(60vh - 40vh` }}
          />) : null }
          { result === 'good' ? (<img class="bear" src={polarBearHappy}
            style={{ top: `calc(60vh - 40vh` }}
          />) : null }
          { result === 'neutral' ? (<img class="bear" src={polarBear}
            style={{ top: `calc(60vh - 40vh` }}
          />) : null }
          <Box class="stats translucent">
            <h2>Current Polar Conditions</h2>
            <table cellspacing="0" cellpadding="0">
              { stats.map((stat) => (
                <tr>
                  <th>{stat.label}</th>
                  <td>
                    <Scale min={stat.min} max={stat.max}
                      value={stat.value}
                    />
                  </td>
                  <td>
                    {stat.value}{stat.unit}
                  </td>
                </tr>
              )) }
            </table>
          </Box>
          <div>
            { answer ? (
              <Box class={`explanation${this.state.showingExplanation ? ' showing' : '' }`}>
                <div class="toolbar">
                  <button class="toggle"
                    onClick={() => this.toggleShowing('Explanation')}
                  >
                    { this.state.showingExplanation ? (
                      <i class="fa fa-times" />
                    ) : (
                      <i class="fa fa-question" />
                    ) }
                  </button>
                </div>
                { this.state.showingExplanation ? (
                  <Format class="text">
                    { answer.impactExplanation }
                  </Format>
                ) : null }
              </Box>
            ) : null }
            <Box class={ this.state.showingQuestion ? 'showing' : 'hidden' }>
              { this.state.showingQuestion ? (
                <Question question={questions[0]} onAnswer={this.answer} />
              ) : (
                <button class="toggle"
                  onClick={() => this.toggleShowing('Question') }
                >
                  <i class="fa fa-question"/>
                </button>
              ) }
            </Box>
          </div>
        </main>
      </div>
    );
  }
};

export default App;
