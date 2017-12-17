import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { black } from '../utils/colors';

export default function TextButton ({ children, onPress, buttonStyle={}, textColor, disabled }) {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.button, buttonStyle]}>
      <Text style={[styles.text, {color: textColor}]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 3,
    borderColor: black,
    borderWidth: 1
  },
  text: {
    fontSize: 20,
    textAlign: 'center'
  }
})