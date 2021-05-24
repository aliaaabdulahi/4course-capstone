import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {pastEventsThunk} from '../store/events';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class PastEvents extends React.Component {
  constructor (props) {
    super (props);
  }

  componentDidMount () {
    this.props.pastEventsThunk (this.props.id);
  }

  formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.getMonth()+1 + "-" + (date.getDate()) + "-" + date.getFullYear();
  }

  formatTime(timestamp) {
    const date = new Date(timestamp);
    return ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2) + ":" + ('0' + date.getSeconds()).slice(-2);
  }

  render () {
    return (
      <div className="center shape">
        <div style={{ padding: 20 }}>
        <h2 className="font">Past Events</h2>
        <Grid container justify="center">
          {this.props.events !== undefined && this.props.events.length > 0
            ? this.props.events.map (event => (
              <Grid item md style={{ margin: 10 }} >
                 <Paper style={{ padding: 5, }} >
                <Link to={`/events/${event.id}`}>
                <Typography>{event.name}</Typography>
                  <img style={{width: '300px', height: "300px"}} src={JSON.parse(event.restaurants[0]).yelpImageUrl}></img>
                  <Typography>{this.formatDate(event.date)}</Typography>
                  <Typography>{this.formatTime(event.date)}</Typography>
                </Link>
                </Paper>
                </Grid>
              ))
            : null}
        </Grid>
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
