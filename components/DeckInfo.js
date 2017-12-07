import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { formatDeckInfo } from '../utils/helpers'

export default function DeckInfo ({ deck }) {
  let info = formatDeckInfo(deck)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{info.title}</Text>
      <Text style={styles.subTitle}>{info.cardsCount} cards</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: { 
    fontSize: 36, 
    textAlign: 'center' 
  },
  subTitle: {
    fontSize: 20,
    textAlign: 'center',
    color: '#a8a8a8',
    marginTop: 10
  }
})