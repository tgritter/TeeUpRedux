import React, { Component } from 'react';
import { Text, View, StyleSheet, Picker, Dimensions, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import firebase from 'firebase';

class PlayerScores extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username: this.props.username,
      scorecardID: this.props.scorecardID
    }
  }

  renderRows() {
    var rows = [];
    var strokesList = this.props.strokes;
    var strokes = strokesList[this.state.scorecardID];

    for(var i = 0; i < 18; i++){
      rows.push(<View style={styles.strokeContainer}><Text style={styles.paragraph}>{strokes[i]}</Text></View>)
    }
    return rows;
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.usernameContainer}>
          <Text style={styles.paragraph}> Username </Text>
        </View>

        {this.renderRows()}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  strokeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderWidth: 0.5,
    borderColor: '#d6d7da',

  },
  usernameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 50,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});

const mapStateToProps = (state) => ({
  strokes: state.currentScorecard.strokes,

});

export default connect(mapStateToProps)(PlayerScores);
