


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
  returnIcon:{
    width:34,
    height:34,
    position:'absolute',
    top:8,
    left:10,
    zIndex:9
  },
  nowPrice:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
  },
  priceWrap:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
  },
  goodsinfo:{
    marginLeft:12,
    marginTop:11,
    margin:12,
  },
  priceIcon:{
    color:'#FF3F65',
    marginTop:10,
  },
  priceStrong:{
    fontSize:30,
    // fontWeight:'bold',
    color:'#FF3F65',
  },
  linePrice:{
    color:'#F83928',
    // textDecorationLine:'line-through',
    marginTop:10,
    marginLeft:10,
  },
  sale:{
    marginTop:10,
    color:'#666666',
    fontSize:13,
  },
  stock:{
    marginTop:10,
    color:'#666666',
    fontSize:13,
  },
  logistics:{
    borderTopWidth:10,
    borderColor:'#F4F4F4',
    paddingLeft:15,
    paddingRight:15,
  },
  logisticsBlock:{
    paddingTop:15,
    paddingBottom:15,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  logisticsNum:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
  },
  opeIcon:{
    width:29,
    height:25,
  },
  details:{
    borderTopWidth:10,
    borderColor:'#F4F4F4',
  },
  goodsTitle:{
    fontSize:16,
    fontWeight:'bold',
    color:'#333333',
  },
  goodsSku:{
    color:'#F3A316',
    borderWidth:1,
    borderColor:'#F3A316',
    paddingLeft:6,
    paddingRight:6,
    marginTop:6,
    borderRadius:3,
  },
  inviteLogo:{
    width:157,
    height:28,
  },
  inviteTitle:{
    color:'#606E86',
    marginTop:3.5,
    color:'#fff',
    fontSize:15,
    marginBottom:31,
    position:'absolute',
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
  tick:{
    width:18,
    height:18,
    marginRight:5,
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
  aaa:{

  },
});

module.exports = css;