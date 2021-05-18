import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

export const PastEvents = props => {
  const pastEvents = [
    {
      name: 'Event1',
      datetime: '2021-06-01:12:00:00PM',
      assignedRestaurant: 'Five Guys',
      assignedCourse: 'Main',
    },
    {
      name: 'Event2',
      datetime: '2021-06-02:12:00:00PM',
      assignedRestaurant: "Amanda's",
      assignedCourse: 'Desserts',
    },
    {
      name: 'Event3',
      datetime: '2021-06-15:12:00:00PM',
      assignedRestaurant: 'Pizza Hut',
      assignedCourse: 'Appetizers',
    },
  ];

  return (
    <div className="center shape">
      <h2>Past Events</h2>
      <div>
        {pastEvents.map (event => (
          <Link to="/:eventid">
            <p>{event.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default connect (null) (PastEvents);

