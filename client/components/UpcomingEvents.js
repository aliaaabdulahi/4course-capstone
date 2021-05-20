import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import {upcomingEventsThunk} from '../store/events';

class UpcomingEvents extends React.Component {
  constructor (props) {
    super (props);
  }

  async componentDidMount () {
    await this.props.upcomingEventsThunk (this.props.id);
  }

  render () {
    return (
      <div className="center shape">
        <h2 className="font">
          Upcoming Events
        </h2>
        <div className="flex-center">
          {this.props.events !== undefined && this.props.events.length > 0
            ? this.props.events.map (event => (
              <Link key={event.id} to={`/${event.id}`}>
                <div className="event">
                  <p>{event.date}</p>
                  <h2>Restaurants</h2>
                  {event.restaurants !== null
                    ? <div>
                        {event.restaurants.map ((restaurant, i) => (
                          <p key={i}>{JSON.parse (restaurant).yelpName}</p>
                        ))}
                      </div>
                    : null}

                  <h2>Invitees</h2>
                  {event.invitees !== null
                    ? <div>
                        {event.invitees.map ((invitee, i) => (
                          <p key={i}>{invitee}</p>
                        ))}
                      </div>
                    : null}

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

export default connect (mapState, {upcomingEventsThunk}) (UpcomingEvents);
