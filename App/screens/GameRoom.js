import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import { GameRoomTabs } from '../config/router.js';

export default class GameRoom extends React.Component {

  constructor(props){
    super(props);
    const {state} = this.props.navigation;
    this.state = {
      gameid: state.params.gameid
    }
  }

  render() {
    return (
      <GameRoomTabs screenProps={this.state.gameid} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
