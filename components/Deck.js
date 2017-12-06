import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { formatDeckInfo } from '../utils/helpers'
import DeckInfo from './DeckInfo'
import TextButton from './TextButton'
import { white, black } from '../utils/colors'

class DeckView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckKey } = navigation.state.params

    return {
      title: deckKey
    }
  }

  render() {
    const { navigation, deckKey, deck } = this.props

    return (
      <View style={styles.container}>
        <DeckInfo deck={deck} />

        <View style={styles.btnContainer}>
          <TextButton onPress={() => navigation.navigate(
            'NewQuestion',
            { deckKey: deckKey }
          )} buttonStyle={styles.buttonStyle1} textColor={black}>
            Add Card
          </TextButton>
          <TextButton onPress={() => navigation.navigate(
            'NewQuestion',
            { deckKey: deckKey }
          )} buttonStyle={styles.buttonStyle2} textColor={white}>
            Start Quiz
          </TextButton>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 50,
    paddingRight: 50
  },
  btnContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonStyle1: {
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  buttonStyle2: {
    alignSelf: 'stretch',
    backgroundColor: black,
    marginTop: 10
  }
})

function mapStateToProps (state, { navigation }) {
  const { deckKey } = navigation.state.params

  return {
    deckKey,
    deck: state[deckKey]
  }
}

export default connect(mapStateToProps)(DeckView)