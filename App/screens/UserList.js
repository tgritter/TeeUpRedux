import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ListView, TouchableHighlight } from 'react-native';
import firebase from 'firebase';

export default class Main extends React.Component {
  constructor(props){
    super(props);
    let ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
    this.state = {
      itemDataSource: ds
    }

    this.itemsRef = this.getRef().child('users');
    this.renderRow = this.renderRow.bind(this);
    this.pressRow = this.pressRow.bind(this);
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
      let items = [];
      snap.forEach((child) => {
        items.push({
          username: child.val().username,
          url: child.val().url,
          handicap: child.val().handicap,
          city: child.val().city,
          homecourse: child.val().homecourse,
          bio: child.val().bio,
          userid: child.val().userid
        });
      });
      this.setState({
        itemDataSource: this.state.itemDataSource.cloneWithRows(items)
      });
    });
  }

  pressRow(item){
    const { navigate } = this.props.navigation;
    navigate('ProfileView', { userid: item.userid});
  }

  renderRow(item){
    const { navigate } = this.props.navigation;
    return (
      <TouchableHighlight onPress={() => {
        this.pressRow(item)}}>
      <View style={styles.container2}>
        <Image
          source={{uri: item.url}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.username}>{item.city}</Text>
        </View>
      </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.itemDataSource}
          renderRow={this.renderRow}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  username: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  handicap: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 100,
    borderRadius: 50,
    height: 100,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});
