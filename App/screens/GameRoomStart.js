import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Header from '../components/Header';
import {PRIMARY_COLOR} from '../constants/constants'

export default class GameRoomStart extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.container2}>
          <View style={styles.dateTextContainer}>
            <Text style={styles.sectionText}> Holes to Play: </Text>
            <View style={styles.spacer} />
            <Text style={styles.valueText}> Pick Holes </Text>
          </View>
      </View>
      <View style={styles.container2}>
        <View style={styles.dateTextContainer}>
          <Text style={styles.sectionText}> Start Hole: </Text>
          <View style={styles.spacer} />
          <Text style={styles.valueText}> Pick Start </Text>
        </View>
      </View>
      <View style={styles.container2}>
        <View style={styles.dateTextContainer}>
          <Text style={styles.sectionText}> Competitive: </Text>
          <View style={styles.spacer} />
          <Text style={styles.valueText}> Choose Mode </Text>
        </View>
      </View>
      <View style={styles.container2}>
        <View style={styles.dateTextContainer}>
          <Text style={styles.sectionText}> Tournaments: </Text>
          <View style={styles.spacer} />
          <Text style={styles.valueText}> Post To Tournament </Text>
        </View>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  container2: {
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
  imagePickerContainer: {
    width: Dimensions.get('window').width - 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row'
  },
  dateTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15
  },
  spacer: {
    flex: 1,
  },
  sectionText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 18,
    color: PRIMARY_COLOR
  },
  valueText: {
    fontWeight: 'bold',
    fontSize: 18
  },
  cancelIcon: {
    width: 30,
    height: 30,
    margin: 10
  },
  textInput: {
    flex: 1
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
});
