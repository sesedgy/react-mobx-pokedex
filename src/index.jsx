import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import App from './app/index';
import appState from './stores/AppState';
import loaderStore from './stores/LoaderStore';
import pokemonsFilteredList from './stores/PokemonsFilteredList';

import './index.css';

const startApp = async () => {
  await appState.initAppState();
  const stores = { appState, loaderStore, pokemonsFilteredList };
  ReactDOM.render(
    <Provider {...stores}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
  );
};

(async () => {
  await startApp();
})();
