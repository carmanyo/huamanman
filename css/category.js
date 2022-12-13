


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
  searchWrap:{
    borderWidth:1,
    borderColor:'#DDDDDD',
    marginLeft:15,
    marginRight:15,
  },
  content:{
    display:'flex',
    flexDirection:'row',
    alignItems:'flex-start',
  },
  contentLeft:{
    width:87,
    height:height - height/5.7,
    marginTop:5,
  },
  catText:{
    color:'#333333',
    padding:15,
    borderBottomWidth:1,
    borderColor:'#F5F5F5',
    textAlign:'center',
  },
  contentRight:{
    width:width-77,
    backgroundColor:'#F5F5F5',
    height:height - height/5.7,
    marginTop:5,
    padding:5,
    // paddingLeft:15,
    // paddingRight:15,
    paddingBottom:20,
    overflow:'hidden',
    marginBottom:20,
    paddingTop:0,
  },
  catBanner:{
    width:'100%',
    height:128,
    borderRadius:5,
  },
  goodsImage: {
    width: '100%',
    height:113,
  },
  catTittle:{
    fontSize:14,
    marginTop:15,
    fontWeight:'bold',
  },
  goodsWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent:'space-between',
    marginTop:5,
    backgroundColor:'#fff',
    padding:5,
    // paddingLeft:10,
    // paddingRight:10,
    paddingBottom:0,
    marginBottom:20,
  },
  goodsBlock: {
    position:'relative',
    width: '49.5%',
    // minWidth:'48.5%',
    // borderWidth:1,
    // borderColor:'#F6F6F6',
    display:'flex',
    flexWrap:'wrap',
    alignItems:'flex-start',
    borderRadius:5,
    marginBottom:15,
    zIndex: 1,
    borderWidth:1,
    borderColor:'#F5F5F5',
    // elevation: 1,  //  设置阴影角度，通过这个设置有无阴影（这个是最重要的，决定有没有阴影）
    // shadowColor: '#F5F5F5',  //  阴影颜色
    // shadowOffset: { width: 0, height: 0 },  // 阴影偏移
    // shadowOpacity: 0.1,  // 阴影不透明度
    // shadowRadius: 10,  //  圆角
  },
  dotIcon: {
    width:15,
    height:3,
    position:'absolute',
    right:10,
    bottom:10,
  },
  goodsSku: {
    color:'#F3A316',
    borderWidth:1,
    borderColor:'#F3A316',
    padding:2,
    fontSize:12,
    paddingLeft:5,
    paddingRight:5,
    marginTop:3,
    borderRadius:2,
    marginBottom:4,
  },
  catTextActive:{
    backgroundColor:'#F5B50E',
    color:'#fff',
  },
  grayLine:{
    width:width,
    height:1,
    minHeight:1,
    backgroundColor:'#F5F5F5',
    marginTop:10,
  },
  deleteIcon:{
    width:14,
    height:14,
  },
  title:{
    color:'#111111',
    fontWeight:'bold',
  },
  historyText:{
    padding:8,
    paddingLeft:26,
    paddingRight:26,
    backgroundColor:'#F5F5F5',
    color:'#A5A5A5',
    borderRadius:50,
    marginTop:12,
    marginRight:9,
  },
  history:{
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems:'center',
    marginTop:8,
  },
  aaa:{

  },
  aaa:{

  },
});

module.exports = css;