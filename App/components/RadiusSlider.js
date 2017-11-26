import React, { Component } from 'react';
import {
    StyleSheet,
  Text,
  View,
  Slider,
  Dimensions,
  TouchableOpacity,
  Button,
  Picker,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import {PRIMARY_COLOR} from '../constants/constants'
import { radiusFilter } from '../actions'

 class RadiusSlider extends React.Component {
  constructor(props) {
   super(props)
   this.state = {
     radius: this.props.gameFilter.radiusValue,
    }
  }

  componentWillMount() {
    console.log("State test:" + this.props.gameFilter.radiusValue);
  }

  render() {
    const { radiusValue } = this.props.gameFilter
    return (
      <View style={styles.container}>
          <View style={styles.radiusTextContainer}>
            <Text style={styles.radiusText}> Max Radius: </Text>
            <View style={styles.spacer} />
            <Text style={styles.valueText}> { this.state.radius } km </Text>
          </View>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            step={1}
            thumbTintColor={PRIMARY_COLOR}
            maximumTrackTintColor={PRIMARY_COLOR}
            minimumValue={2}
            maximumValue={150}
            value={this.state.radius}
            onValueChange={val => this.setState({ radius: val })}
            onSlidingComplete={ val => this.props.radiusFilter(val)}
          />
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
  spacer: {
    flex: 1,
  },

});

const mapStateToProps = ({ gameFilter }) => ({ gameFilter });
export default connect(mapStateToProps, { radiusFilter })(RadiusSlider);
