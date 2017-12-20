import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import firebase from 'firebase';
import {PRIMARY_COLOR} from '../../constants/constants'
import Header from '../../components/Header';

export default class MyProfile extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      profileImg: 'https://firebasestorage.googleapis.com/v0/b/teeupbeta.appspot.com/o/profileImg.png?alt=media&token=f741f56f-c4b8-49c7-9b9a-88be2adedfce',
      username: 'Test',
      handicap: '9.0',
      city: 'VanTest',
      homecourse: 'ShaughnessyTest',
      bio: 'Bio Test'
    }
    var user = firebase.auth().currentUser;

    this.itemsRef = this.getRef().child('users/' + user.uid);
  }

  getRef(){
    return firebase.database().ref();
  }

  componentWillMount(){
    this.getItems(this.itemsRef);
  }

  getItems(itemsRef){
    itemsRef.on('value',(snap) => {
        var user = snap.val();

        this.setState({
          profileImg: user.url,
          username: user.username,
          handicap: user.handicap,
          city: user.city,
          homecourse: user.homecourse,
          bio: user.bio
        })
      });
  }



  render() {
      return (
        <View style={styles.container}>
          <Header/>
        <View style={styles.container2}>
            <View style={styles.dateTextContainer}>
              <Text style={styles.sectionText}> Username: </Text>
              <View style={styles.spacer} />
              <Text style={styles.valueText}> {this.state.username} </Text>
            </View>
        </View>
        <View style={styles.container2}>
          <View style={styles.dateTextContainer}>
            <Text style={styles.sectionText}> City: </Text>
            <View style={styles.spacer} />
            <Text style={styles.valueText}> {this.state.city} </Text>
          </View>
        </View>
        <View style={styles.container2}>
          <View style={styles.dateTextContainer}>
            <Text style={styles.sectionText}> Homecourse: </Text>
            <View style={styles.spacer} />
            <Text style={styles.valueText}> {this.state.homecourse} </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  container2: {
    width: Dimensions.get('window').width - 30,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    margin: 10
  },
  imagePickerContainer: {
    width: Dimensions.get('window').width - 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row'
  },
  dateTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15
  },
  spacer: {
    flex: 1,
  },
  sectionText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 18,
    color: PRIMARY_COLOR
  },
  valueText: {
    fontWeight: 'bold',
    fontSize: 18
  },
  cancelIcon: {
    width: 30,
    height: 30,
    margin: 10
  },
  textInput: {
    flex: 1
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
});
