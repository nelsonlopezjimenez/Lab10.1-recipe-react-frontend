import React, { Component } from "react";
import BlogApp from "./BlogApp";
import "./BlogInput.css";
import RecipeInput from "./RecipeInput";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      password: "",
      isAdmin: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    console.log("Register, handleSubmit ", this.state);
    e.preventDefault();
    //this.props.onSave({...this.state});
    this.setState({
      fullName: "",
      email: "",
      password: "",
      isAdmin: false,
    });
  }

  render() {
    console.log("Register with import BlogApp: ", BlogApp);
    const { fullName, email, password, isAdmin } = this.state;

    return (
      <div className="recipe-form-container">
        <form className="recipe-form" onSubmit={this.handleSubmit}>
          <div className="recipe-form-line">
            <label htmlFor="recipe-title-input">Full Name</label>
            <input
              id="recipe-fullName-input"
              key="fullName"
              name="fullName"
              type="text"
              value={fullName}
              size={42}
              autoComplete="off"
              onChange={this.handleChange}
            />
          </div>
          <div className="recipe-form-line">
            <label htmlFor="recipe-title-input">email</label>
            <input
              id="recipe-title-input"
              key="email"
              name="email"
              type="text"
              value={email}
              size={42}
              autoComplete="off"
              onChange={this.handleChange}
            />
          </div>
          <div className="recipe-form-line">
            <label htmlFor="recipe-title-input">password</label>
            <input
              key="password"
              id="recipe-password-input"
              type="text"
              name="password"
              autoComplete="off"
              size={42}
              value={password}
              onChange={this.handleChange}
            />
          </div>

          <button
            type="submit"
            className="buttons"
            style={{ alignSelf: "flex-end", marginRight: 0 }}
          >
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
