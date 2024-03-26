import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Fragment, useEffect } from 'react';

import './App.css';
import PrivateRoute from './componets/routing/PrivateRoute';
import Navbar from './componets/layout/Navbar';
import Alert from './componets/layout/Alert';
import Login from './componets/auth/Login';
import Register from './componets/auth/Register';
import RegisterVisitor from './componets/visitor/RegisterVisitor';
import UpdateVisitor from './componets/visitor/UpdateVisitor';
import Visitors from './componets/visitors/Visitors';

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
<<<<<<< HEAD
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute
=======
              <Route exact path="/register" component={Register} />
              <Route exact path="/" component={Login} />
              <Route
>>>>>>> master
                exact
                path="/register_visitor"
                component={RegisterVisitor}
              />
<<<<<<< HEAD
              <PrivateRoute exact path="/visitors" component={Visitors} />
=======
              <Route
                exact
                path="/update_visitor/:_id"
                component={UpdateVisitor}
              />
              <Route exact path="/visitors" component={Visitors} />
>>>>>>> master
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
