


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
    marginTop:-100,
  },
  address:{
    backgroundColor:'#fff',
    borderRadius:10,
    marginLeft:15,
    marginRight:15,
    padding:15,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    flexWrap:'wrap',
  },
  addressTitle:{
    display:'flex',
    flexDirection:'row',
    width:width-100,
  },
  addressIcon:{
    width:18,
    height:18,
    marginRight:5,
  },
  addressInfo:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    width:width-60,
    justifyContent:'space-between',
  },
  addressContract:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
  },
  orderInfo:{
    marginLeft:15,
    marginTop:10,
    backgroundColor:'#fff',
    marginRight:15,
    borderRadius:10,
  },
  goodsWrap:{
    display:'flex',
    flexDirection:'row',
    alignItems:'flex-start',
    justifyContent:'space-between',
    padding:15,
  },
  goodsTitle:{
    color:'#58575C',
  },
  goodsInfo:{
    width:width-200,
    minHeight:120,
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'space-between',
  },
  priceWrap:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    width:width-200,
    borderBottomWidth:1,
    borderBottomColor:'#EBEBEB',
    paddingBottom:16,
  },
  price:{
    color:'#FF3F65',
    fontSize:15,
  },
  inputWrap:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    width:width-100,
    marginLeft:58,
  },
  inputLabel:{
    color:'#5B5B66',
  },
  footer:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor:'#fff',
    position:'absolute',
    bottom:-10,
    width:width,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:15,
    paddingRight:15,
  },
  footerTotal:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
  },
  aaa:{

  },
});

module.exports = css;