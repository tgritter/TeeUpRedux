import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ListView, TouchableHighlight } from 'react-native';
import firebase from 'firebase';

export default class Leaderboards extends React.Component {
  constructor(props){
    super(props);
    let ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
    this.state = {
      itemDataSource: ds
    }

    this.itemsRef = this.getRef().child('scorecards/verifiedScorecards');
    this.renderRow = this.renderRow.bind(this);
    this.pressRow = this.pressRow.bind(this);
  }

  getRef(){
    return firebase.database().ref();
  }

  componentWillMount(){
    this.getItems(this.itemsRef);
  }

  getItems(itemsRef){

    itemsRef.on('value',(snap) => {
      let items = [];
      snap.forEach((child) => {
        var scorecard = child.val()
        items.push({
          userimage: scorecard.globalData.userimage,
          username: scorecard.globalData.userid,
          gross: scorecard.globalData.gross,
          global: scorecard.globalData.global,
          hcpScore: scorecard.globalData.hcpScore,
          scorecardID: scorecard.globalData.scorecardID,
        });
      });
      this.setState({
        itemDataSource: this.state.itemDataSource.cloneWithRows(items)
      });
    });
  }

  pressRow(item){
    const { navigate } = this.props.navigation;
    navigate('VerifiedScorecardView', { scorecardID: item.scorecardID});

  }

  renderRow(item){
    const { navigate } = this.props.navigation;
    return (
      <TouchableHighlight onPress={() => {
        this.pressRow(item)}}>
      <View style={styles.container2}>
        <View style={styles.flexContainer}>
        <Image
          source={{uri: item.userimage}}
          style={styles.thumbnail}
        />
    </View>
    <View style={styles.flexContainer}>
    <Text style={styles.username}>{item.username}</Text>
    </View>
    <View style={styles.flexContainer}>
      <View style={styles.grossTextContainer}>
        <Text style={styles.scoreText}> { item.gross } </Text>
      </View>
    </View>
    <View style={styles.flexContainer}>
      <View style={styles.globalTextContainer}>
        <Text style={styles.scoreText}> { item.global } </Text>
      </View>
    </View>
    <View style={styles.flexContainer}>
      <View style={styles.hcpTextContainer}>
        <Text style={styles.scoreText}> { item.hcpScore } </Text>
      </View>
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
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  flexContainer: {
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
  grossTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#47f441',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  globalTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00008B',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  hcpTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B22222',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
