


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
    marginTop:40,
    paddingLeft:15,
    paddingRight:15,
  },
  topdata:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    borderRadius:10,
    overflow:'hidden',
    marginTop:10,
    paddingTop:15,
  },
  strong:{
    color:'#fff',
    fontWeight:'bold',
    fontSize:18,
  },
  font:{
    marginTop:5,
    color:'#fff',
    fontSize:10,
  },
  dataWrap:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
  },
  dataLine:{
    width:1,
    height:20,
    backgroundColor:'#FFFFFF',
    marginLeft:25,
    marginRight:25,
  },
  dataBlockNum:{
    color:'#FFF',
    fontSize:16,
  },
  dataBlockFont:{
    fontSize:12,
    color:'#fff'
  },
  title:{
    fontSize:17,
    marginTop:20,
  },
  fanBlock:{
    display:'flex',
    flexWrap:'wrap',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingTop:15,
    paddingBottom:15,
    borderBottomWidth:1,
    borderBottomColor:'#E9EAF0',
  },
  blockTitle:{
    width:width-30,
  },
  statusIcon:{
    width:40,
    height:14,
  },
  width33:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    marginTop:10,
  },
  width100:{
    width:width-30,
    marginTop:10,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
  },
  gray:{
    fontSize:12,
    color:'#B3B3B3',
  },
  blockNum:{
    fontSize:12,
  },
  cccc:{

  },


});

module.exports = css;