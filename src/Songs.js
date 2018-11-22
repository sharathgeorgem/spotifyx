import React, { Component } from 'react'

class Songs extends Component {
  render () {
    console.log('The props are ', this.props.location.state)
    return (
      <div>
        <h1>Songs Component</h1>
      </div>
    )
  }
}

export default Songs
