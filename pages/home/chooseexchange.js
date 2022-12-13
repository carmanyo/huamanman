
import React from 'react';
import {
  Alert,
  TextInput,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Overlay,
} from 'react-native';

import {getLogin} from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient  from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;

import common from '../../css/common.js'
import css from '../../css/chooseexchange.js'

class chooseexchange extends React.Component{
    state = { 
    }
    render(){
        let {navigation} = this.props;
        return(
            <View style={common.body}>
                {/* 头部 */}
                <View style={[common.header]}>
                    <TouchableOpacity onPress={()=>{navigation.goBack();}} style={common.headerLeft}>
                    <Image source={require('../../images/return.png')}  style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>请选择</Text></View>
                </View>
                
                <View style={css.main}>
                    <View style={css.myUl}>
                        {/* <TouchableOpacity onPress={()=>{navigation.navigate('exchange');}} style={css.myLi}><Text style={css.myLiTitle}>充值USDT 兑换 可用USDT</Text><Image style={css.chooseMore} source={require("../../img/choose-more.png")} /></TouchableOpacity> */}
                        {/* <TouchableOpacity onPress={()=>{navigation.navigate('exchange');}} style={css.myLi}><Text style={css.myLiTitle}>USDT 兑换 FT</Text><Image style={css.chooseMore} source={require("../../img/choose-more.png")} /></TouchableOpacity> */}
                        <TouchableOpacity onPress={()=>{navigation.navigate('exchange');}} style={css.myLi}><Text style={css.myLiTitle}>FT 兑换 FEF</Text><Image style={css.chooseMore} source={require("../../img/choose-more.png")} /></TouchableOpacity>
                        {/* <TouchableOpacity onPress={()=>{navigation.navigate('exchange');}} style={css.myLi}><Text style={css.myLiTitle}>FEF 兑换 USDT</Text><Image style={css.chooseMore} source={require("../../img/choose-more.png")} /></TouchableOpacity> */}
                        <TouchableOpacity onPress={()=>{navigation.navigate('exchangerecord');}} style={css.myLi}><View style={css.myLiSpan}><Image style={css.chooseIcon} source={require("../../img/choose-4.png")} /><Text>兑换记录</Text></View><Image style={css.chooseMore} source={require("../../img/choose-more.png")} /></TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
export default chooseexchange;