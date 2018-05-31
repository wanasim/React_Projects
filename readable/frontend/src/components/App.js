import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route, withRouter, Link} from 'react-router-dom';
//Need withRouter so Link tag works with redux.
import Modal from 'react-modal'
import {getPosts, getCategories, thunkAddPost, votePost, voteComment} from '../actions'
import logo from '../new-logo.png';
import '../App.css';
import NewPost from './NewPost.js'
import CategoryPosts from './CategoryPosts'
import PostDetail from './PostDetail'
import Select from 'react-select'
// import {getPosts, getCategories} from '../utils/readableAPI.js'
import ThumbUpIcon from 'material-ui-icons/ThumbUp';
import ThumbDownIcon from 'material-ui-icons/ThumbDown';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

 class App extends Component {
   state = {
     postModalOpen:false,
     sortOption: "votescore"
   }
  style = {
     card: {
       maxWidth: 100,
     },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    title: {
     marginBottom: 16,
     fontSize: 14,
   }
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

              <Button onClick={this.openPostModal} variant="raised" color="primary">
              Create Post
              </Button>


                {this.state.sortOption === 'votescore' ? (
                  allPosts.sort((post1,post2) => post1.voteScore - post2.voteScore)
                  .map((post)=>(
                    <Card key={post.id}>

                      <CardContent>
                        <Typography gutterBottom variant="headline" component="h3">
                          {post.title}
                        </Typography>
                        <Typography  color="textSecondary">
                          Author: {post.author}  ||  Votescore: {post.voteScore}  ||  TimeStamp: {Date(post.timestamp)}
                        </Typography>
                        <Typography >
                          {post.body}
                        </Typography>
                        <Button size="small" color="primary">
                          <Link to={`/${post.category}/${post.id}`}>View Details</Link>
                        </Button>
                      </CardContent>

                    </Card>
                  ))
                ) : (
                  allPosts.sort((post1,post2) => post1.timestamp - post2.timestamp)
                  .map((post)=>(

                    <Card key={post.id}>

                      <CardContent>
                        <Typography gutterBottom variant="headline" component="h3">
                          {post.title}
                        </Typography>
                        <Typography  color="textSecondary">
                          Author: {post.author}  ||  Votescore: {post.voteScore}  ||  TimeStamp: {post.timestamp}
                        </Typography>
                        <Typography >
                          {post.body}
                        </Typography>
                        <Button size="small" color="primary">
                          <Link to={`/${post.category}/${post.id}`}>View Details</Link>
                        </Button>
                      </CardContent>

                    </Card>

                  ))

                )}
              </div>

              <br/>

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
    votePost: (id,vote) => dispatch(votePost(id, vote)),
    voteComment: (id, vote) => dispatch(voteComment(id, vote))

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
