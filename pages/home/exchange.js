
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

import {getExchangeConfig,getexchangesubmitAjax} from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient  from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;

import common from '../../css/common.js'
import css from '../../css/exchange.js'

class exchange extends React.Component{
    state = { 
        config:'',
        num:0,
    }
    componentDidMount(){
        this.config();
    }
    config(){
        var that = this;
        let {navigation} = this.props;
        var fromData = {};
        fromData['type'] = 2
        getExchangeConfig(fromData,res =>{
        // console.log(res)
            if(res.code == 1){
                this.setState({
                    config:res.data
                })
            }else{
                // Toast.show(res.msg, 2000);
            }
        })
    }
    submit(){
        // Toast.show('res.msg, 2000');
        var that = this;
        let {navigation} = this.props;
        var fromData = {};
        if(this.state.num==''){return Toast.show('请输入兑换数量')}
        fromData['type'] = 2;
        fromData['num'] = this.state.num;
        // console.log(fromData)
        // return;
        getexchangesubmitAjax(fromData,res =>{
        // console.log(res)
            if(res.code == 1){
                Toast.show(res.msg, 2000);
                navigation.navigate('asset');
                // navigation.navigate('exchangerecord');
            }else{
                Toast.show(res.msg, 2000);
            }
        })
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
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>兑换</Text></View>
                </View>
                 
                <View style={common.main}>
                    {/* <Text style={css.grayBg} v-show="type==1">充值USDT 兑换 FT</Text> */}
                    <Text style={css.grayBg} v-show="type==2">FT 兑换 FEF</Text>
                    {/* <Text style={css.grayBg} v-show="type==3">FEF 兑换 可用USDT</Text> */}
                    {/* <Text style={css.grayBg} v-show="type==4">充值USDT 兑换 可用USDT</Text> */}
                    <View style={css.usable} v-show="config.money!=''"><Text>可用FT</Text><Text>{this.state.config.money}</Text></View>
                    <Text style={css.number}>兑换数量</Text>
                    <View style={css.inputItem}>
                        <TextInput type="number" style={css.input} value={this.state.num} onChangeText={(text)=>{this.setState({num:text})}} placeholder="请输入兑换数量" placeholder-style={common.placeholder}/>
                    </View>
                    <Text style={css.about}>* 兑换必须是 {this.state.config.double} 的倍数</Text>
                    <Text style={css.about}>* 今日FEF价格 {this.state.config.today_fef_price} USDT</Text>
                    {/* <View style={css.service}><Text>手续费</Text><View style={css.serviceNum}><Text>0.0000</Text><Text style={{fontSize:10,marginLeft:5}}>USDT</Text></View></View> */}
                    <TouchableOpacity onPress={this.submit.bind(this)} style={[css.linearBtn,{marginTop:58,marginLeft:15,width:width-30}]}>
                        <LinearGradient colors={['#4767FF', '#B657FF']} style={common.linearBtn} start={{x: 0, y: 0}} end={{x: 1, y: 1}}><Text style={common.linearBtnText}>确认兑换</Text></LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default exchange;