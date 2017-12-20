import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import firebase from 'firebase';

import store from './App/store';
import { AuthScreens } from './App/config/router.js';

const firebaseConfig = {
  apiKey: "AIzaSyB5It-EM89uVqniVRLsz8_BFstIjSmTyx0",
  authDomain: "teeupbetadev.firebaseapp.com",
  databaseURL: "https://teeupbetadev.firebaseio.com",
  projectId: "teeupbetadev",
  messagingSenderId: "974277223857"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <AuthScreens />
      </Provider>
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
});
