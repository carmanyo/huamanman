


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
  block:{
    marginLeft:20,
    marginRight:20,
    marginTop:15,
    borderWidth:1,
    borderColor:'#F2F2F2',
    width:width-40,
    padding:15,
    borderRadius:15,
  },
  money:{
    color:'#F83928',
    fontSize:19,
    fontWeight:'bold',
  },
  jian:{
    fontSize:17,
    fontWeight:'bold',
    color:'#333333',
  },
  full:{
    color:'#F83928',
    marginTop:4,
  },
  own:{
    color:'#C0C0C0'
  },
  aaa:{

  },
});

module.exports = css;