


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
  main:{
    marginTop:50,
  },
  myUl:{
    paddingLeft:20,
    paddingRight:20,
  },
  myLi:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingTop:15,
    paddingBottom:15,
    borderBottomWidth:1,
    borderColor:'#E6E7EB',
  },
  chooseMore:{
    width:8,
    height:12,
  },
  myLiSpan:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
  },
  chooseIcon:{
    width:22,
    height:22,
    marginRight:10,
  },
  myLiTitle:{
    fontSize:15,
  },
  aaa:{

  },
});

module.exports = css;