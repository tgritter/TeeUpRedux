import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import RadiusSlider from '../../components/matchfilter/RadiusSlider'
import DateSelector from '../../components/matchfilter/DateSelector'

 export default class GamesFilter extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <RadiusSlider/>
        <DateSelector/>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
});
