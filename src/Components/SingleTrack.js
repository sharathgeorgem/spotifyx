import React, { Component } from 'react'
import ReactHLS from 'react-hls'
import data from '../tracks.json'

// App
class singleTrack extends Component {
  constructor (props) {
    super(props)
    this.state = {
      playing: false,
      currentTrackIndex: 0
    }
    this.handleClick = this.handleClick.bind(this)
    this.playAudio = this.playAudio.bind(this)
    this.pauseAudio = this.pauseAudio.bind(this)
    this.selectTrackNumber = this.selectTrackNumber.bind(this)
  }
  playAudio () {
    this.audioElement.load()
    this.audioElement.play()
  }
  pauseAudio () {
    this.audioElement.pause()
  }
  selectTrackNumber (trackId) {
    this.setState({ currentTrackIndex: trackId, playing: true }, this.playAudio)
  }
  handleClick (e) {
    switch (e.target.id) {
      case 'play':
        this.setState((state, props) => {
          let currentTrackIndex = state.currentTrackIndex
          if (currentTrackIndex === 0) {
            currentTrackIndex = 1
          }
          return {
            playing: true,
            currentTrackIndex: currentTrackIndex
          }
        }, this.playAudio)
        break
      case 'pause':
        this.setState({ playing: false }, this.pauseAudio)
        break
      case 'prev':
        this.setState((state, props) => {
          let currentIndex = state.currentTrackIndex - 1
          if (currentIndex <= 0) {
            return null
          } else {
            return { playing: true, currentTrackIndex: currentIndex }
          }
        }, this.playAudio)
        break
      case 'next':
        this.setState((state, props) => {
          let currentIndex = state.currentTrackIndex + 1
          if (currentIndex > data.tracks.length) {
            return null
          } else {
            return { playing: true, currentTrackIndex: currentIndex }
          }
        }, this.playAudio)
        break
      default:
        break
    }
  }
  render () {
    return (
      <div className='App'>
        <ReactHLS height='40' width='280' url={'https://cors-anywhere.herokuapp.com/http://jiobeats.cdn.jio.com/mod/_definst_/mp4:hdindiamusic/audiofiles/717/716180/717_716180_1_320.mp4/playlist.m3u8'}
          controls />
        <div
          className='Artwork'
          style={{ backgroundImage: 'https://unsplash.com/photos/PF1l1F1hzoU' }}
        >
          <Controls onClick={this.handleClick} playing={this.state.playing} />
          <audio ref={(audio) => { this.audioElement = audio }} src={'/songs/' + this.state.currentTrackIndex + '.mp3'} />
        </div>
        <TrackList
          currentTrackIndex={this.state.currentTrackIndex}
          selectTrackNumber={this.selectTrackNumber}
        />
      </div>
    )
  }
}

// Controls
class Controls extends Component {
  render () {
    return (
      <div className='Controls'>
        <i
          id='prev'
          className='fa fa-fw fa-fast-backward'
          onClick={this.props.onClick}
        />
        {!this.props.playing &&
          <i
            id='play'
            onClick={this.props.onClick}
            className='fa fa-fw fa-play'
          />}
        {this.props.playing &&
          <i
            id='pause'
            onClick={this.props.onClick}
            className='fa fa-fw fa-pause'
          />}
        <i
          id='next'
          className='fa fa-fw fa-fast-forward'
          onClick={this.props.onClick}
        />
      </div>
    )
  }
}

// TrackList
class TrackList extends Component {
  constructor (props) {
    super(props)
    this.state = {tracks: []}
    this.renderListItem = this.renderListItem.bind(this)
  }
  componentDidUpdate () {
    if (this.activeTrack) {
      let topOfTrackList = this.trackList.scrollTop
      let bottomOfTrackList =
        this.trackList.scrollTop + this.trackList.clientHeight
      let positionOfSelected = this.activeTrack.offsetTop
      if (
        topOfTrackList > positionOfSelected ||
        bottomOfTrackList < positionOfSelected
      ) {
        this.trackList.scrollTop = positionOfSelected
      }
    }
  }
  componentDidMount () {
    // fetch data for a track from JioMusic API
    this.setState({ tracks: data.tracks })
  }

  renderListItem (track, i) {
    let trackClass = this.props.currentTrackIndex === track.id
      ? 'selected'
      : ''
    return (
      <li
        key={track.id}
        className={trackClass}
        ref={cur => {
          if (this.props.currentTrackIndex === track.id) {
            this.activeTrack = cur
          }
        }}
        onClick={() => { this.props.selectTrackNumber(track.id) }}
      >
        <div className='number'>{track.id}</div>
        <div className='title'>{track.title}</div>
        <div className='duration'>{track.duration}</div>
      </li>
    )
  }
  render () {
    let tracks = this.state.tracks.map(this.renderListItem)
    return (
      <ul
        className='TrackList'
        ref={input => {
          this.trackList = input
        }}
      >
        {tracks}
      </ul>
    )
  }
}

export default singleTrack
