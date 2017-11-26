import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ListView, TouchableHighlight, Dimensions, } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import {PRIMARY_COLOR} from '../constants/constants'

class GameList extends React.Component {
  constructor(){
    super();
    let ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
    this.state = {
      itemDataSource: ds,
      dataSource: null,
    }

    this.itemsRef = this.getRef().child('game');
    this.renderRow = this.renderRow.bind(this);
    this.pressRow = this.pressRow.bind(this);

  }


  getRef(){
    return firebase.database().ref();
  }

  componentDidMount(){

    var REQUEST_URL = this.buildResquestURL();
    console.log('RequestURLTest:' + REQUEST_URL);
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.getItems(this.itemsRef, responseData.courses)
      })
      .done();
  }

  buildResquestURL(){

    var lat = '49.228';
    var lng = '-123.172'

    var url = 'https://api.swingbyswing.com/v2/courses/search_by_location?lat=' + lat +
    '&lng=' + lng  + '&radius=' + this.props.gameFilter.radiusValue +
    '&active_only=yes&hole_count=18&order_by=distance_from_me_miles&from=1&limit=20&access_token=307a7ffd-f771-4d42-944d-c37a2bbdae19';

    return url;
  }

  getCourseIDList(responseData){
    let courseList = [];

    Object.keys(responseData).forEach(function(key) {
      courseList.push(responseData[key]['id']);
    });

    return courseList;
  }

  getItems(itemsRef, responseData){

    var courseList = this.getCourseIDList(responseData);

    let games = []; //List of Games within Radius
    var arrayOfPromises = []; //Promises from Firebase Server Call


    //Get promises for all calls to Firebase with CourseIDs matching CourseList
    for (var key in courseList) {
      arrayOfPromises.push(firebase.database().ref('game').orderByChild("courseid").equalTo(courseList[key]).once('value'));
    }

    //Wait until all async calls to Firebase Complete
    Promise.all(arrayOfPromises).then((arrayOfResults) => {
      arrayOfResults.map((data, i) => {
        let userData = data.val();

        //Then create a list of Matching Games
        if (userData) {
          Object.keys(userData).forEach(function(key) {
            var object = userData[key];
            games.push({
              course: object.course,
              day: object.day,
              time: object.time,
              courseid: object.courseid,
              gameID: object.gameID,
              players: object.players,
              player1image: 'https://firebasestorage.googleapis.com/v0/b/teeupbeta.appspot.com/o/profileImg.png?alt=media&token=f741f56f-c4b8-49c7-9b9a-88be2adedfce',
              player1handicap: '9.0',
              player2image: 'https://firebasestorage.googleapis.com/v0/b/teeupbeta.appspot.com/o/profileImg.png?alt=media&token=f741f56f-c4b8-49c7-9b9a-88be2adedfce',
              player2handicap: '9.0',
              player3image: 'https://firebasestorage.googleapis.com/v0/b/teeupbeta.appspot.com/o/profileImg.png?alt=media&token=f741f56f-c4b8-49c7-9b9a-88be2adedfce',
              player3handicap: '9.0',
              player4image: 'https://firebasestorage.googleapis.com/v0/b/teeupbeta.appspot.com/o/profileImg.png?alt=media&token=f741f56f-c4b8-49c7-9b9a-88be2adedfce',
              player4handicap: '9.0',
            });

            //Get Player Data from Player List
            for (i = 0; i < games.length; i++) {
              var players = games[i]["players"];
              var count = 1;
              Object.keys(players).forEach(function(key) {
                console.log(key + ': ' + players[key]);
                var playerData = games[i]["players"][key];
                Object.keys(playerData).forEach(function(key) {
                  console.log(key + ': ' + playerData[key]);
                  games[i]['player' + count + key] = playerData[key];
                });
                  count = count + 1;
              });
            }
          });
        }
      });

      //Filter Games By Date
      var date = this.props.gameFilter.dateString;
      if(date != 'Any'){
        games = games.filter((game) => game.day == date);
      }


      this.setState({
          itemDataSource: this.state.itemDataSource.cloneWithRows(games)
      });
    });


  }


  pressRow(item){
    const { navigate } = this.props.navigation;
    navigate('GameRoom', {gameid: item.gameID});
  }

  renderRow(item){
    const { navigate } = this.props.navigation;
    return (
      <TouchableHighlight onPress={() => {
        this.pressRow(item);
      }}>
      <View style={styles.listContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.courseText}>{item.course}</Text>
        <Text style={styles.dateTimeText}>{item.day} at {item.time}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: item.player1image}}
          style={styles.thumbnail}
        />
        <Image
          source={{uri: item.player2image}}
          style={styles.thumbnail}
        />
        <Image
          source={{uri: item.player3image}}
          style={styles.thumbnail}
        />
        <Image
          source={{uri: item.player4image}}
          style={styles.thumbnail}
        />
      </View>
      </View>
      </TouchableHighlight>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  listContainer: {
    width: Dimensions.get('window').width - 30,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginTop: 10
  },
  textContainer: {
    width: Dimensions.get('window').width - 30,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: PRIMARY_COLOR
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  courseText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff'
  },
  dateTimeText: {
    fontSize: 16,
    color: '#fff'
  },
  thumbnail: {
    width: 75,
    borderRadius: 50,
    height: 75,
  },
  rightContainer: {
    flex: 1,
  },
});

const mapStateToProps = ({ gameFilter }) => ({ gameFilter });
export default connect(mapStateToProps)(GameList);
