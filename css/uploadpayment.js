


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
    paddingLeft:20,
    paddingRight:20,
  },
  need:{
    backgroundColor:'rgba(0,0,0,.1)',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    padding:15,
    borderRadius:5,
  },
  content:{
    borderRadius:30,
    backgroundColor:'#fff',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'space-between',
    paddingTop:30,
    paddingBottom:40,
    marginTop:20.
  },
  shoukuan:{
    width:200,
    height:200,
  },
  scanTitle:{
    color:'#58575C',
    fontSize:15,
    marginBottom:19,
  },
  url:{
    width:300,
    textAlign:'center',
    color:'#494D5C',
    marginTop:20,
  },
  copyBtn:{
    width:60,
    lineHeight:27,
    borderWidth:1,
    borderColor:'#B6B8C2',
    borderRadius:3,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginTop:10,
  },
  upload:{
    borderRadius:5,
    marginTop:30,
    borderWidth:1,
    borderStyle:'dashed',
    borderColor:'#BAB3E6',
    width:275,
    minHeight:80,
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
  },
  camera:{
    width:30,
    height:24,
    marginBottom:8,
  },
  uploadImg:{
    width:275,
    height:350,
  },
  aaaa:{

  },
  aaaa:{

  },
  aaaa:{

  },
  aaaa:{

  },
});

module.exports = css;