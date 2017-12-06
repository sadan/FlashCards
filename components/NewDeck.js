import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { addDeck } from '../actions/actions';

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
      <View style={styles.container}>
        <Text>What is the title of your new deck?</Text>
        <TextInput
          style={{height: 40}}
          placeholder='Title'
          onChangeText={text => this.onChangeHandler(text)} 
        />
        <TouchableOpacity onPress={this.submit}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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