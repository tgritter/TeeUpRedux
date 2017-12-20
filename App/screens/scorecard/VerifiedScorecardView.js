import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, Button } from 'react-native';
import firebase from 'firebase';
import {PRIMARY_COLOR} from '../../constants/constants'
import { connect } from 'react-redux';
import HoleNumber from '../../components/boxes/HoleNumber'

export default class VerifiedScorecardView extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      scorecardID: props.navigation.state.params.scorecardID ,
      userImageURL: '',
      userHandicap: '',
      courseName: '',
      date: '',
      time: '',
      teeType: '',
      rating: '',
      slope: '',
      gross: '',
      globalScore: '',
      hcpScore: '',
      strokesArray: [],
      holeParArray: [],
      scorecard: {}
    }

    this.itemsRef = this.getRef().child('scorecards/verifiedScorecards/' + props.navigation.state.params.scorecardID);
  }

  getRef(){
    return firebase.database().ref();
  }

  componentWillMount(){
    this.getItems(this.itemsRef);

  }

  getItems(itemsRef){

    itemsRef.on('value',(snap) => {
        var scorecard = snap.val();
        console.log('ScorecardIDTEstItem:' + JSON.stringify(scorecard));

        var strokesArray = scorecard.strokes;
        var gross = strokesArray.reduce((a, b) => a + b, 0);

        var rating = scorecard.course_data.rating
        var slope = scorecard.course_data.slope
        var handicap = scorecard.user_info.handicap

        var gs = Math.round((gross - rating)*113/slope)
        var hs = gs - handicap

        this.setState({
          userImageURL: scorecard.user_info.image,
          userHandicap: scorecard.user_info.handicap,
          courseName: scorecard.course_data.course_name,
          date: scorecard.course_data.date,
          time: scorecard.course_data.time,
          teeType: scorecard.course_data.tees,
          rating: scorecard.course_data.rating,
          slope: scorecard.course_data.slope,
          gross: gross,
          globalScore: gs,
          hcpScore: hs,
          strokesArray: scorecard.strokes,
          holeParArray: scorecard.course_data.hole_par,
          scorecard: scorecard
        })

      });
  }

  renderRows() {

      var rows = [          <View style={styles.userNameContainer}>
                  <Text style={styles.strokeText}> {this.state.teeType} </Text>
                </View>];

      var strokesArray = this.state.strokesArray

      for(var i in strokesArray){
        rows.push(
          <View style={styles.strokeContainer}>
            <Text style={styles.strokeText}> {strokesArray[i]} </Text>
          </View>
        );
      }

    return rows;
  }

  submitScorecard(){

    var scorecard = this.state.scorecard;
    var scorecardGlobalData = {
      gross: this.state.gross, global: this.state.globalScore, hcpScore: this.state.hcpScore,
      userimage: scorecard.user_info.image, userid: scorecard.user_info.userid
      }
      scorecard['globalData'] = scorecardGlobalData;


      const { navigate } = this.props.navigation;
      navigate('Verify', {scorecard: scorecard})
  }



  render() {
    //Navigate To Game Room


      return (
        <View style={styles.container}>
          <View style={styles.userCourseContainer}>
            <View style={styles.userImageContainer}>
              <Image source={{uri: this.state.userImageURL}} style={styles.userImage}/>
            </View>
            <View style={styles.courseDateContainer}>
            <View style={styles.courseTextContainer}>
              <Text style={styles.courseText}> {this.state.courseName} </Text>
            </View>

          <View style={styles.dateTimeTextContainer}>
            <Text style={styles.dateTimeText}> {this.state.date} </Text>
            <Text style={styles.dateTimeText}> {this.state.time} </Text>
          </View>
          </View>
        </View>
          <View style={styles.teesLabelContainer}>
            <View style={styles.teesTextContainer}>
              <Text style={styles.teesLabelText}> TeeType </Text>
            </View>
            <View style={styles.teesTextContainer}>
              <Text style={styles.teesLabelText}> Rating </Text>
            </View>
            <View style={styles.teesTextContainer}>
              <Text style={styles.teesLabelText}> Slope </Text>
            </View>
          </View>
          <View style={styles.teesDataContainer}>
            <View style={styles.teesTextContainer}>
              <Text style={styles.teesText}> { this.state.teeType } </Text>
            </View>
            <View style={styles.teesTextContainer}>
              <Text style={styles.teesText}> { this.state.rating } </Text>
            </View>
            <View style={styles.teesTextContainer}>
              <Text style={styles.teesText}> { this.state.slope } </Text>
            </View>
          </View>
          <View style={styles.teesLabelContainer}>
            <View style={styles.teesTextContainer}>
              <Text style={styles.teesLabelText}> Gross </Text>
            </View>
            <View style={styles.teesTextContainer}>
              <Text style={styles.teesLabelText}> Global </Text>
            </View>
            <View style={styles.teesTextContainer}>
              <Text style={styles.teesLabelText}> Hcp </Text>
            </View>
          </View>
          <View style={styles.scoreDataContainer}>
            <View style={styles.scoreTextContainer}>
              <View style={styles.grossTextContainer}>
                <Text style={styles.scoreText}> { this.state.gross } </Text>
              </View>
            </View>
            <View style={styles.scoreTextContainer}>
              <View style={styles.globalTextContainer}>
                <Text style={styles.scoreText}> { this.state.globalScore } </Text>
              </View>
            </View>
            <View style={styles.scoreTextContainer}>
              <View style={styles.hcpTextContainer}>
                <Text style={styles.scoreText}> { this.state.hcpScore } </Text>
              </View>
            </View>
          </View>

          <ScrollView
            contentContainerStyle={styles.contentContainer}
            horizontal={true}
            >
          <View style={styles.scorecardContainer}>
            <HoleNumber/>
            <View style={styles.strokesContainer}>
            { this.renderRows() }
            </View>
          </View>
        </ScrollView>



        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  scorecardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    marginTop: 30,
  },
  contentContainer: {
  paddingVertical: 20
},

  userCourseContainer: {
    width: Dimensions.get('window').width - 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 30
  },
  userImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  courseDateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dateTimeTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateTimeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000'
  },
  teesLabelContainer: {
    width: Dimensions.get('window').width - 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  teesDataContainer: {
    width: Dimensions.get('window').width - 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  teesTextContainer: {
    flex: 1,
  },
  teesLabelText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000'
  },
  teesText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  },
  scoreDataContainer: {
    width: Dimensions.get('window').width - 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreTextContainer: {
    flex: 1,
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
  scoreText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff'
  },
  strokesContainer: {
    width: Dimensions.get('window').width - 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  strokeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  userNameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 50,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  strokeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000'
  },
});
