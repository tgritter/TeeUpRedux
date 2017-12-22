import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default class TournamentData extends React.Component {
  render() {
    return (
      <View style={styles.container}>
            <Text style={styles.columnText}> Player </Text>
            <Text style={styles.columnText}> R1 </Text>
            <Text style={styles.columnText}> R2 </Text>
            <Text style={styles.columnText}> R3  </Text>
            <Text style={styles.columnText}> R4  </Text>
            <Text style={styles.columnText}> T  </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 30,
    flexDirection: 'row',
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
    marginTop: 1
  },
  columnText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000' 
  },
});
