import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, Image, TouchableOpacity, Dimensions } from 'react-native';
import { closeShareModal } from '../actions';
import { connect } from 'react-redux';
import firebase from 'firebase';

class ShareScorecardModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      gameID: this.props.gameID,
      scorecardID: this.props.scorecardID,
    }
  }

  shareScorecard(uid){

    var sid = this.state.scorecardID;
    var gid = this.props.gameID;
    var userid = uid;

    var scorecardsRef = firebase.database().ref('scorecards/scorecardData/');

    scorecardsRef.child(gid + '/scorecards/' + sid + '/controlID').set(userid);
  }

renderRows(){

  var rows = []
  var users = [];

  scorecards = this.props.gamedata['scorecards'];

  Object.keys(scorecards).forEach(function(key) {
    var image = scorecards[key]['image']
    var uid = scorecards[key]['userid']
    users.push({userimage: image, userid: uid})

  });

  for(var i in users){

    var userObj = users[i];
    var uid = userObj.userid
    rows.push(
    <View style={styles.playerContainer}>
      <TouchableOpacity onPress={ () => this.shareScorecard(uid) }>
      <Image
        source={{uri: userObj.userimage}}
        style={styles.logo}
      />
    <Text style={styles.paragraph}> test </Text>
    </TouchableOpacity>
    </View>
  )

  }

  return rows;

}

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType={'slide'}
          visible={this.props.selectShareModalOpen}
          onRequestClose={() => this.props.closeShareModal()}
          >
          { this.renderRows()}
        </Modal>
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
  playerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    color: '#34495e',
  },
});

const mapStateToProps = (state) => ({
  selectShareModalOpen: state.selectTees.selectShareModalOpen,
  gamedata: state.currentScorecard.gamedata,
  });

  export default connect(mapStateToProps, { closeShareModal })(ShareScorecardModal);
