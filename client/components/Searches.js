import React from "react";
//import { connect } from "react-redux";

const initialState = {
  searchTerm: "",
  location: "",
  price: "",
};

class Searches extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    console.log("my props on search are", this.props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleInputChange(e) {
    this.setState({
      price: e.target.value,
    });
    console.log("state here is ", this.state);
  }
  handleSubmit(e) {
    e.preventDefault(e);
    const newCuisine = this.state.searchTerm.toLowerCase();
    console.log("newCuisine is", newCuisine);
    this.props.searchCuisine(newCuisine, this.props.lat, this.props.lng);
    this.setState(initialState);
  }
  render() {
    return (
      <div>
        <form>
          <h1>Search By</h1>
          <h3>Cuisine: </h3>
          <input type="text" name="searchTerm" onChange={this.handleChange} />
          <button type="submit" onClick={this.handleSubmit}>
            Search
          </button>
        </form>
        <form>
          <h3>Price:</h3>
          <label>
            $$$
            <input
              type="radio"
              name="price"
              value="$$$"
              checked={this.state.price === "$$$"}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            $$
            <input
              type="radio"
              name="price"
              value="$$"
              checked={this.state.price === "$$"}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            $
            <input
              type="radio"
              name="price"
              value="$"
              checked={this.state.price === "$"}
              onChange={this.handleInputChange}
            />
          </label>
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

export default Searches;
