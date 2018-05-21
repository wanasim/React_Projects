import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCatPosts} from '../actions'
import {withRouter} from 'react-router-dom'

class CategoryPosts extends Component {
state = {
   categories: []
}

   componentDidMount = () => {
     const {category} = this.props.match.params
      this.props.receiveCatPosts(category)

   }
   render(){
     const {posts} = this.props
      return(
        <div>
          {posts === undefined ? 'No posts under that category!' : posts.map((post)=>(
            <li key={post.id}>{post.id}</li>
          ))}
        </div>
      )
   }
}
function mapStateToProps({posts}){
  return {
    posts: posts.cat_posts
  }
}


function mapDispatchToProps(dispatch){
  return {
    receiveCatPosts: (category) => dispatch(getCatPosts(category))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryPosts))
