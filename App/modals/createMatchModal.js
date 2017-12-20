
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Picker, Button } from 'react-native';
import { closeTeesModal } from '../actions';
import {PRIMARY_COLOR} from '../constants/constants'
import firebase from 'firebase';
import { connect } from 'react-redux';
import Modal from 'react-native-modal'

class createMatchModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      gameType: 'Stroke Play',
      handicap: 'Off',
      startHole: '1',
      teamsBool: 'false'
    }
  }

  onButtonPress() {

    var scorecardsRef = firebase.database().ref('scorecards/scorecardData');
    var gameID = this.props.gameID;

    var scorecardRef = scorecardsRef.child(gameID + '/games').push({
      gameType: this.state.gameType,
      handicap: this.state.handicap,
      startHole: this.state.startHole,
      teamsBool: this.state.teamsBool
    });

    this.props.closeTeesModal();

  }

  render() {
    return (
        <Modal
          isVisible={this.props.cgModalOpen}
          backgroundColor={'white'}
          backdropOpacity={0.5}
          mode={'dropdown'}
          onBackButtonPress={ () => this.props.closeTeesModal() }
          onBackdropPress={ () => this.props.closeTeesModal() }
          >
          <View style={styles.container}>
            <View style={styles.gameTypeContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.sectionText}> Game Type: </Text>
              </View>
                <Picker
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  selectedValue={this.state.gameType}
                  onValueChange={gt => {
                    this.setState({gameType: gt})
                  }}>
                  < Picker.Item label='Stroke Play' value='Stroke Play' />
                  < Picker.Item label='Match Play' value='Match Play' />
                < Picker.Item label='Skins***' value='Skins' />
                < Picker.Item label='Stableford***' value='Stableford' />
                < Picker.Item label='High-Low***' value='High-Low' />
                </Picker>
            </View>
            <View style={styles.gameTypeContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.sectionText}> Handicap: </Text>
              </View>
                <Picker
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  selectedValue={this.state.handicap}
                  onValueChange={hcp => {
                    this.setState({handicap: hcp})
                  }}>
                  < Picker.Item label='On' value='On' />
                < Picker.Item label='Off' value='Off' />
                </Picker>
            </View>
            <View style={styles.gameTypeContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.sectionText}> Start Hole: </Text>
              </View>
                <Picker
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  selectedValue={this.state.startHole}
                  onValueChange={sh => {
                    this.setState({startHole: sh})
                  }}>
                  < Picker.Item label='1' value='1' />
                  < Picker.Item label='2' value='2' />
                  < Picker.Item label='3' value='3' />
                  < Picker.Item label='4' value='4' />
                  < Picker.Item label='5' value='5' />
                  < Picker.Item label='6' value='6' />
                  < Picker.Item label='7' value='7' />
                  < Picker.Item label='8' value='8' />
                  < Picker.Item label='9' value='9' />
                  < Picker.Item label='10' value='10' />
                  < Picker.Item label='11' value='11' />
                  < Picker.Item label='12' value='12' />
                  < Picker.Item label='13' value='13' />
                  < Picker.Item label='14' value='14' />
                  < Picker.Item label='15' value='15' />
                  < Picker.Item label='16' value='16' />
                  < Picker.Item label='17' value='17' />
                  < Picker.Item label='18' value='18' />
                </Picker>
            </View>
            <View style={styles.gameTypeContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.sectionText}> Teams: </Text>
              </View>
                <Picker
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  selectedValue={this.state.teamsBool}
                  onValueChange={tb => {
                    this.setState({teamsBool: tb})
                  }}>
                  < Picker.Item label='On' value='true' />
                  < Picker.Item label='Off' value='false' />
                </Picker>
            </View>
            <View style={styles.createbuttoncontainer}>
              <Button
                style={styles.createButton}
                onPress={ () => this.onButtonPress()}
                title="Create Game!"
              />
            </View>
          </View>
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: Dimensions.get('window').width - 30,
  },

  gameTypeContainer: {
    width: Dimensions.get('window').width - 50,
    justifyContent: 'space-around',
    flexDirection: 'row',
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
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 3,
  },
  sectionText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: PRIMARY_COLOR
  },
  spacer: {
    flex: 1
  },
  picker: {
    flex: 3,
    borderColor: 'red',
    borderBottomWidth: 2,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  pickerItem: {
    color: 'red',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  spacer: {
    flex: 1
  },
  createbuttoncontainer: {
    padding: 15
  },

});

const mapStateToProps = (state) => ({
  gameID: state.currentScorecard.gameID,
  cgModalOpen: state.selectTees.selectTeesModalOpen,
  userID: state.userInfo.userID
});



export default connect(mapStateToProps, { closeTeesModal })(createMatchModal);
