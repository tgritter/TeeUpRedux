import React, { Component } from 'react';
import { Text, View, StyleSheet, Picker, Dimensions, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { gameData, strokes, fetchMessages, getGameData, courseData, updateCurrentHole, updateCurrentHoleScores, updateScorecardViewID } from '../../actions';
import UserScoreInput from '../../components/scoreinput/UserScoreInput'
import AdditionalScoreInput from '../../components/scoreinput/AdditionalScoreInput'

class ScorecardInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentHole: 1,
      userTees: '',
      lat: 3,
      long: 4,
      errorMessage: ''
    }
  }

  handlePrev() {

    var scorecardsRef = firebase.database().ref('scorecards/scorecardStrokes/');
    var startHole = Number(this.props.scoreInputInfo['startHole']);
    var currentHole = this.props.currenthole;
    var currentHoleScores = this.props.currentholescores;
    var scorecards = this.props.gamedata.scorecards;
    var userid = this.props.userID;
    var strokes = this.props.strokes;
    var controlIDs = [];
    var so = []

    Object.keys(scorecards).forEach(function(key) {
      if(scorecards[key]["controlID"] == userid ){
        controlIDs.push(scorecards[key]["scorecardID"])
        teeBox = scorecards[key]["teeBox"];
      }
    });

    Object.keys(currentHoleScores).forEach(function(key) {
      var currentHoleArray = currentHole - 1;
      if(controlIDs.includes(key)){
        scorecardsRef.child(key + '/strokes/' + currentHoleArray).set(currentHoleScores[key]);
      }
    });

    var teeBoxes = this.props.coursedata['course']['holes'][currentHole]['tee_boxes']
    var parTeesObj = {}
    for (var s in teeBoxes){
      var teeType = teeBoxes[s]['tee_type'];
      var par =  teeBoxes[s]['par'];
      parTeesObj[teeType] = par;
    }

    Object.keys(strokes).forEach(function(key) {
      var array = strokes[key]
      var value = array[currentHole];
      if(value == 0){
          var teeType = scorecards[key]['teeBox']
          var par = parTeesObj[teeType];
          var scoreObject = {scorecardID: key, currentScore: par}
          so.push(scoreObject)
        }else{
          var scoreObject = {scorecardID: key, currentScore: value}
          so.push(scoreObject)
        }
    });
    for (var s in so){
      this.props.updateCurrentHoleScores(so[s]);
    }

    if(currentHole != startHole){
      if(currentHole == 1){
        currentHole = 18
      }else{
        currentHole -= 1;
      }
      this.props.updateCurrentHole(currentHole);
    }
  }

  getPreviousHole(){

    var prev = ""
    var startHole = Number(this.props.scoreInputInfo['startHole']);
    var currentHole = this.props.currenthole

    if(currentHole != startHole){
      if(currentHole == 1){
        prev = "< Hole 18";
      }else{
        prev = "< Hole " +  (currentHole - 1);
      }
    }
    return prev;

  }

  handleNext() {

    const { navigate } = this.props.navigation;
    var currentHole = this.props.currenthole;
    var endHole = Number(this.props.scoreInputInfo['endHole']);
    var scorecards = this.props.gamedata.scorecards;
    var userid = this.props.userID;
    var currentHoleScores = this.props.currentholescores;
    var scorecardsRef = firebase.database().ref('scorecards/scorecardStrokes/');
    var strokes = this.props.strokes;
    //Check If Scorecard Compeleted
    if(currentHole == endHole){

      //Get Current Scorecard ID and Navigate to Scorecard Final
      var scorecardID = '';
      Object.keys(scorecards).forEach(function(key) {
        if(scorecards[key]["userid"] == userid ){
          scorecardID = key;
        }
      });
      this.props.updateScorecardViewID(scorecardID)
      navigate("ScorecardFinal");

    }else{

      var controlIDs = [];
      var so = [];

      //Add User Score Inputs to Control IDs
      Object.keys(scorecards).forEach(function(key) {
        if(scorecards[key]["controlID"] == userid ){
          controlIDs.push(scorecards[key]["scorecardID"])
          teeBox = scorecards[key]["teeBox"];
        }
      });

      //Add Additional Score Inputs to Control IDs
      Object.keys(currentHoleScores).forEach(function(key) {
        var currentHoleArray = currentHole - 1;
        if(controlIDs.includes(key)){
          scorecardsRef.child(key + '/strokes/' + currentHoleArray).set(currentHoleScores[key]);
        }
      });
      var teeBoxes = this.props.coursedata['course']['holes'][currentHole]['tee_boxes']
      var parTeesObj = {}
      for (var s in teeBoxes){
        var teeType = teeBoxes[s]['tee_type'];
        var par =  teeBoxes[s]['par'];
        parTeesObj[teeType] = par;
      }

      //Get Par or Stroke of Next Hole
      Object.keys(strokes).forEach(function(key) {
        var array = strokes[key]
        var value = array[currentHole];
        if(value == 0){
            var teeType = scorecards[key]['teeBox']
            var par = parTeesObj[teeType];
            var scoreObject = {scorecardID: key, currentScore: par}
            so.push(scoreObject)
          }else{
            var scoreObject = {scorecardID: key, currentScore: value}
            so.push(scoreObject)
          }
      });

      //Update Next Hole Default Score
      for (var s in so){
        this.props.updateCurrentHoleScores(so[s]);
      }

      //Increase Current Hole By One
      if(currentHole == 18){
        currentHole = 1
      }else{
        currentHole += 1;
      }
      this.props.updateCurrentHole(currentHole)
    }
  }

  getEndHole(){

    var end = "Hole >"
    var endHole = Number(this.props.scoreInputInfo['endHole']);
    var currentHole = this.props.currenthole

    if(currentHole == endHole){
      end = "Submit >"
    }else{
      if(currentHole == 18){
         end = "Hole 1 >";
      }else{
         end = "Hole " + (currentHole + 1) + " >";
      }
    }

    return end;

  }



  renderHoleData(){

    var teeBox = this.props.scoreInputInfo['currentTees'];
    var courseData = this.props.coursedata["course"];
    var holeAdjust = this.props.currenthole - 1;
    var teeBoxes = courseData['holes'][holeAdjust]['tee_boxes'];

    var yards = 'Yards: ';
    var hcp = 'HDC: ';
    var par = 'Par: ';

    for(var i in teeBoxes){
      if(teeBoxes[i]['tee_type'] == teeBox){
        yards = "Yards: " + teeBoxes[i]['yards'];
        par = "Par: " + teeBoxes[i]['par'];
        hcp = "HCP: " + teeBoxes[i]['hcp'];
      }
    }
    return(
      <View  style={styles.holeDataContainer}>
      <View style={styles.currentHoleContainer}>
        <Text style={styles.paragraph}>{par}</Text>
        <Text style={styles.paragraph}>{hcp}</Text>
      </View>
      <View style={styles.currentHoleContainer}>
        <Text style={styles.paragraph}>{yards}</Text>
      </View>
      </View>
    )
  }

  renderRows() {
    var rows = [];

    if(this.props.gamedata){

      var teeBox = '';
      var scorecards = this.props.gamedata.scorecards;
      var id = this.props.userID;
      var currentHole = this.state.currentHole;


      Object.keys(scorecards).forEach(function(key) {
        if(scorecards[key]["userid"] == id ){
          rows.push(<UserScoreInput userimage={scorecards[key]["image"]} scorecardID={key} currentHole={ currentHole } userid={ scorecards[key]["userid"] }/>)
          teeBox = scorecards[key]["teeBox"];
        }
      });

      Object.keys(scorecards).forEach(function(key) {
        if(scorecards[key]["controlID"] == id && scorecards[key]["userid"] != id){
          rows.push(<AdditionalScoreInput userimage={scorecards[key]["image"]} scorecardID={key} currentHole={ currentHole } userid={ scorecards[key]["userid"] }/>)
          teeBox = scorecards[key]["teeBox"];
        }
      });
    }
    return rows;
  }


  render() {

    var previousHole = this.getPreviousHole();
    var endHole = this.getEndHole();

    return (
      <View style={styles.container}>
        <View style={styles.currentHoleContainer}>
          <View style={styles.holesLayout}>
          <TouchableOpacity onPress={ () => this.handlePrev() }>
            <Text style={styles.paragraph}>
              {previousHole}
            </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.holesLayout}>
        <Text style={styles.paragraph}>
          Hole {this.props.currenthole}
        </Text>
      </View>
        <TouchableOpacity onPress={ () => this.handleNext() }>
          <View style={styles.holesLayout}>
        <Text style={styles.paragraph}>
          {endHole}
        </Text>
      </View>
        </TouchableOpacity>
        </View>
          {this.renderHoleData()}
        <View style={styles.scoreContainer}>
          {this.renderRows()}
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
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  currentHoleContainer: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
    backgroundColor: '#ecf0f1',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  holeDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  holesLayout: {
    flex: 1,
  },
  spacer: {
    flex: 1,
  },
  paragraph: {
    margin: 12,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});

const mapStateToProps = (state) => ({
  gameID: state.currentScorecard.gameID,
  scorecardID: state.currentScorecard.scorecardID,
  scoreInputInfo: state.currentScorecard.scoreInputInfo,
  gamedata: state.currentScorecard.gamedata,
  matchdata: state.currentScorecard.matchdata,
  coursedata: state.currentScorecard.coursedata,
  userID: state.userInfo.userID,
  currenthole: state.currentScorecard.currenthole,
  currentholescores: state.currentScorecard.currentholescores,
  strokes: state.currentScorecard.strokes,
});

export default connect(mapStateToProps, { updateCurrentHole, updateCurrentHoleScores, updateScorecardViewID })(ScorecardInput);
