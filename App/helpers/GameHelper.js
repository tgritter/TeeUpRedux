
export const thruList = (strokes, startHole) => {
  var thruList = {};
  Object.keys(strokes).forEach(function(key) {
    var strokesArray = strokes[key];
    var thru = calculateThru(strokesArray, startHole);
    thruList[key] = thru;
  });
  return thruList;
};

export const calcThruAll = (thrus, startHole) => {

  var thruAll = startHole;
  var endHole = findEndHole(startHole);
  var count = startHole;
  while(count != endHole){
    if(Object.values(thrus).includes(count)){
      thruAll = count;
      break;
    };
    count = increaseCount(count);
  }
  return thruAll;
};

export const calcStrokePlayRankings = (strokes) => {

  var rankingsList = [];
  var rankingsObj = {};

  Object.keys(strokes).forEach(function(key) {
    var strokesArray = strokes[key];
    var gross = strokesArray.reduce((a, b) => a + b, 0);
    rankingsList.push({scid: key, gross: gross})
  });

  rankingsList.sort(function(a, b){
    return a.gross-b.gross
  })

  var rank = 1;
  var gross = rankingsList[0].gross;

  for (i = 0; i < rankingsList.length; i++) {
    var rankObj = rankingsList[i];
    if(rankObj.gross != gross){
      rank = i + 1;
      gross = rankObj.gross;
    }
    rankingsObj[rankObj.scid] = {gross: rankObj.gross, rank: rank}
  }

  return rankingsObj

}

export const calcStrokePlayHandicapRankings = (strokes, hdcs) => {

  var rankingsList = [];
  var rankingsObj = {};

  Object.keys(strokes).forEach(function(key) {
    var strokesArray = strokes[key];
    var gross = strokesArray.reduce((a, b) => a + b, 0);
    var chdc = hdcs[key]
    var net = gross - chdc
    rankingsList.push({scid: key, gross: net})
  });

  rankingsList.sort(function(a, b){
    return a.gross-b.gross
  })

  var rank = 1;
  var gross = rankingsList[0].gross;

  for (i = 0; i < rankingsList.length; i++) {
    var rankObj = rankingsList[i];
    if(rankObj.gross != gross){
      rank = i + 1;
      gross = rankObj.gross;
    }
    var hdc = hdcs[rankObj.scid]
    rankingsObj[rankObj.scid] = {gross: rankObj.gross, rank: rank, chcp: hdc}
  }

  return rankingsObj

}

export const calcMatchPlayRankings= (strokes) => {

  var rankingsObj = {};

  var strokesList = [];
  var holesWon = [];

  Object.keys(strokes).forEach(function(key) {
    var strokesArray = strokes[key];
    strokesList.push(strokesArray)
    holesWon.push({scid: key, hw: 0})
  });

  for(var i = 0; i <= 17; i++){
    var lowest = 0;
    var winner = -1;
    for(var j = 0; j < holesWon.length; j++){
      var score = strokesList[j][i];
      if(score != 0){
        if(lowest == 0){
          lowest = score;
          winner = j;
        }else if(score == lowest){
          winner = -1;
        }else if(score < lowest){
          lowest = score;
          winner = j;
        }
      }
    }
    if(winner != -1){
      var hwo = holesWon[winner];
      var p = holesWon[winner]['hw'];
      var pp = p + 1;
      holesWon[winner]['hw'] = pp;
    }

      }

      holesWon.sort(function(a, b){
        return b.hw-a.hw
      })

      var rank = 1;
      var hw = holesWon[0].hw;

      for (i = 0; i < holesWon.length; i++) {
        var rankObj = holesWon[i];
        if(rankObj.hw != hw){
          rank = i + 1;
          hw = rankObj.hw;
        }
        rankingsObj[rankObj.scid] = {gross: rankObj.hw, rank: rank}
      }


  return rankingsObj

}


const calculateThru = (strokesArray, startHole) => {
  var thru = 0;
  var endHole = findEndHole(startHole);
  var count = startHole;
  while(count != endHole){
    if(strokesArray[count] == 0){
      thru = count;
      break;
    }
    count = increaseCount(count);
  }
  return thru;
};

const increaseCount = (val) => {
  var newCount = val + 1;
  if(val == 17){
    newCount = 0;
  }
  return newCount;
}

const findEndHole = (sh) => {
  var endHole = 17;
  if(sh > 0){
    endHole = sh - 1;
  }
  return endHole;
}
