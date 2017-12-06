import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'

import { getDecks } from '../utils/api'
import DeckInfo from './DeckInfo'

class DeckList extends Component {
  state = {
    ready: false,
    decks: {}
  }

  componentDidMount() {
    getDecks()
      .then(decks => {
        debugger
        this.setState(() => ({
          ready: true,
          decks
        }))
      })
  }

  render() {
    const { ready, decks } = this.state

    if (!ready) {
      return <AppLoading />
    }
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

export default DeckList
