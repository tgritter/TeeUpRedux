import firebase from 'firebase';
import {GAME_ID, COURSE_ID_CURRENT, SCORE_INPUT_INFO, GAME_DATA, STROKES, ACTION_TYPES, MATCH_DATA, COURSE_DATA, CURRENT_HOLE, CURRENT_HOLE_SCORES} from './types'

//Update on Game Room Load
export const updateGameID = payload => ({ type: GAME_ID, payload });
export const updateCourseID = payload => ({ type: COURSE_ID_CURRENT, payload });
export const updateScoreInputInfo = payload => ({ type: SCORE_INPUT_INFO, payload });
export const updateCurrentHole = payload => ({ type: CURRENT_HOLE, payload });
export const gameData = payload => ({ type: GAME_DATA, payload });
export const strokes = payload => ({ type: STROKES, payload });
export const courseData = payload => ({ type: COURSE_DATA, payload });
export const updateCurrentHoleScores = payload => ({ type: CURRENT_HOLE_SCORES, payload });


//TODO
export const matchData = payload => ({ type: MATCH_DATA, payload });


export function getGameData(gameID, currentHole, parTeesObj) {
  return dispatch => {
    dispatch(getInviteRequestedAction());
    return firebase.database().ref().child('scorecards/scorecardData/' + gameID).on('value', snap => {
      const invite = snap.val();

      var scorecards = invite.scorecards;
      var scorecardIDs = [];
      var scorecardPar = [];


      Object.keys(scorecards).forEach(function(key) {

        scorecardIDs.push(scorecards[key]['scorecardID'])

      });
      Object.keys(scorecards).forEach(function(key) {

        var teeBox = scorecards[key]['teeBox']
        var par = parTeesObj[teeBox]

        scorecardPar.push(par)

      });
      for(var s in scorecardIDs){


        dispatch(GetStrokesData(scorecardIDs[s], scorecardPar[s], currentHole))

      }


      dispatch(getInviteFulfilledAction(invite))
    })

  }
}

function GetStrokesData(scorecardID, par, currentHole) {

  return dispatch => {
    dispatch(getInviteRequestedAction());
    return firebase.database().ref().child('scorecards/scorecardStrokes/' + scorecardID + '/strokes').on('value', snap => {
      console.log("TeesObjectTest:" + JSON.stringify(par));
      var array = snap.val()

      const invite = {strokes: array, scorecardID: scorecardID};
      dispatch(getStrokesFulfilledAction(invite));

      var score = array[currentHole]
      var currentScore = {};

      if(score == 0){
        currentScore = {currentScore: par, scorecardID: scorecardID};
      }else{
        currentScore = {currentScore: score, scorecardID: scorecardID};
      }


      dispatch(getStartHoles(currentScore));
    })

  }
}

function getInviteRequestedAction() {
  return {
    type: ACTION_TYPES.GetInviteRequested
  };
}

function getInviteRejectedAction() {
  return {
    type: ACTION_TYPES.GetInviteRejected
  }
}

function getInviteFulfilledAction(payload) {

  return {
    type: ACTION_TYPES.GetInviteFulfilled,
    payload
  };
}

function getStrokesFulfilledAction(payload) {

  return {
    type: ACTION_TYPES.GetStrokesFulfilled,
    payload
  };
}

function getStartHoles(payload) {

  return {
    type: ACTION_TYPES.GetStartHoles,
    payload
  };
}
