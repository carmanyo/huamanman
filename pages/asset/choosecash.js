
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
import css from '../../css/choosecash.js'

class choosecash extends React.Component{
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
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>选择提现币种</Text></View>
                </View>
                
                <View style={common.main}>
                    <View>
                        {/* <TouchableOpacity onPress={()=>{navigation.navigate('cashusdt')}} style={css.cashLi}><View style={css.cashLiLabel}><Image style={css.assetIcon} source={require("../../img/choose-1.png")} /><Text>USDT</Text></View><Image style={common.more} source={require("../../img/choose-more.png")} /></TouchableOpacity> */}
                        <TouchableOpacity onPress={()=>{navigation.navigate('cashfef')}} style={css.cashLi}><View style={css.cashLiLabel}><Image style={css.assetIcon} source={require("../../img/choose-2.png")} /><Text>FEF</Text></View><Image style={common.more} source={require("../../img/choose-more.png")} /></TouchableOpacity>
                        <TouchableOpacity onPress={()=>{navigation.navigate('cashrecord')}} style={css.cashLi}><View style={css.cashLiLabel}><Image style={css.assetIcon} source={require("../../img/choose-3.png")} /><Text>FEF提现记录</Text></View><Image style={common.more} source={require("../../img/choose-more.png")} /></TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
export default choosecash;