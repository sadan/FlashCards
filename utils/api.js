import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = 'FlashCards:decks'

export function getDecks() {
  // AsyncStorage.clear()
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(data => JSON.parse(data))
}

export function getDeck(deckKey) {
  return getDecks().then(data => data[deckKey])
}

export function saveDeckTitle (title) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title: title, 
      questions: []
    }
  }))
}

export function addCardToDeck(title, card) {
  return (
    getDeck(title)
      .then(deck => {
        deck.questions.push(card)
        AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({[title]: deck}))
        return true
      })
  )
}