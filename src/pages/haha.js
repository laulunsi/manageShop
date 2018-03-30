/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    Dimensions,
    View,
    TouchableNativeFeedback,
} from 'react-native';


let widthOfmargin = Dimensions.get('window').width;
let heightofmargin = Dimensions.get('window').height;

class modules extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <View style={styles.container}>
                <View style = {styles.view }  >
                    <Image
                        source = {{uri:'http://pic4.nipic.com/20091217/3885730_124701000519_2.jpg'}}
                        style = {styles.leftImage} 
                    /> 
                    <Text style = {styles.textStyle}>功能模块</Text>
                    <Image
                        source = {{uri:'http://pic4.nipic.com/20091217/3885730_124701000519_2.jpg'}}
                        style = {styles.rightImage} 
                    /> 
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

         //flex: 1,
        // justifyContent: 'center',
        flexDirection:'row',
       
        backgroundColor: '#F5FCFF',
    },
    view:{
        flex:1,
        flexDirection:'row',
        backgroundColor:'green',
        paddingTop:20,
        alignItems: 'center',
        paddingBottom:20
    },
    leftImage:{
        width: 40,
        height: 40,
    },
    rightImage:{
        width:40,
        height:40,
        position :'absolute',
        right : 20,
       
    },
    textStyle:{
        paddingLeft:20,
        color:'red'
    },

});
module.exports = modules;
