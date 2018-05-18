// REDUCERS
import { ALL_POSTS, ADD_POST, ADD_COMMENT, DELETE_POST, DELETE_COMMENT } from '../actions'
import {combineReducers} from 'redux'


const initialState = {
  all_posts: [],
  new_posts: {},
  deleted_posts: ["test"]
}

//post reducer
function posts (state = initialState, action) {
  // const {id, timestamp,title, body, author, category, voteScore, deleted} = action
  // console.log("Reduer picked up on action", action)

  switch(action.type){
    case ALL_POSTS:
      return {
        ...state,
        all_posts: action.all_posts
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
      default:
       return state;

  }
}

// comment reducer
// function comment()

export default combineReducers({posts})
