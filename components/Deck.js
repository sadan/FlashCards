import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { formatDeckInfo } from '../utils/helpers';

class DeckView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckKey } = navigation.state.params

    return {
      title: deckKey
    }
  }
  render() {
    let { navigation, deckKey, deck } = this.props
    let info = formatDeckInfo(deck)

    return (
      <View>
        <Text>{info.title}</Text>
        <Text>{info.cardsCount} cards</Text>
        <View>
          <TouchableOpacity>
            <Text>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity>
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