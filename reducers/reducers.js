import { ADD_DECK } from '../actions/actions'

export default function decks (state = {}, action) {
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      }
  }
}