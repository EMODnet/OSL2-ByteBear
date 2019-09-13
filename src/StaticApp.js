import { h, Component } from 'preact';
import { FromStore } from './store/index';

import Question from './components/Question/index';
import Box from './components/Box/Box';
import Format from './components/Format/Format';
import Scale from './components/Scale/Scale';
import Tracker from './components/Tracker/Tracker';
import Explanation from './components/Explanation/Explanation';
import Data from './components/Data/Data';

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
    id: 'temp',
    label: 'Temperature',
    value: -1,
    min: -32,
    max: 8,
    unit: ' °C'
  },
  {
    id: 'sst',
    label: 'Sea Temperature',
    value: 0,
    min: -32,
    max: 8,
    unit: ' °C'
  },
  {
    id: 'ice',
    label: 'Ice Coverage',
    value: 11,
    min: 2,
    max: 20,
    unit: ' %'
  },
  {
    id: 'co2',
    label: 'Atomospheric CO2',
    value: 350,
    min: 200,
    max: 350,
    unit: ' ppm'
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
    this.props.addAnswer(answer);

    this.toggleShowing('Question');

    console.log('hid question, show explanation');

    setTimeout(() => {
      this.toggleShowing('Explanation');
    }, 50);
  }

  toggleShowing(type) {
    const key = `showing${type}`;

    this.setState({
      [key]: !this.state[key]
    });
  }

  showData(variable) {
    this.setState({
      showingData: variable
    });
  }

  render() {
    let bear = polarBears.neutral;
    let result = 'neutral';
    let answer;
    let lastAnswer;

    if (this.props.answers.length) {
      lastAnswer = this.props.answers[this.props.answers.length - 1].answer;
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
          <Tracker answers={this.props.answers} />
          { result === 'bad' ? (<img class="bear" src={polarBearSad}
            alt="Your polar bear is sad"
            style={{ bottom: `calc(40vh - 30px` }}
          />) : null }
          { result === 'good' ? (<img class="bear" src={polarBearHappy}
            alt="Your polar bear is happy"
            style={{ bottom: `calc(40vh + 20px` }}
          />) : null }
          { result === 'neutral' ? (<img class="bear" src={polarBear}
            alt="Your Polar Bear"
            style={{ bottom: `calc(40vh + 20px` }}
          />) : null }
          <Box class="stats translucent">
            <h2>Current Polar Conditions</h2>
            <table cellspacing="0" cellpadding="0">
              { stats.map((stat) => (
                <tr
                  onClick={() => this.showData(stat.id) }
                >
                  <th>{stat.label}</th>
                  <td class="scaleContainer">
                    <Scale min={stat.min} max={stat.max}
                      value={stat.value}
                    />
                  </td>
                  <td class="unitContainer">
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
                    ) : 'More Info About Choices ' }
                  </button>
                </div>
                { this.state.showingExplanation ? (
                  <Explanation answer={lastAnswer} question={questions[0]} />
                ) : null }
              </Box>
            ) : null }
            <Box class={ `questionBox${this.state.showingQuestion ? ' showing' : ' hidden'}` }>
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
          { this.state.showingData ? (
            <Box class="dataBox">
              <div class="toolbar">
                <button class="toggle"
                  onClick={() => this.toggleShowing('Data')}
                >
                  <i class="fa fa-times" />
                </button>
              </div>
              <Data open={this.state.showingData}/>
            </Box>
          ) : null }
        </main>
      </div>
    );
  }
};

export default FromStore('answers')(App);
