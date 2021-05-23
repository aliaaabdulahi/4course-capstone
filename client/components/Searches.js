import React from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";

const initialState = {
  searchTerm: "",
  location: "",
  price: "",
};
class Searches extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearSelections = this.clearSelections.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const newCuisine = this.state.searchTerm.toLowerCase();
    this.props.searchCuisine(newCuisine, this.props.lat, this.props.lng);
  }
  clearSelections(lat, long) {
    this.props.resClear(lat, long);
  }
  render() {
    return (
      <div id="searches">
        <form>
          <h1 className="centered-text">
            Search By
            <span className="centered-text" id="smaller">
              {" "}
              Cuisine:
            </span>{" "}
          </h1>
          <Input
            color="secondary"
            type="text"
            defaultValue='"Pizza" or "Italian"'
            name="searchTerm"
            onChange={this.handleChange}
          />
          <div id="search-cuisine-buttons">
            <Button
              className="buttons"
              type="submit"
              variant="contained"
              onClick={this.handleSubmit}
            >
              Search
            </Button>
            <Button
              className="buttons"
              type="button"
              variant="contained"
              onClick={() =>
                this.clearSelections(this.props.lat, this.props.lng)
              }
            >
              Clear
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default Searches;
