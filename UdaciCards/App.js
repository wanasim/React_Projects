import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {Constants} from 'expo'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import reducer from './reducers'
//components
import Decks from './components/Decks'
import newDeck from './components/newDeck'
import DeckInfo from './components/DeckInfo'
import addCard from './components/addCard'
import Quiz from './components/Quiz'
import {setLocalNotification} from './utils/helpers'


function UdaciStatusBar({backgroundColor, ...props}){
  return (
    <View style={{backgroundColor}}>
      <StatusBar barStyle="light-content" translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => < Ionicons name='ios-bookmarks' color={tintColor}/>
    }
  },
  newDeck: {
    screen: newDeck,
    navigationOptions: {
      tabBarLabel: 'newDeck',
      tabBarIcon: ({ tintColor }) => < Ionicons name='ios-bookmarks' color={tintColor}/>
    }
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      title: 'UdaciCards',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      }
    }
  },
  DeckInfo: {
    screen: DeckInfo,
    navigationOptions: {
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: 'black',
    }
  }
  },
  addCard: {
    screen: addCard,
  },
  Quiz: {
    screen: Quiz,

  }
}, {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? 'purple' : 'orange',
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? 'orange' : 'purple',
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})
export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container} >
          <UdaciStatusBar backgroundColor='black'/>
          <MainNavigator/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
