import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import {ExpandableList} from "./ExpandableList";
import {Constants} from "../../templement/Constants";
import {mockData} from './expand.data'

export default class ExpandList extends PureComponent {
  
  constructor(props) {
    
    super(props);
    this.state = {
      headertitle:''
    }
    this._renderGroupListItem = this._renderGroupListItem.bind(this);
    this._renderGroupHeader = this._renderGroupHeader.bind(this);
  }
  _renderGroupListItem({item, groupId, rowId}) {
    const {onSubmit} = this.props
    const {findWay} = item;
    return (
      <View style={styles.listItemContainer}>
       <TouchableOpacity onPress = {()=>{this.setState({headertitle:findWay}),
                                           onSubmit&&onSubmit(findWay) ,
                                           this.refs.exp.closeAll()}}
        >
        <View style={styles.info}>
          <Text style={styles.findWay}>{findWay}</Text>
        </View>
        </TouchableOpacity >
      </View>
    );
  }

  _renderGroupHeader({item, groupId, status, toggleStatus}) {
    const {style} = this.props
    const {title, online, total} = item;
     const arrowImage = require('./arrow.png') 
    let headertitle = this.state.headertitle ===''?title:this.state.headertitle

    return (
      <TouchableOpacity onPress={() => toggleStatus()}>
        <View style={[styles.groupHeader,style]}>
          <View style={styles.groupTitle}>
            <Image style={styles.groupTitleArrow} source={arrowImage}/>
            <Text style={styles.groupTitleText}>{headertitle}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    
    // const {data = []} = this.props;
    console.log(mockData)
    return (
      <View style={{flex: 1}}>
        <ExpandableList
          data={mockData}
          implementedBy={'FlatList'}
          renderGroupHeader={this._renderGroupHeader}
          renderGroupListItem={this._renderGroupListItem}
          ref = 'exp'
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  groupHeader: {
     height: 40,
    // paddingHorizontal:1,
    // borderWidth:1,
    marginLeft:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
     backgroundColor:'#B0C4DE',
    borderRadius:10
  },
  groupTitle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  groupTitleArrow: {
    width: 15,
    height: 15,
    marginRight: 5
  },
  groupTitleText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold'
  },
  
  listItemContainer: {
    //  borderWidth:1 / Constants.PX_RATIO,
     marginLeft:5,
    // height:20,
    // alignItems: 'center',
    //  borderBottomWidth: 1 / Constants.PX_RATIO,
    // borderBottomColor: 'green'//'#DDD'
    padding:3
  },
  info: {
      height: 30,
      width:120,

      // padding:5,
    // marginVertical: 10,
    // justifyContent: 'space-between',
    // margin:5,
    paddingLeft:15,
    backgroundColor:'#B0C4DE',
    borderRadius:10, 
    padding:3
  },
  findWay: {
    color: '#333',
    fontSize: 18,
    // fontWeight: 'bold'
  },
});