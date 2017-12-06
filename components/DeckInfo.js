import React from 'react'
import { View, Text } from 'react-native'

import { formatDeckInfo } from '../utils/helpers'

export default function DeckInfo ({ deck }) {
  let info = formatDeckInfo(deck)
  return (
    <View>
      <Text>{info.title}</Text>
      <Text>{info.cardsCount} cards</Text>
    </View>
  )
} 