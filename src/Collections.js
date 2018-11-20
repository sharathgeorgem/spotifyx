import React, { Component } from 'react'
import axios from 'axios'
import './Collections.css'
import shortid from 'shortid'
// App
class Collections extends Component {
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
    let dynamic = this.state.songCollections.map(collection => {
      collection._id = shortid.generate()
      return collection.type === 'Dynamic'
        ? (<div className='dynamic' key={collection._id}>
          <li>{collection.name}</li>
        </div>)
        : (null)
    })
    let topHits = this.state.songCollections.map(collection => {
      collection._id = shortid.generate()
      return collection.type === 'songs'
        ? (<div className='topHits' key={collection._id}>
          <li>{collection.name}</li>
        </div>)
        : (null)
    })
    let playlist = this.state.songCollections.map(collection => {
      collection._id = shortid.generate()
      return collection.type === 'playlist'
        ? (<div className='playlist' key={collection._id}>
          <li>{collection.name}</li>
        </div>)
        : (null)
    })
    let albums = this.state.songCollections.map(collection => {
      collection._id = shortid.generate()
      return collection.type === 'albums'
        ? (<div className='albums' key={collection._id}>
          <li>{collection.name}</li>
        </div>)
        : (null)
    })
    let language = this.state.songCollections.map(collection => {
      collection._id = shortid.generate()
      return collection.type === 'language'
        ? (<div className='language' key={collection._id}>
          <li>{collection.name}</li>
        </div>)
        : (null)
    })
    return (
      <div className='App'>
        <h3>Dynamic</h3>
        <ul>
          {dynamic}
        </ul>

        <h3>Top hits</h3>
        <ul>
          {topHits}
        </ul>

        <h3>Playlists</h3>
        <ul>
          {playlist}
        </ul>

        <h3>Albums</h3>
        <ul>
          {albums}
        </ul>

        <h3>Other languages</h3>
        <ul>
          {language}
        </ul>

      </div>
    )
  }
}

export default Collections
