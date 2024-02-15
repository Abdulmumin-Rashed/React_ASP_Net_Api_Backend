import React from "react";
import Joi from "joi-browser";
import { Form } from "../../common";
import { register } from "../../../services/userService";
import auth from "../../../services/authService";
class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "wq12345" },
    errors: {},
  };
  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().alphanum().required().label("Name"),
  };
  doSubmit = async () => {
    try {
      const { data } = await register(this.state.data);
      auth.loginWithJwt(data);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data[0].errorMessage;
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit} className="row row-cols-1 gap-2">
          {this.renderInput("username", "Username", "email")}
          {this.renderInput("name", "Name")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
