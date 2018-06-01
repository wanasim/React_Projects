import React, {Component} from 'react'
import {withRouter, Route, Link} from 'react-router-dom'
import Modal from 'react-modal'
import {connect} from 'react-redux'
import serializeForm from 'form-serialize'
import {getDetPost, getComments, deletePost, editPost, submitComment, delComment, editComment, votePost, voteComment} from '../actions'
import '../App.css'
import Button from '@material-ui/core/Button'
import ThumbUpIcon from 'material-ui-icons/ThumbUp';
import ThumbDownIcon from 'material-ui-icons/ThumbDown';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


class PostDetail extends Component {
  state = {
    openEdit: false,
    openAddComment:false,
    openEditComment:false,
    commentId: null,
    commentBody: null,
    formInput: {}
  }

  componentDidMount = () => {
    this.props.getDetPost(this.props.match.params.id)
    this.props.getComments(this.props.match.params.id)
  }

  openEditModal = () => this.setState({openEdit:true})
  closeEditModal = () =>this.setState({openEdit:false})

  openCommentModal = () => this.setState({openAddComment:true})
  closeCommentModal = () => this.setState({openAddComment:false})

  openEdCommentModal = (commentId, commentBody) => {

    this.setState({commentId, commentBody, openEditComment:true})
    // this.setState({openEditComment:true})

  }
  closedEdCommentModal = () => this.setState({openEditComment:false})

  confirmComment = (e) => {
    e.preventDefault()
    const formInput = serializeForm(e.target, {hash:true})
    formInput.parentId = this.props.match.params.id
    formInput.timestamp = Date.now()

    this.setState({formInput}, ()=>{
      this.props.submitComment(formInput)
      this.closeCommentModal()

    })
  }

  confirmDelete = (history) => {
    this.props.deletePost(this.props.match.params.id)
    history.push('/')
  }

  confirmEditComment = (e) => {
    e.preventDefault()
    const formInput = serializeForm(e.target, {hash:true})
    formInput.timestamp = Date.now()
    formInput.id = this.state.commentId
    this.setState({formInput}, ()=>{
      this.props.edComment(this.state.commentId, this.state.formInput)

    })
    this.closedEdCommentModal()
  }

  confirmCommentDelete = (id) => {
    this.props.deleteComment(id)
  }
  confirmEdit = (e) => {
    e.preventDefault()
    const formInput = serializeForm(e.target, {hash:true})

    this.setState({formInput},()=>{
      this.props.editPost(this.props.match.params.id, this.state.formInput)

    })
    this.closeEditModal()
  }

  render(){
    const {post, comments, votePost, voteComment} = this.props
    return (
      <div>
        {!post.id
        ?
        <div>
          <h3>404 page not found</h3>
          <p>We are sorry but the page you are looking for does not exist.</p>
        </div>
        :
        <div>
          <Link to="/">Home</Link>

          <h3>Post</h3>
          <Card key={post.id}>

            <CardContent>
              <Typography gutterBottom variant="headline" component="h3">
                {post.title}
              </Typography>
              <Typography  color="textSecondary">
                Author: {post.author}  ||  TimeStamp: {Date(post.timestamp)}
              </Typography>
              <Typography  color="textSecondary">
                Number of Comments: {post.commentCount}  ||  Votescore: {post.voteScore}
              </Typography>
              <Typography >
                {post.body}
              </Typography>
              <Button size="small" color="primary">
                <ThumbUpIcon onClick={()=>votePost(post.id, {option:"upVote"})} className="thumb_up">lll</ThumbUpIcon>
              </Button>
              <Button size="small" color="primary">
                <ThumbDownIcon onClick={()=>votePost(post.id, {option:"downVote"})} className="thumb_down">lll</ThumbDownIcon>
              </Button>
              <Route render={({history})=>(
                <Button onClick={()=>{
                  this.confirmDelete(history)
                }}>Delete</Button>
              )}>
              </Route>
              <Button onClick={this.openEditModal}>Edit</Button>
            </CardContent>

          </Card>




          <br/>
          <h3>Comments</h3>
          <button onClick={this.openCommentModal}>Add Comment</button>
          {comments.length === 0 ? 'No Comments here!' :comments.map((comment)=>(
          <Card key={comment.id}>
            <CardContent>
              <Typography  color="textSecondary">
                Author: {comment.author}  ||  TimeStamp: {Date(comment.timestamp)}
              </Typography>
              <Typography  color="textSecondary">
                Votescore: {comment.voteScore}
              </Typography>
              <Typography >
                {comment.body}
              </Typography>
              <Button size="small" color="primary">
                <ThumbUpIcon onClick={()=>voteComment(comment.id, {option:"upVote"})} className="thumb_up">lll</ThumbUpIcon>
              </Button>
              <Button size="small" color="primary">
                <ThumbDownIcon onClick={()=>voteComment(comment.id, {option:"downVote"})} className="thumb_down">lll</ThumbDownIcon>
              </Button>
              <Button onClick={()=>{
                this.confirmCommentDelete(comment.id)
              }}>Delete</Button>

              <Button onClick={()=>{
                this.openEdCommentModal(comment.id, comment.body)
              }}>Edit</Button>

            </CardContent>
          </Card>


          ))}
        </div>
        }


        <Modal
        className='modal'
        overlayClassName='overlay'
        isOpen={this.state.openEdit}
        onRequestClose={this.closeEditModal}
        contentLabel='Modal'
        ariaHideApp={false}>
          <form onSubmit={this.confirmEdit} className="create-form">
            <div className="create-contact-details">
              Enter Post Title:  <input type="text" name="title" defaultValue={post.title}/><br/>
              Enter Post: <textarea name="body" defaultValue={post.body} rows="10" cols="60"></textarea><br/>

              <button>confirm</button>
            </div>
          </form>
        </Modal>


        <Modal
        className='modal'
        overlayClassName='overlay'
        isOpen={this.state.openAddComment}
        onRequestClose={this.closeCommentModal}
        contentLabel='Modal'
        ariaHideApp={false}>
          <form onSubmit={this.confirmComment} className="create-form">
            <div className="create-contact-details">
              Enter a unique ID: <input type="text" name="id" placeholder="Name"/><br/>
              Enter Comment: <textarea name="body" placeholder="Comment body" rows="10" cols="60"></textarea><br/>
              Author: <input type="text" name="author" placeholder="Name"/><br/>




              <button>Submit</button>
            </div>
          </form>
        </Modal>

        <Modal
        className='modal'
        overlayClassName='overlay'
        isOpen={this.state.openEditComment}
        onRequestClose={this.closedEdCommentModal}
        contentLabel='Modal'
        ariaHideApp={false}>
          <form onSubmit={this.confirmEditComment} className="create-form">
            <div className="create-contact-details">
              Enter Comment: <textarea name="body" defaultValue={this.state.commentBody} rows="10" cols="60"></textarea><br/>

              <button>Submit</button>
            </div>
          </form>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps({posts, comments}){
  return {
    post: posts.detail_post,
    comments: comments.all_comments
  }
}

function mapDispatchToProps(dispatch){
  return {
    getDetPost: (id) => dispatch(getDetPost(id)),
    getComments: (id) => dispatch(getComments(id)),
    deletePost: (id) => dispatch(deletePost(id)),
    editPost: (id, body) => dispatch(editPost(id,body)),
    submitComment: (body) => dispatch(submitComment(body)),
    deleteComment: (id) => dispatch(delComment(id)),
    edComment: (id, body) => dispatch(editComment(id, body)),
    votePost: (id,vote) => dispatch(votePost(id, vote)),
    voteComment: (id, vote) => dispatch(voteComment(id, vote))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail))
