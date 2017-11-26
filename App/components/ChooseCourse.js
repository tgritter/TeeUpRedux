import React, { Component } from 'react';
import { StyleSheet, Text, Dimensions, View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class ChooseCourse extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.chooseCourseTextContainer}>
            <Image
              source={require('../images/ic_golf_flag.png')}
              style={styles.cancelIcon}
            />
          <Text style={styles.text}> Golf Course </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.courseText}>{this.props.createGame.courseName}</Text>
          </View>

        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 30,
  },
  chooseCourseTextContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 18,
  },
  courseText: {
    fontSize: 18,
    margin: 20
  },
  textContainer: {
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
});

const mapStateToProps = ({ createGame }) => ({ createGame });
export default connect(mapStateToProps)(ChooseCourse);
