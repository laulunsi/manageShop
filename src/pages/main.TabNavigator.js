import {
    TabNavigator
  } from 'react-navigation';

  import Personcenter from './personcenter/personcenter'
  import Firstpage from './firstpage/mian.page'
  import ShopIn from './shopIn/shop.in'
  import ShopOut from './shopOut/shop.out' 

//   Firstpage.navigationOptions = {  
//     header:null 
// };
  const MainScreenNavigator = TabNavigator({
    firstPage:{ screen: Firstpage },
    // ShopIn:{ screen: ShopIn },
     ShopOut:{screen:ShopOut} ,
    Personcenter:{ screen: Personcenter},
       
  },{
      tabBarPosition: 'bottom',
      animationEnabled: true,
      tabBarOptions: {
        activeTintColor: '#00FFFF', // 文字和图片选中颜色
        inactiveTintColor: '#999', // 文字和图片默认颜色
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {height: 0}, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
        style: {
            backgroundColor: '#fff', // TabBar 背景色
        },
        labelStyle: {
            fontSize: 12, // 文字大小
        },
        // activeTintColor: '#e91e63',
      },
  }
  );
module.exports = MainScreenNavigator;