/**
 * Created by Blink on 2017/7/5.
 * base input
 */

import React from 'react';
import {TextInput, View,StyleSheet} from "react-native";
import {Constants} from "./Constants";

let grey = 'grey'
let primary = '#888'
let normal = '#000'
let lightPrimary = 'grey'

export default class BlinkTextInput extends React.Component {
    static defaultProps = {
        value: '',
        style: {
            borderColor: normal,
        },
        focusStyle: {
            borderColor: primary
        },
        height: 40,
        color: normal,
        pressColor: primary
    };

    constructor() {
        super();
        this.state = {
            isFocus: false,
            value: null
        };
    }

    set value(value) {
        this.setState({value});
    }

    get value() {
        return this.state.value;
    }
    clear(){
        // console.log('清理')
     this.refs.inp.clear()
    }
    focus() {
        this.refs.inp.focus();
    }

    blur() {
        this.refs.inp.blur();
    }
    
    _onChangeText(t) {
        this.value = t;
        if (this.props.onChangeText) this.props.onChangeText(t);
    }

    _onFocus(e) {
        this.setState({isFocus: true});
        if (this.props.onFocus) this.props.onFocus(e);
    }

    _onBlur(e) {
        this.setState({isFocus: false});
        if (this.props.onBlur) this.props.onBlur(e);
    }

    _genTextInput(props) {
        props = props || this.props;
        // let width =Constants.DEVICE_WIDTH*0.6

        let {value, style, focusStyle,
            onChangeText, onFocus, onBlur,
            ...others} = this.props;
        if (this.value === null) this.state.value = value;
        return (
            <TextInput
                {...others}
                style={[Style.normal,
                    {height: this.props.height, color: this.props.color},
                    style,
                    props.color && {borderColor: props.color},
                    this.state.isFocus && focusStyle,
                    this.state.isFocus && props.pressColor && {borderColor: props.pressColor}
                ]}
                onChangeText={(t)=> {
                    this._onChangeText(t);
                }}
                
                onFocus={(e)=>{
                    this._onFocus(e);
                }}
                onBlur={(e)=>{
                    this._onBlur(e);
                }}
                underlineColorAndroid='transparent'
                placeholderTextColor={this.props.placeholderTextColor || grey}
                selectionColor={this.props.selectionColor || lightPrimary}
               
                // value={this.value}
                ref="inp"
            />
        );
    }

    render() {
        return this._genTextInput();
    }
}

const Style = StyleSheet.create({
  normal: {
      borderColor: normal,
      backgroundColor: 'transparent',
      color: normal,
      borderWidth:1,
  },
})