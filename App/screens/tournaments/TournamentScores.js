import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ListView, TouchableHighlight } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';

class TournamentScores extends React.Component {
  constructor(props){
    super(props);
    let ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
    this.state = {
      itemDataSource: ds
    }

    this.itemsRef = this.getRef().child('tournaments/private/' + this.props.tournamentid + '/users');
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
        var player = child.val();
        items.push({
          userimage: player.userimage,
          r1: player.r1,
          r2: player.r2,
          r3: player.r3,
          r4: player.r4,
          t: player.t,
        });
      });
      this.setState({
        itemDataSource: this.state.itemDataSource.cloneWithRows(items)
      });
    });
  }

  pressRow(item){
    console.log("Item Test:" + JSON.stringify(item))
  }

  renderRow(item){
    const { navigate } = this.props.navigation;
    return (
      <TouchableHighlight onPress={() => {
        this.pressRow(item)}}>
      <View style={styles.container2}>
        <View style={styles.textContainer}>
        <Image
          source={{uri: item.userimage}}
          style={styles.thumbnail}
        />
    </View>
        <View style={styles.textContainer}>
        <View style={styles.roundTextContainer}>
          <Text style={styles.gameDataText}> { item.r1 }</Text>
        </View>
      </View>
      <View style={styles.textContainer}>
      <View style={styles.roundTextContainer}>
        <Text style={styles.gameDataText}> { item.r2 }</Text>
      </View>
    </View>
    <View style={styles.textContainer}>
    <View style={styles.roundTextContainer}>
      <Text style={styles.gameDataText}> { item.r3 }</Text>
    </View>
  </View>
  <View style={styles.textContainer}>
  <View style={styles.roundTextContainer}>
    <Text style={styles.gameDataText}> { item.r4 }</Text>
  </View>
</View>
<View style={styles.textContainer}>
<View style={styles.rankTextContainer}>
  <Text style={styles.gameDataText}> { item.t }</Text>
</View>
</View>


      </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.gameDataText}> test </Text>
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
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
    marginTop: 30
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center', 
    backgroundColor: '#F5FCFF',
  },
  listContainer: {
    flex: 1,
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
    width: 60,
    borderRadius: 30,
    height: 60,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  roundTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00008B',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  rankTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B0000',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textContainer: {
    flex: 1,
  },
  gameDataText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff'
  },
  columnText: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    color: '#000'
  },
  gameDataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    flex: 1
  },
});

const mapStateToProps = (state) => ({
  tournamentid: state.tournaments.tournamentID
});
export default connect(mapStateToProps)(TournamentScores);
