import React from "react";
import Joi from "joi-browser";
import { Form } from "../../common";
import { getCustomer, saveCustomer } from "../../../services/customerService";

class CustomerForm extends Form {
  state = {
    data: {
      name: "",
      phone: "",
      isGold: false,
    },
    errors: {},
  };
  componentDidMount() {
    this.populateCustomer();
  }
  async populateCustomer() {
    try {
      const customerId = this.props.match.params.id;
      if (customerId === "new") {
        return;
      }
      const { data: customer } = await getCustomer(customerId);
      this.setState({ data: this.mapToViewModel(customer) });
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        this.props.history.replace("/not-found");
    }
  }
  mapToViewModel = (customer) => {
    return {
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
      isGold: customer.isGold,
    };
  };
  schema = {
    id: Joi.number().integer(),
    name: Joi.string().required().label("Name"),
    phone: Joi.string().min(9).max(9).required().label("Phone"),
    isGold: Joi.bool(),
  };
  doSubmit = async () => {
    await saveCustomer(this.state.data);
    this.props.history.push("/customers");
  };
  render() {
    return (
      <div className="container">
        <h1>Customer Form</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("phone", "Phone", "number")}
          {this.renderCheckBox("isGold", "Gold")}
          {this.renderButton("Add")}
        </form>
      </div>
    );
  }
}

export default CustomerForm;
