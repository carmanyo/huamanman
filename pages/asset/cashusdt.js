
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
import css from '../../css/cashfef.js'

class cashusdt extends React.Component{
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
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>提现</Text></View>
                </View>
                
                <View style={css.main}>
                    <View style={css.usable}><Text>可用USDT</Text><Text>0.00000000</Text></View>
                    <Text style={css.label}>钱包地址</Text>
                    <View style={css.inputItem}>
                        <TextInput type="text"  placeholder="请输入您的钱包地址"/>
                    </View>
                    <Text style={css.label}>提现数量</Text>
                    <View style={css.inputItem}>
                        <TextInput type="number" v-model="num" placeholder="请输入提现数量"/>
                    </View>
                    <Text style={css.label}>验证码</Text>
                    <View style={css.inputItem}>
                        <TextInput type="number" v-model="code" placeholder="请输入短信验证码" style="width: 50%;"/>
                        <Text>remain</Text>
                    </View>
                    
                    <View style={css.service}><Text>手续费</Text><View style={css.serviceNum}><Text>0.0000</Text><Text>FEF</Text></View></View>
                    
                    
                    <View style={css.tips}>
                        <Text style={{color:'#D857FF'}}>*温馨提示：</Text>
                        <Text>1、提现通道：TRC20</Text>
                        <Text>2、提现金额：config.usdt_tx_double 的倍数</Text>
                        <Text>3、提现数量最低为 config.usdt_tx_min 个</Text>
                        <Text>4、每提现一笔需扣除config.usdt_tx_charge %手续费</Text>
                        <Text>5、请在提交前，认真核对提币地址</Text>
                    </View>
                </View>
                
                <TouchableOpacity style={[css.linearBtn,{marginTop:58,marginLeft:15,width:width-30}]}>
                    <LinearGradient colors={['#4767FF', '#B657FF']} style={common.linearBtn} start={{x: 0, y: 0}} end={{x: 1, y: 1}}><Text style={common.linearBtnText}>提现</Text></LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }
}
export default cashusdt;