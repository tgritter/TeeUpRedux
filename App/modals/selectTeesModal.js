import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Button } from 'react-native';
import { closeTeesModal, selectTee  } from '../actions'
import { connect } from 'react-redux';

class SelectTeesModal extends React.Component {

  constructor(props){
    super(props);
      this.state ={
        chooseTees: 'Choose Tee'
      }
  }




renderTees(){

  var rows = [];

  if(this.props.coursedata){

  var teeBoxes = this.props.coursedata['course']['tee_types'];

  for(var i in teeBoxes){

    var teeType = teeBoxes[i]['tee_type'];

    rows.push(<Button
            style={styles.menubuttons}
            onPress={() => this.setState({chooseTees: teeType})}
            title={teeType}
          />)

  }
}




return rows;

}

chooseTee(teeType){
  this.props.selectTee(teeType);
  console.log("Test");
}


  render() {

    var rows = [];


    if(this.props.coursedata){

    var teeBoxes = this.props.coursedata['course']['tee_types'];

    var tees = [];
    Object.keys(teeBoxes).forEach(function(key) {
      tees.push(teeBoxes[key]['tee_color_type'])
    });

  }








    return (
      <Modal
        animationType={'slide'}
        visible={this.props.selectTeesModalOpen}
        onRequestClose={() => this.props.closeTeesModal()}
        >
        <View style={styles.container}>

          {rows}


        </View>

      </Modal>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rdba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

teesContainer: {
  backgroundColor: 'rdba(0, 0, 0, 0.5)',
  alignItems: 'center',
  justifyContent: 'center',
  height: 50
},
menubuttons: {
  flex: 1,
  alignItems: 'flex-start',
  justifyContent: 'space-between',
},
text: {
  fontSize: 20,
  textAlign: 'center',
},
});

const mapStateToProps = (state) => ({
  //Game
  selectTeesModalOpen: state.selectTees.selectTeesModalOpen,
  coursedata: state.currentScorecard.coursedata


  });

  export default connect(mapStateToProps, { closeTeesModal, selectTee })(SelectTeesModal);
