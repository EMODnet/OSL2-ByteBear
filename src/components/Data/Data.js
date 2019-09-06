import { h, Component } from 'preact';

import Plot from 'react-plotly.js';

import './style.css';

const seaIceData = require('../../data/seaice.txt.json');
const sstData = require('../../data/Sea_Surface_temperature.tsv.json');

class Data extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: props.open
    };
  }

  toggle(variable) {
    if (this.state.opened === variable) {
      this.setState({
        opened: null
      });
    } else {
      this.setState({
        opened: variable
      });

      setTimeout(() => {
        const div = document.querySelector('.variable.' + variable);
        console.log('found for', variable, div);
        if (div) {
          div.scrollTo()
        }
      }, 50);
    }
  }

  render() {
    const width = window.innerWidth * 0.6;
    console.log('calculated width as', width);
    return (
      <div class="data">
        <h2>Scientific Variables</h2>
        <div class={`variable temp${this.state.opened === 'temp' ? ' open' : ''}`}>
          <h2 class="title" onClick={() => this.toggle('temp')}>
            Temperature
          </h2>
          { this.state.opened === 'temp' ? (
            <div class="contents">
              <Plot data={[
                {
                  name: 'Coverage (%)',
                  x: sstData.x.map((value) => new Date(value + '-01')),
                  y: sstData.y,
                  type: 'scatter'
                }
              ]} layout={ { width, height: 450, title: 'Sea Surface Temerature' } }
              />
            </div>
          ) : null }
        </div>
        <div class={`variable sst${this.state.opened === 'sst' ? ' open' : ''}`}>
          <h2 class="title" onClick={() => this.toggle('sst')}>
            Sea Surface Temperature
          </h2>
          <div class="contents">
          </div>
          { this.state.opened === 'sst' ? (
            <div class="contents">
              <p>
                Sea surface temperature affects the Arctic sea ice cover.
                Reduced polar ice coverage will speed-up global warming due to
                the lack of ice to reflect all the sunlight back.
              </p>
              <p>
                Warming of the sea surface temperature will also impact other
                marine organism by changing the breeding timing and where they
                live.
              </p>
              <Plot data={[
                {
                  name: 'Coverage (%)',
                  x: sstData.x.map((value) => new Date(value + '-01')),
                  y: sstData.y,
                  type: 'scatter'
                }
              ]} layout={ { width, height: 450, title: 'Sea Surface Temperature' } }
              />
            </div>
          ) : null }
        </div>
        <div class={`variable ice${this.state.opened === 'ice' ? ' open' : ''}`}>
          <h2 class="title" onClick={() => this.toggle('ice')}>
            Sea Ice Coverage
          </h2>
          { this.state.opened === 'ice' ? (
            <div class="contents">
              <p>
                Sea ice cover vary depending on the season. However, due to
                climate change, the overall sea ice cover has declined
                throughout the years.
              </p>
              <p>
                Polar bears depend heavily on sea ice in order to hunt and
                survive. Declining sea ice cover makes it harder for the polar
                bears to access their food: seals.
              </p>
              <p>
                A study showed that if sea ice declines at the predicted rate,
                only one-third of the world’s polar bears will survive by the
                end of the 21st century.
              </p>
               { /*<p>
                In the Arctic, the Sea ice is the floor where the Polar bears
                rely. They depend on sea ice for survival, to hunt seals,
                rest and give birth to and raise their springs.
              </p>
              <p>
                As the sea ice extent decreases, it forces the polar bears to
                burn huge amounts of energy walking or swimming long distances
                to get to any remaining ice.
              </p>
              <p>
                The farther the bears have to travel to get on the ice to
                hunt, the more weight they lose. Eventually they start losing
                muscle, decreasing their chances of hunting success.
              </p> */ }
              <Plot data={[
                {
                  name: 'Coverage (%)',
                  x: seaIceData.x.map((value) => new Date(value + '-01')),
                  y: seaIceData.y,
                  type: 'scatter'
                }
              ]} layout={ { width, height: 450, title: 'Sea Ice Coverage' } }
              />
            </div>
          ) : null }
        </div>
        <div class={`variable co2${this.state.opened === 'co2' ? ' open' : ''}`}>
          <h2 class="title" onClick={() => this.toggle('co2')}>
            Atmospheric Carbon Dioxide (CO2)
          </h2>
          { this.state.opened === 'co2' ? (
            <div class="contents">
              <p>
                Carbon dioxide levels are linked with the sea surface
                temperature increase. The polar regions and ultimately polar
                bear survival are especially vulnerable to changes in carbon
                dioxide, temperature, and sea ice cover.
              </p>
              <Plot data={[
                {
                  name: 'Coverage (%)',
                  x: seaIceData.x.map((value) => new Date(value + '-01')),
                  y: seaIceData.y,
                  type: 'scatter'
                }
              ]} layout={ { width, height: 450, title: 'Sea Ice Coverage' } }
              />
            </div>
          ) : null }
        </div>
        { /* <div class={`variable${this.state.opened === '' ? ' open' : ''}`}>
          <h2 class="title">
          </h2>
          <div class="contents">
          </div>
        </div> */ }
      </div>
    );
  }
}
export default Data;
