


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
  addressIcon:{
    width:30,
    height:30,
    marginRight:10,
  },
  main:{
    marginTop:40,
    paddingLeft:15,
    paddingRight:10,
  },
  address:{
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
    backgroundColor:'#fff',
    borderRadius:10,
    padding:15,
    marginTop:10
  },
  order:{
    marginTop:10,
    borderRadius:10,
    backgroundColor:"#fff",
    padding:10,
  },
  shop:{
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
  },
  orderCon:{
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'#FAFAFC',
    borderRadius:6,
    marginTop:10,
    padding:10,
  },
  detailsP:{
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:10,
  },
  orderInfo:{
    backgroundColor:'#fff',
    borderRadius:10,
    padding:15,
    marginTop:10,
  },
  orderInfoNormal:{
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:10,
  },
  AAA:{

  },
});

module.exports = css;