import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import firebase from 'firebase';

import store from './App/store';
import { AuthScreens } from './App/config/router.js';

const firebaseConfig = {
  apiKey: "AIzaSyD1Rov9Jy1XINDDOtqBy_43RcncYpfQ6Qg",
  authDomain: "teeupbeta.firebaseapp.com",
  databaseURL: "https://teeupbeta.firebaseio.com",
  projectId: "teeupbeta",
  storageBucket: "teeupbeta.appspot.com",
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
