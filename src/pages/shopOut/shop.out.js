
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  DeviceEventEmitter,
  Alert
} from 'react-native';

import ShopOutList from '../../templement/List'
import Modual from '../../templement/modal'
import ShopCarPages from '../shop.car.pages/ShoppingCarPage'
import Realm from '../../db.realm/realm'
import {getFixed,setshopCarData,retShopCarData} from '../../get.data/get.fixed'
export default class ShopOut extends Component {

   constructor(){
    console.log('constructor')
     super()
     this.state ={
       refreshing:false,
       modalVisible:false,
       placeholder:{},
       currentData:{}
     }
     
    
   }
    static navigationOptions = {
      tabBarLabel: '购物车',
      title: '购物车',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../imgs/sell.png')}
          style={ { width: 25,height: 25,tintColor: tintColor}}
        />
      ),
    };

    _getData(){
      let data = setshopCarData(this.reciveData)
      return data
    }
    _onRefresh(){

    }

    componentDidMount() {
      let lastdata = {}//标志最后一个输入的是啥
      this.deEmitter = DeviceEventEmitter.addListener('shopCar', (recieveData) => {      
          // lastdata = recieveData
          if(lastdata.inputData === recieveData.inputData&&recieveData.type ==='finsh'){
             setshopCarData({type:'noInputData'})
          }else{
            setshopCarData(recieveData)
            lastdata = recieveData
          }   
      });
      this._realm = new Realm()
  }
  componentWillUnmount() {
      this.deEmitter.remove();
  }
  _judgePlaceholder(data){
   let id=data.get('药品编码')
   if(id){
    let findWay = 'medicineId=='+'"'+id+'"'
    let res=this._realm.selectBySome('SHOP',findWay)
    // console.warn('结果'+res)
    if(res[0]){
      this.setState({placeholder:res[0]})
    }else{
      // Alert.alert('库存没有该药品')
    }
   }
  }
    _genText(){
      return (
      <View style = {[styles.plus,{backgroundColor:'#6495ED',flex:1,borderRadius:8}]}>
          <View style = {styles.rowText}>
            <Text style={[styles.text,{textAlign: 'right'}]}>应收药款：</Text>
            <Text style={styles.text}>10</Text>
          </View>
          <View  style = {styles.rowText}>
            <Text style={[styles.text,{textAlign: 'right'}]}>实收金额:</Text>
            <Text style={styles.text}>10</Text>
          </View>
          <View  style = {styles.rowText}>
            <Text style={[styles.text,{textAlign: 'right'}]}>找零: </Text>
            <Text style={styles.text}>2</Text>
          </View>
          <View style = {styles.textFooter}> 
          <TouchableOpacity >
              <Text style={[styles.text,{textAlign: 'center'}]}>完成售药</Text>
          </TouchableOpacity>
          </View>
           
        </View>
      )
    }   
    _add(inputData){
      let data={
        outId: 1,//顾客号：编程自动生成（从1开始，每次加1）。
        medicineId:inputData.get('药品编码'),//药品编码
        price: parseInt(inputData.get('单价')) ,//单价
        total:parseInt(inputData.get('销售数量')),//销售数量
        date:new Date(),//销售日期
      }
      this._realm.add('OUT',data)
    }
    _genPlus(){
      const { navigate } = this.props.navigation; 
      return(
        <View style = {styles.plus}>
        <TouchableOpacity onPress ={() => {this.setState({modalVisible:true})}}>
          <Image
            source={require('../imgs/sell.png')}
            style={ { width: 40,height: 40,padding:10}}
        />
        </TouchableOpacity>
      </View>
      )
    }
    render() {
      
      let data = retShopCarData()
      return (
        <View style = {{flex:1}}>
          <ShopCarPages
             data = {data?data:null}
             onBalance = {()=>{setshopCarData(this.state.currentData),this.setState({currentData:{type:' '}})}}
          />
          {this._genPlus()}
          <Modual
            animationType ='fade'
            midData = {getFixed('ShopOut')}
            modalVisible ={this.state.modalVisible}
            title = '售药'
            cancal = {(inputData)=>{this.setState({placeholder:{}}),this.setState({modalVisible:false})}}
            ok= {(inputData)=>{this.setState({placeholder:{}}),this.setState({modalVisible:false}),this._add(inputData),DeviceEventEmitter.emit('shopCar', {inputData,type:'finsh'})}}
            footerRight ='完成'
            footerLeft = '取消'
            placeholder = {this.state.placeholder}
            judge = {(data)=>this._judgePlaceholder(data)}
          />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    plus:{
      position:'absolute',
      top:300,
      right:40,
      backgroundColor:'rgba(220,220,220,0.8)'
    },
    text:{
      color: '#E6E6FA',
      padding:5,
      fontSize: 16,
      lineHeight:30
    },
    rowText:{
      flex:1,
      flexDirection:'row',
     
    },
    textFooter:{
      marginTop:3,
      borderTopWidth:0.5,
      backgroundColor:'#32CD32',
      borderBottomLeftRadius:5,
      borderBottomRightRadius:5,
      // elevation:100,
    }
  })


  module.exports = ShopOut;