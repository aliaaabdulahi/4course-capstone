import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { upcomingEventsThunk } from "../store/events";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import SingleEvent from "./SingleEvent";
import SingleEvent from "./SingleEvent";

class UpcomingEvents extends React.Component {
  constructor(props) {
    super(props);
  }

  formatDate(timestamp) {
    const date = new Date(timestamp);
    return (
      date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear()
    );
  }
  formatTime(timestamp) {
    const date = new Date(timestamp);
    date.setHours(date.getHours());
    return (
      ("0" + date.getHours()).slice(-2) +
      ":" +
      ("0" + date.getMinutes()).slice(-2) +
      ":" +
      ("0" + date.getSeconds()).slice(-2)
    );
  }

  render() {
    return (
      <div className="center shape">
        <div style={{ padding: 20 }}>
          <h2 className="font">Upcoming Events</h2>
          <Grid container justify="center">
            {this.props.events !== undefined && this.props.events.length > 0
              ? this.props.events.map((event) => (
                  <Grid item md style={{ margin: 10 }}>
                    <Paper
                      style={{ padding: 5, maxWidth: 500, maxHeight: 500 }}
                    >
                      <Link to={`/events/${event.id}`}>
                        <Typography>{event.name}</Typography>
                        <img
                          style={{ width: "300px" }}
                          src={JSON.parse(event.restaurants[0]).yelpImageUrl}
                        ></img>
                        <Typography>
                          Date: {this.formatDate(event.date)}
                        </Typography>
                        <Typography>
                          Time: {this.formatTime(event.date)}
                        </Typography>
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
const mapState = (state) => {
  return {
    id: state.auth.id,
    events: state.events.events,
  };
};

export default connect(mapState, { upcomingEventsThunk })(UpcomingEvents);
