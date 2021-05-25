import React from "react";
import { connect } from "react-redux"
import { Link } from "react-router-dom";;
import axios from "axios";

/**
 * COMPONENT
 */
class Invite extends React.Component {
  constructor(props) {
    super(props);
    this.handleEmail = this.handleEmail.bind(this);
  }

  async handleEmail(e) {
    e.preventDefault();
    console.log(console.log("Inside Invite:", this.props.emails));
    const res = await axios.post("/api/yelp/email", {
      toEmails: this.props.emails,
    });
    console.log(res);
  }

  render() {
    return (
      <div style={{marginTop: "100px"}} className="center">

        <p className="black">Time to fly the news to your friends!</p>
        <Link to="/thankyou">
        <form onSubmit={this.handleEmail}>
          <input className="button bigCircle" type="submit" value="Send Link" />
        </form>
        </Link>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    emails: state.emails,
  };
};

export default connect(mapState)(Invite);
