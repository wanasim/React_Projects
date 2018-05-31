// REDUCERS
import { ALL_POSTS, VOTE_POST, VOTE_COMMENT, CAT_POSTS, DET_POST, ALL_COMMENTS, ALL_CATEGORIES, ADD_POST, ADD_COMMENT, DELETE_POST, EDIT_POST, DELETE_COMMENT, EDIT_COMMENT } from '../actions'
import {combineReducers} from 'redux'


const initialPostState = {
  all_posts: [],
  cat_posts: [],
  detail_post: {},
}

const initialCategoryState = {
  all_categories: []
}

const initialCommentState = {
  all_comments: []
}

//post reducer
function posts (state = initialPostState, action) {
  // const {id, timestamp,title, body, author, category, voteScore, deleted} = action

  switch(action.type){
    case ALL_POSTS:
      return {
        ...state,
        all_posts: action.all_posts
      }
    case DELETE_POST:
      return {
        ...state,
        all_posts: state.all_posts.filter(post=>post.id!==action.post.id)
      }
    case ADD_POST:
      return {
        ...state,
        all_posts: state.all_posts.concat([{
          id: action.id,
          timestamp: action.timestamp,
          title: action.title,
          body: action.body,
          author:action.author,
          category:action.category,
          voteScore: action.voteScore,
          deleted: action.deleted
        }])
      }
    case VOTE_POST:
      return {
        ...state,
        detail_post:action.post,
        all_posts:state.all_posts.map(post=>{
          if(post.id===action.post.id){
            return{
              ...post,
              voteScore: action.post.voteScore
            }
          }
          return post
        })
      }

    case CAT_POSTS:
    //could do filter
      return {
        ...state,
        cat_posts: action.all_posts
      }
    case EDIT_POST:
      return {
        ...state,
        all_posts: state.all_posts.map((post)=>{
          if(post.id===action.id){
            return {
              ...post,
              title: action.title,
              body: action.body
            }
          }
          return post
        })
      }
    case DET_POST:
    console.log("Reduer picked up on action", action)
      return {
        ...state,
        detail_post: action.post

      }
      default:
       return state;

  }
}

function comments(state=initialCommentState, action){
  switch (action.type) {
    case ALL_COMMENTS:
      return {
        ...state,
        all_comments: action.all_comments
      }
      case ADD_COMMENT:
        return {
          ...state,
          all_comments: state.all_comments.concat([{
            id:action.id,
            parentId:action.parentId,
            timestamp:action.timestamp,
            body:action.body,
            author:action.author,
            voteScore:action.voteScore,
            deleted:action.deleted,
            parentDeleted:action.parentDeleted
          }])
        }
    case VOTE_COMMENT:
    console.log("REDUCER COME VOTE")
      return {
        ...state,
        all_comments: state.all_comments.map(comment=>{
          if(comment.id===action.comment.id){
            return {
              ...comment,
              voteScore:action.comment.voteScore
            }
          }
          return comment
        })

      }
    case EDIT_COMMENT:
    console.log("EDIT REDUCER COMMENT", action)
      return {
        ...state,
        all_comments: state.all_comments.map((comment)=>{
          if(comment.id === action.comment.id){
            return {
              ...comment,
              body: action.comment.body
            }
          }
          return comment
        })
      }
    case DELETE_COMMENT:
      return {
        ...state,
        all_comments: state.all_comments.filter(comment=> comment.id !== action.comment.id)
      }
    default:
      return state

  }
}

function categories(state=initialCategoryState, action){
  switch (action.type){
    case ALL_CATEGORIES:
      console.log("REGISTERED CAT ACTION", action)
      return {
        ...state,
        all_categories: action.all_categories
      }
    default:
      return state;
  }
}

// comment reducer
// function comment()

export default combineReducers({posts, categories, comments})
