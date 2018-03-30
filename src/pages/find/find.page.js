
import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';



import Input from '../../templement/input'
import FindWay from './ExpandList'
import FindList from '../../templement/List'
import ItemComponen from '../../templement/item'
import Realm from '../../db.realm/realm'
import {dateFormat} from '../../get.data/date.format' 
import TimePick from '../../templement/time.picker'

// const Date = new TimePick()
export default class FindPage extends Component {
    constructor(){
      super()
      this.state={
        refreshing:false,
        update:false,
        defaultValue:''
      }
      this.data = []
    }
    static navigationOptions = {
      title: '信息查询',
      // header:null,
    }
    componentWillMount(){
      // dataOut = {
      //   outId: 1,
      //   medicineId:'1234',
      //   price: 20,
      //   outTotal:30,
      //   outDate:new Date()
      // },
      //   dataShop ={
      //     medicineId:  '1234',//药品编码
      //     medicineName:'感冒灵',//药品名称
      //     total:80,//库存量
      //     outPrice: 20,//零售价
      //     standard:'6盒医疗',//规格
      //     producter:'科大制药'//生产厂家
      // }
        this._realm = new Realm()        
        this._realm.realmDb.addListener('change', () => {
          this.forceUpdate()
        })
      }

    _onSubmit(item){
       this._findData(this.refs.input.value,item)
    }
    _findData(value,findWay){
      //按药品代码，药品名称，采购日期查询
      if(findWay ==='库存查询'){
        if(this.state.defaultValue!==''){
          this.data=[]
          ToastAndroid.show("查询失败,没有这种操作", ToastAndroid.SHORT)
          return
        }
        this._genData(value,'SHOP')
      }else if(findWay ==='进药查询'){
        this._genData(value,'IN')
      }else if(findWay === '售药查询'){
        this._genData(value,'OUT')
      }else{
      }
    }
    _genShopData(medicineId){
        let res = this._realm.selectBySome('SHOP',medicineId)
        return res[0] ;
    }
    _genData(value,tableName){
      // let{ medicineName,total,price,standard,producter}  = this._genShopData(id)
      this.data = []
      this._realm.selectAll(tableName)
      .then((data)=>{
        let id = ''
        for(let i in data){
          let{medicineId,price,total,date} = data[i]
          //按照日期查询
           let d = date?dateFormat('yyyy年MM月dd',date):null
            id ='medicineId=='+'"'+medicineId+'"'
            let { medicineName } = this._genShopData(id)
            //药名或者id
          if(medicineId ===value||medicineName===value||this.state.defaultValue===(d+'日')){
            let obj = {
              type:tableName,
              number:medicineId,
              name:medicineName,
              date:date,
              total:total,
              price:price,
            }
            this.data.push(obj)
          }
        } 
        this.setState({update:!this.state.update})
      })
      .catch((e)=>console.warn("失败"+e))
    }
  
    _onRefresh(){
   
    }
  
    render() {
      return (
        <View style = {{padding:5,paddingTop:10,}}>
        {/* 输入框和查询方式 */}
           <View style={styles.header}>
           <View style={styles.searchBox}> 
            <Input
                style={styles.inputText}  
                  ref ='input'
                  height = {40} 
                  defaultValue ={this.state.defaultValue}
                  onFocus = {()=>{this.refs.input.clear()}}
            />
            <TouchableOpacity onPress = {()=>this.refs.pik.showDatePicker()}>
              <Image source={require('./date.png')} style={styles.voiceIcon}/>   
            </TouchableOpacity>
            <FindWay 
                style = {styles.findWay}
                onSubmit = {(item)=>this._onSubmit(item)}
            />
            </View> 
            {/* <FindWay 
                style = {styles.findWay}
                onSubmit = {(item)=>this._onSubmit(item)}
            /> */}
           </View>
             {/* 查询的内容 */}
           <View style = {styles.list}>
           <FindList 
            numColumns ={2}
              empty = {<Text style={{textAlign:'center'}}>请输入按药品编码，药品名称进行查询</Text>}     
              data = {this.data}
               refreshing = {this.state.refreshing}
               onRefresh = {()=>this._onRefresh()}
               renderItem = {(item)=><ItemComponen itemData = {item}/>}
          />
           </View>

           <TimePick 
              ref = 'pik'
              Confirm ={(date)=>{this.setState({defaultValue:date[0]+date[1]+date[2]})}}
           />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    header:{
      flexDirection: 'row',   // 水平排布    
      // paddingLeft: 5,    
      // paddingRight:5,    
      paddingTop: Platform.OS === 'ios' ? 20 : 0,  // 处理iOS状态栏    
      height: Platform.OS === 'ios' ? 68 : 48,   // 处理iOS状态栏    
      // backgroundColor: '#d74047',    
      alignItems: 'center'  // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中  
    },
    findWay:{
      // height:40,
      marginLeft: 5, 
    },
    voiceIcon: {    
      marginLeft: 5,
      marginRight: 10,    
      height: 26.7,    
      width: 26.7,    
      resizeMode: 'stretch'      
  }, 
  inputText:{  
    flex:1,  
    backgroundColor:'transparent',  
    fontSize:15,  
  },
  searchBox:{//搜索框  
    // height:30,  
    flexDirection: 'row',   // 水平排布    
    flex:1,  
    borderRadius: 5,  // 设置圆角边    
    backgroundColor: 'white',  
    alignItems: 'center',  
    marginLeft: 8,    
    marginRight: 8,    
  },  
  list:{
    marginTop:10,
    borderTopWidth:1,
    padding:5
  }
  })

  module.exports = FindPage;