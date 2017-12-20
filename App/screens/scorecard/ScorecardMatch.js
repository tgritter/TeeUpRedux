import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Picker, Button, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { calculateGross, matchData, openTeesModal } from '../../actions';
import Modal from 'react-native-modal'
import {PRIMARY_COLOR} from '../../constants/constants'
import firebase from 'firebase';
import CreateMatchModal from '../../modals/createMatchModal'
import GamesComponent from '../../components/games/GamesComponent'

class ScorecardMatch extends React.Component {


  renderRows() {
      var rows = [];
      if(this.props.gamedata){
        if(this.props.gamedata.games){
          var games = this.props.gamedata.games;
          Object.keys(games).forEach(function(key) {
            rows.push(<View style={styles.strokeContainer}><GamesComponent gameid={key}/></View>)
          });

        }else{
          rows.push(
            <View style={styles.rangeContainer}>
              <TouchableOpacity onPress={ () => this.props.openTeesModal() }>
                <Text>Add Match</Text>
              </TouchableOpacity>
            </View>
          )
        }
      }
      return rows;
  }


  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <CreateMatchModal />
        { this.renderRows() }
        <View style={styles.createGameIcon}>
        <TouchableOpacity onPress={ () => this.props.openTeesModal() }>
          <Image
            source={require('../../images/ic_create_game.png')}
            />
      </TouchableOpacity>
    </View>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 30
  },
  rangeContainer: {
    width: Dimensions.get('window').width,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },

createGameIcon: {
  position: 'absolute',
  bottom: 0,
  right: 0,
  padding: 15
},

  strokeContainer: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  contentContainer: {
  paddingVertical: 20
}
});

const mapStateToProps = (state) => ({
  gameID: state.currentScorecard.gameID,
  scorecardID: state.currentScorecard.scorecardID,
  gamedata: state.currentScorecard.gamedata,
  strokes: state.currentScorecard.strokes,
  matchdata: state.currentScorecard.matchdata
});



export default connect(mapStateToProps, {calculateGross, matchData, openTeesModal })(ScorecardMatch);
