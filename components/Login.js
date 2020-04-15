import React, { Component } from 'react';
import { TouchableWithoutFeedback, Keyboard, Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as RootNavigation from './RootNavigation.js';
import Header from './Header.js';

export default class Login extends Component {

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.view}>
          <Header/>
          <TextInput
            style={{ borderWidth: 1, borderColor: "#B8B8B8", marginTop: '5%', padding: 10, height: 40, width: '75%', textAlign: "left", borderRadius: 30 }}
            backgroundColor="#ffffff"
            placeholder="Email"
            selectionColor="#FFC106"
            enablesReturnKeyAutomatically={true}
            keyboardAppearance='dark'
          />

          <TextInput
            style={{ borderWidth: 1, borderColor: "#B8B8B8", padding: 10, width: '75%', textAlign: "left", borderRadius: 30, marginVertical: 10, height: 40 }}
            backgroundColor="#ffffff"
            placeholder="Password"
            selectionColor="#FFC106"
            enablesReturnKeyAutomatically={true}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.loginBtn}
            onPressOut={this.login}
          >
            <Text style={{ color: "#fff" }}> Log In </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerBtn}
            onPressOut={this.signUp}
          >
            <Text style={{ color: "#FB6567" }}> Sign Up </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  login = () => {
    RootNavigation.navigate("Matches")
  }

  signUp = () => {
    RootNavigation.navigate("Survey")
  }
}

const styles = StyleSheet.create({
  loginBtn: {
    alignItems: 'center',
    backgroundColor: '#FB6567',
    padding: 10,
    width: '75%',
    borderRadius: 30,
    marginBottom: 10
  },
  registerBtn: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#FB6567',
    borderWidth: 2,
    padding: 10,
    width: '75%',
    borderRadius: 30,
    marginBottom: 10
  },
  view: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flex: 1
  },
  nav: {
    width: '100%'
  }
})