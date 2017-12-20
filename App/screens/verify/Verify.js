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

    const { navigate } = this.props.navigation;
    navigate('Leaderboards');
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
