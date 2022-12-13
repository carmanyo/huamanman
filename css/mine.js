


import React, { Component } from 'react';
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
  topBg: {
    width: width,
    height: 250,
    backgroundColor: '#000',
  },
  maFu: {
    marginTop: -210,
    marginLeft: 15,
    marginRight: 15,
    maxWidth: width - 30,
    // height:height,
  },
  head: {
    width: 54,
    minWidth: 54,
    height: 54,
    borderRadius: 54,
    marginRight: 13,
  },
  tel: {
    color: '#fff',
    fontSize: 18,
  },
  vip: {
    width: 42,
    height: 14,
    marginLeft: 8.5,
  },
  level: {
    color: '#fff',
    backgroundColor: '#F9D16F',
    borderWidth: 1,
    borderColor: '#fff',
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 3,
    marginTop: 5,
  },
  span: {
    color: '#fff',
  },
  strong: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom:5,
  },
  myOrder: {
    backgroundColor:'#fff',
    marginBottom:18,
    // height:100,
    // width:width-100,
    elevation: 1,  //  设置阴影角度，通过这个设置有无阴影（这个是最重要的，决定有没有阴影）
    shadowColor: 'black',  //  阴影颜色
    shadowOffset: { width: 0, height: 0 },  // 阴影偏移
    shadowOpacity: 1,  // 阴影不透明度
    shadowRadius: 10,  //  圆角
    padding:20,
    paddingLeft:14,
    paddingRight:14,
    marginTop:16,
    borderRadius:16,
  },
  commonFunc:{
    padding:20,
    paddingLeft:14,
    paddingRight:14,
    paddingTop:10,
    // marginTop:16,
  },
  dot: {
    width:6,
    height:9,
    backgroundColor:'#F3A316',
  },
  title: {
    fontWeight:'bold',
    fontSize:15,
    color:'#333333',
    marginLeft:4,
  },
  allText: {
    color:'#666666',
    marginRight:3,
    fontWeight:'bold',
  },
  all: {
    width:9,
    height:9,
  },
  funImage: {
    width:28,
    height:28,
    marginBottom:1.5,
  },
  funText: {
    color:'#333333',
  },
  redDot: {
    backgroundColor:'#F81E39',
    position:'absolute',
    top:-6,
    right:0,
    paddingLeft:6,
    paddingRight:4,
    fontSize:12,
    color:'#fff',
    borderRadius:10,
    borderWidth:1,
    borderColor:'#fff',
  },
  numTittle: {
    color:'#fff',
    marginBottom:3,
  },
  num: {
    color:'#fff',
    paddingBottom:14,
    fontSize:16,
    fontWeight:'bold',
  },
  teamBlock: {
    paddingTop:16,
    paddingBottom:16,
    borderBottomWidth:1,
    borderColor:'#f5f5f5',
  },
  teamTel: {
    color:'#333333',
    fontSize:16,
    fontWeight:'bold',
  },
  teamLevel: {
    width:43,
    height:15,
    marginLeft:5,
  },
  teamTime: {
    color:'#A5A5A5',
  },
  teamStr: {
    color:'#F3A316',
    borderWidth:1,
    borderColor:'#F3A316',
    borderRadius:3,
    paddingLeft:6,
    paddingRight:6
  },
  teamStrActive: {
    color:'#fff',
    backgroundColor:'#F83928',
    borderRadius:3,
    fontSize:12,
    lineHeight:18,
    paddingLeft:6,
    paddingRight:6,
    marginLeft:10,
    display:'flex',
  },
  teamStrActive2: {
    color:'#fff',
    backgroundColor:'#A0A0A0',
    borderRadius:3,
    fontSize:12,
    lineHeight:18,
    paddingLeft:6,
    paddingRight:6,
    marginLeft:10,
    display:'flex',
  },
  jump:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginTop:10,
  },
  remember:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
  },
  tick:{
    width:18,
    height:18,
    marginRight:5,
  },
  aaaaa: {

  },
  aaaaa: {

  },
  aaaaa: {

  },
});

module.exports = css;