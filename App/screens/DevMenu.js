import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import firebase from 'firebase';
export default class Main extends React.Component {

  constructor(props){
    super(props);
    var user = firebase.auth().currentUser;
    var userid = user.uid;
    this.itemsRef = this.getRef().child('users/' + userid);
  }

  getRef(){
    return firebase.database().ref();
  }

  componentWillMount(){
    this.getItems(this.itemsRef);
  }

  componentDidMount(){
    this.getItems(this.itemsRef);
  }

  getItems(itemsRef){
    itemsRef.on('value',(snap) => {
        var user = snap.val();
        global.test = user.url

      });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      <Button
        style={styles.menubuttons}
        onPress={() => navigate('ProfileCreate')}
        title="Profile Create"
      />
      <Button
        style={styles.menubuttons}
        onPress={() => navigate('MyProfile')}
        title="My Profile"
      />
      <Button
        style={styles.menubuttons}
        onPress={() => navigate('UserList')}
        title="User List"
      />
      <Button
        style={styles.menubuttons}
        onPress={() => navigate('CreateGame')}
        title="Create Game"
      />
      <Button
        style={styles.menubuttons}
        onPress={() => navigate('CourseList')}
        title="Course List"
      />
      <Button
        style={styles.menubuttons}
        onPress={() => navigate('SwipeCard')}
        title="Swipe Card"
      />
      <Button
        style={styles.menubuttons}
        onPress={() => navigate('GameList')}
        title="Game List"
      />
      <Button
        style={styles.menubuttons}
        onPress={() => navigate('GameFilter')}
        title="Game Filter"
      />
      <Button
        style={styles.menubuttons}
        onPress={() => navigate('DrawerOpen')}
        title="Open Drawer"
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  menubuttons: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  }
});
