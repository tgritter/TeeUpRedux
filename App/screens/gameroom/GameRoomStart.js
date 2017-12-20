import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Button, Picker, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import {PRIMARY_COLOR} from '../../constants/constants'
import firebase from 'firebase';
import { connect } from 'react-redux';
import { openTeesModal, courseData, updateScoreInputInfo, updateCurrentHole  } from '../../actions';

class GameRoomStart extends React.Component {

  constructor(){
    super();
    this.state = {
      tees: 'Choose Tees',
      holesToPlay: '18',
      startHole: '1'
    }
  }

  componentWillMount(){
    this.loadCourseData();
  }

  //Download Course Data from SwingBySwing API
  loadCourseData(){
    var REQUEST_URL = 'https://api.swingbyswing.com/v2/courses/' + this.props.courseID + '?includes=practice_area&access_token=307a7ffd-f771-4d42-944d-c37a2bbdae19';
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.transferCourseData(responseData)
      })
      .done();
  }

  //Transfer Downloaded Course Data to ReduxState
  transferCourseData(responseData){
    this.props.courseData(responseData);
  }

  getHolesToPlay(){
    return ['18', '9'];
  }

  getStartHoles(){
    var startHoles =  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
    if(this.state.holesToPlay == 9){
      startHoles = ['1','10'];
    }
    return startHoles;
  }

  getTees(){
    var tees = [];
    if(this.props.coursedata){
      var teeBoxes = this.props.coursedata['course']['tee_types'];
      Object.keys(teeBoxes).forEach(function(key) {
        tees.push(teeBoxes[key]['tee_type'])
      });
    }
    return tees;
  }


  //Create Scorecard
  onButtonPress() {

    var scorecardsRef = firebase.database().ref('scorecards');

    //Initial Stroke List
    const strokesList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var scorecardRef = scorecardsRef.child('scorecardStrokes').push({
      strokes: strokesList
    });
    var key = scorecardRef.key;

    //Update Redux State Scoreinput
    var startHole = Number(this.state.startHole);
    var holesToPlay = Number(this.state.holesToPlay);
    var endHole = 18;
    if(holesToPlay == 9){
      endHole = startHole + 8;
    } else {
      if(startHole != 1){
        endHole = startHole - 1;
      }
    }
    var scoreInputInfo = {startHole: startHole, endHole: endHole, currentTees: this.state.tees};
    this.props.updateScoreInputInfo(scoreInputInfo);
    this.props.updateCurrentHole(startHole);

    //Get Course handicap
    var teeBoxes = this.props.coursedata['course']['tee_types'];
    var tees = this.state.tees
    var ch = 0;
    var phdc = this.props.userHdc
    var rating = '72.0'
    var slope = '113'

    Object.keys(teeBoxes).forEach(function(key) {
      if(tees == teeBoxes[key]['tee_type']){
        var sr = teeBoxes[key]['slope']
        rating = teeBoxes[key]['rating']
        slope = teeBoxes[key]['slope']
        ch = Math.round((phdc * sr / 113 ));
      }
    });

    const playerInfo = {userid: this.props.userID, image: this.props.userImg, handicap: ch, teeBox: this.state.tees,  username: this.props.userName, scorecardID: key};
    var courseName = this.props.coursedata['course']['name']
    scorecardsRef.child('scorecardStrokes/' + key + '/user_info').set(playerInfo);

    //TODO
    const holeParArray = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
    var date = '00/00/00'
    var time = '00:00'

    const courseData = {course_name: courseName, tees: this.state.tees, hole_par: holeParArray, date: date, time: time, rating: rating, slope: slope}
    scorecardsRef.child('scorecardStrokes/' + key + '/course_data').set(courseData);
    const playerInfoLive = {userid: this.props.userID, image: this.props.userImg, handicap: ch, scorecardID: key, teeBox: this.state.tees, controlID: this.props.userID, username: this.props.userName};

    //Upload Scorecard to Firebase and Navigation to Scorecard Tab
    const { navigate } = this.props.navigation;
    this.addScorecardToGame(playerInfoLive, key).then( () => {
        navigate('Scorecard', {scorecardid: key});
      });
  }

  addScorecardToGame(playerInfo, key) {
      var dataRef = firebase.database().ref('scorecards/scorecardData/' + this.props.gameID +'/scorecards/');
      return new Promise((resolve) => {
          dataRef.child(key).set(playerInfo);
          resolve();
      });
  };


  render() {
  //Get Picker Lists
  var holesToPlay = this.getHolesToPlay();
  var tees = this.getTees();
  var startHoles = this.getStartHoles();

    return (
      <View style={styles.container}>
      <View style={styles.container2}>
          <View style={styles.dateTextContainer}>
            <Text style={styles.sectionText}> Holes to Play: </Text>
            <View style={styles.spacer} />
              <Picker
                style={styles.picker}
                itemStyle={styles.pickerItem}
                selectedValue={this.state.holesToPlay}
                onValueChange={htp => {
                  this.setState({holesToPlay: htp})
                }}>
                {holesToPlay.map((item, index) => {
                   return (< Picker.Item label={item} value={item} key={index} />);
                })}
              </Picker>
          </View>
      </View>
      <View style={styles.container2}>
        <View style={styles.dateTextContainer}>
          <Text style={styles.sectionText}> Start Hole: </Text>
          <View style={styles.spacer} />
            <Picker
              style={styles.picker}
              itemStyle={styles.pickerItem}
              selectedValue={this.state.startHole}
              onValueChange={sh => {
                this.setState({startHole: sh})
              }}>
              {startHoles.map((item, index) => {
                 return (< Picker.Item label={item} value={item} key={index} />);
              })}
            </Picker>
        </View>
      </View>
      <View style={styles.container2}>
        <View style={styles.dateTextContainer}>
          <Text style={styles.sectionText}> Pick Tees: </Text>
          <View style={styles.spacer} />
            <Picker
              style={styles.picker}
              itemStyle={styles.pickerItem}
              selectedValue={this.state.tees}
              onValueChange={tees => {
                this.setState({tees: tees})
              }}>
              {tees.map((item, index) => {
                 return (< Picker.Item label={item} value={item} key={index} />);
              })}
            </Picker>
        </View>
      </View>
      <View style={styles.container2}>
        <View style={styles.dateTextContainer}>
          <Text style={styles.sectionText}> Competitive: </Text>
          <View style={styles.spacer} />
          <Text style={styles.valueText}> Choose Mode </Text>
        </View>
      </View>
      <View style={styles.container2}>
        <View style={styles.dateTextContainer}>
          <Text style={styles.sectionText}> Tournaments: </Text>
          <View style={styles.spacer} />
          <Text style={styles.valueText}> Post To Tournament </Text>
        </View>
      </View>
      <Button onPress={this.onButtonPress.bind(this)} title="Create Scorecard"  />
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
  picker: {
  width: 150,
  height: 44,
  borderColor: 'red',
  borderBottomWidth: 2,
},

pickerItem: {
  height: 44,
  width: 50,
  color: 'red'
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

const mapStateToProps = (state) => ({
  //Game
  gameID: state.currentScorecard.gameID,
  courseID: state.currentScorecard.courseID,
  coursedata: state.currentScorecard.coursedata,
  //Select Tees
  selectedTee: state.selectTees.selectedTee,
  //User Info State
  userID: state.userInfo.userID,
  userImg: state.userInfo.userImg,
  userHdc: state.userInfo.userHdc,
  userName: state.userInfo.userName,

  });

export default connect(mapStateToProps, { openTeesModal, courseData, updateScoreInputInfo, updateCurrentHole })(GameRoomStart);
