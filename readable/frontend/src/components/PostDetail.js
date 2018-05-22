import React, {Component} from 'react'
import {withRouter, Route, Link} from 'react-router-dom'
import Modal from 'react-modal'
import {connect} from 'react-redux'
import serializeForm from 'form-serialize'
import {getDetPost, getComments, deletePost, editPost} from '../actions'
import '../App.css'

class PostDetail extends Component {
  state = {
    openEdit: false,
    formInput: {}
  }

  componentDidMount = () => {
    this.props.getDetPost(this.props.match.params.id)
    this.props.getComments(this.props.match.params.id)
  }

  openEditModal = () => this.setState({openEdit:true})
  closeEditModal = () =>this.setState({openEdit:false})

  confirmDelete = (history) => {
    this.props.deletePost(this.props.match.params.id)
    history.push('/')
  }
  confirmEdit = (e) => {
    e.preventDefault()
    const formInput = serializeForm(e.target, {hash:true})

    this.setState({formInput},()=>{
      this.props.editPost(this.props.match.params.id, formInput)

    })
  }

  render(){
    const {post, comments} = this.props

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
          {post.title}
          <Route render={({history})=>(
            <button onClick={()=>{
              this.confirmDelete(history)
            }}>Delete</button>
          )}>
          </Route>
          <button onClick={this.openEditModal}>Edit</button>

          <br/>
          <h3>Comments</h3>
          {comments.length === 0 ? 'No Comments here!' :comments.map((comment)=>(
            <li key={comment.id}>{comment.body}</li>
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
    getComments: (id) => dispatch(getComments(id)),
    deletePost: (id) => dispatch(deletePost(id)),
    editPost: (id, body) => dispatch(editPost(id,body))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail))
