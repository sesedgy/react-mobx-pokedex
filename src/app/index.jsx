import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage/index';
import PokemonPage from './pages/PokemonPage/index';
import Loader from './components/Loader/index';

const App = () => (
  <div>
    <Header />
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/pokemon/:pokemon/" component={PokemonPage} />
      </Switch>
      <Loader />
    </div>
  </div>
);

export default App;
