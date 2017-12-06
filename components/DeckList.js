import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import { connect } from 'react-redux'

import { getDecks } from '../utils/api'
import DeckInfo from './DeckInfo'

class DeckList extends Component {
  render() {
    let { decks } = this.props
    return (
      <View>
        {typeof decks !== 'undefined'
          ? <FlatList
              data={Object.keys(decks).map((key) => decks[key])}
              renderItem={({item}) => <DeckInfo deck={item} />}
            />
          : null
        }
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
