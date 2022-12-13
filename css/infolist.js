


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
  timeBlock:{
    // display:'flex',
    // flexDirection:'row',
    // alignItems:'flex-start',
    borderWidth:1,
    borderColor:'#f5f5f5',
    padding:15,
    borderRadius:10,
    marginBottom:15,
  },
  timelineIcon:{
    width:20,
    height:20,
  },
  main:{
    marginTop:40,
    padding:15,
  },
  line:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    width:1,
    minWidth:1,
    height:80,
    backgroundColor:'rgba(0,0,0,.1)'
  },
  timeLeft:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
  },
  timeRight:{
    marginLeft:10,
  },
  time:{
    color:'#C0C0C0',
    marginTop:10,
  },
  title:{
    display:'flex',
  },
  aaa:{

  },
});

module.exports = css;