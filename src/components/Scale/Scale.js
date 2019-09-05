import { h } from 'preact';

import './style.css';

const Scale = (props) => (
  <div class="scale">
    <div class="bar">
      <div class="fill"
        style={{ width: `${Math.round(((props.value - props.min) / (props.max - props.min)) * 100)}%` }}
      />
    </div>
  </div>
);
export default Scale;
