import React from "react";

/**
 * COMPONENT
 */
class Wheel extends React.Component {
  constructor(){
    super();
    this.state = {
      roll: false
    }
    this.handleclick = this.handleclick.bind(this)
  }
  handleclick(){
    this.setState({
      roll: !this.state.roll
    })
  }
  render(){
    console.log(this.state.roll)
    return (
      <div>
      <section>
        {this.state.roll ? (        
          <ul className="circel1roll">
            <li>
              <p>Dinner</p>
              </li>
            <li></li>
            <li></li>
            <li></li>
          </ul>):(
            <ul className="circel1">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>)
        }
        {this.state.roll ? (
        <ul className="circel2roll">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>          
        ) : (
          <ul className="circel2">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>)   
        }
      </section>
      <button onClick={this.handleclick}>
        Start
      </button>
    </div>
    )
  }
}

export default Wheel;
