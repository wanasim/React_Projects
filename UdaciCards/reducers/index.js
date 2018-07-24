// REDUCERS
import { ALL_DECKS, NEW_DECK_TITLE, NEW_CARD} from '../actions'

const initialState = {
  all_decks: {}
}

//decks reducer
function decks (state = initialState, action) {

  switch(action.type){
    case ALL_DECKS:
      return {
        ...state,
        all_decks: action.decks
      }
    case NEW_DECK_TITLE:
      return {
        ...state,
        all_decks: {
        ...state.all_decks,
        [action.title]: {
          title: action.title,
          questions:[]
        }
      }
    }
    case NEW_CARD:
      // console.log("HIT new card", state.all_decks[action.title].questions, action.card)
      // console.log("NEW LINE", action.card)
      return {
        ...state,
        all_decks: {
          ...state.all_decks,
          [action.title]: {
            ...state.all_decks[action.title],
            questions: state.all_decks[action.title].questions.concat([action.card])
          }
        }
      }

      default:
       return state;
  }
}

  export default decks
