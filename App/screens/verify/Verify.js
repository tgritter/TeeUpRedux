import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import firebase from 'firebase';

export default class Main extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      scorecard: props.navigation.state.params.scorecard, 
    }
  }

  verifyScorecard(){


    var scorecard = this.state.scorecard;
    var key = scorecard.user_info.scorecardID
    var scorecardsRef = firebase.database().ref('scorecards/verifiedScorecards/' + key).set(scorecard);
    var uid = scorecard.user_info.userid;


    var tournaments = scorecard['tournaments']

    var tlist = [];

    Object.keys(tournaments).forEach(function(key) {
      tlist.push(tournaments[key])
    });

    var globalData = scorecard['globalData'];
    var globalScore = globalData['global']
    var hcpScore = globalData['hcpScore']
    var scid = globalData['scorecardID']

    console.log('TLIST123' + JSON.stringify(tlist))

    for(var t in tlist){
      var tid = tlist[t]['tournamentID']
      var round = tlist[t]['round']
      var total = tlist[t]['total']
      var newRound = round + 1;
      var newTotal = total + globalScore;
      if(round == 1){
        var tournamentObject = firebase.database().ref('tournaments/private/' + tid + '/users/' + uid + '/r1').set(globalScore);
        var tournamentObject = firebase.database().ref('tournaments/private/' + tid + '/users/' + uid + '/t').set(newTotal);
        var tournamentObject = firebase.database().ref('tournaments/private/' + tid + '/users/' + uid + '/scorecards/' + scid).set(globalData);
        var userTournamentObject = firebase.database().ref('users/' + uid + '/tournaments/' + tid + '/total').set(newTotal);
        var userTournamentObject = firebase.database().ref('users/' + uid + '/tournaments/' + tid + '/current_round').set(newRound);
      }else if(round == 2){
        var tournamentObject = firebase.database().ref('tournaments/private/' + tid + '/users/' + uid + '/r2').set(globalScore);
        var tournamentObject = firebase.database().ref('tournaments/private/' + tid + '/users/' + uid + '/t').set(newTotal);
        var tournamentObject = firebase.database().ref('tournaments/private/' + tid + '/users/' + uid + '/scorecards/' + scid).set(globalData);
        var userTournamentObject = firebase.database().ref('users/' + uid + '/tournaments/' + tid + '/total').set(newTotal);
        var userTournamentObject = firebase.database().ref('users/' + uid + '/tournaments/' + tid + '/current_round').set(newRound);
      }else if(round == 3){
        var tournamentObject = firebase.database().ref('tournaments/private/' + tid + '/users/' + uid + '/r3').set(globalScore);
        var tournamentObject = firebase.database().ref('tournaments/private/' + tid + '/users/' + uid + '/t').set(newTotal);
        var tournamentObject = firebase.database().ref('tournaments/private/' + tid + '/users/' + uid + '/scorecards/' + scid).set(globalData);
        var userTournamentObject = firebase.database().ref('users/' + uid + '/tournaments/' + tid + '/total').set(newTotal);
        var userTournamentObject = firebase.database().ref('users/' + uid + '/tournaments/' + tid + '/current_round').set(newRound);
      }else if(round == 4){
        var tournamentObject = firebase.database().ref('tournaments/private/' + tid + '/users/' + uid + '/r4').set(globalScore);
        var tournamentObject = firebase.database().ref('tournaments/private/' + tid + '/users/' + uid + '/t').set(newTotal);
        var tournamentObject = firebase.database().ref('tournaments/private/' + tid + '/users/' + uid + '/scorecards/' + scid).set(globalData);
        var userTournamentObject = firebase.database().ref('users/' + uid + '/tournaments/' + tid + '/total').set(newTotal);
        var userTournamentObject = firebase.database().ref('users/' + uid + '/tournaments/' + tid + '/current_round').set(newRound);
      }

    }


    //const { navigate } = this.props.navigation;
    //navigate('Leaderboards');


  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Button
          style={styles.menubuttons}
          onPress={() => this.verifyScorecard()}
          title="Verify"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menubuttons: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000'
  },
});
