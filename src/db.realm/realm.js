import React, {Component} from 'react';


import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ToastAndroid,

} from 'react-native';

const Realm = require('realm');
/** 1.	ShopIn 进药表（单据号，药品编码，采购价，采购数量，采购日期，供应商）
    2.	ShopOUt售药表（顾客号，药品编码，销售数量，销售日期，单价）
    3.	Shop   库存表（药品编码，药品名称，库存量，生产厂家，规格，零售价）

        单据号：编程自动生成（从1开始，每次加1）。
        顾客号：编程自动生成（从1开始，每次加1）。

    数据支持下列基本类型：bool，int，float，double，string，data，和date。
 */
const ShopInSchema = {
    name: 'IN',
    // primaryKey: 'price',
    properties: {
      id: {type: 'int', default: 0},//单据号
      medicineId:  'string',//药品编码
      price: 'int',//采购价
      total:'int',//采购数量
      date:'date',//采购日期
      supplier:'string'//供应商
    }
  };
const ShopOutSchema = {
    name: 'OUT',
    // primaryKey: 'medicineId',
    properties: {
        outId: {type: 'int', default: 0},//顾客号：编程自动生成（从1开始，每次加1）。
        medicineId:  'string',//药品编码
        price: 'int',//单价
        total:'int',//销售数量
        date:'date',//销售日期
    }
  };
//库存表（药品编码，药品名称，库存量，生产厂家，规格，零售价）
const ShopSchema = {
    name: 'SHOP',
    // primaryKey: 'producter',
    properties: {
        medicineId:  'string',//药品编码
        medicineName:'string',//药品名称
        total:'int',//库存量
        price: 'int',//零售价
        standard:'string',//规格
        producter:'string'//生产厂家
    }
  };

const realmDb = new Realm({schema: [ShopInSchema, ShopOutSchema,ShopSchema]});  
export default class RealmData extends Component {
    constructor(){
        super()
        this.realmDb = realmDb
    }
/**
 * 
 * @param {所查询表的名字} tableName 
 */
    selectAll(tableName){
        return new Promise((resolve, reject)=>{
            try {
                   let result = realmDb.objects(tableName);
                    resolve(result)
                } catch (e) {
                    reject(e)
                }
        })
    }
    /**
     * 
     * @param {表名} tableName 
     * @param {查询方式：按药品代码，药品名称、销售日期查询} findWay 
     */
    selectBySome(tableName,findWay){
            try {
                let results = realmDb.objects(tableName);
                let result = results.filtered(findWay);
                return(result)
            } catch (e) {
    
                return(e)
            }
    }
    delete(tableName,medicineId){
            try {
                let results = realmDb.objects(tableName);
                let result = results.filtered(medicineId);
                realmDb.delete(result)
                ToastAndroid.show("删除成功", ToastAndroid.SHORT);
            } catch (e) {
                ToastAndroid.show("删除失败", ToastAndroid.SHORT);
            }
    }
    updateTotal(tableName,findWay,total){
        try{
            realmDb.write(() => {
                //对象
                let Obj = realmDb.objects(tableName);
               // // 设置筛选条件
                let obj = Obj.filtered(findWay);
                obj[0].total = obj[0].total+total
                
             });
             ToastAndroid.show("更新数据成功", ToastAndroid.SHORT);
        }catch(e){
            console.warn(e)
        }
       
    }
    /**
     * 
     * @param {表的名字} tableName 
     * @param {需要插入的数据对象} data 
     */
    add(tableName,data){
        console.log(data)
        return new Promise((resolve, reject)=>{
            try {
                realmDb.write(() => {
                    realmDb.create(tableName, data,true)
                    })
                    ToastAndroid.show("添加成功", ToastAndroid.SHORT);
                    resolve();
                } catch (e) {
                    reject(e)
                    ToastAndroid.show("添加失败", ToastAndroid.SHORT);
                    console.log(e)
    
                }
        })
    }
       
}
