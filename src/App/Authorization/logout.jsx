
import React from 'react';
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button } from 'antd'; 
class NormalLoginForm extends React.Component {
  state = {
    online: false
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        let storage = JSON.parse(localStorage.getItem("registraion"));
        if(storage){
          function isAlive(val){
            console.log(val.email + " + " + values.username);
            return val.email == values.username
          }
          if(storage.some(isAlive)){
            this.setState({
              online: true,
            });
            localStorage.setItem('isOnline', 'true');
          }
          else {
            console.log("Користувача не знайдено - ", values);
          }
        }
        }
              
    });
    
  };
  handeClick = () =>  {
    console.log(this.props);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" fun={this.props}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handeClick}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default WrappedNormalLoginForm;

          