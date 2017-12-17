import React from 'react'
import { TabNavigator, StackNavigator, TouchableOpacity } from 'react-navigation'
import { Text } from 'react-native'

import NewDeck from './NewDeck'
import DeckList from './DeckList'
import DeckView from './Deck'
import NewQuestion from './NewQuestion'
import Quiz from './Quiz'

import { black, white } from '../utils/colors'

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Deck List'
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck'
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: black,
    style: {
      height: 56,
      backgroundColor: white,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckView: {
    screen: DeckView
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: {
      title: 'Add Card'
    }
  },
  Quiz: {
    screen: Quiz
  }
}, {
  navigationOptions: {
    headerTintColor: white,
    headerStyle: {
      backgroundColor: black
    }
  }
})

export default MainNavigator