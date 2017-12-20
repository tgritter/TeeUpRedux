import React from 'react';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';

//Authentication Screens
import Splash from '../screens/auth/Splash';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import Forgot from '../screens/auth/Forgot';
import ProfileCreate from '../screens/auth/ProfileCreate';

//Drawer Nav
import DevMenu from '../screens/DevMenu';

//Profile
import MyProfile from '../screens/profile/MyProfile';
import UserList from '../screens/profile/UserList';
import ProfileView from '../screens/profile/ProfileView';

import CreateGame from '../screens/matchmaking/CreateGame';
import CourseList from '../screens/matchmaking/CourseList';
import SwipeCard from '../screens/matchmaking/SwipeCard';
import GameList from '../screens/matchmaking/GameList';
import GamesFilter from '../screens/matchmaking/GamesFilter';

//GameRoom Screens
import GameRoomData from '../screens/gameroom/GameRoomData';
import GameRoomChat from '../screens/gameroom/GameRoomChat';
import GameRoomStart from '../screens/gameroom/GameRoomStart';
import HeaderScrollView from '../screens/HeaderScrollView';

//Scorecard Screens
import Scorecard from '../screens/scorecard/Scorecard'
import ScorecardFinal from '../screens/scorecard/ScorecardFinal'
import ScorecardInput from '../screens/scorecard/ScorecardInput'
import ScorecardMatch from '../screens/scorecard/ScorecardMatch'
import ScorecardView from '../screens/scorecard/ScorecardView'
import VerifiedScorecardView from '../screens/scorecard/VerifiedScorecardView'

//Verify
import Verify from '../screens/verify/Verify'

//Leaderboards
import Leaderboards from '../screens/leaderboards/Leaderboards'

//Tournaments
import CreateTournament from '../screens/tournaments/CreateTournament'
import TournamentList from '../screens/tournaments/TournamentList'
import TournamentData from '../screens/tournaments/TournamentData'
import TournamentScores from '../screens/tournaments/TournamentScores'
import TournamentMessaging from '../screens/tournaments/TournamentMessaging'

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

export const ScorecardTabs = TabNavigator({
  ScorecardInput: {
    screen:ScorecardInput,
  },
  ScorecardView: {
    screen:ScorecardView,
  },
  ScorecardMatch: {
    screen: ScorecardMatch,
  },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});

export const TournamentTabs = TabNavigator({
  TournamentData: {
    screen:TournamentData,
  },
  TournamentScores: {
    screen:TournamentScores,
  },
  TournamentMessaging: {
    screen: TournamentMessaging,
  },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});




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
    ProfileView: {
      screen: ProfileView,
      navigationOptions: {
        header: null,
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
      screen: GameRoomTabs,
      navigationOptions: {
        header: null,
      },
    },
    Scorecard: {
      screen: ScorecardTabs,
      navigationOptions: {
        header: null,
      },
    },
    ScorecardFinal: {
      screen: ScorecardFinal,
      navigationOptions: {
        header: null,
      },
    },
    Verify: {
      screen: Verify,
      navigationOptions: {
        header: null,
      },
    },
    Leaderboards: {
      screen: Leaderboards,
      navigationOptions: {
        header: null,
      },
    },
    VerifiedScorecardView: {
      screen: VerifiedScorecardView,
      navigationOptions: {
        header: null,
      },
    },
    HeaderScrollView: {
      screen: HeaderScrollView,
      navigationOptions: {
        header: null,
      },
    },
    CreateTournament: {
      screen: CreateTournament,
      navigationOptions: {
        header: null,
      },
    },
    TournamentList: {
      screen: TournamentList,
      navigationOptions: {
        header: null,
      },
    },
    Tournament: {
      screen: TournamentTabs,
      navigationOptions: {
        header: null,
      },
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
