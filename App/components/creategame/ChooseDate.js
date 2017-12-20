import React, { Component } from 'react';
import { StyleSheet, Text, Dimensions, View, Image, TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { gameDate } from '../../actions';
import { connect } from 'react-redux';

class ChooseDate extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      day: 'Click to open date picker',
      isDateTimePickerVisible: false,


    }
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    var dateString = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    console.log('A date has been picked: ', dateString);
    this.props.gameDate(dateString);
    this.setState({ day: dateString });
    this._hideDateTimePicker();
  };

  render() {
    const { gameDate } = this.props.createGame;
    return (
      <View style={styles.container}>
          <View style={styles.chooseCourseTextContainer}>
            <Image
              source={require('../../images/ic_calendar.png')}
              style={styles.cancelIcon}
            />
          <Text style={styles.text}> Date </Text>
          </View>
          <View style={styles.textContainer}>
            <TouchableOpacity onPress={ this._showDateTimePicker}>
            <Text style={styles.courseText}>{ gameDate }</Text>
            </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                mode='date'
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
              />
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
export default connect(mapStateToProps, { gameDate })(ChooseDate);
