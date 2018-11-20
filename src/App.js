import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
// App
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      categories: []
    }
  }
  componentDidMount () {
    axios.get('https://cors-anywhere.herokuapp.com/https://beatsapi.media.jio.com/v2_1/beats-api/jio/src/response/home/english')
      .then(res => res)
      .then(response => {
        console.log('The response is ', response)
        let categories = response.data
        this.setState({
          categories
        })
        console.log('The categories are ', this.state.categories.result.data)
      })
  }
  render () {
    return (
      <div className='App'>
        <h1>Hello there</h1>
      </div>
    )
  }
}

export default App
