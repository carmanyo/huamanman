


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


var css = StyleSheet.create({
  navCon:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingLeft:30,
    paddingRight:30,
    marginTop:40,
    backgroundColor:'#fff',
    paddingTop:10,
  },
  nav:{
    paddingBottom:5,
    borderBottomWidth:1,
    borderColor:'transparent',
  },
  navActive:{
    borderBottomWidth:1,
    borderColor:'#000000'
  },
  navText:{
    color:'#AAAABB'
  },
  order:{
    width:width-30,
    marginTop:10,
    marginLeft:15,
    backgroundColor:'#fff',
    padding:10,
    borderRadius:10,
  },
  orderCon:{
    display:'flex',
    flexDirection:'row',
    marginTop:10,
  },
  navActiveText:{
    color:'#000000'
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