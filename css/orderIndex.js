


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
const height = Dimensions.get('window').height;


var css = StyleSheet.create({
  orderBlock:{
    borderBottomWidth:5,
    borderColor:'#F5F5F5',
    paddingLeft:25,
    paddingRight:25,
    paddingBottom:20,
    paddingTop:15,
    // maxWidth:width-50,
  },
  orderImage:{
    width:94,
    height:94,
    marginRight:5,
  },
  orderInfoName:{
    width:width-94-50,
  },
  orderSku:{
    color:'#C0C0C0',
    marginTop:3,
  },
  price:{
    color:'#F83928',
    fontSize:17,
    fontWeight:'bold',
    marginTop:12,
  },
  number:{
    marginTop:12,
  },
  totalPrice:{
    fontSize:17,
    color:'#F83928',
    fontWeight:'bold',
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