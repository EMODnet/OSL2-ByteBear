import { h, Component } from 'preact';

import Plot from 'react-plotly.js';

import './style.css';

const seaIceData = require('../../data/seaice.txt.json');

class Data extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: props.variable
    };
  }

  render() {
    return (
      <div class="data">
        <h2>Scientific Variables</h2>
        <div class={`variable${this.state.opened === '' ? ' open' : ''}`}>
          <h2 class="title">
          </h2>
          <div class="contents">
          </div>
        </div>
        <div class={`variable${this.state.opened === '' ? ' open' : ''}`}>
          <h2 class="title">
            Sea Surface Temperature
          </h2>
          <div class="contents">
            <Plot data={[
              {
                x: seaIceData.x,
                y: seaIceData.y,
                type: 'scatter'
              }
            ]} layout={ { height: 250, title: 'Sea Ice Coverage' } }
            />
          </div>
        </div>
        <div class={`variable${this.state.opened === '' ? ' open' : ''}`}>
          <h2 class="title">
            Sea Ice Coverage
          </h2>
          <div class="contents">
          </div>
        </div>
        <div class={`variable${this.state.opened === '' ? ' open' : ''}`}>
          <h2 class="title">
          </h2>
          <div class="contents">
          </div>
        </div>
        <div class={`variable${this.state.opened === '' ? ' open' : ''}`}>
          <h2 class="title">
          </h2>
          <div class="contents">
          </div>
        </div>
      </div>
    );
  }
}
export default Data;
