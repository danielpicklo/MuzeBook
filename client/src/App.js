import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Sidebar from './components/layout/Sidebar';
import Posts from './components/posts/Posts';
import Alert from './components/layout/Alert';
import Dash from './components/dash/dash';
import Private from './components/routing/private';
import './App.css';
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';


if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => { 
  useEffect(() => {
    store.dispatch(loadUser);
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <div className="container">
            <Alert />
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
              <Private exact path="/profile" component={Dash}/>
              <Private exact path="/posts" component={Posts}/>
            </Switch>
          </div>
          <Sidebar />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
