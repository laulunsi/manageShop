
import React, { Component } from 'react';
let List = require('./list');

class Food extends React.Component{
  render(){
    return(
      <List type="餐饮" nav={this.props.navigator}/>
   );
  }
}
module.exports = Food;

