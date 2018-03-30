/**
 * Created by Blink on 2017/10/26.
 * device list
 */

import React from 'react';
import {FlatList, StyleSheet, View,Text} from 'react-native';


export default class List extends React.Component {

    constructor(){
        super()
        this.state ={
            refreshing:false
        }
    }

    get refreshing(){
        return this.state.refreshing
    }
    set refreshing(v){
        this.setState({refreshing:v})
    }
    _renderItem(item){
        return (
            <View style={_css.block}>
               <Text>{item.no}</Text>
               <Text>{item.name}</Text>
            </View>
        )
    }
    render() {
        const {refreshing,renderItem, onRefresh,data,empty,...other} = this.props; 
        let ListEmptyComponent = empty?empty:<View style={_css.footer}><Text>库存没有药品</Text></View>
        // console.warn(data)
        return (
            <FlatList data={data}
                      renderItem={({item}) => {
                               return renderItem?renderItem(item):this._renderItem(item)
                      }}
                      ListEmptyComponent={ListEmptyComponent}
                    //   renderScrollComponent={renderListScroll}
                      refreshing={refreshing}
                      onRefresh={() => onRefresh && onRefresh()}
                    // keyExtractor={(item) => item.key}
                    {...other}
            />
        )
    }
}

const _css = StyleSheet.create({
    view: {
        padding: 8,
    },

    content: {
        paddingBottom: 80
    },

    block: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 8,
        paddingRight: 8
    },
    footer: {
        height: 80
    }
});