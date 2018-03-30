import React from 'react';  
import {  
    AppRegistry,  
    Text,  
    Button,  
    View,  
} from 'react-native';  


export default class AllContactsScreen extends React.Component {  
    render() {  
        // const { navigate } = this.props.navigation;  
        return (  
            <View>  
                <Text>List of all contacts</Text>  
                <Button  
                    onPress={this.props.onPress} //Passing params  
                    title="Chat with Jane"  
                />  
            </View>  
        );  
    }  
} 