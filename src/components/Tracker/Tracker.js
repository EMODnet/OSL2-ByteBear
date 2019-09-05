import { h } from 'preact';

import './style.css';

const Tracker = ({ answers, open }) => (
  <div class="tracker">
    <div class="history">
      <h2>History</h2>
      <div class="timeline">
        { answers.map((answer) => (
          <div class={`answer ${answer.result}`} />
        )) }
      </div>
    </div>
  </div>
);

export default Tracker;
