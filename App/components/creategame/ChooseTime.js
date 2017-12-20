import React, { Component } from 'react';
import { StyleSheet, Text, Dimensions, View, Image, TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';
import { gameTime } from '../../actions';

class ChooseTime extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      time: 'Click to open time picker',
      isTimePickerVisible: false,

    }
  }

  _showTimePicker = () => this.setState({ isTimePickerVisible: true });

  _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

  _handleTimePicked = (time) => {
    var timeString = time.getHours() + ':' + time.getMinutes();
    console.log('A time has been picked: ', timeString);
    this.props.gameTime(timeString);
    this.setState({ time: timeString });
    this._hideTimePicker();
  };

  render() {
    const { gameTime } = this.props.createGame;
    return (
      <View style={styles.container}>
          <View style={styles.chooseCourseTextContainer}>
            <Image
              source={require('../../images/ic_time.png')}
              style={styles.cancelIcon}
            />
          <Text style={styles.text}> Time </Text>
          </View>
          <View style={styles.textContainer}>
            <TouchableOpacity onPress={ this._showTimePicker}>
            <Text style={styles.courseText}>{ gameTime }</Text>
            </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.isTimePickerVisible}
                mode='time'
                onConfirm={this._handleTimePicked}
                onCancel={this._hideTimePicker}
              />
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
export default connect(mapStateToProps, { gameTime })(ChooseTime);
