


import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet
} from 'react-native';
// import { ceil, color } from 'react-native-reanimated';
const window = Dimensions.get('window');
const width = Dimensions.get('window').width;


var css = StyleSheet.create({
  recordBlock:{
    marginTop:10,
    backgroundColor:'#fff',
    paddingLeft:15,
    paddingRight:15,
    paddingTop:10,
    paddingBottom:10,
  },
  recordBlock:{
    marginTop:10,
    backgroundColor:'#fff',
    paddingLeft:20,
    paddingRight:20,
    paddingTop:10,
    paddingBottom:10,
  },
  recordTitle:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  recordText:{
    marginTop:5,
    color:'#999'
  },
  linearBtn:{
    width:80,
    marginTop:0,
    borderRadius:50,
    height:30,
    marginLeft:10,
    marginTop:15,
  },
  linearBtnText:{
    lineHeight:30,
    textAlign:'center',
    color:'#fff',
    fontSize:13,
  },
  btnWrap:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',
    width:width-40,
  },
  aaa:{
    
  },
  aaa:{
    
  },
  aaa:{
    
  },
  aaa:{
    
  },
  aaa:{
    
  },
  aaa:{
    
  },
});

module.exports = css;