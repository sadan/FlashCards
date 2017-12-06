export function formatDeckInfo (deck) {
  const cardsCount = Object.keys(deck.questions).length
  
  return {
    title: deck.title,
    cardsCount: cardsCount
  }
}