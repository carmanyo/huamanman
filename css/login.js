


import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet
} from 'react-native';
// import { color } from 'react-native-reanimated';
const window = Dimensions.get('window');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


var css = StyleSheet.create({
  main:{
    paddingLeft:37,
    paddingRight:37,
    minHeight:height,
  },
  logo:{
    width:96,
    height:96,
    borderRadius:100,
  },
  logoWrap:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginTop:80,
    marginBottom:87,
  },
  inputItem:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    borderBottomWidth:1,
    borderColor:'#f5f5f5',
    paddingTop:5,
    paddingBottom:5,
    position:'relative',
  },
  jump:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginTop:10,
  },
  remember:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
  },
  download:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingLeft:50,
    paddingRight:50,
    marginTop:20,
  },


  // 注册
  topClose:{
    width:20,
    height:20,
    position:'absolute',
    top:30,
    right:40,
  },
  hi:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
  },
  hibg:{
    width:39,
    height:35,
    marginLeft:-15,
  },
  hiTitle:{
    fontSize:30,
  },
  welcome:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
  },
  tips:{
    marginTop:20,
    color:'#4F65FF'
  },
  placeholder:{
    color:'#E7E7E7',
  },
  logoTittle:{
    fontSize:26,
    color:'#333333',
    textAlign:'center',
    marginBottom:80,
  },
  itemIcon:{
    width:24,
    height:24,
    marginRight:5,
  },
  itemText:{
    fontSize:15,
    color:'#333333',
    fontWeight:'bold',
  },
  tick:{
    width:18,
    height:18,
    marginRight:5,
  },
  forgetpwdText:{
    textAlign:'center',
    marginTop:93,
    color:'#F3A316',
  },
  returnIcon:{
    width:23,
    height:23,
    marginLeft:18,
    marginTop:80,
  },
  pageTittle:{
    fontSize:27,
    color:'#333333',
    fontWeight:'bold',
    marginBottom:30,
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
  aaa:{

  },
  aaa:{

  },
  aaa:{

  },
});

module.exports = css;