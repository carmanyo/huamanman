


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
  orderbg:{
    width:width,
    height:202,
    position:'absolute'
  },
  clock:{
    width:44,
    height:44,
    marginTop:15,
  },
  clockH1:{
    marginTop:7,
    color:'#fff',
    fontSize:15,
  },
  clockP:{
    color:'#FFE1AD',
    paddingBottom:20,
  },
  addressIcon:{
    width:32,
    height:32,
    // marginRight:11,
  },
  address:{
    maxWidth:width,
    backgroundColor:'#fff',
    padding:19,
    paddingLeft:32,
    paddingRight:25,
  },
  addressMore:{
    width:8,
    height:15,
  },
  name:{
    fontSize:15,
    color:'#333333',
  },
  tel:{
    color:'#D4D4D4',
    marginLeft:15,
  },
  detail:{
    marginTop:11,
    color:'#333333',
  },
  li:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingTop:20,
    paddingBottom:20,
    borderBottomWidth:1,
    borderColor:'#f5f5f5'
  },
  p:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginLeft:25,
    marginRight:25,
    paddingBottom:15,
  },
  strong:{
    color:'#F83928',
    fontSize:15,
  },
  check:{
    width:16,
    height:16,
    marginRight:5,
    fontSize:16,
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