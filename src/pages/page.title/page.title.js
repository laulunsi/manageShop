
import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default class Find extends Component {
    render() {
      const {leftTitle,rightTitle} = this.props
      return (
        <View style = {styles.View}>
            <View style = {styles.button}>
              <TouchableOpacity
                onPress = {this.props.onPressLetf}
              >
                <Text style ={{fontSize:17,textAlign:'center'}}>{leftTitle&&leftTitle}</Text>
              </TouchableOpacity>
            </View>
            <View style = {styles.button}>
              <TouchableOpacity onPress = {this.props.onPressRight}>
                <Text style ={{fontSize:17,textAlign:'center'}}>{rightTitle&&rightTitle}</Text>
              </TouchableOpacity>
            </View>
        </View>
      );
    }
  }
const  styles = StyleSheet.create({
  View:{
     paddingLeft:20,
     paddingRight:20,
    // padding:10,
    height:60,
    backgroundColor:'#00FFFF',
    flexDirection:'row',
    justifyContent:'space-between',
    padding:10,
    // marginTop:10
    // position:'absolute',
    //  top:-5

  },
  button:{
    backgroundColor:'#FFE4B5',
    borderRadius:8,
    padding:8
  }
})
  module.exports = Find;