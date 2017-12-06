export function formatDeckInfo (deck) {
  debugger
  const cardsCount = Object.keys(deck.questions).length
  
  return {
    title: deck.title,
    cardsCount: cardsCount
  }
}