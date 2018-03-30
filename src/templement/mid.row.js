import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class MidRow   extends PureComponent{
    
    render(){
        const {leftComponent,rightComponent,Style} = this.props
        let rowStyle = Style?Style:styles.rowStyle
        return(
            <View style = {rowStyle}>
                {leftComponent&&leftComponent}
                {rightComponent&&rightComponent}
            </View>
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