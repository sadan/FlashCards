import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { addQuestion } from '../actions/actions';

class NewQuestion extends Component {
  state = {
    question: '',
    answer: ''
  }

  questionHandler = (question) => {
    this.setState({
      question: question
    })
  }

  answerHandler = (answer) => {
    this.setState({
      answer: answer
    })
  }

  submit = () => {
    const { question, answer } = this.state
    const { add, goBack } = this.props

    add(this.state)
    goBack()
  }

  render() {
    return (
      <View>
        <TextInput 
          style={{height: 40}}
          placeholder='Question'
          onChangeText={text => this.questionHandler(text)} />
        <TextInput 
          style={{height: 40}}
          placeholder='Answer'
          onChangeText={text => this.answerHandler(text)} />
        <TouchableOpacity onPress={this.submit}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  const deckKey = navigation.state.params.deckKey

  return {
    add: (question) => dispatch(addQuestion({
      deckKey: deckKey,
      question: question
    })),
    goBack: () => navigation.goBack()
  }
}

export default connect(null, mapDispatchToProps)(NewQuestion)