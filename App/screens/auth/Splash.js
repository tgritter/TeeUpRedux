import React from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput } from 'react-native';
import firebase from 'firebase';
import { userID, userImg, userHdc, userName } from '../../actions'

import { connect } from 'react-redux';
class Splash extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      password: '',
      email: '',
    }

    this.itemsRef = this.getRef().child('users');
  }

  getRef(){
    return firebase.database().ref();
  }

componentWillMount() {
  console.disableYellowBox = true;
  firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log('user logged' + user.uid);
          this.getItems(this.itemsRef.child(user.uid));
          const { navigate } = this.props.navigation;
          navigate('Drawer');
        } else {
          console.log('user not logged');
          const { navigate } = this.props.navigation;
          navigate('Login');
        }
     });

}

getItems(itemsRef){
  itemsRef.on('value',(snap) => {
      var user = snap.val();

      this.props.userID(user.userid);
      this.props.userImg(user.url);
      this.props.userHdc(user.handicap);
      this.props.userName(user.username);

    });
}


  onButtonPress() {

    console.log('Auth Test');

    var email = this.state.email;
    var password = this.state.password;

    console.log(email);
    console.log(password);

    firebase.auth().signInWithEmailAndPassword(email, password).then(console.log('Success')).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log('Fail');
      console.log(errorCode);
      console.log(errorMessage);
      // ...
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
          <Image source={require('../../images/bg.jpg')} style={styles.backgroundImage}>
          </Image>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  },
});

const mapStateToProps = ({ userInfo }) => ({ userInfo });
export default connect(mapStateToProps, { userImg, userID, userHdc, userName })(Splash);
