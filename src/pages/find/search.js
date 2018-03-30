/** 
 * 扫码框 
 */  
'use strict';  

import React, {  
  Component,  
  Image,  
  TextInput,  
  View,  
  Platform,  
  StyleSheet  
} from 'react-native';  

const voiceUri = 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1513482692&di=b247ae834a54d31523461b82b10f2d3e&src=http://is2.mzstatic.com/image/pf/us/r30/Purple5/v4/c2/20/1d/c2201dae-edcd-fe5e-0abe-3412dbae02ee/pr_source.png'
//export 因为要在其他类中使用  
export default class Header extends Component{  
  render(){  
      return (  
         <View style={styles.container}>   
          <View style={styles.searchBox}>  
               <TextInput style={styles.inputText}  
                          keyboardType='web-search'    
                          placeholder='搜索京东商品/店铺' />                             
                  
                <Image source={{uri:voiceUri}} style={styles.voiceIcon}/>              
          </View>  

          {/* <Image source={require('./images/header/icon_qr.png')} style={styles.scanIcon}/>              */}

         </View>  
      )  
  }  
}  

//样式  
const styles = StyleSheet.create({    
  container: {    
      flexDirection: 'row',   // 水平排布    
      paddingLeft: 10,    
      paddingRight: 10,    
      paddingTop: Platform.OS === 'ios' ? 20 : 0,  // 处理iOS状态栏    
      height: Platform.OS === 'ios' ? 68 : 48,   // 处理iOS状态栏    
      backgroundColor: '#d74047',    
      alignItems: 'center'  // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中    
  },    
  logo: {//图片logo    
      height: 24,    
      width: 64,    
      resizeMode: 'stretch'  // 设置拉伸模式    
  },    
  searchBox:{//搜索框  
    height:30,  
    flexDirection: 'row',   // 水平排布    
    flex:1,  
    borderRadius: 5,  // 设置圆角边    
    backgroundColor: 'white',  
    alignItems: 'center',  
    marginLeft: 8,    
    marginRight: 8,    
  },  
  searchIcon: {//搜索图标    
      height: 20,    
      width: 20,   
      marginLeft: 5,    
      resizeMode: 'stretch'    
  },   
  inputText:{  
    flex:1,  
    backgroundColor:'transparent',  
    fontSize:15,  
  },  
  voiceIcon: {    
      marginLeft: 5,    
      marginRight: 8,    
      width: 15,    
      height: 20,    
      resizeMode: 'stretch'    
  },   
  scanIcon: {//搜索图标    
      height: 26.7,    
      width: 26.7,    
      resizeMode: 'stretch'    
  },   
}); 