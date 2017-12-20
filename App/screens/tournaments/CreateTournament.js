import React, { Component } from 'react';
import { StyleSheet, Text, View, Picker, Dimensions, Slider, TouchableOpacity, Button, TextInput } from 'react-native';
import {PRIMARY_COLOR} from '../../constants/constants'
import DateTimePicker from 'react-native-modal-datetime-picker';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { getTournamentID } from '../../actions';

class CreateTournament extends React.Component {

  constructor(){
    super();
    this.state = {
      tournamentType: 'Choose Type',
      name: 'Choose Name',
      numPeople: 20,
      isDateTimePickerVisible: false,
      cancelIconVisible: false,
      dateString: 'Choose Date'
    }
  }

  getTournamentTypes(){
    var tournamentTypes =  [
      'Golf Royale',
      'Turbo',
      'Best Ball',
      'Same Tee'
    ];
    return tournamentTypes;
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {

    var dateString = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    this.setState({
      cancelIconVisible: true,
      dateString: dateString
    })
    this._hideDateTimePicker();
  };

  createTournament(){

    var tournamentsRef = firebase.database().ref('tournaments');
    var name = this.state.name;
    var type = this.state.tournamentType;
    var numPpl = this.state.numPeople;
    var date = this.state.dateString;
    var userid = this.props.userID;

    var userInfo = {userid: this.props.userID, userimage: this.props.userImg, username: this.props.userName, userhdc: this.props.userHdc, r1: 1, r2: 2, r3: 3, r4: 4, t: 10};

    var tournamentRef = tournamentsRef.child('private').push({
      tournament_type: type,
      num_people: numPpl,
      submit_date: date,
      name: name
    })

    var key = tournamentRef.key;
    tournamentsRef.child('private/' + key + '/users/' + userid).set(userInfo);
    tournamentsRef.child('private/' + key + '/tournamentID').set(key);

    this.props.getTournamentID(key);

    const { navigate } = this.props.navigation;
    navigate('Tournament');
  }

  render() {

    var tournamentTypes = this.getTournamentTypes();

    return (
      <View style={styles.container}>
        <View style={styles.container2}>
            <View style={styles.dateTextContainer}>
              <Text style={styles.sectionText}> Name: </Text>
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  placeholder={("Chose Name")}
                  onChangeText={(tn) => this.setState({name: tn})}
                />
            </View>
        </View>
          <View style={styles.container2}>
              <View style={styles.dateTextContainer}>
                <Text style={styles.sectionText}> Type: </Text>
                <View style={styles.spacer} />
                  <Picker
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    selectedValue={this.state.tournamentType}
                    onValueChange={tt => {
                      this.setState({tournamentType: tt})
                    }}>
                    {tournamentTypes.map((item, index) => {
                       return (< Picker.Item label={item} value={item} key={index} />);
                    })}
                  </Picker>
              </View>
          </View>
          <View style={styles.container2}>
            <View style={styles.radiusTextContainer}>
              <Text style={styles.radiusText}> People Max: </Text>
              <View style={styles.spacer} />
              <Text style={styles.valueText}> { this.state.numPeople } ppl </Text>
            </View>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              step={1}
              thumbTintColor={PRIMARY_COLOR}
              maximumTrackTintColor={PRIMARY_COLOR}
              minimumValue={2}
              maximumValue={100}
              value={this.state.numPeople}
              onValueChange={val => this.setState({ numPeople: val })}
              onSlidingComplete={ val => this.setState({numPeople: val})}
            />
          </View>
          </View>
          <View style={styles.container2}>
            <View style={styles.radiusTextContainer}>
              <Text style={styles.radiusText}> SubmitDate: </Text>
              <View style={styles.spacer} />
                <TouchableOpacity onPress={ this._showDateTimePicker}>
                  <Text style={styles.valueText}> { this.state.dateString }  </Text>
                </TouchableOpacity>
            </View>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                mode='date'
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
              />
          </View>
          <Button
            style={styles.menubuttons}
            onPress={() => this.createTournament()}
            title="Create Tournament"
          />
          </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20
  },
  container2: {
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
    margin: 10
  },
  dateTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15
  },
  spacer: {
    flex: 1,
  },
  sectionText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 18,
    color: PRIMARY_COLOR
  },
  picker: {
  width: 150,
  height: 44,
  borderColor: 'red',
  borderBottomWidth: 2,
},

pickerItem: {
  height: 44,
  width: 50,
  color: 'red'
},
radiusTextContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  padding: 15
},
radiusText: {
  fontWeight: 'bold',
  fontSize: 18,
  color: PRIMARY_COLOR
},
valueText: {
  fontWeight: 'bold',
  fontSize: 18
},
sliderContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FFF',
  paddingBottom: 15
},
slider: {
  width: Dimensions.get('window').width - 40,
  justifyContent: 'flex-start',
  alignItems: 'center',
  borderRadius: 50,
},
valueText: {
  fontWeight: 'bold',
  fontSize: 18
},
menubuttons: {
  flex: 1,
  alignItems: 'flex-start',
  justifyContent: 'space-between',
},
input: {
  flex: 1,
  marginRight: 20,
  fontWeight: 'bold',
  fontSize: 18,
  color: '#000'
},
});

const mapStateToProps = (state) => ({
  //Tournament Reducer
  tournamentid: state.tournaments.tournamentID,
  //User Info State
  userID: state.userInfo.userID,
  userImg: state.userInfo.userImg,
  userHdc: state.userInfo.userHdc,
  userName: state.userInfo.userName,
});

export default connect(mapStateToProps, { getTournamentID })(CreateTournament);
