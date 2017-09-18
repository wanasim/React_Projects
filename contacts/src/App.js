import React, { Component } from 'react'
import ListContacts from './ListContacts'


// here we are passing the ListContacts Component a prop (aka argument) with contacts array
class App extends Component {
   state = {
      contacts: [
        {
          "id": "ryan",
          "name": "Ryan Florence",
          "email": "ryan@reacttraining.com",
          "avatarURL": "http://localhost:5001/ryan.jpg"
        },
        {
          "id": "michael",
          "name": "Michael Jackson",
          "email": "michael@reacttraining.com",
          "avatarURL": "http://localhost:5001/michael.jpg"
        },
        {
          "id": "tyler",
          "name": "Tyler McGinnis",
          "email": "tyler@reacttraining.com",
          "avatarURL": "http://localhost:5001/tyler.jpg"
        }
      ]
   }

  render() {
    return (
      <div>
        <ListContacts contacts={this.state.contacts}/>
      </div>
    )
  }
}

// exporting App.js file so other files can import
export default App;
