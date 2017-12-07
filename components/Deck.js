import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { AppLoading } from 'expo'

import { formatDeckInfo } from '../utils/helpers'
import DeckInfo from './DeckInfo'
import TextButton from './TextButton'
import { white, black } from '../utils/colors'
import { getDeck } from '../utils/api'

class DeckView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckKey } = navigation.state.params

    return {
      title: deckKey
    }
  }

  state = {
    deck: {}
  }

  componentDidMount() {
    const { navigation } = this.props
    const deckKey = navigation.state.params.deckKey

    getDeck(deckKey)
      .then(deck => this.setState(() => ({
        deck
      })))
  }

  refresh = (title) => {
    getDeck(title)
      .then(deck => this.setState(() => ({
        deck
      })))
  }

  render() {
    const { navigate } = this.props.navigation
    const { deck } = this.state

    if (!Object.keys(deck).length) return <AppLoading />

    return (
      <View style={styles.container}>
        <DeckInfo deck={deck} />

        <View style={styles.btnContainer}>
          <TextButton onPress={() => navigate(
            'NewQuestion',
            { 
              deckKey: deck.title,
              refresh: this.refresh
            }
          )} buttonStyle={styles.buttonStyle1} textColor={black}>
            Add Card
          </TextButton>
          <TextButton onPress={() => navigate(
            'Quiz',
            { deckKey: deck.title }
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

export default DeckView