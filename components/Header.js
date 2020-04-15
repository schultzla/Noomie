import React, { Component } from "react";
import { StyleSheet, Image, View, TouchableWithoutFeedback, Keyboard } from 'react-native';


export default class Header extends Component {

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.header}>
                    <Image style={{ width: 350, height: 150 }} source={require('../images/Noomie.png')} />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    header: {
      width: '100%',
      alignItems: 'center',
      backgroundColor: '#fff',
    }
  })