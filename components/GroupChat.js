import React, { Component } from 'react';
import { TouchableOpacity, Image, Text, TextInput, Button, StyleSheet, View, Keyboard } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import Message from './Message';

export default class GroupChat extends Component {

  constructor(props) {
    super(props)

    this.state = {
      messages: [],
      message: ''
    }

    this.input = React.createRef();
    this.listRef
  }

  setMessage = (message) => {
    this.setState({
      message: message
    })
  }

  sendMessage = () => {
    this.input.current.clear();
    var id = this.state.messages.length == 0 ? 0 : this.state.messages[this.state.messages.length - 1].id + 1
    var msg = {
      id: id,
      message: this.state.message,
      side: 'right'
    }

    this.setState({
      messages: [...this.state.messages, msg],
      message: ''
    })
    this.listRef.scrollToEnd(true)
  }

  membersList() {
    return this.props.route.params.items.map((item) => {
      return (
        <View style={{alignItems: 'center', padding: 20 }}>
          <Image style={styles.avatar} source={item.pic} />
          <Text>{item.name.split(' ')[0]}</Text>
        </View>
      );
    })
  }

  render() {
    return (
      <View style={styles.view}>
        <View style={styles.row}>
          {this.membersList()}
        </View>

        <FlatList
          ref={(list) => this.listRef = list}
          data={this.state.messages}
          renderItem={({ item }) => <Message side={item.side} message={item.message} />}
          keyExtractor={item => item.id}
          style={{ width: '100%' }}
          showsVerticalScrollIndicator={false}
        ></FlatList>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              ref={this.input}
              value={this.state.message}
              multiline={true}
              onChangeText={(message) => { this.setMessage(message) }}
              placeholder="Write your message" />
          </View>

          <TouchableOpacity
            style={styles.loginBtn}
            onPressOut={this.sendMessage}
          >
            <Text style={{ color: "#fff" }}> Send </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    width: '100%',
    backgroundColor: '#ffffff',
    flex: 1
  },
  avatar: {
    marginTop: '3%',
    width: 50,
    height: 50,
    borderRadius: 50
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: '3%'
  },
  inputContainer: {
    width: '70%'
  },
  input: {
    height: 60,
    borderColor: '#b6b6b6',
    borderWidth: 1,
    borderRadius: 3,
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  loginBtn: {
    alignItems: 'center',
    backgroundColor: '#FB6567',
    padding: 10,
    width: 100
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: '2%'
  },

})