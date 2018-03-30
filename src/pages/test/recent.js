
import React from 'react';  
import {  
    AppRegistry,  
    Text,  
    Button,  
    View,  
} from 'react-native';  


export default class RecentChatsScreen extends React.Component {  
    render() {  
        const { navigate } = this.props.navigation;  
        return (  
            <View>  
                <Text>List of recent chats</Text>  
                <Button  
                    onPress={() => navigate('Chat', {user: 'Lucy'})} //Passing params  
                    title="Chat with Lucy"  
                />  
            </View>  
        );  
    }  
}