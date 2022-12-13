


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
    paddingLeft:20,
    paddingRight:20,
    marginTop:40,
  },
  usable:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginTop:10,
    marginBottom:10,
  },
  inputItem:{
    borderBottomWidth:1,
    borderColor:'#EDEDED',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  label:{
    marginTop:10,
  },
  service:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginTop:20,
  },
  serviceNum:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
  },
  tips:{
    backgroundColor:'#FAFAFC',
    borderRadius:5,
    padding:10,
    marginTop:20,
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