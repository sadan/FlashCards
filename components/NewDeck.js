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

  submit = () => {
    const { title } = this.state
    const { add } = this.props

    this.props.dispatch(addDeck({
      [title]: this.state
    }))

    this.setState(() => ({
      title: ''
    }))
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
        <Text>{title}</Text>
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

export default connect()(NewDeck)