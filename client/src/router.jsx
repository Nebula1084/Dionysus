import React from 'react';
import PropTypes from 'prop-types';
import {
  Router, Switch, Route, Redirect
} from 'dva/router';
import Dynamic from 'dva/dynamic';
import App from './routes/app'

function RouterConfig({ history, app }) {
  const Introduction = Dynamic({
    app,
    component: () => import('./routes/introduction')
  });
  const Visualization = Dynamic({
    app,
    component: () => import('./routes/map')
  });

  return (
    <Router history={history}>
      <App>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/introduction" />)} />
          <Route exact path="/introduction" component={Introduction} />
          <Route exact path="/map" component={Visualization} />
        </Switch>
      </App>
    </Router>
  );
}

RouterConfig.propTypes = {
  history: PropTypes.object.isRequired
};

export default RouterConfig;
