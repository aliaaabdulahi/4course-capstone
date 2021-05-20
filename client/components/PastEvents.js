import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {pastEventsThunk} from '../store/events';

class PastEvents extends React.Component {
  constructor (props) {
    super (props);
  }

  async componentDidMount () {
    await this.props.pastEventsThunk (this.props.id);
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
              <Link key={event.id} to={`/${event.id}`}>
                <div className="event">
                  <p>{event.date}</p>
                  <h2>Restaurants</h2>
                  <div>
                    {event.restaurants.map (
                      (restaurant, i) => <p key={i}>{JSON.parse (restaurant).yelpName}</p>
                    )}
                  </div>
                  <h2>Invitees</h2>
                  <div>
                    {event.invitees.map ((invitee, i) => <p key={i}>{invitee}</p>)}
                  </div>
                </div>
                </Link>
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
