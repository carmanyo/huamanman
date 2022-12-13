


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
  topBg:{
    width:width,
    height:170,
    position:'absolute',
    top:0,
    left:0,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
  },
  user:{
    marginLeft:20,
    marginTop:20,
  },
  mobile:{
    color:'#fff',
    fontSize:24,
    marginRight:15,
  },
  vip:{
    backgroundColor:'#F7C98F',
    borderTopRightRadius:2,
    position:'relative',

  },
  vipIcon:{
      width:18,
      height:20,
      position:'absolute',
      left:-10,
      top:-5,
  },
  vipLevel:{
    fontSize:10,
    color:'#413B57',
    fontWeight:'bold',
    paddingLeft:10,
  },
  id:{
    color:'#fff',
    fontSize:13,
    marginTop:3,
  },
  myorder:{
    backgroundColor:'#fff',
    marginLeft:15,
    marginTop:20,
    marginRight:15,
    borderRadius:10,
    padding:10,
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems:'center',
    justifyContent:'space-between',
  },
  myorderTitle:{
    width:width,
    fontSize:15,
  },
  myorderBlock:{
    width:width/7,
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    paddingTop:15,
    paddingBottom:2,
  },
  mineIcon:{
    width:22,
    height:22,
  },
  mineText:{
    color:'#151419',
    fontSize:12,
    marginTop:8,
  },
  mineUl:{
    backgroundColor:'#fff',
    marginLeft:15,
    marginTop:10,
    marginRight:15,
    borderRadius:10,
    padding:15,
  },
  mineUlTitle:{
    fontSize:17,
    fontWeight:'bold'
  },
  mineLi:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingTop:15,
    paddingBottom:15,
    borderBottomWidth:1,
    borderBottomColor:'#EEEFF4',
  },
  liIcon:{
    width:18,
    height:18,
    marginRight:15,
  },
  liText:{
    fontSize:15,
  }
,});

module.exports = css;