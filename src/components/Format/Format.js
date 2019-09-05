import { h } from 'preact';

const Format = (props) => (
  <div class={props.class || ''}>
    { props.children.reduce((acc, child) => {
      console.log('Received child', child);
      if (typeof child === 'string') {
        acc = acc.concat(child.split(/\n *\n */gm).map((paragraph) => (
          <p>{ paragraph.replace(/\n */gm, ' ') }</p>
        )));
      } else {
        acc.push(child);
      }

      return acc;
    }, []) }
  </div>
);

export default Format;

