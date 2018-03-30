import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList
} from 'react-native';

import UserListItem from './user.list.item'

export default class PerSon extends Component {
  static navigationOptions = {
    tabBarLabel: '个人中心',
    title: '个人中心',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../imgs/bank.png')}
        style={ { width: 26,height: 26,tintColor: tintColor}}
      />
    ),
  };
  render() {
   
    return (
      <View style={_css.view}>
          <FlatList
              data={_data}
              renderItem={({item}) => {
                  return (
                      <UserListItem data={item} />
                  );
              }}
              ItemSeparatorComponent={() => (
                  <View style={_css.separator}>
                      <View style={_css.separatorLine}>
                      </View>
                  </View>
              )}
              ListFooterComponent={<UserListItem data={_footer} isFooter />}
          >
     

          </FlatList>
      </View>);
  }
}

const _data = [
  {
      key: 'setting',
      icon: 'gear',
      text: '设置',
      onPress: () => {
      }
  },
];
const _footer = {
  key: 'quit',
  text: '退出登录',
  color: 'red',
  onPress: () => {
  }
};

const _css = StyleSheet.create({
  view: {
      flex: 1,
      paddingTop: 10,
  },
  separator: {
      paddingLeft: 16,
      paddingRight: 16,
      backgroundColor: 'white'
  },

  separatorLine: {
      borderBottomColor: 'grey',
      borderBottomWidth: 1,
      flex: 1
  }
});