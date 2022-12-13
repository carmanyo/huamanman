


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
  typeWrap:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingLeft:10,
    paddingRight:10,
    paddingTop:10,
    backgroundColor:'#fff',
  },
  type:{
    paddingBottom:5,
    borderBottomWidth:1,
    borderBottomColor:'#fff',
    color:'#999'
  },
  active:{
    borderBottomWidth:1,
    borderBottomColor:'#5864FF',
    color:'#5864FF',
  },
  recordBlock:{
    marginTop:10,
    backgroundColor:'#fff',
    paddingLeft:20,
    paddingRight:20,
    paddingTop:10,
    paddingBottom:10,
  },
  recordTitle:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  recordText:{
    marginTop:5,
    color:'#999'
  },
  aaaaa:{

  },
  aaaaa:{

  },
  aaaaa:{

  },
  aaaaa:{

  },
  aaaaa:{

  },
});

module.exports = css;