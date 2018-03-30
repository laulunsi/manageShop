
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  DeviceEventEmitter
} from 'react-native';
import {
  StackNavigator,
  TabNavigator
} from 'react-navigation';

import ShopInList from '../../templement/List'
import Modual from '../../templement/modal'
import {getFixed} from '../../get.data/get.fixed'
export default class shopIn extends Component {
  constructor(){
    super()
    this.state ={
       refreshing:false,
       modalVisible:false
    }
  }

    static navigationOptions = {
        tabBarLabel: '进药',
        title: '进药',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../imgs/film.png')}
          style={ { width: 26,height: 26,tintColor: tintColor}}
        />
      ),
    };
    _getData(){

    }
    _onRefresh(){
      // onPress = {this.setState({modual:true})}
    }
    _genPlus(){
      return(
        <View style = {styles.plus}>
        <TouchableOpacity onPress = {()=>this.setState({modalVisible:true})}>
          <Image
            source={require('../imgs/plus.png')}
            style={ { width: 80,height: 80,}}
        />
        </TouchableOpacity>
      </View>
      )
    }
    render() {
       let data = this.state.refreshing?[]:this._getData()
      return (
        <View >
          <ShopInList
             data = {data}
             refreshing = {this.state.refreshing}
             onRefresh = {()=>this._onRefresh()}
          />
        
          {!this.data?this._genPlus():null}
          <Modual
            midData = {getFixed('shopIn')}
            modalVisible ={this.state.modalVisible}
            title = '进药'
            cancal = {()=>{this.setState({modalVisible:false})  }}
            ok= {(data)=>{this.setState({modalVisible:false}),console.log(data) }}
            animationType ='fade'
            footerRight ='完成'
            footerLeft = '取消'
            judge ={(data)=>{console.warn(data)}}
          />
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    plus:{
      position:'absolute',
      top:350,
      right:50
    }
  })
  module.exports = shopIn;