import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

function Question ({ question }) {
  return (
    <View>
      <Text>{question.question}</Text>
      <Text>{question.answer}</Text>
      <TouchableOpacity>
        <Text>
          Answer
        </Text>
      </TouchableOpacity>
    </View>
  )
}

class Quiz extends Component {
  state = {
    current: 0,
    correct: 0,
    total: this.props.deck.questions.length
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
    const { deck } = this.props
    const { current, correct, total } = this.state
    const percentageCorrect = 100 * correct / total

    return (
      <View>
        {current !== null 
          ? <View>
              <Question question={deck.questions[current]} />
              <TouchableOpacity onPress={this.onCorrect}>
                <Text>
                  Correct
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onIncorrect}>
                <Text>
                  Incorrect
                </Text>
              </TouchableOpacity>
            </View>
          : <View>
              <Text>Percentage Correct: {percentageCorrect}</Text>
            </View>}
      </View>
    )
  }
}

function mapStateToProps (state, { navigation }) {
  const deckKey = navigation.state.params.deckKey

  return {
    deckKey,
    deck: state[deckKey]
  }
}

export default connect(mapStateToProps)(Quiz)