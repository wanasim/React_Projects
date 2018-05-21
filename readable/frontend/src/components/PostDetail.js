import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {getDetPost, getComments} from '../actions'

class PostDetail extends Component {
  state = {
  }

  componentDidMount = () => {
    this.props.getDetPost(this.props.match.params.id)
    this.props.getComments(this.props.match.params.id)
  }

  render(){
    const {post, comments} = this.props

    return (
      <div>
        <h3>Post</h3>
        {post.title}
        <br/>
        <h3>Comments</h3>
        {comments.length === 0 ? 'No Comments here!' :comments.map((comment)=>(
          <li key={comment.id}>{comment.body}</li>
        ))}
      </div>
    )
  }
}

function mapStateToProps({posts, comments}){
  console.log("posts", posts)
  return {
    post: posts.detail_post,
    comments: comments.all_comments
  }
}

function mapDispatchToProps(dispatch){
  return {
    getDetPost: (id) => dispatch(getDetPost(id)),
    getComments: (id) => dispatch(getComments(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail))
