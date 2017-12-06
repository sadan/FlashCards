import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { formatDeckInfo } from '../utils/helpers'
import DeckInfo from './DeckInfo'

class DeckView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckKey } = navigation.state.params

    return {
      title: deckKey
    }
  }
  render() {
    let { navigation, deckKey, deck } = this.props

    return (
      <View>
        <DeckInfo deck={deck} />

        <View>
          <TouchableOpacity onPress={() => navigation.navigate(
            'NewQuestion',
            { deckKey: deckKey }
          )}>
            <Text>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate(
            'Quiz',
            { deckKey: deckKey }
          )}>
            <Text>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapStateToProps (state, { navigation }) {
  const { deckKey } = navigation.state.params

  return {
    deckKey,
    deck: state[deckKey]
  }
}

export default connect(mapStateToProps)(DeckView)