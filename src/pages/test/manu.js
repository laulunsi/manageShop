import React, { View, Text, AppRegistry } from 'react-native';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
 
const App = () => (
  // You need to place a MenuContext somewhere in your application, usually at the root.
  // Menus will open within the context, and only one menu can open at a time per context.
  <MenuContext style={{ flex: 1 }}>
    <TopNavigation/>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Hello!</Text></View>
  </MenuContext>
);
 
const TopNavigation = () => (
  <View style={{ padding: 10, flexDirection: 'row', backgroundColor: 'pink' }}>
    <View style={{ flex: 1 }}><Text>My App</Text></View>
    <Menu onSelect={(value) => alert(`User selected the number ${value}`)}>
      <MenuTrigger>
        <Text style={{ fontSize: 20 }}>⋮</Text>
      </MenuTrigger>
      <MenuOptions>
        <MenuOption value={1}>
          <Text>One</Text>
        </MenuOption>
        <MenuOption value={2}>
          <Text>Two</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  </View>
);
module.exports = App;
// AppRegistry.registerComponent('Example', () => App);