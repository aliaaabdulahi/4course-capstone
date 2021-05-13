import React from "react";
import { connect } from "react-redux";
import axios from "axios";

/**
 * COMPONENT
 */
class Invite extends React.Component {
  constructor() {
    super();
    this.state = { emails: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
  }

  handleChange(e) {
    this.setState({ emails: e.target.value });
  }

  async handleEmail(e) {
    e.preventDefault();
    const res = await axios.post("/api/yelp/email", {
      toEmails: emails.split(","),
    });
    console.log(res);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleEmail}>
          <label>
            Emails:
            <input
              type="text"
              value={this.state.emails}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default connect(null)(Invite);
