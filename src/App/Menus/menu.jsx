
import React from 'react';
import {Router, Route } from "react-router-dom";
import Login from '../Authorization/login';
import Body from '../MainPage/mainPage';
import 'antd/dist/antd.css';
import Registration from '../Registration/Registration';
import { createBrowserHistory } from 'history';
class App extends React.Component {
  render() {      
    return (
      <Router history={createBrowserHistory()}>
          <div className='content'>
            <Route path="/login" exact component={Login} />
            <Route path="/plays" exact component={Body} />
            <Route path="/" exact component={Login} />
            <Route path="/registration" exact component={Registration} />
          </div>
      </Router>

    );
  }
}
  export default App;