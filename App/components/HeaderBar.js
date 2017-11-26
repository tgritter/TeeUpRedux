import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';

export default class Main extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.barContainer}>
      <View style={styles.navMenuIconContainer}>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('DrawerOpen')}>
          <Image
            source={require('../images/navmenuicon.png')}
            style={styles.navMenuIcon}
          />
        </TouchableHighlight>
      </View>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  barContainer: {
    height: 80,
    width: 400,
    backgroundColor: '#000',
  },
  navMenuIconContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 30,
    paddingLeft: 30,
  },
  navMenuIcon: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: 30,
    width: 30,
  },
});
