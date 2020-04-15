import React, { Component } from 'react';
import { FlatList, Text, StyleSheet, View } from 'react-native'
import SwipeCards from './SwipeCards';
import Header from './Header';

export default class Matches extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.view}>
        <Header/>
        <SwipeCards/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    width: '100%'
  },
  view: {
    width: '100%',
    backgroundColor: '#ffffff',
    flex: 1
  },
})
