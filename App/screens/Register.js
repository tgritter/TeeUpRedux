import React from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput } from 'react-native';
import firebase from 'firebase';

export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      password: '',
      email: '',
    }
  }

  onButtonPress() {

    var email = this.state.email;
    var password = this.state.password;

    firebase.auth().createUserWithEmailAndPassword(email, password).then(console.log('Success')).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log('Fail');
      console.log(errorCode);
      console.log(errorMessage);

      Alert.alert(
        'Alert Title',
        errorMessage,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
      // ...
    });

    const { navigate } = this.props.navigation;
    navigate('ProfileCreate');
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
          <Image source={require('../images/bg.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
              <View style={styles.logoContainer}>
                <Image source={require('../images/logo.png')} style={styles.logo}/>
                <Text style={styles.subtitle}> A Social Golfing App! </Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={("Enter Email")}
                  onChangeText={(email) => this.setState({email})}
                />
                <TextInput
                  placeholder={("Enter Password")}
                  onChangeText={(password) => this.setState({password})}
                  style={styles.input}
                />
                <Button
                  style={styles.loginButton}
                  onPress={() => {
                    this.onButtonPress();
                  }}
                  title="Register!"
                />
              </View>
              <View style={styles.optionsContainer}>
              <Text style={styles.options} onPress={() => navigate('Login')}>
                Already a member? Login here!
              </Text>
              <Text style={styles.options} onPress={() => navigate('Forgot')}>
                Forgot your password?
              </Text>
              </View>
            </View>
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
  inputContainer: {
    flex: 1,
  },
  input: {
    height: 50,
    width: 300,
    color: 'white',
    backgroundColor: 'rgba(0,100,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  loginButton: {
    height: 50,
    width: 300,
    color: 'white',
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  optionsContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  options: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFF',
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    paddingTop: 25,
  },
  logo: {
    width: 100,
    height: 100,
  },
  subtitle: {
    color: '#FFF',
    fontWeight: 'bold',

  }
});
