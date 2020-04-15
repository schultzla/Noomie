import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'


export default class Message extends Component {
  constructor(props) {
    super(props)
  }
  
  
  render() {
    const isLeftSide = this.props.side === 'left'

    const containerStyles = isLeftSide ? styles.container : flattenedStyles.container
    const textContainerStyles = isLeftSide ? styles.textContainer : flattenedStyles.textContainer
    const textStyles = isLeftSide ? flattenedStyles.leftText : flattenedStyles.rightText
  
    return (
      <View style={containerStyles}>
        <View style={textContainerStyles}>
          <Text style={textStyles}>
            {this.props.message}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 3,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  textContainer: {
    width: 160,
    backgroundColor: '#b6b6b6',

    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginLeft: 10
  },
  rightContainer: {
    justifyContent: 'flex-end'
  },
  rightTextContainer: {
    backgroundColor: '#FB6567',
    marginRight: 10
  },
  leftText: {
    textAlign: 'left'
  },
  rightText: {
    textAlign: 'right'
  },
  text: {
    fontSize: 16
  }
})

const flattenedStyles = {
  container: StyleSheet.flatten([styles.container, styles.rightContainer]),
  textContainer: StyleSheet.flatten([styles.textContainer, styles.rightTextContainer]),
  leftText: StyleSheet.flatten([styles.leftText, styles.text]),
  rightText: StyleSheet.flatten([styles.rightText, styles.text])
}