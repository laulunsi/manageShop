/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
} from 'react-native';

import {
  StackNavigator,
  TabNavigator
} from 'react-navigation';

import MainScreenNavigator from './main.TabNavigator'
// import Find from "./find/find";

import FindPage from './find/find.page'
import ShopPage from './shopOut/select.shop.pages'  

const SimpleApp = StackNavigator({  
   home: { screen: MainScreenNavigator,
    navigationOptions: {
      headerTintColor: 'blue',
      headerStyle: {
        backgroundColor: '#00FFFF',
        height:40,
        alignItems:'stretch',
      },
    },
  },
  find:{screen:FindPage},
  shopPage:{screen:ShopPage},

})
module.exports = SimpleApp;

 