import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'

import { getDeck } from '../utils/api'
import { white } from '../utils/colors'
import TextButton from './TextButton'
import Question from './Question'

class Quiz extends Component {
  state = {
    deck: {},
    current: 0,
    correct: 0,
    total: 0
  }

  componentDidMount() {
    const { navigation } = this.props
    const deckKey = navigation.state.params.deckKey

    getDeck(deckKey)
      .then(deck => this.setState(() => ({
        total: deck.questions.length,
        ready: true,
        deck
      })))
  }

  onCorrect = () => {
    const { current, total } = this.state
    let _current = total > current + 1 ? current + 1 : null

    this.setState((state) => ({
      current: _current,
      correct: state.correct + 1
    }))
  }

  onIncorrect = () => {
    const { current, total } = this.state
    let _current = total > current + 1 ? current + 1 : null

    this.setState(() => ({
      current: _current
    }))
  }

  render() {
    const { deck, current, correct, total } = this.state

    if (!Object.keys(deck).length) {
      return <AppLoading />
    }

    const percentageCorrect = 100 * correct / total

    return (
      <View style={styles.container}>
        {current !== null
          ? <View style={{flex: 1}}>
              <View style={styles.counter}>
                <Text style={{ fontSize: 20 }}>{current + 1} / {total}</Text>
              </View>

              <View style={styles.innerContainer}>
                <Question question={deck.questions[current]} />

                <View style={{justifyContent: 'flex-end',}}>
                  <TextButton onPress={this.onCorrect} buttonStyle={styles.correctButton} textColor={white}>
                    Correct
                  </TextButton>
                  <TextButton onPress={this.onCorrect} buttonStyle={styles.incorrectButton} textColor={white}>
                    Incorrect
                  </TextButton>
                </View>
              </View>

            </View>
          : <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
              <Text>Percentage Correct: {percentageCorrect}</Text>
            </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  innerContainer: { 
    flex:1, 
    alignItems: 'center', 
    paddingLeft: 20, 
    paddingRight: 20, 
    justifyContent: 'space-around'
  },
  counter: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    marginBottom: 10,
  },
  correctButton: {
    alignSelf: 'stretch',
    backgroundColor: '#12791b',
    borderColor: '#12791b',
    marginBottom: 10,
    paddingLeft: 30,
    paddingRight: 30
  },
  incorrectButton: {
    alignSelf: 'stretch',
    backgroundColor: '#ff0000',
    borderColor: '#ff0000',
    marginBottom: 10,
    paddingLeft: 30,
    paddingRight: 30
  }
})

export default Quiz