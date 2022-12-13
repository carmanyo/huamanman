


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
  navWrap:{
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
    paddingLeft:20,
    paddingRight:20,
  },
  nav:{
    width:width/2-60,
    borderColor:'#D9D8E6',
    borderWidth:1,
    lineHeight:30,
    height:30,
    marginTop:10,
    textAlign:'center',
    borderRadius:50,
    color:'#8F96B3',
  },
  navActive:{
    color:'#4767FF',
    borderColor:'#4767FF',
  },
  recordBlock:{
    width:width-40,
    marginLeft:20,
    marginRight:20,
    // backgroundColor:'#FAFAFC',
    borderBottomWidth:1,
    borderColor:'#f5f5f5',
    // marginTop:10,
    // padding:15,
    borderRadius:5,
    paddingBottom:15,
    paddingTop:15,
  },
  typeName:{
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
  },
  beforeNum:{
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
  },
  charge:{
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
  },
  addtime:{
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
  },
  time:{
    color:'#A5A5A5',
    marginTop:10,
  },
  aaa:{

  },
  aaa:{

  },
  aaa:{

  },
});

module.exports = css;