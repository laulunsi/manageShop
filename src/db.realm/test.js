// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */

 import React, {Component} from 'react';


import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ToastAndroid,
    TouchableWithoutFeedback,
    TextInput

 } from 'react-native';

 const Realm = require('realm');

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

    render() {
        const CarSchema = {
            name: 'Car',
            primaryKey: 'id',
            properties: {
                id: 'int',
                car_type: 'string',
                car_name: 'string',
                driver_name: 'string',
            }
        };

        //初始化Realm
        let realm = new Realm({schema: [CarSchema]});
        return (
            <View style={{marginTop: 20}}>
                <Text style={styles.welcome}>
                    Realm基础使用实例-增删改查
                </Text>
                <CustomButton
                    text="表新增"
                    onPress={()=>
                        realm.write(()=> {
                            realm.create('Car', {id: 1, car_type: 'QQ', car_name: 'SB001', driver_name: '张三'});
                            realm.create('Car', {id: 2, car_type: '宝马', car_name: 'SB002', driver_name: '李四'});
                            realm.create('Car', {id: 3, car_type: '奔驰', car_name: 'SB003', driver_name: '王五'});
                            realm.create('Car', {id: 4, car_type: '劳斯莱斯', car_name: 'SB004', driver_name: '张六'});
                            realm.create('Car', {id: 5, car_type: '比亚迪', car_name: 'SB005', driver_name: '理七'});
                            ToastAndroid.show('添加数据完成', ToastAndroid.SHORT);
                        })
                    }/>

                <CustomButton
                    text="表修改"
                    onPress={()=> {
                        //更新id = 1的数据
                        realm.write(()=> {
                            realm.create('Car', {id: 2, driver_name: 'feiyang'}, true)
                            ToastAndroid.show("修改完成...", ToastAndroid.SHORT);
                        });
                    }}
                />

                <CustomButton
                    text="表数据删除-删除id=3的数据"
                    onPress={()=> {
                        realm.write(()=> {
                            let cars = realm.objects('Car');
                            let car = cars.filtered('id==3');
                            realm.delete(car);
                        });
                    }}
                />

                <CustomButton
                    text="查询所有数据"
                    onPress={()=> {
                        let cars = realm.objects('Car');
                        ToastAndroid.show('Car的数据为，'+cars.length, ToastAndroid.SHORT);
                    }}
                />
                <CustomButton
                    text="根据id=2 进行查询数据"
                    onPress={()=> {
                        let cars = realm.objects('Car');
                        let car = cars.filtered('id==2');
                        if (car) {
                            ToastAndroid.show('Car的数据为，'
                                + '编号=' + car[0].id
                                + 'car_type=' + car[0].car_type
                                + 'car_name=' + car[0].car_name
                                + 'driver_name=' + car[0].driver_name, ToastAndroid.SHORT);
                        }
                    }}
                />
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


// export default class rmdemo extends Component {
//     constructor(props) {
//     super(props)
//     this.state = {
//     inputText: ''
//     }
//     }
//     componentWillMount(){
//     this.realm = new Realm({
//     schema:[{name:'Person', properties:{name: 'string'}}]
//     })
//     this.results = this.realm.objects('Person')
//     this.realm.addListener('change', () => {
//     this.forceUpdate()
//     })
//     }
//     _handleTouch(){
//     this.realm.write(()=>{
//     this.realm.create('Person', [this.state.inputText]);
//     })
//     }
//     render() {
//     return (
//     <View >
//     <Text >
//     Welcome to React Native and Realm!
//     </Text>
//     <Text >
//     Count of Persons in Realm: {this.realm.objects('Person').length}
//     </Text>
//     <View style={{alignItems: 'center'}}>
//     <TextInput
//     style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1}}
//     onChangeText={(inputText) => this.setState({inputText})}
//     value={this.state.inputText}
//     />
//     <TouchableWithoutFeedback onPress={this._handleTouch.bind(this)}>
//     <View>
//     <Text style={{fontSize: 24, color: 'blue'}}>
//     Save
//     </Text>
//     </View>
//     </TouchableWithoutFeedback>
//     </View>
//     </View>
//     )
//     }
//     }
    