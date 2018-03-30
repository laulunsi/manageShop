import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';

import{getFixed} from '../../get.data/get.fixed'
import PageTitle from '../page.title/page.title'
import Realm from '../../db.realm/realm'
import List from '../../templement/List'
// import{genAllData,setRealmData} from '../../get.data/get.realm'
import ItemComponen from '../../templement/item'
import Modual from '../../templement/modal'
export default class firstpage extends Component {
  static navigationOptions = {
    tabBarLabel: '首页',
    header:null,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../imgs/food.png')}
        style={ { width: 26,height: 26,tintColor: tintColor}}
      />
    ),
  };
  constructor(){
    super()
    this.state ={
      refreshing:false,
      modalVisible:false,
      placeholder:{}
    }
    this.data = []
  }
  componentDidMount(){
    this._genShopData()
  }
  componentWillMount(){
      this._realm = new Realm()      
      this._realm.realmDb.addListener('change', () => {
        this.forceUpdate()
      })
    }
   
    _genInData(){
      this._realm.selectAll('IN')
      .then((data)=>{
        let findWay = ''
        for(let i in data){
          let{medicineId,price,outTotal,outDate} = data[i]
           findWay = 'medicineId=='+'"'+medicineId+'"'
          //  this._realm.selectBySome('SHOP',findWay)
          //  .then((res)=>{
          //    let {medicineName,total}=res
          //    let obj = {
          //      type:'进药',
          //      name:medicineName,
          //      date:outDate,
          //      total:total,
          //    }
          //    allData.push(obj)
          //    console.warn('添加进药')
          //  })
        }         
      })
      .catch((err)=>{
        console.warn('查询失败'+err)
      })
    }
    _genShopData(){
      this._realm.selectAll('SHOP')
        .then((data)=>{
          for(let i in data){
          let{ medicineId,medicineName,total,price,standard,producter}  = data[i]
            let obj = { 
              number:medicineId,
              name:medicineName,
              total:total,
              price:price,
              standard:standard,
              producter:producter
            }
             this.data.push(obj)
          }
          ToastAndroid.show("查询成功", ToastAndroid.SHORT);
        })
        .catch((e)=>{console.warn('失败'+e), ToastAndroid.show("查询失败,请检查查询内容", ToastAndroid.SHORT)})
    }

    _onRefresh(){
      this.data =[]
      this.setState({refreshing:true})
      this._genShopData();
      this.setState({refreshing:false})
    } 
    _genPlus(){
      return(
        <View style = {styles.plus}>
        <TouchableOpacity onPress = {()=>this.setState({modalVisible:true})}>
          <Image
            source={{uri:'https://t3.ftcdn.net/jpg/00/30/09/92/500_F_30099298_fvSqRFQycW7nEojLk3aranCp5Rn44IdZ.jpg'}}
            style={ { width: 40,height: 40,}}
        />
        </TouchableOpacity>
      </View>
      )
    }
  render() {
    const { navigate } = this.props.navigation; 
    let empty=this.state.refreshing?<View><Text>刷新....</Text></View>:null
    return (
      <View >
        <PageTitle
          onPressLetf = {() => navigate('find')}
          onPressRight ={() => navigate('find')}
          leftTitle = '对症下药'
          rightTitle = '查询'
        />
      <View style = {{height:500}}>
        <List
          numColumns ={2}
          //  data = {data}
          empty={empty}
          data = {this.data?this.data:null}
          refreshing = {this.state.refreshing}
          onRefresh = {()=>this._onRefresh()}
          renderItem = {(item)=><ItemComponen itemData = {item}/>}
        />
      </View>
      
      {this._genPlus()}
        <Modual
            midData = {getFixed('shopIn')}
            modalVisible ={this.state.modalVisible}
            title = '进药'
            cancal = {()=>{this.setState({placeholder:{}}),this.setState({modalVisible:false})  }}
            ok= {(data)=>{this.setState({placeholder:{}}),this.setState({modalVisible:false}),this._shopIn(data)}}
            animationType ='fade'
            footerRight ='确认'
            footerLeft = '取消'
            placeholder = {this.state.placeholder}
            judge = {(data)=>this._judgePlaceholder(data)}
          />
      </View>
    );
  }
  _judgePlaceholder(data){
    let id=data.get('药品编码')
    if(id){
     let findWay = 'medicineId=='+'"'+id+'"'
     let shopData=this._realm.selectBySome('SHOP',findWay)
     let inData=this._realm.selectBySome('IN',findWay)
     // console.warn('结果'+res)
     if(shopData[0]&&inData[0]){
      //  console.warn(shopData[0].price)
       const {medicineName,price,standard,producter}=shopData[0]
       const { supplier }=inData[0]
       let placeholder ={
          medicineName:medicineName,
          standard:standard,
          producter:producter,
          supplier:supplier,
          inPrice:inData[0].price,
          outPrice:price
       }
       this.setState({placeholder:placeholder})
     }else{
      ToastAndroid.show("库存中没有该药品", ToastAndroid.SHORT);
     }
    }
   }
  _shopIn(recData){
    let findWay = 'medicineId=='+'"'+recData.get('药品编码')+'"'
    let shopData=this._realm.selectBySome('SHOP',findWay)
    // console.warn(shopData[0])
    if(shopData[0]){
       this._realm.updateTotal('SHOP',findWay,parseInt(recData.get('采购数量')))
    }else{
      let shopData={
        medicineId: recData.get('药品编码'),//药品编码
        medicineName:recData.get('药品名称'),//药品名称
        total:parseInt(recData.get('采购数量')),//库存量
        price: parseInt(recData.get('零售价')),//零售价
        standard:recData.get('规格'),//规格
        producter:recData.get('生产厂家')//生产厂家
      }
      this._realm.add('SHOP',shopData)
    }

    let inData={
      id:3,//单据号
      medicineId:recData.get('药品编码'),//药品编码
      price: parseInt(recData.get('采购价')),//采购价
      total:parseInt(recData.get('采购数量')),//采购数量
      date:new Date(),//recData.get('采购日期'),//采购日期
      supplier:recData.get('供应商'),//供应商
  }
    this._realm.add('IN',inData)
   
  }
}

const styles = StyleSheet.create({
  plus:{
    position:'absolute',
    top:390,
    right:50
  }
})