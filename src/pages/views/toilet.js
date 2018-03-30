
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Dimensions,
  View,
  TouchableNativeFeedback,
} from 'react-native';


// var List = require('./list');
// var Toilet = React.createClass({
//   render: function(){
//     return(
//       // <List type="厕所" nav={this.props.navigator}/>
//       <Text>这是厕所页面</Text>
//     );
//   }
// });

class Toilet extends React.Component {
  render(){
    return(
      <Text>这是厕所页面</Text>
    );
  }
}

module.exports = Toilet;

