import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

import { getDecks } from '../utils/api'

class DeckList extends Component {
  render() {
    let { decks } = this.props

    return (
      <View>
        <Text>{JSON.stringify(decks)}</Text>
      </View>
    )
  }
}

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)
