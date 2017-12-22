import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ListView, TouchableHighlight } from 'react-native';
import firebase from 'firebase';
import { getTournamentID } from '../../actions';
import { connect } from 'react-redux';

class TournamentList extends React.Component {
  constructor(props){
    super(props);
    let ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
    this.state = {
      itemDataSource: ds
    }

    this.itemsRef = this.getRef().child('tournaments/private');
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
        items.push({
          name: child.val().name,
          type: child.val().tournament_type,
          num: child.val().num_people,
          date: child.val().handicap,
          tournamentID: child.val().tournamentID,
        });
      });
      this.setState({
        itemDataSource: this.state.itemDataSource.cloneWithRows(items)
      });
    });
  }

  pressRow(item){

    this.props.getTournamentID(item.tournamentID);

    const { navigate } = this.props.navigation;
    navigate('Tournament');
  }

  renderRow(item){
    const { navigate } = this.props.navigation;
    return (
      <TouchableHighlight onPress={() => {
        this.pressRow(item)}}>
        <View style={styles.tournamentContainer}>
          <Text style={styles.username}>{item.name}</Text>
          <Text style={styles.username}>{item.type}</Text>
            <Text style={styles.username}>{item.num}</Text>
            <Text style={styles.username}>{item.date}</Text>
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
    marginTop: 30
  },
  tournamentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginTop: 1
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

const mapStateToProps = (state) => ({
  tournamentid: state.tournaments.tournamentID
});
export default connect(mapStateToProps, { getTournamentID })(TournamentList);
