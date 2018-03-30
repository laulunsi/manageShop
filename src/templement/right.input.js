import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Input from './input'
export default class RowInput   extends PureComponent{
    render(){
        const {...others} = this.props
        return(
            <Input 
                ref ='inp'
                style = {{ 
                    //  textAlign: 'center',
                flex:2,
                color: '#fff',
                padding:5,
                fontSize: 16}
                }
                onBlur = {(e)=>{DeviceEventEmitter.emit('inputData', this.data)}}
                // placeholder = {placeholder}
                onChangeText={(t) => {
                    this.data.set(item.title,t)
                    // console.log(this.refs.inpt) 
                }}
                height = {30}
                {...others}
                />
              
        )
    }
}
const styles = StyleSheet.create({
        rowStyle:{
            flexDirection:'row',
            justifyContent:'center',
            borderRadius: 5,
            elevation:2,
        },
})