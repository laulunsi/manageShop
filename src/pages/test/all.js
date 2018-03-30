import React from 'react';  
import {  
    AppRegistry,  
    Text,   
    View,  
} from 'react-native';  

import Button from './button'
export default class AllContactsScreen extends React.Component {  
    render() {  
        const { navigate } = this.props.navigation;  
        return (  
            <View>  
                <Text>List of all contacts</Text>  
                {/* <Button  
                    onPress={() => navigate('Chat', {user: 'Jane'})} //Passing params  
                    title="Chat with Jane"  
                />   */}
                <Button
                    onPress={() => navigate('Chat', {user: 'Jane'})} //Passing params                
                />
            </View>  
        );  
    }  
} 