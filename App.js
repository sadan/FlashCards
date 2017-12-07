import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo'

import NewDeck from './components/NewDeck'
import DeckList from './components/DeckList'
import DeckView from './components/Deck'
import NewQuestion from './components/NewQuestion'
import Quiz from './components/Quiz'

import { black, white } from './utils/colors'
import { setLocalNotification } from './utils/helpers'

function CustomStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
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

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <CustomStatusBar backgroundColor={black} barStyle='light-content' />
        <MainNavigator />
      </View>
    );
  }
}