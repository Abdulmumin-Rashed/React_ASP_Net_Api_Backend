import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserContext from "./contexts/userContext";
import { ProtectedRoute } from "./components/common";
import auth from "./services/authService";
import {
  CustomerForm,
  Customers,
  LoginForm,
  Logout,
  MovieForm,
  Movies,
  NavBar,
  NotFound,
  Profile,
  RegisterForm,
  Rentals,
} from "./components/pages";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <UserContext.Provider value={user}>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container my-5">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <ProtectedRoute path="/customers/:id" component={CustomerForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <ProtectedRoute path="/profile" component={Profile} />
            <Route path="/logout" component={Logout} />
            <Redirect exact from="/" to="/movies" component={Movies} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </UserContext.Provider>
    );
  }
}
export default App;
