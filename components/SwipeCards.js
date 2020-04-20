import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, Animated, PanResponder } from 'react-native';
import * as RootNavigation from './RootNavigation.js';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
const matches = [
  { isSelect: false, name: "Greg Smith", pic: require("../images/profile/guy1.jpeg"), percent: .78, age: 24, location: "New York, NY" },
  { isSelect: false, name: "Beatrice Roach", pic: require("../images/profile/girl1.jpeg"), percent: .71, age: 20, location: "New York, NY" },
  { isSelect: false, name: "Jackson McDonald", pic: require("../images/profile/guy2.jpeg"), percent: .94, age: 27, location: "Seattle, WA" },
  { isSelect: false, name: "Kendra White", pic: require("../images/profile/girl2.jpeg"), percent: .80, age: 26, location: "San Francisco, CA" },
  /*{ isSelect: false, name: "Benjamin Baxtor", pic: require("../images/profile/guy3.jpeg"), percent: .53, age: 29, location: "Chicago, IL" },
  { isSelect: false, name: "Jennifer Grove", pic: require("../images/profile/girl3.jpeg"), percent: .83, age: 21, location: "Washington D.C." },*/
]

class NoMoreCards extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 50 }}> No more potential roommates </Text>
        <TouchableOpacity
          style={styles.viewBtn}
          onPressOut={this.viewMatches}
        >
          <Text style={{ color: "#fff" }}> View Matches </Text>
        </TouchableOpacity>
      </View>
    )
  }

  viewMatches = () => {
    var fullList = []
    var selected = []
    fullList.push(...matches)
    selected.push(...this.props.yes)

    RootNavigation.navigate("Match List", {
      fullList: fullList,
      selected: selected
    })
  }
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY();
    this.state = {
      currentIndex: 0
    }

    this.yes = []
    this.no = []

    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-30deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    })

    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
      ]
    }

    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })
    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    })

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    })
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    })

  }

  componentWillMount() {
    this.PanResponder = PanResponder.create({

      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {

        this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {

        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
            this.yes.push(this.state.currentIndex - 1)
          })
        }
        else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
            this.no.push(this.state.currentIndex - 1)
          })
        }
        else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start()
        }
      }
    })
  }

  renderMatches = () => {

    return matches.map((item, i) => {
      if (i < this.state.currentIndex) {
        return null
      }
      else if (i == this.state.currentIndex) {

        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item.id} style={[this.rotateAndTranslate, {  height: SCREEN_HEIGHT - 180, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>
            <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>

            </Animated.View>

            <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>

            </Animated.View>

            <Image
              style={{ height: '80%', width: null, resizeMode: 'cover', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
              source={item.pic} />
            <View style={{ flex: 1, width: '100%', height: '100%', backgroundColor: "#FB6567", borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
              <View style={styles.container}>
                <Text style={{ color: "#fff", fontWeight: '700', fontSize: 24 }}>{item.name}</Text>
                <Text style={{ color: "#fff", fontSize: 24 }}>, {item.age}</Text>
              </View>

              <Text style={{color: "#fff", fontSize: 16, marginLeft: 5}}>{item.location}</Text>
              <Text style={{color: "#fff", marginLeft: 5}}>{this.formatPercent(item.percent)} match!</Text>
            </View>

          </Animated.View>
        )
      }
      else {
        return (
          <Animated.View

            key={item.id} style={[{
              height: SCREEN_HEIGHT - 180, width: SCREEN_WIDTH, padding: 10, position: 'absolute'
            }]}>
            <Animated.View style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>

            </Animated.View>

            <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>

            </Animated.View>

            <Image
              style={{ height: '80%', width: null, resizeMode: 'cover', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
              source={item.pic} />
            <View style={{ flex: 1, width: '100%', height: '100%', backgroundColor: "#FB6567", borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
              <View style={styles.container}>
                <Text style={{ color: "#fff", fontWeight: '700', fontSize: 24 }}>{item.name}</Text>
                <Text style={{ color: "#fff", fontSize: 24 }}>, {item.age}</Text>
              </View>

              <Text style={{color: "#fff", fontSize: 16, marginLeft: 5}}>{item.location}</Text>
              <Text style={{color: "#fff", marginLeft: 5}}>{this.formatPercent(item.percent)} match!</Text>
            </View>
          </Animated.View>
        )
      }
    }).reverse()
  }

  formatPercent(percent) {
    return (percent * 100) + '%'
  }

  renderNoCards = () => {
    return (
      <NoMoreCards yes={this.yes}/>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {this.state.currentIndex < matches.length ? this.renderMatches() : this.renderNoCards()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
  viewBtn: {
    alignItems: 'center',
    backgroundColor: '#FB6567',
    padding: 10,
    borderRadius: 30,
    marginBottom: 10,
    width: 200
  },
  container: {
    flexDirection: 'row',
    marginLeft: 5
  },
})
