import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, PanResponder, Animated, Easing, Dimensions } from 'react-native';
import { connect } from 'react-redux';

class Header extends React.Component {

  constructor(props){
    super(props);
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(200);
  }

  handleClick() {
    Animated.timing(this.animatedValue, {
      toValue: 400,
      duration: 1000,
    }).start()
  }


  render() {
    const animatedStyle = { height:this.animatedValue }
    return (
        <Animated.View style={[styles.container, animatedStyle]}>
          <Image
            source={require('../images/hawaiicourse.jpg')}
            style={styles.headerImage}>
            <View style={styles.navMenuIconContainer}>
              <TouchableHighlight onPress={() => this.props.navigate('DrawerOpen')}>
                <Image
                  source={require('../images/ic_menu.png')}
                  style={styles.navMenuIcon}
                />
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this.handleClick()}>
                <Image
                  source={require('../images/ic_more.png')}
                  style={styles.navMenuIcon}
                />
              </TouchableHighlight>
            </View>
            <View style={styles.profileImgContainer}>
                <TouchableHighlight onPress={() => console.log(this.animatedValue)}>
                  <Image
                    source={{uri: this.props.userInfo.userImg}}
                    style={styles.profileImage}
                  />
              </TouchableHighlight>
            </View>
          </Image>
        </Animated.View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: Dimensions.get('window').width
  },
  headerImage: {
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  navMenuIconContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
  },
  navMenuIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 30,
  },
  profileImgContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#0A3409'
  },

});

const mapStateToProps = ({ userInfo }) => ({ userInfo });
export default connect(mapStateToProps,)(Header);
