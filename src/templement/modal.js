import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Modal,
  PixelRatio,
  View,
  Button,
  DeviceEventEmitter
} from 'react-native';
import MidPart from './midPart'
import Footer from './footer'

export default class extends Component {

  constructor(props) {
    super(props);//这一句不能省略
    this.state = {
    };
  }
  
  componentDidMount() {
    const {judge}=this.props
    this.inputData = new Map()
    this.deEmitter = DeviceEventEmitter.addListener('inputData', (data) => {
    this.inputData = data;
    judge&&judge(data)
  });
}
  componentWillUnmount() {
      this.deEmitter.remove();
  }
  render() {
  
   const {ok,cancal,title,onRequestClose,modalStyle,
    innerContainerTransparentStyle,animationType,
    modalVisible,midData}=this.props
    // let genData = []
    // console.log(midData)
  
    return (
        <Modal
          animationType={animationType}
          transparent={true}
          visible={modalVisible}
          onRequestClose={() =>onRequestClose&&onRequestClose() }
          onShow={this.startShow}
          >
          <View style={[styles.container, modalStyle]}>
            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
            
              <View style={[styles.mp10,  { alignItems: 'center' }]}>
                <Text style={styles.title}>{title}</Text>
              </View>
 
               <View style = {styles.mid}>
                   <MidPart 
                     placeholder = {this.props.placeholder}
                     data = {midData}
                   />
               </View>
               
              <View style = {styles.footer}>
                <Footer
                    cancal = {()=>{cancal&&cancal(this.inputData)}}
                    ok = {()=>{ok&&ok(this.inputData)}}
                    rightTitle = {this.props.footerRight}
                    leftTitle = {this.props.footerLeft}
                />
              </View>
            </View>
          </View>
        </Modal>
    );
  }

  startShow=()=>{  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
    // backgroundColor:'red'
  },
  innerContainer: {
    borderRadius: 10,
    backgroundColor:'#B0C4DE'
  },
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
  },
  mp10: {
    marginTop: 5,
    borderBottomWidth:0.5,
    marginBottom: 5,
  },
  btn: {
    borderRadius: 3,
    backgroundColor: '#FFBA27',
    padding: 5,
  },
  title: {
    lineHeight: 30,
    textAlign: 'center',
    color: '#fff',
    padding:5,
    fontSize: 16
  },
  mid:{
    borderBottomWidth:0.2,
   
  } , 
  footer:{
    marginTop:5,
  }
});
