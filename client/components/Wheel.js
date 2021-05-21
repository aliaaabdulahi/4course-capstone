import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
/**
 * COMPONENT
 */
class Wheel extends React.Component {
  constructor() {
    super();
    this.state = {
      roll: true,
    };
    this.handleclick = this.handleclick.bind(this);
  }
  handleclick() {
    this.setState({
      roll: !this.state.roll,
    });
  }
  render() {
    console.log(this.state.roll);

    return (
      <div>
        {this.state.roll === true ? (
          <div>
            <h1>1.. 2.. 3..</h1>
            <ul className="circel1">
              <li>
                <div className="text" contentEditable="true" spellCheck="false">
                  drinks
                </div>
              </li>
              <li>
                <div className="text" contentEditable="true" spellCheck="false">
                  appetizer
                </div>
              </li>
              <li>
                <div className="text" contentEditable="true" spellCheck="false">
                  entree
                </div>
              </li>
              <li>
                <div className="text" contentEditable="true" spellCheck="false">
                  dessert
                </div>
              </li>
            </ul>
            <button className="spin" onClick={this.handleclick}>
              Stop
            </button>
          </div>
        ) : (
          <div>
            <p>Your assigned course is ...</p>
            <p>
              {Object.keys(this.props.courses).map((keyName, keyIndex) => (
                <p>
                  {keyName}: {this.props.courses[keyName].restaurant} -
                  {this.props.courses[keyName].course}
                </p>
              ))}
            </p>
            <Link to="/invite">
              <button>Next</button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    courses: state.courses,
  };
};
export default connect(mapState)(Wheel);
