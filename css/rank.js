


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
    rankBg: {
        marginTop:-50,
        width:width,
    },
    thead: {
        marginTop:20,
    },
    th: {
        color:'#966834',
        width:'33.3%',
        textAlign:'center',
    },
    rankIcon: {
        width:22,
        height:22,
    },
    td: {
        width:'33.3%',
        textAlign:'center',
    },
    aaa: {

    },
});

module.exports = css;