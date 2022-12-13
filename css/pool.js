


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
    position:'absolute',
    top:0,
    width:width,
    minHeight:500,
  },
  linear:{
    height:500,
    display:'flex',
  },
  Echarts:{
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowRadius: 2,
    elevation: 1,
    marginLeft:15,
    marginRight:15,
    backgroundColor:'#fff',
    height:150,
    borderRadius:10,
    marginTop:-75,
  },
  todayPrice:{
    marginTop:15,
  },
  type:{
    width:100,
    height:30,
    textAlign:'center',
    borderRadius:100,
    borderWidth:1,
    borderColor:'#D2D1DB',
    color:'#1F1F1F',
    fontSize:15,
  },
  activeText:{
    color:'#fff'
  },
  data:{
    paddingLeft:20,
    paddingRight:20,
  },
  block:{
    backgroundColor:'#F4FCFE',
    marginTop:15,
    paddingTop:11,
    paddingBottom:11,
    paddingLeft:15,
    paddingRight:15,
    borderRadius:5,
  },
  itemName:{
    fontSize:15,
    fontWeight:'bold',
  },
  itemRate:{
    color:'#FFB20E',
    fontSize:20,
    marginBottom:1
  }


,});

module.exports = css;