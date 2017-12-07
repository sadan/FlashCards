import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { NavigationActions } from 'react-navigation'

import TextButton from './TextButton'
import { white, black } from '../utils/colors'
import { addCardToDeck } from '../utils/api'

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
    const { deckKey, refresh } = this.props.navigation.state.params

    addCardToDeck(deckKey, this.state)
      .then(status => refresh(deckKey))

    this.goBack()
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <TextInput 
          style={styles.textInput}
          placeholder='Question'
          onChangeText={text => this.questionHandler(text)} />
        <TextInput 
          style={styles.textInput}
          placeholder='Answer'
          onChangeText={text => this.answerHandler(text)} />

        <View style={{flex: 0.5, alignItems: 'center'}}>
          <TextButton onPress={this.submit} textColor={white} buttonStyle={styles.buttonStyle}>
            Submit
          </TextButton>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  textInput: {
    alignSelf: 'stretch',
    height: 40,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#000',
    marginBottom: 20,
    padding: 5
  },
  buttonStyle: {
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: black
  }
})

export default NewQuestion