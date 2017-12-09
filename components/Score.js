import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import TextButton from './TextButton'
import { black, white } from '../utils/colors'

export default function Score ({ refresh, onPress, percentage, deckKey, navigation }) {
  return (
    <View style={styles.container} onPress={onPress}>
      <Text style={{ textAlign: 'center', fontSize: 36 }}>Percentage Correct {percentage}</Text>

      <View style={styles.btnContainer}>
        <TextButton onPress={() => navigation.navigate(
          'DeckView',
          { deckKey: deckKey }
        )} buttonStyle={styles.buttonStyle1} textColor={black}>
          Deck Info
        </TextButton>
        <TextButton onPress={() => {
          refresh()
          navigation.navigate('Quiz', { deckKey: deckKey })
        }} 
          buttonStyle={styles.buttonStyle2} 
          textColor={white}>
          Restart Quiz
        </TextButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonStyle1: {
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  buttonStyle2: {
    alignSelf: 'stretch',
    backgroundColor: black,
    marginTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
  }
})