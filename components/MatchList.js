import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import MatchBanner from "./MatchBanner";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as RootNavigation from './RootNavigation.js';
import { NavigationEvents } from 'react-navigation';

export default class MatchList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: this.getMatches(),
      hasSelected: false,
      selectedCount: 0
    }
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({
        data: this.getMatches(),
        hasSelected: false,
        selectedCount: 0  
      })
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    return (
      <View style={styles.view}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => <MatchBanner update={this.updateData} data={this.state.data} item={item} />}
          keyExtractor={item => item.name}
          style={{ width: '100%' }}
          showsVerticalScrollIndicator={false}
        >
        </FlatList>
        {!this.state.hasSelected && <Text style={{ textAlign: 'center', color: '#707173', marginBottom: 5 }}>Tip: Long press matches to select matches for a group!</Text>}
        {this.state.hasSelected && <TouchableOpacity style={this.state.selectedCount === 1 || this.state.selectedCount > 3 ? styles.disabledGroupBtn : styles.groupBtn} onPress={this.chat} >
          <Text style={{ color: '#fff', fontSize: 18 }}>{this.state.selectedCount === 1 ? 'Choose one or more matches' : this.state.selectedCount > 3 ? 'Max of three other people in groups' : 'Create group'}</Text>
        </TouchableOpacity>}
      </View>
    )
  }

  chat = () => {
    var data = []

    this.state.data.forEach((item) => item.isSelect ? data.push(item) : null)

    RootNavigation.navigate("Group Chat", {
      items: data
    })

  }

  updateData = (data, selected, count) => {
    this.setState({
      data: data,
      hasSelected: selected,
      selectedCount: count
    })
  }

  getMatches = () => {
    var data = []
    for (var i = 0; i < this.props.route.params.selected.length; i++) {
      data.push(this.props.route.params.fullList[this.props.route.params.selected[i]])
      data[i].isSelect = false
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
  groupBtn: {
    alignItems: 'center',
    backgroundColor: '#FB6567',
    padding: 10,
  },
  disabledGroupBtn: {
    alignItems: 'center',
    backgroundColor: '#b6b6b6',
    padding: 10,
  }
})