
import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  DeviceEventEmitter
} from 'react-native';

import FindList from '../../templement/List'
import PageTitle from '../page.title/page.title'
import Modual from '../../templement/modal'
import {getFixed} from '../../get.data/get.fixed'
export default class ShopPage extends Component {

    constructor(){
      super()
      this.state={
        refreshing:false,
        modalVisible:false
      }
    }
    static navigationOptions = {
    //   title: '购物',
    header:null
    }
    _check(v1,v2){
      // console.warn('v1'+v1)
      // console.warn("v2:"+v2)
    }

    _genBlocks() {
      let no = '1111'
      let name = '感冒令灵'
      let a = []
      for(let i=0;i<10;i++){
        a.push({no:no,name:name,key:i})
      }
      return a;
    }
    _onRefresh(){
      this.setState({refreshing:true})
      this._genBlocks();
      this.setState({refreshing:false})
    }
    render() {
      let data = this.state.refreshing?[]:this._genBlocks()
      return (
        <View style = {{padding:5}}>

            <PageTitle
                onPressLetf = {() =>this.props.navigation.goBack()}
                onPressRight ={() =>this.setState({modalVisible:true})}
                leftTitle = '返回'
                rightTitle = '输入'
                />    
             {/* 库存表 */}
            <View style = {{marginTop:20}}>
                <FindList
                    ref = 'find'
                    data = {data}
                    refreshing = {this.state.refreshing}
                    onRefresh = {()=>this._onRefresh()}
                />
            </View>

          <Modual
            animationType ='fade'
            midData = {getFixed('ShopOut')}
            modalVisible ={this.state.modalVisible}
            title = '售药'
            cancal = {()=>{this.setState({modalVisible:false})}}
            ok= {(inputData)=>{this.setState({modalVisible:false}),DeviceEventEmitter.emit('shopCar', inputData)}}
            footerRight ='前去结算'
            footerLeft = '取消'
          />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    header:{
      flexDirection:'row',
      justifyContent:'space-between',
      borderBottomWidth:0.2,
      // padding:10,
      paddingBottom:15,
    },
    findWay:{
      height:40,
      //elevation:100,
    }
  })

  module.exports = ShopPage;