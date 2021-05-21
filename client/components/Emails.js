import React from "react";
import { connect } from "react-redux";
import { setEmailsThunk } from "../store/emails";
import { Link } from "react-router-dom";
import Anime2 from "./Anime2.js";
import { randomizer } from "../../utils.js";
import { setAssignmentsThunk } from "../store/courses";

class Emails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email1: "",
      email2: "",
      email3: "",
      email4: "",
      message: "",
      enableNext: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleEmails(e, this.props.eventId);
    const email1 = e.target.email1.value;
    const email2 = e.target.email2.value;
    const email3 = e.target.email3.value;
    const email4 = e.target.email4.value;
    let emails = [email1, email2, email3, email4];
    this.props.handleEmails(emails, this.props.eventId);
    const assignments = randomizer(emails, this.props.restaurantSelections);
    this.props.setCourse(this.props.eventId, assignments);
    this.setState({ enableNext: true });
  }

  handleNext() {
    this.state.enableNext ? this.props.history.push("/wheel") : null;
  }

  render() {
    return (
      <div className="center shape">
        <form onSubmit={this.handleSubmit}>
          <label>
            Email1:
            <input
              type="text"
              value={this.state.email1}
              name="email1"
              onChange={this.handleChange}
            />
          </label>
          <label>
            Email2:
            <input
              type="text"
              value={this.state.email2}
              name="email2"
              onChange={this.handleChange}
            />
          </label>
          <label>
            Email3:
            <input
              type="text"
              value={this.state.email3}
              name="email3"
              onChange={this.handleChange}
            />
          </label>
          <label>
            Email4:
            <input
              type="text"
              value={this.state.email4}
              name="email4"
              onChange={this.handleChange}
            />
          </label>
          <p>{this.state.message}</p>
          <div style={{ padding: "5px" }}>
            <input className="button normal" type="submit" value="Submit" />
            <button
              className={`button normal ${
                this.state.enableNext ? null : "disabled"
              }`}
              onClick={this.handleNext}
            >
              <Link to="/wheel">Next</Link>
            </button>
          </div>
        </form>
        <div>
          <Anime2 />
        </div>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    eventId: state.events.event.id,
    restaurantSelections: state.restaurantSelections,
  };
};
const mapDispatch = (dispatch) => {
  return {
    handleEmails(emails, id) {
      dispatch(setEmailsThunk(emails, id));
    },
    setCourse: (id, assignments) =>
      dispatch(setAssignmentsThunk(id, assignments)),
  };
};

export default connect(mapState, mapDispatch)(Emails);
