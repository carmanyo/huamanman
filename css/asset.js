


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
  topbg:{
    width:window.width,
    maxWidth:window.width,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
  },
  data:{
    paddingTop:25,
    paddingLeft:25,
  },
  dataStonrg:{
    fontSize:15,
    color:'#FFF',
  },
  dataTitle:{
    fontSize:27,
    color:'#FFF',
    marginTop:20,
  },
  dataP:{
    fontSize:15,
    color:'#FFF',
    marginTop:10,
  },
  funcWrap:{
    backgroundColor:'#fff',
    marginLeft:15,
    marginRight:15,
    marginTop:-45,
    borderRadius:10,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  funcWrapImage:{
    width:24,
    height:24,
    marginBottom:10,
  },
  assetLine:{
    width:1,
    height:34,
    backgroundColor:'#E6E4F0',
  },
  funcBlock:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    width:width/3,
    paddingTop:15,
    paddingBottom:15,
  },
  funcWrapText:{
    color:'#58575C',
    fontSize:13,
  },
  content:{
    backgroundColor:'#fff',
    marginLeft:15,
    marginRight:15,
    marginTop:10,
    borderRadius:10,
  },
  contentTitle:{
    fontSize:17,
    color:'#1D1E1F',
    marginTop:15,
    marginLeft:15,
  },
  block:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingTop:20,
    paddingBottom:20,
    marginLeft:15,
    marginRight:15,
    borderBottomWidth:1,
    borderBottomColor:'#F0F0F0',
  },
  blockLeft:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  assetIcon:{
    width:40,
    height:40,
    marginRight:10,
  },
  blockNum:{
    fontSize:17,
  }
});

module.exports = css;