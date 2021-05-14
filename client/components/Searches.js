import React from "react";

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
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log("state here is ", this.state);
  }
  handleSubmit(e) {
    e.preventDefault();
    const newCuisine = this.state.searchTerm.toLowerCase();
    console.log("newCuisine is", newCuisine);
    this.props.searchCuisine(newCuisine, this.props.lat, this.props.lng);
    this.setState(initialState);
  }
  handleInputSubmit(e) {
    e.preventDefault();
    const price = this.state.price;
    console.log("price is", this.state.price);
    this.props.searchPrice(price, this.props.lat, this.props.lng);
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
            $$$$
            <input
              type="radio"
              name="price"
              value="4"
              checked={this.state.price === "4"}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            $$$
            <input
              type="radio"
              name="price"
              value="3"
              checked={this.state.price === "3"}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            $$
            <input
              type="radio"
              name="price"
              value="2"
              checked={this.state.price === "2"}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            $
            <input
              type="radio"
              name="price"
              value="1"
              checked={this.state.price === "1"}
              onChange={this.handleInputChange}
            />
          </label>
          <button type="submit" onClick={this.handleInputSubmit}>
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default Searches;
