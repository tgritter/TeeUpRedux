import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import firebase from 'firebase';
import SwipeCards from 'react-native-swipe-cards';
import { connect } from 'react-redux';
import {PRIMARY_COLOR} from '../constants/constants'

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.card}>
      <View style={styles.textRow}>
        <Text style={styles.courseText}>{this.props.course}</Text>
        <Text style={styles.dateTimeText}>{this.props.day} at {this.props.time}</Text>
      </View>
      <View>
        <View style={styles.row}>
          <Image style={styles.thumbnail} source={{uri: this.props.player1image}} >
          <View style={styles.textHandicapContainer1}>
            <Text style={styles.textHandicap}>{this.props.player1handicap}</Text>
          </View>
          </Image>
          <Image style={styles.thumbnail} source={{uri: this.props.player2image}} >
          <View style={styles.textHandicapContainer2}>
            <Text style={styles.textHandicap}>{this.props.player2handicap}</Text>
          </View>
          </Image>
        </View>
        <View style={styles.row}>
          <Image style={styles.thumbnail} source={{uri: this.props.player3image}} >
          <View style={styles.textHandicapContainer3}>
            <Text style={styles.textHandicap}>{this.props.player3handicap}</Text>
          </View>
          </Image>
          <Image style={styles.thumbnail} source={{uri: this.props.player4image}} >
          <View style={styles.textHandicapContainer4}>
            <Text style={styles.textHandicap}>{this.props.player4handicap}</Text>
          </View>
          </Image>
        </View>
        </View>
      </View>
    )
  }
}

class NoMoreCards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more cards</Text>
      </View>
    )
  }
}

const cards = [
  {empty: 'empty'},
]

const cards2 = [
  {name: '10', image: 'https://media.giphy.com/media/12b3E4U9aSndxC/giphy.gif'},
]

class SwipeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: cards,
      outOfCards: false,
      test: 'Testing Test',
      gameID: '',
      profileImage: '',
      name: '',
      handicap: ''

    }
    this.itemsRef = this.getRef().child('game');
    var user = firebase.auth().currentUser;
    var userid = user.uid;
    this.playersRef = this.getRef().child('users/' + userid);
  }

  getRef(){
    return firebase.database().ref();
  }


  componentWillMount(){

    var REQUEST_URL = this.buildResquestURL();
    console.log('RequestURLTest:' + REQUEST_URL);
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.getItems(this.itemsRef, responseData.courses)
      })
      .done();

    this.getItems2(this.playersRef);
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
            var imageUrl = 'https://s3-us-west-2.amazonaws.com/teeupbeta/uploads/test7.png'
            games.push({
              course: object.course,
              day: object.day,
              time: object.time,
              courseid: object.courseid,
              gameID: object.gameID,
              players: object.players,
              player1image: imageUrl,
              player1handicap: '9.0',
              player2image: imageUrl,
              player2handicap: '9.0',
              player3image: imageUrl,
              player3handicap: '9.0',
              player4image: imageUrl,
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
          cards: games
      });
    });


  }



  getItems2(itemsRef){
    itemsRef.on('value',(snap) => {
        var user = snap.val();
        this.setState({
          profileImage: user.url,
          name: user.username,
          handicap: user.handicap
        })
      });
  }

  handleYup (card) {
    console.log('The game id is:' + card.gameID);
    var user = firebase.auth().currentUser;
    var userid = user.uid;
    var gameRef = firebase.database().ref('game');
    const playerInfo = {name: this.state.name, image: this.state.profileImage, handicap: this.state.handicap};
    gameRef.child(card.gameID + '/players/' + userid).set(playerInfo);
    const { navigate } = this.props.navigation;
    navigate('GameRoom', {gameid: card.gameID});
  }

  handleNope (card) {
    console.log('Nope')
  }

  cardRemoved (index) {
    const { navigate } = this.props.navigation;
    console.log(`The index is ${index}`);
    let CARD_REFRESH_LIMIT = 3

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

      if (!this.state.outOfCards) {
        console.log(`Adding ${cards2.length} more cards`)

        this.setState({
          cards: this.state.cards.concat(cards2),
          outOfCards: true
        })
      }

    }

  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <SwipeCards
        cards={this.state.cards}
        loop={false}

        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={true}
        showNope={true}

        handleYup={this.handleYup.bind(this)}
        handleNope={this.handleNope}
        cardRemoved={this.cardRemoved.bind(this)}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  card: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textRow: {
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: PRIMARY_COLOR
  },
  thumbnail: {
    width: 150,
    height: 150,
  },
  text: {
    fontSize: 20,
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
  textHandicap: {
    fontSize: 20,
    color: 'white',
    paddingTop: 5,
    paddingBottom: 5,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHandicapContainer1: {
    width: 50,
    height: 50,
    borderTopLeftRadius: 5,
    backgroundColor: 'blue',
    position: "absolute",
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHandicapContainer2: {
    width: 50,
    height: 50,
    borderTopRightRadius: 5,
    backgroundColor: 'blue',
    position: "absolute",
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHandicapContainer3: {
    width: 50,
    height: 50,
    borderBottomLeftRadius: 5,
    backgroundColor: 'blue',
    position: "absolute",
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHandicapContainer4: {
    width: 50,
    height: 50,
    borderBottomRightRadius: 5,
    backgroundColor: 'blue',
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

const mapStateToProps = ({ gameFilter }) => ({ gameFilter });
export default connect(mapStateToProps)(SwipeCard);
