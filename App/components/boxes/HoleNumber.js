import React, { Component } from 'react';
import { Text, View, StyleSheet, Picker, Dimensions, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import firebase from 'firebase';

export default class HoleNumber extends React.Component {


  renderRows() {

    var rows = [];

    for(var i = 1; i <= 18; i++){
      rows.push(<View style={styles.strokeContainer}><Text style={styles.paragraph}> {i} </Text></View>)
    }

    return rows;

  }

  render() {


    return (
      <View style={styles.container}>
        <View style={styles.holeTextContainer}>
          <Text style={styles.holeText}> Holes </Text>
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
    backgroundColor: '#000',
  },
  strokeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderWidth: 0.5,
    borderColor: '#d6d7da',

  },
  holeTextContainer: {
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
    color: '#fff',
  },
  holeText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
});
