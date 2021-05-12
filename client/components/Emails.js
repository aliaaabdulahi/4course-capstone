import React from "react";
import { connect } from "react-redux";

class Emails extends React.Component {
  constructor() {
    super();
    this.state = {email1: "", email2: "", email3: "", email4: ""};

    this.handleChange = this.handleChange.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({[name]: value});  }

  async handleEmail(e) {
    e.preventDefault();
    // TODO: Add code to save 4 emails to be passed to Invite.js component
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleEmail}>
          <label>
            Email1:
            <input type="text" value={this.state.email1} name="email1" onChange={this.handleChange}/>
          </label>
          <label>
            Email2:
            <input type="text" value={this.state.email2} name="email2" onChange={this.handleChange}/>
          </label>
          <label>
            Email3:
            <input type="text" value={this.state.email3} name="email3" onChange={this.handleChange}/>
          </label>
          <label>
            Email4:
            <input type="text" value={this.state.email4} name="email4" onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
};

export default connect(null)(Emails);
