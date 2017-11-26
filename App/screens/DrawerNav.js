import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Drawer } from '../config/router.js';

export default class DrawerNav extends React.Component {
  render() {
    return <Drawer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
