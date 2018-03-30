/**
 * Created by Blink on 2017/10/13.
 */

import React from 'react';
import {DeviceEventEmitter,FlatList, StyleSheet, View,Text} from 'react-native';
import MidRow from './mid.row'
import Input from './input'
import {dateFormat} from '../get.data/date.format'

// import {getSelectData} from './getdata'

export default class MidPart extends React.Component {
    constructor(){
        super()
        this.data = new Map
    }
    // componentDidMount(){
        
    // }
    // componentWillUnmount(){
    //     DeviceEventEmitter.emit('inputData', this.data)
    // }
    _genLeftComponent(item){
        return(
            <View  style={{backgroundColor:'#6495ED',flex:1}}>
                <Text style = {[_css.textStyle,{textAlign: 'right'}]}>{item.title}: </Text>
            </View>
        )
    }
    _genRightCompenet(item){
             let defaultValue = ''
             defaultValue = this._getdefault(item)
             if(defaultValue){
               this.data.set(item.title,defaultValue)
             }
             
            return (
                <Input 
                    style = {{ 
                        //  textAlign: 'center',
                    flex:2,
                    color: '#fff',
                    padding:5,
                    fontSize: 16}
                    }
                    onBlur = {(e)=>{
                        DeviceEventEmitter.emit('inputData', this.data)}
                    }
                    onChangeText={(t) => {
                        this.data.set(item.title,t)
                    }}
                     defaultValue ={defaultValue}
                    height = {30}
                />
              
            )
    }
    _getdefault(item){
      const {placeholder} = this.props
      if(placeholder){
        const{type,title} = item
        if(type ==='shopIn'){
              /**
              * '药品编码','药品名称',
              * '采购数量','生产厂家',
              * '采购日期','供应商','采购价',
              * '零售价','规格'
              */
             const{medicineName,standard,producter,supplier,outPrice,inPrice}=placeholder
         switch(title){
             case '药品名称':return medicineName
             case '生产厂家':return producter
             case '采购日期':return dateFormat('yyyy-MM-dd:HH:mm:ss',new Date())
             case '供应商':return  supplier
             case '采购价':return inPrice?inPrice.toString():''
             case '零售价':return outPrice?outPrice.toString():''
             case '规格':return standard
         }
      }else{
          /**
           * '药品名称','单价'
           */
         const {medicineName,price}=placeholder
         let p=price?price.toString():''
         switch(title){
             case '药品名称':return medicineName
             case '单价':return p
             case '日期':return dateFormat('yyyy-MM-dd:HH:mm:ss',new Date())
             default:return ''
         }
      }

    }
    }
    render() {
          const {data} =this.props
        //   for (let i=0; i<data.length;i++){
        //       data[i].id = i
        //   }
        return (
               <FlatList
                    // ref ='flt'
                    data = {data}
                    //   keyExtractor={(item)=>{item.key}}
                    renderItem={({item}) => {
                    return (
                            <MidRow
                                leftComponent = {this._genLeftComponent(item                                                                                                                                                                                                                                    )}
                                rightComponent = {this._genRightCompenet(item)}
                             />
              )
          }}
      />
        )
    }
}

const _css = StyleSheet.create({
    separator: {
        borderBottomColor:'grey',
        borderBottomWidth: 1,
    },
    textStyle:{
            color: '#fff',
            padding:5,
            fontSize: 16
    },
    selectStyle:{
        elevation:100,
    },
});