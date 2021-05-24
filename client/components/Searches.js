import React from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";

const initialState = {
  searchTerm: '"Pizza" or "Italian"',
  location: "",
  price: "",
  disabled: false,
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
    this.setState({
      searchTerm: " ",
      disabled: true,
    });
  }
  clearSelections(lat, long) {
    this.props.resClear(lat, long);
    this.setState({
      disabled: false,
    });
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
            value={this.state.searchTerm}
            name="searchTerm"
            onChange={this.handleChange}
            disabled={this.state.disabled}
          />
          <div id="search-cuisine-buttons">
            <Button
              className="buttons"
              type="submit"
              variant="contained"
              onClick={this.handleSubmit}
              disabled={this.state.disabled}
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
