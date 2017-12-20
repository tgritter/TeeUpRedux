import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScorecardTabs } from '../../config/router.js';

export default class Scorecard extends React.Component {


  render() {
    return (
      <ScorecardTabs screenProps={'test'}/>
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
