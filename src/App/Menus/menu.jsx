
import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from '../Authorization/logout';
import Body from '../MainPage/mainPage';
import 'antd/dist/antd.css';
import {Menu} from 'antd';
import Registration from '../Registration/Registration';
import { createBrowserHistory } from 'history';

class App extends React.Component {
  state = {
    current: 'thre',
    isOnline: localStorage.getItem('isOnline'),
  };
  changeOnline = (e) => {
    this.setState({
      isOnline: false,
    });
  }
  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };
  componentWillMount(){
    localStorage.setItem('isOnline', 'false');
    this.setState({
      isOnline: false,
    });
  }
  render() {
    let temp_menus;
      if(this.state.isOnline){
        temp_menus = [<Menu.Item key="two">
                     <Link to = "plays">Plays</Link>
                     </Menu.Item>]
      }else{
       temp_menus = [
            <Menu.Item key="one">
                <Link to = "logout">Log in</Link>
            </Menu.Item>,
            <Menu.Item key="thre">
                <Link to = "/">Registration</Link>
            </Menu.Item>     
       ];
      }
    return (
      <Router history={createBrowserHistory()}>
        <div className='main-header'>
        <Menu  onClick={this.handleClick} 
        selectedKeys={[this.state.current]} 
        mode="horizontal" theme="dark"     
        > 
        {temp_menus}
            {/* <Menu.Item key="one">
                <Link to = "logout">Logout</Link>
            </Menu.Item>
            <Menu.Item key="two">
                <Link to = "plays">Plays</Link>
            </Menu.Item>
            <Menu.Item key="thre">
                <Link to = "/">Registration</Link>
            </Menu.Item> */}
        </Menu>
        </div>
          <div className='content'>
            <Route path="/logout" exact onlineIs={this.changeOnline} component={Login} />
            <Route path="/plays" exact component={Body} />
            <Route path="/" exact component={Registration} />
          </div>
      </Router>

    );
  }
}

  export default App;