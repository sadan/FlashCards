import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { AppLoading } from 'expo'

import { getDecks } from '../utils/api'
import DeckInfo from './DeckInfo'
import { white } from '../utils/colors';

class DeckList extends Component {
  state = {
    ready: false,
    decks: {}
  }

  componentDidMount() {
    getDecks()
    .then(decks => {
      this.setState(() => ({
        ready: true,
        decks
      }))
    })
  }

  render() {
    const { navigate } = this.props.navigation
    const { ready, decks } = this.state

    if (!ready) {
      return <AppLoading />
    }

    return (
      <View>
        {decks
          ? <FlatList
              data={Object.keys(decks).map((key) => decks[key])}
              renderItem={({item}) => (
                <TouchableOpacity style={styles.item} onPress={() => navigate(
                  'DeckView',
                  {deckKey: item.title}
                )}>
                  <DeckInfo key={item.title} deck={item} />
                </TouchableOpacity>
              )}
            />
          : null
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item : {
    backgroundColor: white,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1
  }
})

export default DeckList
