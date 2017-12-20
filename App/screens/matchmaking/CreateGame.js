import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Image, Dimensions, TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import firebase from 'firebase';
import Header from '../../components/Header';
import ChooseCourse from '../../components/creategame/ChooseCourse';
import ChooseDate from '../../components/creategame/ChooseDate';
import ChooseTime from '../../components/creategame/ChooseTime';
import {connect} from 'react-redux';
import { updateGameID, updateCourseID  } from '../../actions';

class CreateGame extends React.Component {

  getRef(){
    return firebase.database().ref();
  }


  onButtonPress() {

    //TODO Check If Course Selected

    //Firebase References
    var matchesRef = firebase.database().ref('game');
    var scorecardsRef = firebase.database().ref('scorecards');

    //Player Info from Splash Page
    const playerInfo = {userid: this.props.userID, image: this.props.userImg, handicap: this.props.userHdc};

    //Matchmaking List Push
    var matchRef = matchesRef.push({
      course: this.props.courseName,
      courseid: this.props.courseID,
      day: this.props.gameDate,
      time: this.props.gameTime,
      players: {[this.props.userID]: playerInfo}
    });

    var key = matchRef.key;
    matchesRef.child(key + '/gameID').set(key);

    //Less Pretty FB Push
    //matchesRef.child(key + '/players/' + this.props.userID).set(playerInfo);

    //Live Game Push
    const gameData = {coruse: this.props.courseName, scorecards: null, games: null};
    scorecardsRef.child('scorecardData/' + key).set(gameData);

    //Update Redux States
    this.props.updateGameID(key);
    this.props.updateCourseID(this.props.courseID);


    //Navigate To Game Room
    const { navigate } = this.props.navigation;
    navigate('GameRoom');

  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={ () => navigate('CourseList') }>
          <ChooseCourse/>
        </TouchableOpacity>
        <ChooseDate />
        <ChooseTime />
        <View style={styles.createbuttoncontainer}>
          <Button
            style={styles.createButton}
            onPress={this.onButtonPress.bind(this)}
            title="Create Game!"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F5F5F5',
  },
  createButton: {
    alignItems: 'center',
    padding: 10,
  },
  createbuttoncontainer: {
    alignItems: 'center',
    padding: 10,
  },
  createGameContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  chooseCourseContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  chooseCourseTextContainer: {
    marginTop: 15,
    marginLeft: 15,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  additionalSettingsText: {
    fontSize: 18,
    margin: 20
  },
  additionalSettingsContainer: {
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
  text: {
    fontSize: 18,
  },
  courseText: {
    fontSize: 18,
    margin: 20
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
  imgContainer: {
    alignItems: 'center',
    flexGrow: 1,
    paddingTop: 25,
  },
  profileimg: {
    width: 100,
    height: 100,
  },
  inputcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    height: 50,
    width: Dimensions.get('window').width,
  },
  createButton: {
    alignItems: 'center',
    padding: 10,
  },
  createbuttoncontainer: {
    alignItems: 'center',
    padding: 10,
  },
  textHeaderContainer: {
    width: Dimensions.get('window').width,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#88CC88'
  },

  textBold: {
    flex: 1,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDataContainer: {
    width: Dimensions.get('window').width,
    height: 30,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  lineStyle:{
    borderWidth: 0.5,
    borderColor:'black',
    width: 500,
  }
});

const mapStateToProps = (state) => ({
    //Course State
    courseName: state.createGame.courseName,
    courseID: state.createGame.courseID,
    gameDate: state.createGame.gameDate,
    gameTime: state.createGame.gameTime,
    //User Info State
    userID: state.userInfo.userID,
    userImg: state.userInfo.userImg,
    userHdc: state.userInfo.userHdc,
});

export default connect(mapStateToProps, { updateGameID, updateCourseID })(CreateGame);
