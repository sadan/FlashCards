import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'

import TextButton from './TextButton'

import { saveDeckTitle } from '../utils/api'
import { black, white } from '../utils/colors'

class NewDeck extends Component {
  state = {
    title: ''
  }

  onChangeHandler = title => {
    this.setState({ title })
  }

  toDeck = (title) => {
    const { navigate } = this.props.navigation
    return navigate("DeckView", {deckKey:title})
  }

  submit = () => {
    const { title } = this.state

    saveDeckTitle(title)

    this.setState(() => ({
      title: ''
    }))

    this.toDeck(title)
  }

  render() {
    let { title } = this.state
    console.log(title.length)

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.questionText}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Title'
          value={title}
          onChangeText={text => this.onChangeHandler(text)} 
        />
        <TextButton disabled={!title.length} onPress={this.submit} buttonStyle={styles.buttonStyle} textColor={white}>
          Submit
        </TextButton>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  questionText: {
    fontSize: 36,
    textAlign: 'center'
  },
  textInput: {
    alignSelf: 'stretch',
    height: 40,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#000',
    marginTop: 20,
    marginBottom: 20,
    padding: 5
  },
  buttonStyle: {
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: black
  }
})

export default NewDeck