import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Fragment, useEffect } from 'react';

import './App.css';
import Navbar from './componets/layout/Navbar';
import Alert from './componets/layout/Alert';
import Login from './componets/auth/Login';
import Register from './componets/auth/Register';
import RegisterVisitor from './componets/visitor/RegisterVisitor';
import Visitors from './componets/visitor/Visitors';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route
                exact
                path="/register_visitor"
                component={RegisterVisitor}
              />
              <Route exact path="/visitors" component={Visitors} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
