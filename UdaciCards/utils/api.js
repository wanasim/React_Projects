import React from 'react'
import {AsyncStorage} from 'react-native'

const STORAGE_KEY = 'milk'

// getDecks: return all of the decks along with their titles, questions, and answers.
// getDeck: take in a single id argument and return the deck associated with that id.
// saveDeckTitle: take in a single title argument and add it to the decks.
// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.

const initialDeckState = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      }, {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}


export function initialDeck(){
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialDeckState))
  return initialDeckState
}

export function loadDecks(){
   return AsyncStorage.getItem(STORAGE_KEY).then((results)=>{
    if(!results){
      // console.log("NO initialDeck")
      return initialDeck()
    }
    return JSON.parse(results)

  })

}

export function getDeck(id){
  AsyncStorage.getItem(STORAGE_KEY).then((deck)=>deck[id])
}

export function addDeckTitle(deckTitle){
  const deck = {
    [deckTitle]: {
      title: deckTitle,
      questions: []
    }
  }
  // console.log("SUBMITTED DECK", deckTitle)

  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(deck))
}

export function addCardToDeck(title, card){

  return AsyncStorage.getItem(STORAGE_KEY).then((results)=>{
    const decks = JSON.parse(results)
    // console.log(decks[title])
    if(decks[title]){
      decks[title]['questions'].push(card)
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
    }
  })
}
