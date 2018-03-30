/**
 * Bootstrap of PickerTest
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import Picker from 'react-native-picker';

export default class PickerTest extends Component {

    constructor(props, context) {
        super(props, context);
    }

    _createDateData() {
        let date = [];
        let currentYear = parseInt(new Date().getFullYear()) 
        for(let i= currentYear;i>=1970;i--){
            let month = [];
            for(let j = 1;j<13;j++){
                let day = [];
                if(j === 2){
                    for(let k=1;k<29;k++){
                        day.push(k+'日');
                    }
                    //Leap day for years that are divisible by 4, such as 2000, 2004
                    if(i%4 === 0){
                        day.push(29+'日');
                    }
                }
                else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                    for(let k=1;k<32;k++){
                        day.push(k+'日');
                    }
                }
                else{
                    for(let k=1;k<31;k++){
                        day.push(k+'日');
                    }
                }
                let _month = {};
                _month[j+'月'] = day;
                month.push(_month);
            }
            let _date = {};
            _date[i+'年'] = month;
            date.push(_date);
        }
        return date;
    }
    showDatePicker() {
        const {Confirm}=this.props
        let currentDate = new Date() 
        Picker.init({
            pickerData: this._createDateData(),
            pickerToolBarFontSize: 16,
            selectedValue: [currentDate.getFullYear()+'年', currentDate.getMonth()+1+'月', currentDate.getDate()+'日'],
            pickerFontSize: 16,
            pickerFontColor: [255, 0 ,0, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                // console.warn('date', pickedValue, pickedIndex);
                Confirm&&Confirm(pickedValue)
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
                // console.warn('date', pickedValue, pickedIndex);
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
                // console.warn('date', pickedValue, pickedIndex);
            }
        });
        Picker.show();
    }
    toggle() {
        Picker.toggle();
    }

    isPickerShow(){
        Picker.isPickerShow(status => {
            alert(status);
        });
    }
    render(){
        return(
            <View></View>
        )
    }
};