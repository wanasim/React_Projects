import React, { Component } from 'react';
import serializeForm from 'form-serialize'
import '../index.css'

class NewPost extends Component {
  state = {
    formInput: {}
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const formInput = serializeForm(e.target, {hash:true})

    this.setState({formInput},()=>{
      // console.log("formInput State",this.state.formInput)
      this.props.createPost(this.state.formInput)

    })

  }

  render(){
    return (

      <form onSubmit={this.handleSubmit} className="create-form">
        <div className="create-contact-details">
          Enter a unique ID: <input type="text" name="id" placeholder="Name"/><br/>
          Enter Post Title:  <input type="text" name="title" placeholder="Email"/><br/>
          Enter Post: <textarea name="body" placeholder="Post body" rows="10" cols="60"></textarea><br/>
          Author: <input type="text" name="author" placeholder="Name"/><br/>
          Category: <select name="category">
          <option value="react">react</option>
          <option value="redux">redux</option>
          <option value="udacity">udacity</option>

          </select>
          <br/>

          <button>Add Post</button>
        </div>
      </form>
    )
  }
}




export default NewPost
