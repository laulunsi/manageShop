
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
// var Film = React.createClass({
//   render: function(){
//     return(
//       // <List type="电影院" nav={this.props.navigator}/>
//       <Text>这是电影页面</Text>
//     );
//   }
// });


class Film extends React.Component {
  render(){
    return(
      <Text>这是电影页面</Text>
    );
  }
}
module.exports = Film;
