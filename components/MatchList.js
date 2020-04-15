import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from 'react-native';
import MatchBanner from "./MatchBanner";

export default class MatchList extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    var data = this.getMatches()
    return (
      <View style={styles.view}>
        <FlatList
          data={data}
          renderItem={({ item }) => <MatchBanner item={item} />}
          keyExtractor={item => item.name}
          style={{ width: '100%' }}
          showsVerticalScrollIndicator={false}
        >
        </FlatList>
      </View>
    )
  }

  getMatches = () => { 
    var data = []
    for (var i = 0; i < this.props.route.params.selected.length; i++) {
      data.push(this.props.route.params.fullList[this.props.route.params.selected[i]])
    }

    return data
  }
}

const styles = StyleSheet.create({
  view: {
    width: '100%',
    backgroundColor: '#ffffff',
    flex: 1
  },
})