/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import { Image, ListView,StyleSheet,Text,View, Dimensions, Platform, TouchableOpacity} from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { courseName } from '../actions'
import { courseID } from '../actions'
import { connect } from 'react-redux';

class CourseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      errorMessage: null,
      lat: null,
      long: null
    };

  }

  componentWillMount() {
   if (Platform.OS === 'android' && !Constants.isDevice) {
     this.setState({
       errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
     });
   } else {
     this._getLocationAsync();
   }
 }

 _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       errorMessage: 'Permission to access location was denied',
     });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ lat: location.coords.latitude, long: location.coords.longitude  });
   console.log(location.coords.latitude);
   this.fetchData();
 };


  fetchData() {
    console.log(this.state.location);
    var REQUEST_URL = 'https://api.swingbyswing.com/v2/courses/search_by_location?lat=' + this.state.lat + '&lng=' + this.state.long + '&radius=20&active_only=yes&hole_count=18&order_by=distance_from_me_miles&from=1&limit=20&access_token=307a7ffd-f771-4d42-944d-c37a2bbdae19';
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.courses),
          loaded: true,
        });
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderCourse.bind(this)}
        style={styles.listView}
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading courses...
        </Text>
      </View>
    );
  }

  chooseCourseHandle(course)  {
    const { navigate } = this.props.navigation;
    console.log("Course Test:" + course.name);
    this.props.courseName(course.name);
    this.props.courseID(course.id);
    console.log("Course Name Test:" + this.props.createGame.courseName);
    console.log("Course ID Test:" + this.props.createGame.courseID);
    navigate('CreateGame');
  };

  renderCourse(course) {
    if(!(course.hasOwnProperty('thumbnail'))){
      console.log("No Thumbnail");
      course['thumbnail'] = 'https://firebasestorage.googleapis.com/v0/b/teeupbeta.appspot.com/o/trump-golf2.jpg?alt=media&token=a36daf93-a4d4-44cb-8474-2103d0fcae84'
    }else{
      console.log("Yes Thumbnail");
    }
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image
          source={{uri: course.thumbnail}}
          style={styles.thumbnail}>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{course.name}</Text>
        </View>
      </Image>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottom}>{course.city} , {course.state_or_province}</Text>
        <View style={styles.spacer}/>
        <TouchableOpacity onPress={ () => this.chooseCourseHandle(course)  }>
          <Text style={styles.bottom}>Choose Course --></Text>
        </TouchableOpacity>
      </View>

      </View>
    );
  }



}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    margin: 10,
  },
  rightContainer: {
    width: Dimensions.get('window').width,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute",
    bottom: 0,
    opacity: 0.9
  },
  title: {
    fontSize: 12,
    marginBottom: 8,
    textAlign: 'center',
    color: '#fff',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: Dimensions.get('window').width,
    height: 150,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  spacer: {
    flex: 1
  },
});

const mapStateToProps = ({ createGame }) => ({ createGame });
export default connect(mapStateToProps, { courseName, courseID })(CourseList);
