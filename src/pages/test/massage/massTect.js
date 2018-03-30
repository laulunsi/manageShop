import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    DeviceEventEmitter
} from 'react-native';

export default class extends  Component{

    componentDidMount() {
        this.deEmitter = DeviceEventEmitter.addListener('left', (a) => {
            alert('收到通知：' + a);
        });
    }
    componentWillUnmount() {
        this.deEmitter.remove();
    }
    
    render(){
        return (
            <Button title="发送通知" onPress={() => {
                DeviceEventEmitter.emit('left', '发送了个通知');
            }}/>
        )
    }
}