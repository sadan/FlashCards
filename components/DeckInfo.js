import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { formatDeckInfo } from '../utils/helpers'
import { style } from 'expo/src/Font';

export default function DeckInfo ({ deck }) {
  let info = formatDeckInfo(deck)
  return (
    <View style={styles.container}>
      <Text>{info.title}</Text>
      <Text>{info.cardsCount} cards</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  }
})