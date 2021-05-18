import React from 'react';
import {connect} from 'react-redux';
import {setEmailsThunk} from '../store/emails';

class Emails extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      email1: '',
      email2: '',
      email3: '',
      email4: '',
      message: '',
    };

    this.handleChange = this.handleChange.bind (this);
    this.handleSubmit = this.handleSubmit.bind (this);
  }

  handleChange (e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState ({[name]: value});
  }

  handleSubmit (e) {
    e.preventDefault ();
    this.props.handleEmails (e);
    this.props.history.push(`/invite`);
  }

  render () {
    return (
      <div className="center shape">
          <h1>Add Friends</h1>
          <form onSubmit={this.handleSubmit}>
            <label>
              Email1:
              <input
                type="text"
                className="input"
                value={this.state.email1}
                name="email1"
                onChange={this.handleChange}
              />
            </label>
            <label>
              Email2:
              <input
                type="text"
                className="input"
                value={this.state.email2}
                name="email2"
                onChange={this.handleChange}
              />
            </label>
            <label>
              Email3:
              <input
                type="text"
                className="input"
                value={this.state.email3}
                name="email3"
                onChange={this.handleChange}
              />
            </label>
            <label>
              Email4:
              <input
                type="text"
                className="input"
                value={this.state.email4}
                name="email4"
                onChange={this.handleChange}
              />
            </label>
            <p>{this.state.message}</p>
            <div style={{padding: '5px'}}>
              <input className="button normal" type="submit" value="Submit" />
            </div>
          </form>
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    handleEmails (e) {
      const email1 = e.target.email1.value;
      const email2 = e.target.email2.value;
      const email3 = e.target.email3.value;
      const email4 = e.target.email4.value;
      let emails = [email1, email2, email3, email4];
      dispatch (setEmailsThunk (emails));
    },
  };
};

export default connect (null, mapDispatch) (Emails);
