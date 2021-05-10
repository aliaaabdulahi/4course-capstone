import React from 'react';
import mapboxgl from '!mapbox-gl';
import {mapBoxKey} from '../../secret.js';

mapboxgl.accessToken = mapBoxKey;

class MapView extends React.PureComponent {
  constructor (props) {
    super (props);
    this.state = {
      // lng: -73.9784895,
      // lat: 40.7850574,
      zoom: 15,
    };
    console.log (
      'this.props in MapView constructor--->',
      this.props
    );
    this.mapContainer = React.createRef ();
    this.loadMap = this.loadMap.bind (this);
  }

  loadMap () {
    const {zoom} = this.state;
    const {lng, lat} = this.props;
    const map = new mapboxgl.Map ({
      container: this.mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });
    map.on ('load', () => {
      let resList = this.props.restaurants.map (marker => {
        let mark = new mapboxgl.Marker ({
          color: '#FFFFFF',
          draggable: true,
        })
          .setLngLat ([
            marker.coordinates.longitude,
            marker.coordinates.latitude,
          ])
          .addTo (map);
      });
    });
    map.on ('move', () => {
      this.setState ({
        lng: map.getCenter ().lng.toFixed (4),
        lat: map.getCenter ().lat.toFixed (4),
        zoom: map.getZoom ().toFixed (2),
      });
    });
  }

  // componentDidMount () {
  //   console.log (
  //     'this.props in MapView componentDidMount--->',
  //     this.props
  //   );
  //   this.loadMap();
  // }

  componentDidUpdate() {
    this.loadMap();
  }

  render () {
    console.log ('this.props in render--->', this.props.restaurants.length);
    return (
      <div>
        <div ref={this.mapContainer} className="map-container" />
      </div>
    );
  }
}

export default MapView;
