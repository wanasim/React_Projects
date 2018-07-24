export const ALL_DECKS = 'ALL_DECKS'
export const NEW_DECK_TITLE = 'NEW_DECK'
export const NEW_CARD = 'NEW_CARD'

//takes in all decks as paramter
export const allDecks = (decks) => ({
  type: ALL_DECKS,
  decks
})

export const addingDeck = (title) => ({
  type: NEW_DECK_TITLE,
  title
})

export const newCard = (title, card) => ({
  type: NEW_CARD,
  title, 
  card
})
