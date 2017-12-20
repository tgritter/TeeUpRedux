import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ListView, TouchableHighlight, TextInput, Button } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';

class GameRoomChat extends React.Component {
  constructor(props){
    super(props);
    let ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
    this.state = {
      itemDataSource: ds,
      gameid: this.props.gameID,
      message: ''
    }

    this.itemsRef = this.getRef().child('messages/gameroom/' + this.props.gameID);
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
          userimg: child.val().userimg,
          message: child.val().message,
        });
      });
      this.setState({
        itemDataSource: this.state.itemDataSource.cloneWithRows(items)
      });
    });
  }

  pressRow(item){
    console.log(item);
  }

  sendMessage(){

    var messagesRef = firebase.database().ref('messages/gameroom/' + this.props.gameID);

    var messageRef = messagesRef.push({
      userimg: global.test,
      message: this.state.message
    });

  }



  renderRow(item){
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image
          source={{uri: item.userimg}}
          style={styles.thumbnail}
        />
          <Text style={styles.username}>{item.message}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.containerList}>
        <ListView
          dataSource={this.state.itemDataSource}
          renderRow={this.renderRow}
          />
          <View style={styles.chatInput}>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder={("Enter Message")}
            onChangeText={(message) => this.setState({message})}
          />
          <Button
            style={styles.createButton}
            onPress={() => this.sendMessage()}
            title="Send"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  containerList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  chatInput: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    flex: 3
  },
  createButton: {
    flex: 1
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

const mapStateToProps = (state) => ({gameID: state.currentScorecard.gameID,});
export default connect(mapStateToProps)(GameRoomChat);
