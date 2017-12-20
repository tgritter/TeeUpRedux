import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { matchData } from '../../actions';
import { connect } from 'react-redux';
import { thruList, calcThruAll, calcStrokePlayRankings, calcStrokePlayHandicapRankings, calcMatchPlayRankings} from '../../helpers/GameHelper';
import StrokePlayComponent from './StrokePlayComponent'
import StrokePlayHandicapComponent from './StrokePlayHandicapComponent'
import MatchPlayComponent from './MatchPlayComponent'

class GamesComponent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      gameID: this.props.gameid,
      thruAll: 0,
      thruAllList: {},
    }
  }
  renderRows() {

      var rows = [];

      if(this.props.strokes){

      //Load Game Data from Redux
      var strokes = this.props.strokes;
      var scorecards = this.props.gamedata.scorecards;
      var startHole = this.props.gamedata.games[this.props.gameid]['startHole'];
      var gameType = this.props.gamedata.games[this.props.gameid]['gameType'];
      var handicap = this.props.gamedata.games[this.props.gameid]['handicap'];

      //Calculate Thrus
      var sh = startHole - 1;
      var thrus = thruList(strokes, sh);
      var thruAll = calcThruAll(thrus, sh);
      thruAll += 1;

      //Create Handicap Object List
      var hdcs = {}
      Object.keys(scorecards).forEach(function(key) {
        hdcs[key] = scorecards[key]['handicap']
      });

      //Create Handicap Object List
      var userimgs = {}
      Object.keys(scorecards).forEach(function(key) {
        userimgs[key] = scorecards[key]['image']
      });

      //Choose GameType Component to Display
      switch(gameType){
        case 'Stroke Play':
          if(handicap == 'On'){
            rankings = calcStrokePlayHandicapRankings(strokes, hdcs);
            rows.push(<StrokePlayHandicapComponent rankings={rankings} thrus={thrus} imgs={userimgs}/>);
          }else{
            rankings = calcStrokePlayRankings(strokes);
            rows.push(<StrokePlayComponent rankings={rankings} thrus={thrus} imgs={userimgs}/>);
          }
          break;
        case 'Match Play':
            rankings = calcMatchPlayRankings(strokes);
            rows.push(<MatchPlayComponent rankings={rankings} thrus={thrus}/>);
          break;
        default:
          rankings = calcStrokePlayRankings(strokes);
          rows.push(<StrokePlayComponent rankings={rankings} thrus={thrus}/>);
          break;
      }

      //Display Start Hole and Thru
      rows.push(
        <View style={styles.gameDataContainer}>
          <View style={styles.gameTypeContainer}>
            <Text style={styles.gameDataText}> Start Hole: </Text>
            <Text style={styles.gameDataText}> {startHole}  </Text>
          </View>
          <View style={styles.gameHcpContainer}>
            <Text style={styles.gameDataText}> Thru All: </Text>
            <Text style={styles.gameDataText}> { thruAll } </Text>
          </View>
        </View>
      )
    }

      return rows;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.gameDataContainer}>
          <View style={styles.gameTypeContainer}>
            <Text style={styles.gameTypeText}> {this.props.gamedata.games[this.props.gameid]['gameType']}  </Text>
          </View>
          <View style={styles.gameHcpContainer}>
            <Text style={styles.gameTypeText}> Hcp: </Text>
            <Text style={styles.gameTypeText}> {this.props.gamedata.games[this.props.gameid]['handicap']}  </Text>
          </View>
        </View>

        { this.renderRows() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginTop: 10
  },
  gameDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  gameTypeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
    flexDirection: 'row',
  },
  gameHcpContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  gameDataText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  gameTypeText: {
    fontWeight: 'bold',
    fontSize: 20
  },
});

const mapStateToProps = (state) => ({
  gamedata: state.currentScorecard.gamedata,
  strokes: state.currentScorecard.strokes,
});

export default connect(mapStateToProps, { matchData })(GamesComponent);
