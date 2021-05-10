import React from "react";
//import { connect } from "react-redux";

const initialState = {
  searchTerm: "",
};

class Searches extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    console.log("my props on search are", this.props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
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
      <form>
        <h1>Search By</h1>
        <h3>Cuisine: </h3>
        <input type="text" name="searchTerm" onChange={this.handleChange} />
        <button type="submit" onClick={this.handleSubmit}>
          Search
        </button>
      </form>
    );
  }
}

export default Searches;
