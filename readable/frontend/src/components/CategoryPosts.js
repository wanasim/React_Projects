import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCatPosts} from '../actions'
import {withRouter, Link} from 'react-router-dom'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
          <div>
            <Link to="/">Home</Link>
          </div>


            {posts === undefined ? 'No posts under that category!' : posts.map((post)=>(
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
