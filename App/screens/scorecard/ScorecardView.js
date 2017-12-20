import React, { Component } from 'react';
import { Text, View, StyleSheet, Picker, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import PlayerScores from '../../components/boxes/PlayerScores'
import HoleNumber from '../../components/boxes/HoleNumber'
import { matchData, courseData, getGameData } from '../../actions';

class ScorecardView extends Component {

  componentWillMount(){

    var currentHole = this.props.currenthole - 1;
    console.log('CurrentHoleTest:' + currentHole)
    var teeBoxes = this.props.coursedata['course']['holes'][currentHole]['tee_boxes']
    var parTeesObj = {}
    for (var s in teeBoxes){
      var teeType = teeBoxes[s]['tee_type'];
      var par =  teeBoxes[s]['par'];
      parTeesObj[teeType] = par;
    }
    this.props.onGetGameData(this.props.gameID, currentHole, parTeesObj);
  }

  renderRows() {

    var rows = [];
    if( this.props.strokes != null){
      var strokes = this.props.strokes;
      var scorecards = this.props.gamedata.scorecards;
      var strokesList = {};

      Object.keys(scorecards).forEach(function(key) {
        if(scorecards[key]['scorecardID'] in strokes){
          strokesList[key] = strokes[key];
          rows.push(<View style={styles.strokeContainer}><PlayerScores username={scorecards[key]["handicap"]} scorecardID={key} /></View>)
        }
      });
    }
    return rows;
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        horizontal={true}
        >
      <View style={styles.container}>
        <HoleNumber/>
        {this.renderRows()}
      </View>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#ecf0f1',
    marginTop: 30,
  },
  contentContainer: {
  paddingVertical: 20
},
  strokeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ecf0f1',

  },
  currentHoleContainer: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});

const mapStateToProps = (state) => ({
  gameID: state.currentScorecard.gameID,
  scorecardID: state.currentScorecard.scorecardID,
  gamedata: state.currentScorecard.gamedata,
  strokes: state.currentScorecard.strokes,
  loaded: state.currentScorecard.loaded,
  currenthole: state.currentScorecard.currenthole,
  coursedata: state.currentScorecard.coursedata,
});

const mapDispatchToProps = (dispatch) => ({
  onGetGameData: (gameID, currentHole, parTeesObj) => dispatch(getGameData(gameID, currentHole, parTeesObj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScorecardView);
