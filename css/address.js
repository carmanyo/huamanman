


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
  addressList:{
    marginTop:50,
    paddingLeft:15,
    paddingRight:15,
    width:width,
  },
  addressBlock:{
    backgroundColor:'#fff',
    borderRadius:5,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:15,
    paddingRight:15,
    marginBottom:10,
  },
  edit:{
    width:15,
    height:18,
  },
  delete:{
    width:20,
    height:18,
    marginTop:5,
  },
  defaultLabel:{
    backgroundColor:'#FFB543',
    color:'#fff',
    fontSize:11,
    paddingLeft:3,
    paddingRight:3,
    borderRadius:2,
    marginLeft:100,
  },
  addressBox:{
    color:'#333333',
    marginTop:11,
    borderBottomWidth:1,
    borderColor:'#f5f5f5',
    paddingBottom:15,
  },
  hidden:{
    display:'none'
  },
  tel:{
    color:'#D4D4D4',
    fontSize:15,
    marginLeft:15,
  },
  check:{
    width:16,
    height:16,
    marginRight:5,
  },
  btnText:{
    color:'#333333',
  },
  editIcon:{
    width:14,
    height:14,
    marginRight:5,
  },
  cardLi:{
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingTop:20,
    paddingBottom:20,
    borderBottomWidth:1,
    borderColor:'#f5f5f5'
  },
  cardText:{
    fontSize:15,
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