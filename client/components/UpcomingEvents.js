import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import {upcomingEventsThunk} from '../store/events';
import SingleEvent from './SingleEvent'

class UpcomingEvents extends React.Component {
  constructor (props) {
    super (props);
  }

   componentDidMount () {
     this.props.upcomingEventsThunk (this.props.id);
  }

  render () {
    console.log(this.props.events)
    return (
      <div className="center shape">
        <h2 className="font">
          Upcoming Events
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

export default connect (mapState, {upcomingEventsThunk}) (UpcomingEvents);
