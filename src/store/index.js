import { h } from 'preact';
import createStore from 'unistore';
import persistStore from 'unissist';
import localStorageAdapter from 'unissist/integrations/localStorageAdapter';
import { Provider, connect } from 'unistore/preact';

/*export interface Store {
  // Answers to questions
  answers: Array<Answer>;
}*/

const store = createStore({
  answers: []
});

const adapter = localStorageAdapter();

persistStore(store, adapter);

const actions = store => ({
  addAnswer: ({answers}, answer) => ({
    answers: [ ...answers, answer ]
  })
});

const actionInitialiser = (store) => (actions);

export const Store = ({children}) => h(
  Provider, {
    store
  },
  children
);

export const FromStore = (use) => {
  console.log('useStore', use, actionInitialiser);
  return connect(use, actions);
};
