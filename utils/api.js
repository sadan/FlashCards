import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = 'FlashCards:decks'

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(data => JSON.parse(data))
}

export function addDeck (title) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title: title, 
      questions: []
    }
  }))
}

export function getDeck(deckKey) {
  return getDecks().then(data => data[deckKey])
}