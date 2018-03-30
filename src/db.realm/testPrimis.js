/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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

import realm from './realm'
 class CustomButton extends Component {
    render() {
        return (
            <TouchableHighlight
                style={styles.button}
                underlayColor="#a5a5a5"
                onPress={this.props.onPress}>

                <Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableHighlight>
        );
    }
}

export default class Test extends Component {
    constructor(){
        super()
        this._realmDb = new realm()
    }
    render() {
        let Realm = new realm()
        return (
            <View style={{marginTop: 20}}>
                <Text style={styles.welcome}>
                    Realm基础使用实例-增删改查
                </Text>
                <CustomButton
                    text="表新增"
                    onPress={()=>{data = {
                        outId: 1,
                        medicineId:'1234',
                        price: 20,
                        outTotal:30,
                        outDate:new Date()
                    },
                    this._realmDb.add('OUT',data)}
                    }/>

                {/* <CustomButton
                    text="表修改"
                    onPress={()=> {
                        //更新id = 1的数据
                        realm
                    }}
                /> */}

                <CustomButton
                    text="表数据删除-删除id=3的数据"
                    onPress={()=> {
                        let str = 'outTotal=='+40
                        this._realmDb.selectBySome('OUT',str)
                        .then((data)=>console.warn(data))
                    }}
                />

                <CustomButton
                    text="查询所有数据"
                    onPress={()=> {this._realmDb.selectAll('OUT')
                        .then((data)=>console.log(data))
                    }}
                />
                {/* <CustomButton
                    text="根据id=2 进行查询数据"
                    onPress={()=> {       
                    }}
                /> */}
            </View>
        )
    }


}


const styles = StyleSheet.create({
    welcom: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        margin: 3,
        backgroundColor: 'white',
        padding: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#cdcdcd'
    },
});