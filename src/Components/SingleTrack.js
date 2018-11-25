import React, { Component } from 'react'
import FilePlayer from 'react-player/lib/players/FilePlayer'
import axios from 'axios'

// App
class singleTrack extends Component {
  constructor (props) {
    super(props)
    this.state = {
      playing: false,
      trackId: this.props.location.state,
      songDetails: null
    }
    this.findAlbumAndTrackId = this.findAlbumAndTrackId.bind(this)
  }
  componentDidMount () {
    axios.get('https://cors-anywhere.herokuapp.com/http://beatsapi.media.jio.com/v2_1/beats-api/jio/src/response/songdetails/' + this.state.trackId)
      .then(response => {
        let songDetails = response.data.result.data
        this.setState({
          songDetails
        })
      })
  }
  findAlbumAndTrackId (id) {
    let first = id.indexOf('_')
    let album = id.slice(0, first)
    let second = id.split('_', 2).join('_').length
    let track = id.slice(first + 1, second)
    console.log('The album and track are ', album, track)
    return [album, track]
  }
  render () {
    console.log(this.state.songDetails)
    const { songDetails } = this.state
    console.log('The song details are ', songDetails)
    let [album, track] = this.findAlbumAndTrackId(this.state.trackId)
    let {trackId} = this.state
    console.log('Album and track ', album, track)
    const songdetail = songDetails ? (
      <div className='contain'>
        <div className='card'>
          <div className='card-image waves-effect waves-block waves-light'>
            <img className='activator' src={'http://jioimages.cdn.jio.com/hdindiamusic/images/' + songDetails.imageurl} alt='Album art' />
          </div>
          <div className='card-content'>
            <span className='card-title activator grey-text text-darken-4'>{songDetails.songtitle}</span>
            <FilePlayer
              url={'https://cors-anywhere.herokuapp.com/http://jiobeats.cdn.jio.com/mod/_definst_/mp4:hdindiamusic/audiofiles/' + album + '/' + track + '/' + trackId + '_320.mp4/playlist.m3u8'}
              controls
              height='60px'
              width='100%'
              config={{
                file: {
                  forceAudio: true
                }
              }}
              playing
            />
          </div>
          <div className='card-reveal'>
            <span className='card-title grey-text text-darken-4'>Card Title<i className='material-icons right'>close</i></span>
            <p>Here is some more information about this product that is only revealed once clicked on.</p>
          </div>
        </div>
      </div>
    ) : (
      <div className='className container'>
        <div className='preloader-wrapper big active'>
          <div className='spinner-layer spinner-green'>
            <div className='circle-clipper left'>
              <div className='circle' />
            </div>
            <div className='gap-patch'>
              <div className='circle' />
            </div>
            <div className='circle-clipper right'>
              <div className='circle' />
            </div>
          </div>
        </div>
      </div>
    )
    return (
      <div className='className container'>
        {songdetail}
      </div>
    )
  }
}

export default singleTrack
