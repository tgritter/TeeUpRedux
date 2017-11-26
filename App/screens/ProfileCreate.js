import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Image, Dimensions, TouchableOpacity } from 'react-native';

import firebase from 'firebase';
import {PRIMARY_COLOR} from '../constants/constants'
import Exponent, { Constants, ImagePicker, registerRootComponent } from 'expo';
import { RNS3 } from 'react-native-aws3';


export default class ProfileCreate extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username: '',
      handicap: '',
      city: '',
      homecourse: '',
      bio: '',
      imageURL: 'https://firebasestorage.googleapis.com/v0/b/teeupbeta.appspot.com/o/profileImg.png?alt=media&token=f741f56f-c4b8-49c7-9b9a-88be2adedfce'
    }
  }

  onButtonPress() {

    var user = firebase.auth().currentUser;
    var uid = user.uid;
    var username = this.state.username;
    var city = this.state.city;
    var homecourse = this.state.homecourse;
    var uri = this.state.imageURL;

    firebase.database().ref('users/' + uid).set({
      username: username,
      handicap: 0.0,
      city: city,
      homecourse: homecourse,
      url: uri,
      userid: uid,
    });

    const { navigate } = this.props.navigation;
    navigate('Splash');
  }




  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.imagePickerContainer}>
          <TouchableOpacity onPress={ this._takePhoto }>
            <Image source={require('../images/ic_photo_camera.png')} style={styles.cancelIcon} />
          </TouchableOpacity>
          <Image source={{uri: this.state.imageURL}} style={styles.logo}/>
          <TouchableOpacity onPress={ this._pickImage }>
            <Image source={require('../images/ic_photo_album.png')} style={styles.cancelIcon} />
          </TouchableOpacity>
          {this._maybeRenderImage()}
          {this._maybeRenderUploadingOverlay()}
        </View>
      <View style={styles.container2}>
          <View style={styles.dateTextContainer}>
            <Text style={styles.dateText}> Username: </Text>
            <View style={styles.spacer} />
            <View style={styles.textInput} >
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder={("Enter Username")}
                onChangeText={(username) => this.setState({username})}
              />
          </View>
          </View>
      </View>
      <View style={styles.container2}>
          <View style={styles.dateTextContainer}>
            <Text style={styles.dateText}> City: </Text>
            <View style={styles.spacer} />
            <View style={styles.textInput} >
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder={("Enter City")}
                onChangeText={(city) => this.setState({city})}
              />
          </View>
          </View>
      </View>
      <View style={styles.container2}>
          <View style={styles.dateTextContainer}>
            <Text style={styles.dateText}> Homecourse: </Text>
            <View style={styles.textInput} >
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder={("Enter Home Course")}
                onChangeText={(homecourse) => this.setState({homecourse})}
              />
          </View>
          </View>
      </View>
      <Button onPress={this.onButtonPress.bind(this)} title="Create Profile"  />
    </View>
  );
 }

 _maybeRenderUploadingOverlay = () => {
   if (this.state.uploading) {
     return (
       <View
         style={[
           StyleSheet.absoluteFill,
           {
             backgroundColor: 'rgba(0,0,0,0.4)',
             alignItems: 'center',
             justifyContent: 'center',
           },
         ]}>
         <ActivityIndicator color="#fff" animating size="large" />
       </View>
     );
   }
 };

 _maybeRenderImage = () => {
   let { image } = this.state;
   if (!image) {
     return;
   }

   return (
     <View
       style={{
         marginTop: 30,
         width: 250,
         borderRadius: 3,
         elevation: 2,
         shadowColor: 'rgba(0,0,0,1)',
         shadowOpacity: 0.2,
         shadowOffset: { width: 4, height: 4 },
         shadowRadius: 5,
       }}>
       <View
         style={{
           borderTopRightRadius: 3,
           borderTopLeftRadius: 3,
           overflow: 'hidden',
         }}>
         <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
       </View>

       <Text
         onPress={this._copyToClipboard}
         onLongPress={this._share}
         style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
         {image}
       </Text>
     </View>
   );
 };

 _share = () => {
   Share.share({
     message: this.state.image,
     title: 'Check out this photo',
     url: this.state.image,
   });
 };

 _copyToClipboard = () => {
   Clipboard.setString(this.state.image);
   alert('Copied image URL to clipboard');
 };

 _takePhoto = async () => {
   let pickerResult = await ImagePicker.launchCameraAsync({
     allowsEditing: true,
     aspect: [4, 3],
   });

   this._handleImagePicked(pickerResult);
 };

 _pickImage = async () => {
   let pickerResult = await ImagePicker.launchImageLibraryAsync({
     allowsEditing: true,
     aspect: [4, 3],
     quality: 0.6
   });

   this._handleImagePicked(pickerResult);
 };

 _handleImagePicked = async pickerResult => {
   let uploadResponse, uploadResult;

   var user = firebase.auth().currentUser;

   const file = {
     // `uri` can also be a file system path (i.e. file://)
     uri: pickerResult.uri,
     name: user.uid + ".png",
     type: "image/png"
   }

   const options = {
     keyPrefix: "uploads/",
     bucket: "teeupbeta",
     region: "us-west-2",
     accessKey: "AKIAI33SKDAD55O54B4A",
     secretKey: "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",
     successActionStatus: 201
   }

   RNS3.put(file, options).then(response => {
     if (response.status !== 201) {
       throw new Error("Failed to upload image to S3");
       alert('Upload failed, sorry :(');
     } else {
       alert('Upload a success!');
       this.setState({
         imageURL: 'https://s3-us-west-2.amazonaws.com/teeupbeta/uploads/' + user.uid + '.png'
       })
     }
     console.log(response.body);
     /**
      * {
      *   postResponse: {
      *     bucket: "your-bucket",
      *     etag : "9f620878e06d28774406017480a59fd4",
      *     key: "uploads/image.png",
      *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
      *   }   */
   });

 };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
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
  imagePickerContainer: {
    width: Dimensions.get('window').width - 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row'
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
    flex: 1,
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
    height: 30,
    margin: 10
  },
  textInput: {
    flex: 1
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
});
