import { h, render } from 'preact';
import App from './StaticApp';
import { Store } from './store';
import './index.css';

render(
  <Store>
    <App />
  </Store>,
  document.getElementById('root')
);
