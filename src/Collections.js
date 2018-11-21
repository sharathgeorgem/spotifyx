import React, { Component } from 'react'
import axios from 'axios'
import './Collections.css'
import shortid from 'shortid'
import Card from './card'

const arrayToObject = (array) => {
  const accumulator = {
    Dynamic: [],
    songs: [],
    playlist: [],
    albums: [],
    language: []
  }
  return array.reduce((obj, item) => {
    item._id = shortid.generate()
    obj[item.type].push((<div className={item.type} key={item._id}>
      <li>{item.name}</li>
    </div>))
    return obj
  }, accumulator)
}
// Collections
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
    const collectionObject = arrayToObject(this.state.songCollections)
    console.log('The collection object is ', collectionObject)
    return (
      <div className='App'>
        <h3>Top hits</h3>
        <ul className='list'>
          <Card details={collectionObject.songs} />
        </ul>

        <h3>Dynamic</h3>
        <ul className='list'>
          <Card details={collectionObject.Dynamic} />
        </ul>

        <h3>Playlists</h3>
        <ul className='list'>
          {collectionObject.playlist}
        </ul>

        <h3>Albums</h3>
        <ul className='list'>
          {collectionObject.albums}
        </ul>

        <h3>Other languages</h3>
        <ul className='list'>
          {collectionObject.language}
        </ul>

      </div>
    )
  }
}

export default Collections
