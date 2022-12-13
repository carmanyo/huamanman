


import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet
} from 'react-native';
// import { ceil, color } from 'react-native-reanimated';
const window = Dimensions.get('window');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


var css = StyleSheet.create({
  main:{
    // paddingLeft:30,
    // paddingRight:30,
    // paddingTop:70,
    // paddingBottom:41,
    display:'flex',
    flexDirection:'column',
    // alignItems:'center',
    // justifyContent:'center',
    // backgroundColor:'blue',
    // position:'absolute',
    // top:10,
    // width:130,
    // height:300,
    marginTop:height/2-50,
  },
  inviteFont:{
    width:307,
    height:220,
  },
  inviteLine:{
    width:149,
    height:1,
    marginTop:20,
    marginBottom:10,
  },
  inviteEn:{
    width:266,
    height:11,
  },
  content:{
    // position:'absolute',
    // bottom:10,
    // flex:1,
    width:130,
    // backgroundColor:'pink',
    marginTop:30,
    borderRadius:20,
    // paddingTop:30,
    paddingBottom:30,
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    position:'relative',
    marginLeft:20,
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
  url:{
    textAlign:'center',
    color:'#333',
    marginTop:16,
    fontSize:12,
  },
  codeTitle:{
    fontSize:16,
    marginTop:19,
    fontWeight:'bold',
    // color:'#F2E2C2',
  },
  code:{
    color:'#F2E2C2',
    fontWeight:'bold',
    fontSize:18,
  },
  codeImg:{
    width:96,
    height:96,
    borderRadius:8,
    borderWidth:3,
    borderColor:'#F3A316',
    padding:5,
    marginTop:18,
    // backgroundColor:'#fff',
  },
  linearBtn:{
    width:144,
    marginTop:10,    
    lineHeight:30,
    height:30,
  },
  aaaa:{

  },
});

module.exports = css;