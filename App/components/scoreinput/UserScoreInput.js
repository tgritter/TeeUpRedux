import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { currentHole, updateCurrentHoleScores, openShareModal } from '../../actions';
import firebase from 'firebase';
import ShareScorecardModal from '../../modals/ShareScorecardModal';
import ModalSelector from 'react-native-modal-selector'

class UserScoreInput extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      userid: this.props.userid,
      imageURL: this.props.userimage,
      scorecardID: this.props.scorecardID,
      currentHole: this.props.currentHole,
      textInputValue: ''
    }
  }

  increaseScore() {
    var currentScore = this.props.currentholescores[this.props.scorecardID];
    var currentScorePlus = currentScore + 1;
    var scoreObject = {scorecardID: this.props.scorecardID, currentScore: currentScorePlus}
    this.props.updateCurrentHoleScores(scoreObject);
  }

  decreaseScore() {
    var currentScore = this.props.currentholescores[this.props.scorecardID];
    var currentScoreMin = currentScore - 1;
    var scoreObject = {scorecardID: this.props.scorecardID, currentScore: currentScoreMin}
    this.props.updateCurrentHoleScores(scoreObject);
  }

  returnScorecard(cid) {
    var scorecardsRef = firebase.database().ref('scorecards/scorecardData/');
    var sid = this.state.scorecardID;
    var gid = this.props.gameID;
    scorecardsRef.child(gid + '/scorecards/' + sid + '/controlID').set(cid);
  }

  getBackScorecard() {
    var scorecardsRef = firebase.database().ref('scorecards/scorecardData/');
    var uid = this.state.userid;
    var sid = this.state.scorecardID;
    var gid = this.props.gameID;
    scorecardsRef.child(gid + '/scorecards/' + sid + '/controlID').set(uid);
  }

  render() {  

  var data = [];
  var scorecards = this.props.gamedata.scorecards;
  var scorecard = this.props.gamedata.scorecards[this.props.scorecardID]

  Object.keys(scorecards).forEach(function(key) {
    var username = scorecards[key]["username"]
    var userid = scorecards[key]["userid"]
    data.push({ key: userid, label: username })
  });

  if(this.props.currentholescores){

  //Check if User Controlling Own Scorecard
  if (scorecard['controlID'] == scorecard['userid']){
    return (
        <View style={styles.container}>
          <ShareScorecardModal scorecardID={this.state.scorecardID} gameID={this.props.gameID}/>
          <View style={styles.imagePickerContainer}>
            <Image source={{uri: this.state.imageURL}} style={styles.logo}/>
          </View>
            <TouchableHighlight onPress={() => this.increaseScore()}>
              <Image
                source={require('../../images/ic_increase.png')}
                style={styles.navMenuIcon}
              />
            </TouchableHighlight>
          <View style={styles.textContainer}>
            <Text style={styles.paragraph}>
              { this.props.currentholescores[this.props.scorecardID]}
            </Text>
          </View>
          <TouchableHighlight onPress={() => this.decreaseScore()}>
            <Image
              source={require('../../images/ic_decrease.png')}
              style={styles.navMenuIcon}
            />
          </TouchableHighlight>

            <ModalSelector
              data={data}
              initValue="Select something yummy!"
              supportedOrientations={['landscape']}
              onChange={(option) => this.returnScorecard(option.key)}>
            <Image
              source={require('../../images/ic_share_scorecard_white.png')}
              style={styles.navMenuIcon}
            />
          </ModalSelector>
        </View>
    );
  }else{
    //Set Image of Control User
    var controlImage = '';
    Object.keys(scorecards).forEach(function(key) {
      if(scorecards[key]["userid"] == scorecard['controlID']){
        controlImage = scorecards[key]['image'];
      }
    });
    return (
        <View style={styles.container}>
          <ShareScorecardModal scorecardID={this.state.scorecardID} gameID={this.props.gameID}/>
          <View style={styles.imagePickerContainer}>
            <Image source={{uri: this.state.imageURL}} style={styles.logo}/>
          </View>
          <View style={styles.imagePickerContainer}>
            <Image
              source={require('../../images/ic_scorecard_lock.png')}
              style={styles.navMenuIcon}
            />
          </View>
          <View style={styles.imagePickerContainer}>
            <Image source={{uri: controlImage}} style={styles.logo}/>
          </View>
          <TouchableHighlight onPress={() => this.getBackScorecard()}>
            <Image
              source={require('../../images/ic_get_scorecard_back.png')}
              style={styles.navMenuIcon}
            />
        </TouchableHighlight>
        </View>
    );
  }
}else{
  return(
    <View style={styles.container}/>
  );
}

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: '#006400',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  imagePickerContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row'
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  paragraph: {
    margin: 12,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
});

const mapStateToProps = (state) => ({
  matchdata: state.currentScorecard.matchdata,
  currenthole: state.currentScorecard.currenthole,
  gameID: state.currentScorecard.gameID,
  gamedata: state.currentScorecard.gamedata,
  strokes: state.currentScorecard.strokes,
  coursedata: state.currentScorecard.coursedata,
  currentholescores: state.currentScorecard.currentholescores,
});

export default connect(mapStateToProps, { currentHole, updateCurrentHoleScores, openShareModal })(UserScoreInput);
