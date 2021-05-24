import React from "react";
import {connect} from 'react-redux';
import {fetchEvent} from '../store/currentEvent';
import {getAssignmentsThunk} from '../store/courses'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

class SingleEvent extends React.Component{
    componentDidMount () {
        this.props.fetchTheEvent(this.props.match.params.eventId);
        this.props.getAssignments(this.props.match.params.eventId)
     }

  formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.getMonth()+1 + "-" + (date.getDate()+1) + "-" + date.getFullYear();
  }
  
     render(){
       console.log(this.props.courses)
          if (!this.props.singleEvent.date) {
            return <h1>Loading...</h1>
          } else {
            return(
              <div className="center shape">
                <Grid container justify="center">
                  <Link to="/">
                  <Button>back</Button>
                  </Link>
                <Paper style={{ padding: 70 }} >
                <Typography>Event Name: {this.props.singleEvent.name}</Typography>
                  <Typography>Date: {this.formatDate(this.props.singleEvent.date)}</Typography>
                        <h2>Restaurants</h2>   
                              {this.props.singleEvent.restaurants.map ((restaurant) => (
                               <Grid item md style={{ margin: 10 }} >
                                <Typography key={restaurant.id}>{JSON.parse (restaurant).yelpName}</Typography>
                                </Grid>
                              ))}     
                        <h2>Invitees</h2>
                                { this.props.courses.length > 0 ? (
                              this.props.courses.map ((course) => (
                                <div>
                                  <Grid key={course.id} item md style={{ margin: 10 }} >
                                  <Typography > 
                                    User Name: {
                                      course.user.username
                                    }  

                                  </Typography>
                                  <Typography> 
                                  Email: {
                                      course.user.email
                                    } 
                                    </Typography>
                                </Grid>
                                  </div>
                              ))
                                ): null}
                        <h2>Assigned Courses</h2>
                        { this.props.courses.length > 0 ? (
                              this.props.courses.map ((course) => (
                                <Grid item md style={{ margin: 10 }} >
                                  <Typography key={course.id}> 
                                    {course.user.username.toUpperCase()} is getting {course.courseType} at {course.restaurant}
                                  </Typography>
                                </Grid>
                              ))
                                ): null}
                  </Paper>                
                </Grid>
                </div>
            )
          }
     }
}

const mapState = state => {
    return {
      id: state.auth.id,
      singleEvent: state.singleEvent,
      courses: state.courses
    };
  };

  const mapDispatch = (dispatch) => {
    return {
      getAssignments: (eventId) => dispatch(getAssignmentsThunk(eventId)),
      fetchTheEvent: (eventId) => dispatch(fetchEvent(eventId)),
    };
  };
  
  
  export default connect (mapState, mapDispatch) (SingleEvent);
  