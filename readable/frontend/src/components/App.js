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
// import {getPosts, getCategories} from '../utils/readableAPI.js'

 class App extends Component {
   state = {
     postModalOpen:false
   }

   componentDidMount = () => {
     this.props.receivePosts()
     this.props.receiveCategories()

   }

   openPostModal = () => this.setState({postModalOpen:true})
   closePostModal = () =>this.setState({postModalOpen:false})
   renderCategory = () => console.log("CLICKED")

   render() {
     const {createPost, allPosts, allCategories, receiveCatPosts}= this.props

     // console.log("PROPS", this.props)

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
              <h3>Categories</h3>
                {allCategories.map((cat)=>[
                  <li key={allCategories.indexOf(cat)}>
                    <Link className="link" to={{
                      pathname: `/${cat.name}/post`,
                    }}>
                    {cat.name}</Link>
                  </li>,

                ])}

              <br/>

              <h3>Posts</h3>
                {allPosts.map((post)=>(
                  <li key={post.id}>
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                  </li>
                ))}
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
            <NewPost createPost={createPost}/>
          </Modal>

          <Route path='/:category/post' component={CategoryPosts} />
          <Route path='/posts/:id' component={PostDetail}/>

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
