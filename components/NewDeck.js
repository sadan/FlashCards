import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'

import { addDeck } from '../actions/actions';
import { black, white } from '../utils/colors';

class NewDeck extends Component {
  state = {
    title: ''
  }

  onChangeHandler = title => {
    this.setState({ title })
  }

  toDeck = () => {
    this.props.navigation.navigate(
      'DeckView',
      { deckKey: title }
    )
  }

  submit = () => {
    const { title } = this.state
    const { add, toDeck } = this.props

    add(title)

    this.setState(() => ({
      title: ''
    }))

    toDeck(title)
  }

  render() {
    let { title } = this.state

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.questionText}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Title'
          onChangeText={text => this.onChangeHandler(text)} 
        />
        <TouchableOpacity style={styles.submitBtn} onPress={this.submit}>
          <Text style={{ fontSize: 24, color: white }}>Submit</Text>
        </TouchableOpacity>
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
  submitBtn: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: black,
    borderRadius: 3,
  }
})

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    add: (title) => dispatch(addDeck({
        [title]: {title: title, questions: []}
      })),
    toDeck: (title) => navigation.navigate(
      'DeckView',
      { deckKey: title }
    )
  }
}

export default connect(null, mapDispatchToProps)(NewDeck)