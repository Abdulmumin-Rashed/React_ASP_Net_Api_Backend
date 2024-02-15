import React from "react";
import Joi from "joi-browser";
import { Form } from "../../common";
import { getRental, saveRental } from "../../../services/rentalsService";

class RentalsForm extends Form {
  state = {
    data: {
      customer: "",
      movie: "",
      dateOut: "",
      dateReturned: "",
      rentalFee: 0,
    },
    errors: {},
  };
  componentDidMount() {
    this.populateCustomer();
  }
  async populateCustomer() {
    try {
      const rentId = this.props.match.params.id;
      if (rentId === "new") {
        return;
      }
      const { data: rent } = await getRental(rentId);
      this.setState({ data: this.mapToViewModel(rent) });
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        this.props.history.replace("/not-found");
    }
  }
  mapToViewModel = (rent) => {
    return {
      id: rent.id,
      name: rent.name,
      phone: rent.phone,
      isGold: rent.isGold,
    };
  };
  schema = {
    id: Joi.number().integer(),
    name: Joi.string().required().label("Name"),
    phone: Joi.string().min(9).max(9).required().label("Phone"),
    isGold: Joi.bool(),
  };
  doSubmit = async () => {
    await saveRental(this.state.data);
    this.props.history.push("/customers");
  };
  render() {
    return (
      <div>
        <h1>Customer Form</h1>

        <form onSubmit={this.handleSubmit} className="row row-cols-1 gap-2">
          {this.renderInput("name", "Name")}
          {this.renderInput("phone", "Phone", "number")}
          {this.renderCheckBox("isGold", "Gold")}
          {this.renderButton("Add")}
        </form>
      </div>
    );
  }
}

export default RentalsForm;
