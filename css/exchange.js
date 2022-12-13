

 
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
  grayBg:{
    backgroundColor:'#FAFAFC',
    marginTop:10,
    lineHeight:51,
    marginLeft:15,
    marginRight:15,
    fontSize:15,
    paddingLeft:15,
    borderRadius:5,
  },
  usable:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    margin:20,
    color:'#58575C',
    fontSize:15,
  },
  number:{
    marginLeft:20,
  },
  input:{
    marginLeft:20,
    fontSize:15,
    paddingBottom:15,
    borderBottomWidth:1,
    borderColor:'#EDEDED',
    width:width-40,
  },
  about:{
    color:'#7B70FB',
    fontSize:13,
    marginLeft:20,
    marginTop:10,
  },
  service:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginTop:20,
    marginLeft:20,
    marginRight:20,
    fontSize:15,
  },
  serviceNum:{
    display:'flex',
    flexDirection:'row',
    alignItems:'flex-end',
  },
  aaa:{

  },
});

module.exports = css;