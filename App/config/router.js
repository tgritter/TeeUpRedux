import React from 'react';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';

//Authentication Screens
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Forgot from '../screens/Forgot';
import ProfileCreate from '../screens/ProfileCreate';

//Drawer Nav
import DevMenu from '../screens/DevMenu';
import MyProfile from '../screens/MyProfile';
import UserList from '../screens/UserList';
import ProfileView from '../screens/ProfileView';
import CreateGame from '../screens/CreateGame';
import CourseList from '../screens/CourseList';
import SwipeCard from '../screens/SwipeCard';
import GameList from '../screens/GameList';
import GamesFilter from '../screens/GamesFilter';
import GameRoom from '../screens/GameRoom';
import GameRoomData from '../screens/GameRoomData';
import GameRoomChat from '../screens/GameRoomChat';
import GameRoomStart from '../screens/GameRoomStart';





  export const Drawer = DrawerNavigator({
    DevMenu: {
      screen: DevMenu,
      navigationOptions: {
        title: 'DevMenu',
      },
    },
    ProfileCreate: {
      screen: ProfileCreate,
      navigationOptions: {
        title: 'ProfileCreate',
      },
    },
    MyProfile: {
      screen: MyProfile,
      navigationOptions: {
        header: null,
      },
    },
    UserList: {
      screen: UserList,
      navigationOptions: {
        title: 'UserList',
      },
    },
    CreateGame: {
      screen: CreateGame,
      navigationOptions: {
        header: null,
      },
    },
    CourseList: {
      screen: CourseList,
      navigationOptions: {
        title: 'CourseList',
      },
    },
    SwipeCard: {
      screen: SwipeCard,
      navigationOptions: {
        header: null,
      },
    },
    GameList: {
      screen: GameList,
      navigationOptions: {
        title: 'GameList',
      },
    },
    GamesFilter: {
      screen: GamesFilter,
      navigationOptions: {
        title: 'GamesFilter',
      },
    },
    GameRoom: {
      screen: GameRoom,
      navigationOptions: {
        header: null,
      },
    },
    });

    export const GameRoomTabs = TabNavigator({
      GameRoomData: {
        screen:GameRoomData,
      },
      GameRoomChat: {
        screen:GameRoomChat,
      },
      GameRoomStart: {
        screen: GameRoomStart,
      },
    }, {
      tabBarPosition: 'bottom',
      animationEnabled: true,
      tabBarOptions: {
        activeTintColor: '#e91e63',
      },
    });

    export const AuthScreens = StackNavigator({
      Splash: {
        screen: Splash,
        navigationOptions: {
          header: null,
        },
      },
      Login: {
        screen: Login,
        navigationOptions: {
          title: 'Login',
        },
      },
      Register: {
        screen: Register,
        navigationOptions: {
          title: 'Register',
        },
      },
      Forgot: {
        screen: Forgot,
        navigationOptions: {
          title: 'Forgot',
        },
      },
      ProfileCreate: {
        screen: ProfileCreate,
        navigationOptions: {
          header: null,
        },
      },

      Drawer: {
        screen: Drawer,
      }

    });
