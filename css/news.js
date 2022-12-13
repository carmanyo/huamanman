


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
  newsBlock:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor:'#fff',
    marginTop:10,
    marginLeft:15,
    marginRight:15,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:15,
    paddingRight:20,
    borderRadius:5,
  },
  newsTime:{
    color:'#999',
  },
  newsInfo:{
    width:width-100
  },
  aaa:{

  },
  aaa:{

  },
  aaa:{

  },
});

module.exports = css;