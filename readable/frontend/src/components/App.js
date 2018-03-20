import React, { Component } from 'react';
import {connect} from 'react-redux';
// import {Route} from 'react-router-dom';
import {addPost, thunkAddPost} from '../actions'
import logo from '../new-logo.png';
import '../App.css';
import {getPosts, getCategories} from '../utils/readableAPI.js'

 class App extends Component {
   state = {
   }

   componentDidMount = () => {
      getPosts()
      getCategories()
      console.log(process.env)
   }

   handleSubmit = (event) => {
     event.preventDefault()
     this.props.createPost()
     console.log("just submitted something")
   }



   render() {
     const {createPost}= this.props

     return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <form onSubmit={this.handleSubmit} className="create-contact-form">
               <div className="create-contact-details">
                  <input type="text" name="name" placeholder="Name"/>
                  <input type="text" name="email" placeholder="Email"/>
                  <button> Add Contact </button>
               </div>
            </form>
      </div>
    );
  }
}


// function mapStateToProps({data}){
//   return {}
// }

function mapDispatchToProps(dispatch){
  return {
    createPost: () => dispatch(thunkAddPost())

  }
}

export default connect(null, mapDispatchToProps)(App)
