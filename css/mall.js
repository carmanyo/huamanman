


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
  searchCon:{
    width:width,
    height:44,
  },
  topSearch:{
    position:'absolute',
    display:'flex',
  },
  searchWrap:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginLeft:40,
    backgroundColor:'#fff',
    borderRadius:5,
    height:34,
    marginTop:5,
    width:width-50,
    paddingRight:10,
  },
  searchIcon:{
    width:20,
    height:20,
  },
  goodsBlock:{
    backgroundColor:'#fff',
    width:width/2-20,
    borderRadius:5,
    marginLeft:10,
    marginTop:10,
  },
  goodsImg:{
    width:width/2-20,
    height:172,
  },
  main:{
    paddingLeft:5,
  },
  goodsTitle:{
    marginTop:6,
    marginLeft:10,
    marginRight:10,
    fontSize:13,
  },
  priceWrap:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingBottom:10,
    paddingRight:10,
    marginTop:10,
  },
  sale:{
    color:'#7A7980',
    fontSize:10,
  },
  price:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    marginLeft:10,
  },
  smallPrice:{
    fontSize:10,
    color:'#FF3F65',
  },
  priceStrong:{
    fontSize:15,
    color:'#FF3F65',
  },
  AAA:{

  },
});

module.exports = css;