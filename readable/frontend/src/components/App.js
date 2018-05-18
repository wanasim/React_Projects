import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';

import {getPosts, thunkAddPost} from '../actions'
import logo from '../new-logo.png';
import '../App.css';
import NewPost from './NewPost.js'
// import {getPosts, getCategories} from '../utils/readableAPI.js'

 class App extends Component {
   state = {
   }

   componentDidMount = () => {
     this.props.receivePosts()

   }

   render() {
     const {createPost, allPosts}= this.props
     // console.log("PROPS", this.props)

     //NOTE BELOW: {Link} from react router dom does not play with React-Redux for some reason. Hence using a tag. 
     return (
      <div className="App">

          <Route exact path='/' render={()=>(
            <div>
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Project Readable</h1>
              </header>


              <p className="App-intro">
                All Posts
                {allPosts.map((post)=>(
                  <li key={post.id}>{post.id}</li>
                ))}
              </p>

              <a href='/addPost' value='LINK'>Create Post</a>

            </div>
          )}/>

        <Route path='/addPost' render={({history})=>(
            <NewPost createPost={(post)=>{
              createPost(post)
              history.push('/')
            }}/>
        )}/>
      </div>
    );
  }
}


function mapStateToProps({posts}){
  return {
    allPosts: posts.all_posts,
  }
}

function mapDispatchToProps(dispatch){
  return {
    createPost: (post) => dispatch(thunkAddPost(post)),
    receivePosts: () => dispatch(getPosts())

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
