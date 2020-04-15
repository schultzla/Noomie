import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, TouchableWithoutFeedback, Keyboard, Button } from 'react-native'
import * as RootNavigation from './RootNavigation.js';
import { TextInput } from 'react-native-gesture-handler';
import Header from './Header'

export default class Survey extends Component {

  constructor(props) {
    super(props)

    this.state = {
      question: 0,
      questions: [
        "What is your name?",
        "What is your age?",
        "What city are you looking to move to?",
        "Are you okay with smoking?",
        "What is your max budget per month?",
      ],
      answers: [
        "Name",
        "Age",
        "City",
        "Yes/No",
        "Max Budget"
      ]
    }
  }

  render() {

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.view}>
          <Header/>
          <View style={styles.questionBox}>
            <Text style={styles.surveyQuestion}>{this.state.questions[this.state.question]}</Text>
            <TextInput
              style={{ borderWidth: 1, borderColor: "#B8B8B8", marginTop: '5%', padding: 10, height: 40, width: '75%', textAlign: "left", borderRadius: 30 }}
              backgroundColor="#ffffff"
              placeholder={this.state.answers[this.state.question]}
              selectionColor="#FFC106"
              enablesReturnKeyAutomatically={true}
              keyboardAppearance='dark'
            />
          </View>
          <View style={styles.container}>

            <TouchableOpacity
              style={this.state.question == 0 ? styles.disablePrevBtn : styles.prevBtn}
              onPress={this.prevQuestion}
              disabled={this.state.question == 0}
            >
              <Text style={{ color: this.state.question == 0 ? "#b3b3b3" : "#FB6567" }}> Previous </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nextBtn}
              onPress={this.nextQuestion}
            >
              <Text style={{ color: "#fff" }}> {this.state.question == this.state.questions.length - 1 ? "Submit" : "Next"} </Text>
            </TouchableOpacity>

          </View>

        </View>
      </TouchableWithoutFeedback>
    );
  }

  nextQuestion = () => {
    if (this.state.question == this.state.questions.length - 1) {
      RootNavigation.reset("Matches")
    } else {
      this.setState({
        question: this.state.question + 1
      })
    }
  }

  prevQuestion = () => {
    this.setState({
      question: this.state.question - 1
    })
  }
}

const styles = StyleSheet.create({
  surveyQuestion: {
    color: "#b3b3b3",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    padding: 5
  },
  nextBtn: {
    backgroundColor: '#FB6567',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    width: 150
  },
  prevBtn: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderColor: '#FB6567',
    borderWidth: 2,
    padding: 10,
    borderRadius: 30,
    marginRight: '5%',
    width: 150,
  },
  disablePrevBtn: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderColor: '#b3b3b3',
    borderWidth: 2,
    padding: 10,
    borderRadius: 30,
    marginRight: '5%',
    width: 150,
  },
  view: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    flex: 1
  },
  questionBox: {
    justifyContent: 'center',
    flex: 1,
    width: '75%',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#fff',
    marginBottom: '2%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  nav: {
    width: '100%'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '5%',
    width: '75%'
  },
})