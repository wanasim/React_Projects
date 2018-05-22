// REDUCERS
import { ALL_POSTS, CAT_POSTS, DET_POST, ALL_COMMENTS, ALL_CATEGORIES, ADD_POST, ADD_COMMENT, DELETE_POST, EDIT_POST, DELETE_COMMENT } from '../actions'
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
    case CAT_POSTS:
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
