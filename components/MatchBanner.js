import React, { Component } from 'react';
import { Image, Text, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as RootNavigation from './RootNavigation.js';

export default class MatchBanner extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: this.props.data
    }
  }

  render() {
    return (
      <TouchableOpacity activeOpacity={.7} onPress={this.chat} onLongPress={this.selectItem} >
        <View style={this.props.item.isSelect ? styles.cardSelected : styles.card}>
          <View style={styles.row}>
            <View style={styles.leftContainer}>
              <Image style={styles.avatar} source={this.props.item.pic} />
            </View>
            <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
              <Text>
                {this.props.item.name}, {this.props.item.age}
              </Text>
              <Text>
                {this.formatPercent(this.props.item.percent)} compatible
            </Text>
              <Text>
                {this.props.item.location}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

    );
  }

  selectItem = () => {
    const index = this.state.data.findIndex(item => item.name === this.props.item.name)
    this.props.item.isSelect = !this.props.item.isSelect
    this.state.data[index] = this.props.item

    this.setState({
      data: this.state.data
    })
    
    var hasSelected = false
    var count = 0
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].isSelect === true) {
        hasSelected = true
        count = count + 1
      }
    }

    this.props.update(this.state.data, hasSelected, count)
  }

  chat = () => {
    RootNavigation.navigate("Chat", {
      item: this.props.item
    })
  }

  formatPercent(percent) {
    return (percent * 100) + '%'
  }

}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginLeft: 10,
    marginRight: 10,

    elevation: 3,
  }, container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  cardSelected: {
    backgroundColor: '#FB6567',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginLeft: 10,
    marginRight: 10,

    elevation: 3,
  }, container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  row: {
    flexDirection: 'row'
  },
  leftContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  centerContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '10%'
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
})