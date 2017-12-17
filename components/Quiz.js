import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { AppLoading } from 'expo'
import FlipCard from 'react-native-flip-card'

import { getDeck } from '../utils/api'
import { white } from '../utils/colors'
import TextButton from './TextButton'
import Score from './Score'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class Quiz extends Component {
  state = {
    deck: {},
    current: 0,
    correct: 0,
    total: 0
  }

  componentDidMount() {
    this.refresh()
  }

  refresh = () => {
    const { navigation } = this.props
    const deckKey = navigation.state.params.deckKey

    getDeck(deckKey)
      .then(deck => this.setState(() => ({
        total: deck.questions.length,
        current: 0,
        correct: 0,
        deck
      })))
  }

  clearNotification = () => {
    const { current } = this.state

    debugger
    if (current === null) {
      clearLocalNotification()
        .then(setLocalNotification)
    }
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
                <View style={{flex:1, justifyContent: 'center'}}>
                  <FlipCard style={styles.flipCard}
                    friction={8}
                    flipHorizontal={true}
                    flipVertical={false}
                    clickable={true}
                  >
                    <View style={styles.cardContent}>
                      <Text style={styles.cardText}>
                        {deck.questions[current].question}
                      </Text>
                      <Text style={styles.cardSubText}>Answer</Text>
                    </View>
                    <View style={styles.cardContent}>
                      <Text style={styles.cardText}>
                        {deck.questions[current].answer}
                      </Text>
                      <Text style={styles.cardSubText}>Question</Text>
                    </View>
                  </FlipCard>
                </View>

                <View style={{justifyContent: 'flex-end'}}>
                  <TextButton onPress={this.onCorrect} buttonStyle={styles.correctButton} textColor={white}>
                    Correct
                  </TextButton>
                  <TextButton onPress={this.onIncorrect} buttonStyle={styles.incorrectButton} textColor={white}>
                    Incorrect
                  </TextButton>
                </View>

              </View>

            </View>
          : <Score navigation={ this.props.navigation }
              onPress={ this.clearNotification() }
              percentage={percentageCorrect}
              deckKey={deck.title}
              refresh={this.refresh}
            />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  innerContainer: {
    padding: 20, 
    flex: 1
  },
  flipCard: {
    borderWidth: 0,
    marginBottom: 10,
    flex: 12
  },
  cardContent: {
    flex: 1, 
    justifyContent: 'center'
  },
  cardText: {textAlign: 'center', fontSize: 36},
  cardSubText: { textAlign: 'center', fontSize: 20, color: '#ff0000'},
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