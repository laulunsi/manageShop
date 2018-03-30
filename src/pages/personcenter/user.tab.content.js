/**
 * Created by Blink on 2017/7/13.
 * user tabs
 */

import React from 'react';
import {FlatList, StyleSheet, Text, View,Button} from 'react-native';
import Maps from '../../controls/text/icon.maps';
import {lightGrey, red, whiteBackground} from '../../controls/colors';
import Color from 'color';
import PageTitle from "../content/page.title";
import FamilyInfo from "./family.info";
import UserListItem from "./user.list.item";
import {AlertYesNo} from '../../controls/controls';
import Global from '../global';
import {contentTabTopOffset} from '../../core/core';

export default class UserTabContent extends React.Component {
    render() {
        return (
            <View style={_css.view}>
                <FlatList
                    ListHeaderComponent={<FamilyInfo onClick={() => Global.main.jump("EditFamilyInfo", {
                        onComplete: () => {
                            this.setState({});
                        }
                    })}/>}
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
        key: 'module',
        icon: 'box',
        text: '监控视频',
        onPress: () => {
            blink.main.jump('PlayList');
        }
    },
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
    icon: 'share-square-o',
    text: '退出登录',
    color: red,
    onPress: () => {
        AlertYesNo('确定退出当前用户?', '', () => {
            Global.cache.clear().then(() => {
                Global.main.setState({render: 0});
            }).catch((e) => {
                Global.main.showMessage('退出失败:' + e);
            })
        })
    }
};

const _css = StyleSheet.create({
    view: {
        flex: 1,
        paddingTop: contentTabTopOffset,
    },
    separator: {
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: whiteBackground
    },

    separatorLine: {
        borderBottomColor: lightGrey,
        borderBottomWidth: 1,
        flex: 1
    }
});