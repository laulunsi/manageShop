import React from 'react';  
import {  
    AppRegistry,  
    Text,  
    Button,  
    View,  
} from 'react-native';  
  
import { StackNavigator } from 'react-navigation';  
import { TabNavigator } from "react-navigation";  
// import RecentChatsScreen from './recent';
  
// class ChatScreen extends React.Component {  
//     // Nav options can be defined as a function of the screen's props:  
//     static navigationOptions = ({ navigation }) => ({  
//         title: `Chat with ${navigation.state.params.user}`,  
//     });  
//     render() {  
//         // The screen's current route is passed in to `props.navigation.state`:  
//         const { params } = this.props.navigation.state;  
//         return (  
//             <View>  
//                 <Text>Chat with {params.user}</Text>  
//             </View>  
//         );  
//     }  
// }  
  
// class RecentChatsScreen extends React.Component {  
//     render() {  
//         const { navigate } = this.props.navigation;  
//         return (  
//             <View>  
//                 <Text>List of recent chats</Text>  
//                 <Button  
//                     onPress={() => navigate('Chat', {user: 'Lucy'})} //Passing params  
//                     title="Chat with Lucy"  
//                 />  
//             </View>  
//         );  
//     }  
// }  
  
// class AllContactsScreen extends React.Component {  
//     render() {  
//         const { navigate } = this.props.navigation;  
//         return (  
//             <View>  
//                 <Text>List of all contacts</Text>  
//                 <Button  
//                     onPress={() => navigate('Chat', {user: 'Jane'})} //Passing params  
//                     title="Chat with Jane"  
//                 />  
//             </View>  
//         );  
//     }  
// }  
  
import RecentChatsScreen from './recent'
import AllContactsScreen from './all'
import ChatScreen from './chat'
const MainScreenNavigator = TabNavigator({  
    Recent: { screen: RecentChatsScreen },  
    All: { screen: AllContactsScreen },  
},{
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#e91e63',
    },
    tabBarOptions: {
      activeTintColor:'#007AFF',
      pressColor:'red',
      // iconStyle:'green',
      showIcon:true,
      labelStyle: {
        fontSize: 12,
      },
    
      style: {
        justifyContent:'space-around',
        backgroundColor: 'gray',
        // Color:'bule'
      },},
  });  
  
MainScreenNavigator.navigationOptions = {  
    title:'My Chats',  
}; 
const SimpleAppReactNavigation = StackNavigator({  
    Home: { screen: MainScreenNavigator,navigationOptions: {
        headerTintColor: 'blue',
        // headerRight:(<ChatScreen/>),
        headerStyle: {
          backgroundColor: 'red',
          //  height:0,
          header:null
          // alignItems:'stretch',
        },
      }, },  
    Chat: { screen: ChatScreen },  
});  
  
module.exports = SimpleAppReactNavigation