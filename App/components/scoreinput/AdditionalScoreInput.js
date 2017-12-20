import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { currentHole, updateCurrentHoleScores } from '../../actions';
import firebase from 'firebase';

class AdditionalScoreInput extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      userid: this.props.userid,
      imageURL: this.props.userimage,
      scorecardID: this.props.scorecardID,
      currentHole: this.props.currentHole,
      score: 4
    }
  }

  componentWillMount(){
    var scoreObject = {scorecardID: this.props.scorecardID, currentScore: 4}
    this.props.updateCurrentHoleScores(scoreObject);
  }



    increaseScore() {

      var currentScore = this.state.score + 1;
      var scoreObject = {scorecardID: this.state.scorecardID, currentScore: currentScore}
      this.props.updateCurrentHoleScores(scoreObject);
      this.setState({score: currentScore})

    }

    decreaseScore() {

      var currentScore = this.state.score - 1;
      var scoreObject = {scorecardID: this.state.scorecardID, currentScore: currentScore}
      this.props.updateCurrentHoleScores(scoreObject);
      this.setState({score: currentScore})

    }

    returnScorecard() {

      var scorecardsRef = firebase.database().ref('scorecards/scorecardData/');

      var uid = this.state.userid;
      var sid = this.state.scorecardID;
      var gid = this.props.gameID;

      scorecardsRef.child(gid + '/scorecards/' + sid + '/controlID').set(uid);

    }

  render() {

    return (
      <View style={styles.container}>
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
          <Text style={styles.text}>{this.state.score}</Text>
        </View>
        <TouchableHighlight onPress={() => this.decreaseScore()}>
          <Image
            source={require('../../images/ic_decrease.png')}
            style={styles.navMenuIcon}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.returnScorecard()}>
          <Image
            source={require('../../images/ic_share_scorecard.png')}
            style={styles.navMenuIcon}
          />
        </TouchableHighlight>
      </View>
    );
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
});

const mapStateToProps = (state) => ({
  matchdata: state.currentScorecard.matchdata,
  currenthole: state.currentScorecard.currenthole,
  gameID: state.currentScorecard.gameID,
});

export default connect(mapStateToProps, { currentHole, updateCurrentHoleScores })(AdditionalScoreInput);
