import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';

// import {dateFormat} from '../get.data/get.realm'
import {dateFormat} from '../get.data/date.format'

export default class ItemComponent extends Component {
    _genHeader(type,total){
        if(type==='OUT'){
            return(
                <View style={styles.header}>
                    <Text style = {styles.headerText}>出售量：{total}</Text>
                </View>
            )
        }
        if(type==='IN'){
            return(
            <View style={styles.header}>
                <Text style = {styles.headerText}>进药量：{total}</Text>
            </View>
            )
        }
        if(type==='SHOP'){
            return(
            <View style={styles.header}>
                <Text style = {styles.headerText}>库存量:{total}</Text>
            </View>
            )
        }
    }
    _genfooter(d){
        <View style={styles.footer}>
            <Text style = {styles.headerText}>日期：{d}</Text>
        </View>
    }
    render() {
        let { itemData } = this.props;
        let {type,name,number,total,standard,producter,price,date} = itemData;
        let d= date?dateFormat('yyyy-MM-dd:HH:mm:ss',date):null
        // console.warn(date)
        return (
            <View style={ styles.container }>
               
                <View style = {styles.body}>
                    <Text style={ styles.nameStyle }numberOfLines={ 2 }>药品：{name}</Text>
                    <Text  style={ styles.nameStyle }numberOfLines={ 2 }>编号：{number}</Text>
                   <View style = {{flexDirection:'row', justifyContent : 'space-between',}}>
                   < Text style={ styles.moneyStyle }>￥{ price }</Text>
                    < Text style={ styles.moneyStyle }>数量: { total }</Text>
                   </View>
                </View>
                {/* {type?this._genHeader(type,total):null}
                    {d?this._genfooter(d):null} */}
                    <Text>{d}</Text>
                {/* <View style={ styles.right }>
                    <Text style={ styles.nameStyle } numberOfLines={ 2 }>{ name }</Text>
                    <Text style={ styles.descriptionStyle } numberOfLines={1}>{ producter }</Text>
                    <View style={ styles.right_bot}>
                        < Text style={ styles.moneyStyle }>售价￥{ price }</Text>
                        <View style={ styles.numControllStyle }>
                            <Text>库存</Text>
                            <View style={ styles.numberViewStyle }>
                                <Text style={ styles.numberStyle }>{ total }</Text>
                            </View>
                        </View>
                    </View>
                </View> */}
                {/* <Text>类型：{type}</Text>
                <Text>名字：{name}</Text>
                <Text>编号：{number}</Text>
                <Text>量：{total}</Text>
                <Text>规格：{standard}</Text>
                <Text>生产商：{producter}</Text> 
                <Text>价钱：{price}</Text> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
         flex : 1,
        // flexDirection : 'row',
        alignItems : 'center',
        backgroundColor : 'white',
        borderWidth:1,
        padding:10,
        margin:5,
    },
    header:{
        borderBottomWidth:1
    },
    headerText:{
        fontSize : 13,
        color : '#A9A9A9'
    },
    icon : {
        height : 80,
        width : 80,
        marginTop : 10,
        marginBottom : 10,
        marginLeft : 15,
        borderWidth : 1,
        borderColor : '#999999'
    },
    body : {
        marginLeft : 15,
        flex : 1,
        marginTop : 10,
        marginBottom : 10,
    },
    nameStyle : {
        fontSize : 17,
        color : '#000000'
    },
    descriptionStyle : {
        marginTop : 3,
        fontSize : 13,
        color : '#A9A9A9'
    },
    right_bot : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginTop : 10,
        alignItems : 'center',
    },
    moneyStyle : {
        fontSize : 13,
        color : 'red'
    },
    numControllStyle : {
        flexDirection : 'row',
        borderWidth : 1,
        borderColor : '#e9e9e9',
        marginRight : 10,
        justifyContent : 'center',
        alignItems : 'center'
    },
    reduceStyle : {
        height : 35,
        width : 35,
        alignItems : 'center',
        justifyContent : 'center',
        borderRightWidth : 1,
        borderColor : '#e9e9e9',
    },
    numberViewStyle : {
        height : 35,
        width : 60,
        alignItems : 'center',
        justifyContent : 'center',
    },
    numberStyle : {
        fontSize : 19,
    },
    increaseStyle : {
        height : 35,
        width : 35,
        alignItems : 'center',
        justifyContent : 'center',
        borderLeftWidth : 1,
        borderColor : '#e9e9e9',
    },
});
