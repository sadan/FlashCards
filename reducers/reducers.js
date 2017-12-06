import { ADD_DECK, ADD_QUESTION } from '../actions/actions'

export default function decks (state = {}, action) {
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      }
    
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.deckKey] : {
          ...state[action.question.deckKey],
          questions: [
            ...state[action.question.deckKey].questions,
            action.question.question
          ]
        }
      }
  }
}