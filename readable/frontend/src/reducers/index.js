// reducer
import { ADD_POST, ADD_COMMENT, DELETE_POST, DELETE_COMMENT } from '../actions'
import {combineReducers} from 'redux'

//post reducer
function post (state = {}, action) {
  const {id, timestamp,title, body, author, category, voteScore, deleted} = action

  switch(action.type){
    case ADD_POST:
      return {
        ...state,
        [id]: action.id,
        timestamp: action.timestamp,
        title: action.title,
        body: action.body,
        author:action.author,
        category:action.category,
        voteScore: action.voteScore,
        deleted: action.deleted
      }
      default:
       return state;

  }
}

// comment reducer
// function comment()

export default combineReducers({post})
