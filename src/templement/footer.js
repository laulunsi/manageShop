import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import Row from './mid.row'
export default class MidRow   extends Component{
    
    render(){
        const {cancal,ok,rightTitle,leftTitle} = this.props
        return(
            <Row
            Style = {styles.row}
            leftComponent = {
                <View style ={[styles.footer,{flex:1,backgroundColor:'blue', borderBottomLeftRadius:5}]}>
                    <TouchableOpacity onPress={cancal}>
                        <Text style = {styles.textStyle}>{leftTitle}</Text>
                    </TouchableOpacity>
                </View>
            }
            rightComponent ={
                <View style = {[styles.footer,{flex:1,backgroundColor:'orange', borderBottomRightRadius:5}]}>
                    <TouchableOpacity onPress ={ok} >
                                <Text style = {styles.textStyle}>{rightTitle}</Text>
                    </TouchableOpacity>
                </View>
            } 
            />
        )
    }
}
const styles = StyleSheet.create({
   
    row:{
       
        flexDirection:'row',
        justifyContent:'center',
    },
    footer:{
        padding:5,
       
    },
    textStyle:{
        textAlign: 'center',
        color: '#fff',
        // padding:5,
        fontSize: 16,
        lineHeight:30,
       
    },
})