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

  formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.getMonth()+1 + "-" + (date.getDate()+1) + "-" + date.getFullYear();
  }

  formatTime(timestamp) {
    const date = new Date(timestamp);
    return ('0' + date.getUTCHours()).slice(-2) + ":" + ('0' + date.getUTCMinutes()).slice(-2) + ":" + ('0' + date.getSeconds()).slice(-2);
  }

  render () {
    console.log(this.props.events)
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
                <div className="event">
                  <p>{event.name}</p>
                  <img style={{width: '100px'}} src={JSON.parse(event.restaurants[0]).yelpImageUrl}></img>
                  <p>{this.formatDate(event.date)}</p>
                  <p>{this.formatTime(event.date)}</p>
                </div>
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
