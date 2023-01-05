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
const height = Dimensions.get('window').height;

 
var css = StyleSheet.create({
  topBg: {
    width: width,
    height: 300,
    backgroundColor: '#000',
  },
  maFu: {
    marginTop: -280,
    marginLeft: 15,
    marginRight: 15,
    maxWidth: width - 30,
    // height:height,
  },
  addressIcon: {
    width: 14,
    height: 18,
  },
  arrowIcon: {
    width: 5,
    height: 10,
  },
  addressText: {
    fontSize: 15,
    color: '#fff',
    marginLeft: 9,
    marginRight: 10,
  },
  newsIcon: {
    width: 22,
    height: 22,
  },
  searchWrap: {
    backgroundColor: '#fff',
    borderRadius: 50,
    justifyContent: 'space-between',
    marginTop: 19,
  },
  searchIcon: {
    width: 19,
    height: 19,
    marginLeft: 5,
  },
  searchText: {
    color: '#fff'
  },
  searchBtn: {
    backgroundColor: '#F3A913',
    width: 59,
    height: 31,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 50,
    marginRight: 5,
  },
  textInput: {
    height: 40,
    width: width - 130,
    // backgroundColor:'pink',
  },
  funWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  funIcon: {
    width: 25,
    height: 25,
    marginBottom: 5,
    marginTop: 20,
  },
  funText: {
    color: '#fff',
    marginBottom: 15,
  },
  banner: {
    width: width - 30,
    height: 150,
    borderRadius: 6,
  },
  // 文字滚动
  scrollNotice: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingTop: 10,
    // paddingBottom: 10,
    // paddingLeft: 15,
    paddingRight: 15,
    // marginTop:20,
    height: 50,
    borderBottomWidth:1,
    borderColor:'#F5F5F5',
  },
  indexNewsIcon: {
    width: 20,
    height: 20,
  },

  catWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: width + 20,
    marginLeft: -15,
    paddingRight: 20,
  },
  catWrap2: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    // width: width + 20,
    // marginLeft: -15,
    // paddingRight: 20,
  },
  catIcon: {
    width: 45,
    height: 45,
    marginBottom: 2,
    borderRadius:10,
  },
  cat: {
    display: 'flex',
    flexDirection: 'column',
    width: '20%',
    alignItems: 'center',
    marginTop: 20,
  },
  cats: {
    display: 'flex',
    flexDirection: 'column',
    width: '25%',
    alignItems: 'center',
    marginTop: 20,
  },
  grayLine: {
    width: width,
    height: 5,
    backgroundColor: '#F5F5F5',
    marginLeft: -15,
    marginTop: 28,
  },
  nav: {
    width:width-15,
    minWidth:width-15,
    marginLeft:-15,
    height:70,
    // display: 'flex',
    // alignItems: 'center',
    // flexDirection: 'row',
    // justifyContent:'space-around',
    // justifyContent: 'space-between',
    // marginTop: 20,
    // backgroundColor:'blue',
  },
  navBlock: {
    width:width/4,
    minWidth:width/4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor:'pink',
  },
  bigText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: 'bold',
  },
  smallText: {
    color: '#C0C0C0',
    fontSize: 13.
  },
  bigTextActive: {
    color: '#F6BF0A',
  },
  smallTextActive: {
    backgroundColor: '#F4B20F',
    color: '#fff',
    paddingLeft: 9,
    paddingRight: 9,
    borderRadius: 10,
  },

  goodsWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent:'space-between',
    marginTop:17,
  },
  goodsBlock: {
    position:'relative',
    width: '48.5%',
    // width:159,
    minWidth:'48.5%',
    maxWidth:'48.5%',
    padding: 6,
    borderWidth:1,
    borderColor:'#F6F6F6',
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems:'flex-start',
    borderRadius:5,
    marginBottom:15,
    zIndex: 1,
    elevation: 1,  //  设置阴影角度，通过这个设置有无阴影（这个是最重要的，决定有没有阴影）
    shadowColor: '#F5F5F5',  //  阴影颜色
    shadowOffset: { width: 0, height: 0 },  // 阴影偏移
    shadowOpacity: 0.1,  // 阴影不透明度
    shadowRadius: 10,  //  圆角
    flex: 1, 
  },
  goodsImage: {
    width: '100%',
    // width:159,
    height:159,
    // flex: 1, 
    // resizeMode: 'contain' 
  },
  goodsName: {
    marginTop:4,
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
    marginRight:5,
  },
  goodsSku2: {
    color:'#F3A316',
    borderWidth:1,
    borderColor:'#F3A316',
    // padding:2,
    fontSize:12,
    // paddingLeft:5,
    // paddingRight:5,
    marginTop:3,
    borderRadius:2,
    marginRight:5,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
  },
  goodsPriceWrap: {
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
  },
  dotIcon: {
    width:15,
    height:3,
    position:'absolute',
    right:10,
    bottom:15,
  },
  sPrice: {
    color:'#F81E39',
    fontSize:12,
    marginTop:4,
  },
  bPrice: {
    color:'#F81E39',
    fontSize:18,
    fontWeight:'bold',
    marginLeft:2,
    marginRight:4,
  },
  storeLogo: {
    width:100,
    height:100,
    marginRight:10,
    borderRadius:10,
  },
  storeIcon: {
    width:16,
    height:16,
    marginRight:10,
  },
  storeName: {
    fontWeight:'bold',
    fontSize:16,
    color: '#666666',
  },
  store: {
    marginBottom:15,
    borderWidth:1,
    borderColor:'#F6F6F6',
    padding:10,
    width:width-30,
    borderRadius:8,
  },
  storeWrap: {
    paddingBottom:20,
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
  aaaaaa: {

  },
  aaaaaa: {

  },
  aaaaaa: {

  },
  aaaaaa: {

  },
  aaaaaa: {

  },

});

module.exports = css;