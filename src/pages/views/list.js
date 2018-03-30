import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  LinkingIOS,
  ActionSheetIOS,
  WebView,
  AsyncStorage,
} from 'react-native';
import Util from './util';
import Detail from './detail';

// var Geolocation = require('Geolocation').default;
import Geolocation from 'Geolocation';
// var Detail = require('./detail');
class List extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list: null,
      count: 0,
      keywords: '',
    }
  }
  render(){
    var items = [];
    if(this.state.list){
      var len = this.state.list.length > 10 ? 10 : this.state.list.length;
      for(var i = 0; i < len; i++){
        var obj = this.state.list[i];
        items.push(
          <TouchableOpacity key={'listItem' + i} style={styles.item} onPress={this._loadDetail.bind(this, obj.id, obj.name)}>
            <View style={styles.row}>
              <View style={{flex:1}}>
                <Text numberOfLines={1} style={styles.name}>{obj.name}</Text>
                <Text numberOfLines={1} style={styles.type}>{obj.type}</Text>
              </View>
              <View style={styles.distance}>
                <Text numberOfLines={1} style={[styles.mi, {color:'#4C4C4C'}]}>
                  {obj.distance}米
                </Text>
                <Text numberOfLines={1} style={styles.address}>{obj.address}</Text>
              </View>
            </View>
            {

              obj.tel.length ?
                (<TouchableOpacity style={styles.phone} onPress={this._call.bind(this, obj.tel)}>
                  <Text numberOfLines={1} >电话</Text>
                </TouchableOpacity>)
                :null
            }
          </TouchableOpacity>
        );
      }
    }

    var placeholder = '搜索' + this.props.type;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.searchBg}>
          <TextInput style={styles.input} placeholder={placeholder}
             onChangeText={this._onChangeText}
             onEndEditing={this._onEndEditing}/>
          <View>
            <Text style={styles.tip}>
              已为您筛选
              <Text style={{color:'#FA2530'}}>{this.state.count}</Text>
              条数据
            </Text>
          </View>
        </View>
        {items}
        {items.length? null : <View style={styles.activity}><ActivityIndicator color="#248BFD"/></View>}
        <View style={{height:40}}></View>
      </ScrollView>
    );

  }
  componentDidMount(){
    // var that = this;
    // Geolocation.getCurrentPosition((data) => {
    //   var lnglat = data.coords.longitude + ',' + data.coords.latitude;
    //   AsyncStorage.setItem('pos', lnglat);
    //   var url = Util.searchURL + 'key=' + Util.amapKey + '&keywords='
    //     + that.props.type + '&extensions=base';

        
    //   if(_GEO_OPEN){
    //     url += '&location=' + lnglat;
    //     that._doGetData(url);
    //   }else{
    //     url += '&location=' + _GEO_TEST_POS;
    //     that._doGetData(url);
    //   }
    // }, (err) => {
    //   alert('定位失败，请重新开启应用定位');
    // });
    Geolocation.getCurrentPosition(function (data) {
      alert(JSON.stringify(data))
  },function (err) {
      alert(err.code)
  })
  }
  _doGetData(url){
    var that = this;
    Util.getJSON(url, function(data){
      if(data.status && data.info === 'OK'){
        var count = data.pois.length > 10? 10: data.pois.length;
        that._addStorage(data);
        that.setState({
          list: data.pois,
          count: count
        });
      }else{
        alert('没有查询到相应的数据');
      }
    });
  }
  /*加载详情页*/
  _loadDetail(id, name){
    this.props.nav.push({
      component: Detail,
      title: name,
      passProps:{
        id: id
      }
    });
  }
  _onChangeText(val){
    this.setState({
      keywords: val
    });
  }
  _onEndEditing(){
    var that = this;
    var keywords = this.state.keywords;
    var url = Util.searchURL + 'key=' + Util.amapKey + '&keywords='
      + keywords + '&types=' + that.props.type + '&extensions=base';
    that.setState({
      list: null
    });
    AsyncStorage.getItem('pos', function(err, result){
      if(_GEO_OPEN){
        if(!err){
          url += '&location=' + result;
          that._doGetData(url);
        }else{
          alert('定位失败');
        }
      }else{
        url += '&location=' + _GEO_TEST_POS;
        that._doGetData(url);
      }
    });
  }
  //添加到本地存储
  _addStorage(data){
    var posArr = [];
    var len = data.pois.length > 10? 10: data.pois.length;
    for(var i = 0; i < len; i++){
      posArr.push(data.pois[i].location);
    }
    var posStr = posArr.join(',');
    AsyncStorage.setItem('_'  + this.props.type , posStr);
  }
  //拨打电话
  _call(tel){
    if(tel.length){
      var arr = tel.split(';');
      var BUTTONS = [];
      for(var i in arr){
        BUTTONS.push(arr[i]);
      }
      BUTTONS.push('取消');

      ActionSheetIOS.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1
      }, function(index){
        arr[index] && LinkingIOS.openURL('tel://' + arr[index]);
      });
    }else{
      alert('没有提供号码');
    }
  }
}
var styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ddd'
  },
  input:{
    height:38,
    marginLeft:10,
    marginRight:10,
    borderWidth:Util.pixel,
    paddingLeft:5,
    marginTop:10,
    borderColor: '#868687',
    borderRadius:3,
    fontSize:15
  },
  tip:{
    fontSize:12,
    marginLeft:10,
    marginTop:5,
    color: '#505050'
  },
  row:{
    flexDirection:'row',
    marginLeft:10,
    marginRight:10,
    marginTop:10,
    paddingTop:5
  },
  distance:{
    width:120,
    alignItems:'flex-end',
  },
  name:{
    fontSize:15,
    marginBottom:6
  },
  type:{
    fontSize:12,
    color:'#686868'
  },
  mi:{
    fontSize:12,
    color:'#686868'
  },
  address:{
    fontSize:12,
    marginTop:5,
    color:'#686868'
  },
  phone:{
    marginLeft:10,
    marginRight:10,
    height:30,
    marginTop:10,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:Util.pixel,
    borderColor:'#ccc',
    borderRadius:2,
  },
  searchBg:{
    backgroundColor:'#fff',
    paddingBottom:10
  },
  item:{
    marginTop:10,
    backgroundColor:'#fff',
    paddingBottom:10,
    borderTopWidth:Util.pixel,
    borderBottomWidth:Util.pixel,
    borderColor:'#ccc'
  },
  activity:{
    marginTop:50,
    justifyContent:'center',
    alignItems:'center',
  }
});

module.exports = List;

