import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Button } from "@material-ui/core";
import Container from '@material-ui/core/Container';
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
    return (
      <div>
        {this.state.roll === true ? (
          <div>
        <React.Fragment>
      {/* <CssBaseline /> */}
      <Container 
        bgcolor="background.paper"
        p={2}
        position="absolute"
        top={0}
        left="43%"
        zIndex="modal">

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
            <Button 
              position="absolute"
              zIndex="modal"
              className="spin"
              onClick={this.handleclick}>
              Stop
            </Button>
      </Container>
    </React.Fragment>
          </div>
        ) : (
          <div>
       <List width='10%' aria-label="assigned courses">
       {Object.keys(this.props.courses).map((keyName) => (
         <div>
          <ListItem button>
          <ListItemText primary={`${keyName}:  ${this.props.courses[keyName].restaurant} -  ${this.props.courses[keyName].course}`} />          
          </ListItem>
          <Divider />
           </div>
          )
          )}
      </List>
      <Link to="/invite">
              <Button
              className="spin"
              >Next</Button>
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
