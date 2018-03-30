
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
// var Bank = React.createClass({
//   render: function(){
//     return(
//       // <List type="银行" nav={this.props.navigator}/>
//       <Text>这是银行页面</Text>
//     );
//   }
// });


class Bank extends React.Component {
  render(){
    return(
      <Text>这是银行页面</Text>
    );
  }
}
module.exports = Bank;
