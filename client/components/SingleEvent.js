import React from "react";
import {connect} from 'react-redux';
import {fetchEvent} from '../store/currentEvent';

class SingleEvent extends React.Component{
    componentDidMount () {
        this.props.fetchEvent (this.props.match.params.eventId);
     }
    //  componentDidUpdate(){
    //   // It simply sets the state to its current value
    //   this.setState({ state: this.state });
    // }
     render(){
          console.log("single", this.props.singleEvent)
          if (!this.props.singleEvent.date) {
            return <h1>Loading...</h1>
          } else {
            return(
              <div className="event">
                      <p>{this.props.singleEvent.date.slice(0,10)}</p>
                        <h2>Restaurants</h2>
                          <div>
                              {this.props.singleEvent.restaurants.map ((restaurant) => (
                                <p key={restaurant}>{JSON.parse (restaurant).yelpName}</p>
                              ))}
                            </div>
  
                        <h2>Invitees</h2>
                        <div>
                              {this.props.singleEvent.invitees.map ((invitee) => (
                                <p key={invitee}>{invitee}</p>
                              ))}
                </div>
              </div>
            )
          }
     }
}

const mapState = state => {
    return {
      id: state.auth.id,
      singleEvent: state.singleEvent
    };
  };
  
  export default connect (mapState, {fetchEvent}) (SingleEvent);
  