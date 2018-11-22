import React, { Component } from 'react'
// import { BrowserRouter as Router, Link } from 'react-router-dom'
import axios from 'axios'
import Collections from './Collections'

// App
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      songCollections: []
    }
  }
  componentDidMount () {
    axios.get('https://cors-anywhere.herokuapp.com/https://beatsapi.media.jio.com/v2_1/beats-api/jio/src/response/home/english')
      .then(response => {
        let songCollections = response.data.result.data
        this.setState({
          songCollections
        })
        console.log(songCollections)
      })
  }
  render () {
    return (
      <div>
        {!this.state.songCollections && <h1>Not yet</h1>}
        {this.state.songCollections &&
          <div className='Collection'>
            <Collections songCollections={this.state.songCollections} />
          </div>
        }
      </div>
    )
  }
}

export default App
