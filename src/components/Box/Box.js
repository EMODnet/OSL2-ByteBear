import { h } from 'preact';

import './style.css';

const Box = (props) => (
  <div class={`box ${props.class}`}>
    { props.children }
  </div>
);
export default Box;
