import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {pastEventsThunk} from '../store/events';

class PastEvents extends React.Component {
  constructor (props) {
    super (props);
  }

  componentDidMount () {
    this.props.pastEventsThunk (this.props.id);
  }

  render () {
    return (
      <div className="center shape">
        <h2 className="font">
          Past Events
        </h2>
        <div className="flex-center">
          {this.props.events !== undefined && this.props.events.length > 0
            ? this.props.events.map (event => (
              <div>
                <Link to={`/events/${event.id}`}>
                <button>Event</button>
                </Link>
                </div>
              ))
            : null}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    id: state.auth.id,
    events: state.events.events,
  };
};

export default connect (mapState, {pastEventsThunk}) (PastEvents);
