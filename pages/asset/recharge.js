
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
// import ImagePicker from 'react-native-image-picker';

import {getRechargeConfig} from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient  from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;

import common from '../../css/common.js'
import css from '../../css/cashfef'
import { bind } from 'core-js/core/function';

class recharge extends React.Component{
    constructor(props) {
        super(props);
    }
    state = { 
        num:'',
        config:[],
    }
    componentDidMount(){
        this.config();
    }
    config(){
        var that = this;
        let {navigation} = this.props;
        var fromData = {};
        getRechargeConfig(fromData,res =>{
        // console.log('充值配置'+JSON.stringify(res))
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
        if(this.state.num==''){return Toast.show('请输入充值数量')}
        var num = this.state.num;
    // console.log(num)
        navigation.navigate('uploadpayment',{num:num})
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
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>充值</Text></View>
                    <TouchableOpacity onPress={()=>{navigation.navigate('rechargerecord');}} style={common.headerRight}><Text style={common.headerRightText}>充值记录</Text></TouchableOpacity>
                </View>
                
                <View style={css.main}>
                    {/* <View style={css.usable}><Text>可用FEF</Text><Text>0.00000000</Text></View> */}
                    <Text style={css.label}>充值数量</Text>
                    <View style={css.inputItem}>
                        <TextInput type="number" value={this.state.num} onChangeText={(text)=>{this.setState({num:text})}} placeholder="请输入充值数量" placeholder-style={css.placeholder}/>
                    </View>
                    
                    
                    <View style={css.tips}>
                        <Text style={{color:'#D857FF'}}>*温馨提示：</Text>
                        <Text>1、充值数量为{this.state.config.usdt_cz_double} 的倍数(FEF)</Text>
                        <Text>2、本平台采用线下客服审核，请勿恶意操作，否则封号处理！</Text>
                        <Text>3、请在提交后，认真核对充值地址并上传带哈希值的凭证，图片缩小后上传。</Text>
                        <Text>4、充值通道：TRC20</Text>
                    </View>
                    
                    <TouchableOpacity onPress={this.submit.bind(this)} style={[css.linearBtn,{marginTop:58,marginLeft:15,width:width-70}]}>
                    <LinearGradient colors={['#4767FF', '#B657FF']} style={common.linearBtn} start={{x: 0, y: 0}} end={{x: 1, y: 1}}><Text style={common.linearBtnText}>下一步</Text></LinearGradient>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default recharge;