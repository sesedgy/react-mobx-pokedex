import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from './components/Header';
import Loader from './components/Loader/index';
import routes from './routes';

const App = () => (
  <div>
    <Header />
    <div>
      <Switch>
        {routes.map(
          ({ path, exact, component }) => (
            <Route
              key={path}
              exact={exact}
              path={path}
              component={component}
            />
          ),
        )}
      </Switch>
      <Loader />
    </div>
  </div>
);

export default withRouter(App);
