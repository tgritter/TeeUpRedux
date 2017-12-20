import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';

export default class StrokePlayComponent extends React.Component {

constructor(props){
  super(props);
  this.state = {
    rankings: this.props.rankings,
    thrus: this.props.thrus,
  }
}

renderRows() {

    var rows = [];

    var rankings = this.props.rankings;
    var thrus = this.props.thrus;
    var userimgs = this.props.imgs;

    Object.keys(rankings).forEach(function(key) {

      var userurl = userimgs[key];
      var thru = thrus[key] + 1;

      rows.push(
        <View style={styles.rows}>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: userurl}}
              style={styles.thumbnail}
            />
        </View>
        <View style={styles.textContainer}>
        <View style={styles.thruTextContainer}>
          <Text style={styles.gameDataText}> {thru} </Text>
        </View>
      </View>
        <View style={styles.textContainer}>
        <View style={styles.grossTextContainer}>
          <Text style={styles.gameDataText}> { rankings[key]['gross'] }</Text>
        </View>
      </View>
        <View style={styles.textContainer}>
        <View style={styles.rankTextContainer}>
          <Text style={styles.gameDataText}> { rankings[key]['rank'] }</Text>
        </View>
      </View>
        </View>
      )
    });



    return rows;
}


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.gameDataContainer}>
            <Text style={styles.columnText}> Player </Text>
            <Text style={styles.columnText}> Thru </Text>
            <Text style={styles.columnText}> Gross </Text>
            <Text style={styles.columnText}> Rank  </Text>
          </View>
        { this.renderRows() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  rows: {
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
  },
  thruTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0074D9',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  grossTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4e542',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  rankTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  imageContainer: {
    flex: 1,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  thumbnail: {
    width: 60,
    borderRadius: 30,
    height: 60,
  },
});
