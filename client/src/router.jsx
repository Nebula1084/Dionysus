import React from 'react';
import PropTypes from 'prop-types';
import {
  Router, Switch, Route, Redirect
} from 'dva/router';
import Dynamic from 'dva/dynamic';
import App from './routes/app'

function RouterConfig({ history, app }) {
  const review = Dynamic({
    app,
    models: () => [
      import('./models/review')
    ],
    component: () => import('./routes/review')
  });
  const business = Dynamic({
    app,
    models: () => [
      import('./models/portal')
    ],
    component: () => import('./routes/business')
  });


  return (
    <Router history={history}>
      <App>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/business" />)} />
          <Route exact path="/business" component={business} />
          <Route exact path="/review" component={review} />
        </Switch>
      </App>
    </Router>
  );
}

RouterConfig.propTypes = {
  history: PropTypes.object.isRequired
};

export default RouterConfig;
