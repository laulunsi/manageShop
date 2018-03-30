/**
 * Created by Blink on 2017/7/25.
 * for user content list
 */

import React from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';

export default class UserListItem extends React.Component {
    constructor() {
        super();
        this.state = {
            press: false
        };
    }

    render() {
        const color = this.props.data.color || 'black';
        const {onPress} = this.props.data;

        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    onPress && onPress();
                }}

                onPressOut={() => {
                    this.setState({press: false})
                }}

                onPressIn={() => {
                    this.setState({press: true})
                }}
            >
                <View style={[_css.view, this.props.isFooter && _css.footerText,
                    this.state.press && _css.pressView,
                    this.props.isFooter && _css.footer
                ]}>
                    <Text style={[_css.text, {color: color}]}>
                        {this.props.data.text}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const _css = StyleSheet.create({
    view: {
        height: 50,
        backgroundColor: 'white',
        paddingLeft: 24,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    pressView: {
        backgroundColor: 'grey'
    },
    text: {
        fontSize: 16,
        color: '#000',
        paddingLeft: 12
    },

    footerText: {
        justifyContent: 'center',
        paddingLeft: 0
    },

    footer: {
        marginTop: 24
    }
});