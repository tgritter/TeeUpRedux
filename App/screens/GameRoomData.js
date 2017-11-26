import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Dimensions, Image } from 'react-native';
import firebase from 'firebase';
import Header from '../components/Header';
export default class GameRoomData extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      course: '',
      day: '',
      time: '',
      gameid: this.props.screenProps
    }

    this.itemsRef = this.getRef().child('game/' + this.state.gameid);
  }

  getRef(){
    return firebase.database().ref();
  }

  componentWillMount(){
    this.getItems(this.itemsRef);
  }

  getItems(itemsRef){
    itemsRef.on('value',(snap) => {
        var game = snap.val();
        this.setState({
          course: game.course,
          day: game.day,
          time: game.time
        })
      });
  }

  render() {
    const {state} = this.props.navigation;
    return (
      <View style={styles.container2}>
      <Header
        navigation={this.props.navigation}
        style={{ flex: 1 }} />
        <View style={styles.container}>
          <Text style={styles.gameRoomText}>                        Game Room</Text>
            <View style={styles.chooseCourseTextContainer}>
              <Image
                source={require('../images/ic_golf_flag.png')}
                style={styles.cancelIcon}
              />
            <Text style={styles.text}> Course </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.courseText}>{ this.state.course }</Text>
            </View>
            <View style={styles.chooseCourseTextContainer}>
              <Image
                source={require('../images/ic_calendar.png')}
                style={styles.cancelIcon}
              />
            <Text style={styles.text}> Day </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.courseText}>{ this.state.day }</Text>
            </View>
            <View style={styles.chooseCourseTextContainer}>
              <Image
                source={require('../images/ic_time.png')}
                style={styles.cancelIcon}
              />
            <Text style={styles.text}> Time </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.courseText}>{ this.state.time }</Text>
            </View>
          </View>
      </View>
    );
  }
  }

  const styles = StyleSheet.create({
  container2: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  container: {
    width: Dimensions.get('window').width - 30,
  },
  chooseCourseTextContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 18,
  },
  courseText: {
    fontSize: 18,
    margin: 20,

  },
  gameRoomText: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 20,

  },
  textContainer: {
    width: Dimensions.get('window').width - 30,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginTop: 10
  },

  });
