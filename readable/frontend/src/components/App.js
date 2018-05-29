import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route, withRouter, Link} from 'react-router-dom';
//Need withRouter so Link tag works with redux.
import Modal from 'react-modal'
import {getPosts, getCategories, thunkAddPost} from '../actions'
import logo from '../new-logo.png';
import '../App.css';
import NewPost from './NewPost.js'
import CategoryPosts from './CategoryPosts'
import PostDetail from './PostDetail'
import Select from 'react-select'
// import {getPosts, getCategories} from '../utils/readableAPI.js'

 class App extends Component {
   state = {
     postModalOpen:false,
     sortOption: "votescore"
   }

   componentDidMount = () => {
     this.props.receivePosts()
     this.props.receiveCategories()

   }



   openPostModal = () => this.setState({postModalOpen:true})
   closePostModal = () =>this.setState({postModalOpen:false})
   renderCategory = () => console.log("CLICKED")

   handleSort = (e) => {
     this.setState({sortOption:e.target.value})
   }

   render() {
     const {createPost, allPosts, allCategories, receiveCatPosts}= this.props
     const {sortOption} = this.state

     console.log("state posts", this.state)

     //NOTE BELOW: {Link} from react router dom does not play with React-Redux for some reason. Hence using a tag.
     return (
      <div className="App">

          <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Project Readable</h1>
          </header>
          <Route exact path='/' render={()=>(
            <div>

              <div className="App-intro">
              <select defaultValue={sortOption} onChange={this.handleSort}>
                <option value="timestamp">timestamp</option>
                <option value="votescore">votescore</option>
              </select>
              <br/>
              <h3>Categories</h3>
                {allCategories.map((cat)=>[
                  <li key={allCategories.indexOf(cat)}>
                    <Link className="link" to={{
                      pathname: `/${cat.name}`,
                    }}>
                    {cat.name}</Link>
                  </li>,

                ])}

              <br/>

              <h3>Posts</h3>
                {this.state.sortOption === 'votescore' ? (
                  allPosts.sort((post1,post2) => post1.voteScore - post2.voteScore)
                  .map((post)=>(
                    <li key={post.id}>
                      <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
                    </li>
                  ))
                ) : (
                  allPosts.sort((post1,post2) => post1.timestamp - post2.timestamp)
                  .map((post)=>(
                    <li key={post.id}>
                    <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
                    </li>
                  ))

                )}
              </div>

              <br/>

              <button onClick={this.openPostModal}>Create Post</button>
            </div>
          )} />


          <Modal
            className='modal'
            overlayClassName='overlay'
            isOpen={this.state.postModalOpen}
            onRequestClose={this.closePostModal}
            contentLabel='Modal'
            ariaHideApp={false}
          >
            <NewPost createPost={createPost} closePostModal={this.closePostModal}/>
          </Modal>

          <Route exact path='/:category' component={CategoryPosts} />
          <Route path='/:category/:id' component={PostDetail}/>

      </div>
    );
  }
}


function mapStateToProps({posts, categories}){
  return {
    allPosts: posts.all_posts,
    allCategories: categories.all_categories

  }
}

function mapDispatchToProps(dispatch){
  return {
    createPost: (post) => dispatch(thunkAddPost(post)),
    receivePosts: () => dispatch(getPosts()),
    receiveCategories: () => dispatch(getCategories()),

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
