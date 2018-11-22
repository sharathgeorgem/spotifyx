import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import axios from 'axios'
import Collections from './Collections'
import Albums from './Albums'
import Playlist from './Playlist'
import Songs from './Songs'
import SingleTrack from './SingleTrack'

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
          <BrowserRouter>
            <div className='Collection'>
              <Route exact path='/' render={props => <Collections songCollections={this.state.songCollections} {...props} />} />
              <Route path='/language' render={props => <Collections songCollections={this.state.songCollections} {...props} />} />
              <Route path='/Dynamic' component={Songs} />
              <Route path='/songs' component={Songs} />
              <Route exact path='/singleTrack' component={SingleTrack} />
              <Route path='/albums' component={Albums} />
              <Route path='/playlist' component={Playlist} />
            </div>
          </BrowserRouter>
        }
      </div>
    )
  }
}

export default App
