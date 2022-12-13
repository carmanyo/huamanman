


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
  whiteBg: {
    backgroundColor: '#fff',
    paddingLeft: 30,
    paddingRight: 30,
  },
  inputWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#f5f5f5',
    // paddingTop: 20,
    // paddingBottom: 20,
    maxWidth:width-55,
    height:70,
    minHeight:70,
    position:'relative',
    // backgroundColor:'pink'
  },
  inputWrapNoBorder: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height:70,
    minHeight:70,
  },
  inputWrapLabel: {
    minWidth: 80,
  },
  setdefault: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    backgroundColor: '#fff',
    paddingLeft: 25,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 5,
    width:width,
    maxWidth:width,
  },
  detail: {
    marginTop: 20,
  },
  aaa: {

  },
  aaa: {

  },
  aaa: {

  },
  aaa: {

  },
});

module.exports = css;