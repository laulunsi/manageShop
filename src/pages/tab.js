import React, { Component } from 'react';
import MainTab from'./main.TabNavigator'
export default class Tab extends Component {
  static navigationOptions = {
    header:null
  }
  render() {
    return (
     <MainTab/>
    );
  }
}