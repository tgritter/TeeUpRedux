import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Slider,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';

import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';
import {PRIMARY_COLOR} from '../../constants/constants'
import { dateFilter } from '../../actions'

 class DateSelector extends React.Component {
  constructor(props) {
   super(props)
   this.state = {
     isDateTimePickerVisible: false,
     cancelIconVisible: false,
    }
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    var dateString = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    this.props.dateFilter(dateString);
    this.setState({ cancelIconVisible: true })
    this._hideDateTimePicker();
  };

  _handleDateCancel = () => {
    this.props.dateFilter('Any');
    this.setState({ cancelIconVisible: false })
    this._hideDateTimePicker();
  };

  render() {
    const { dateString } = this.props.gameFilter
    return (
      <View style={styles.container}>
          <View style={styles.dateTextContainer}>
            <Text style={styles.dateText}> Date: </Text>
            <View style={styles.spacer} />
            <TouchableOpacity onPress={ this._showDateTimePicker}>
              <Text style={styles.valueText}> { dateString }  </Text>
            </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                mode='date'
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
              />
            { this.state.cancelIconVisible && <TouchableOpacity onPress={ this._handleDateCancel}>
                <Image
                  source={require('../../images/cancel_date_icon.png')}
                  style={styles.cancelIcon}
                />
            </TouchableOpacity> }
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 30,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginTop: 10
  },
  dateTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15
  },
  spacer: {
    flex: 1,
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: PRIMARY_COLOR
  },
  valueText: {
    fontWeight: 'bold',
    fontSize: 18
  },
  cancelIcon: {
    width: 30,
    height: 30
  },
});

const mapStateToProps = ({ gameFilter }) => ({ gameFilter });
export default connect(mapStateToProps, { dateFilter })(DateSelector);
