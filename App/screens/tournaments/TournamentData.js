import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import {PRIMARY_COLOR} from '../../constants/constants'
import firebase from 'firebase';
import { connect } from 'react-redux';

class TournamentData extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      type: '',
      num: '',
      date: '',
    }
    this.itemsRef = this.getRef().child('tournaments/private/' + this.props.tournamentid);
  }

  getRef(){
    return firebase.database().ref();
  }


  componentWillMount(){
    this.getItems(this.itemsRef);
  }

  getItems(itemsRef){

    itemsRef.on('value',(snap) => {
        var trmnt = snap.val();
        this.setState({
          name: trmnt.name,
          type: trmnt.tournament_type,
          num: trmnt.num_people,
          date: trmnt.submit_date
        })
      });
  }

  addPlayer(){
    var tournamentsRef = firebase.database().ref('tournaments');
    var userRef = firebase.database().ref('users/' + this.props.userID + '/tournaments');

    //Add Player to Tournament Players List
    var userInfo = {userid: this.props.userID, userimage: this.props.userImg, username: this.props.userName, userhdc: this.props.userHdc, r1: 1, r2: 2, r3: 3, r4: 4, t: 10};
    tournamentsRef.child('private/' + this.props.tournamentid + '/users/' + this.props.userID).set(userInfo);

    //Add Tournament to User's Tournament List
    var userTournyInfo = {tournament_id: this.props.tournamentid, tournament_name: this.state.name, current_round: 1, total: 0}
    userRef.child(this.props.tournamentid).set(userTournyInfo);

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container2}>
          <Text style={styles.sectionText}> Name: </Text>
          <View style={styles.spacer}/>
          <Text style={styles.valueText}> { this.state.name } </Text>
        </View>
        <View style={styles.container2}>
          <Text style={styles.sectionText}> Type: </Text>
          <View style={styles.spacer}/>
          <Text style={styles.valueText}> { this.state.type }  </Text>
        </View>
        <View style={styles.container2}>
          <Text style={styles.sectionText}> People: </Text>
          <View style={styles.spacer}/>
          <Text style={styles.valueText}> { this.state.num }  </Text>
        </View>
        <View style={styles.container2}>
          <Text style={styles.sectionText}> Date: </Text>
          <View style={styles.spacer}/>
          <Text style={styles.valueText}> { this.state.date }  </Text>
        </View>
        <Button
          style={styles.menubuttons}
          onPress={() => this.addPlayer()}
          title="Join Tournament"
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
    justifyContent: 'flex-start',
    marginTop: 20
  },
  container2: {
    flexDirection: 'row',
    width: Dimensions.get('window').width - 30,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    margin: 10
  },
  sectionText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: PRIMARY_COLOR,
    margin: 15
  },
  valueText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
    margin: 15
  },
  spacer: {
    flex: 1,
  },
  menubuttons: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  }
});

const mapStateToProps = (state) => ({
  //Tournament Reducer
  tournamentid: state.tournaments.tournamentID,
  //User Info State
  userID: state.userInfo.userID,
  userImg: state.userInfo.userImg,
  userHdc: state.userInfo.userHdc,
  userName: state.userInfo.userName,
});

export default connect(mapStateToProps)(TournamentData);
