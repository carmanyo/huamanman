
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

import {getregister} from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient  from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;

import common from '../../css/common.js'
import css from '../../css/login.js'
import VerificationCode from './verificationCode';
import StorageUtil from '../../network/StorageUtil.js'

class register extends React.Component{
    state = { 
        validate:'',
        myvalidate:'',
        pid:'',
        code:'',
        mobile:'',
        pwd:'',
        re_pwd:'',
        pay_pwd:'',
        re_pay_pwd:'',
        re_mobile:'',
    }
    componentDidMount(){
        // this.validate();
    }
    validate(m){
    // console.log('ssss---'+m)
        var str = '';
        for (let index = 0; index < m.length; index++) {
            str += m[index];
        }
        this.setState({
            validate: str
        })
    // console.log('sdfasdas-----'+str)
    }
    submit(){
        var that = this;
    // console.log(this.state.myvalidate)
    // console.log(this.state.validate)
        if(this.state.mobile==''){return Toast.show('请输入手机号码')}
        if(this.state.myvalidate==''){return Toast.show('请输入图形验证码')}
        if(this.state.myvalidate!=this.state.validate){return Toast.show('图形验证码错误,注意区分大小写')}
        if(this.state.pwd==''){return Toast.show('请输入登录密码')}
        if(this.state.re_pwd==''){return Toast.show('请再次输入登录密码')}
        if(this.state.pay_pwd==''){return Toast.show('请输入交易密码')}
        if(this.state.re_pay_pwd==''){return Toast.show('请再次输入交易密码')}
        if(this.state.re_mobile==''){return Toast.show('请手动输入确认手机号码')}
        let {navigation} = this.props;
        var fromData = {};
        fromData['pid'] = this.state.pid;
        fromData['code'] = '123456';
        fromData['mobile'] = this.state.mobile;
        fromData['pwd'] = this.state.pwd;
        fromData['re_pwd'] = this.state.re_pwd;
        fromData['pay_pwd'] = this.state.pay_pwd;
        fromData['re_pay_pwd'] = this.state.re_pay_pwd;
        // fromData['re_mobile'] = this.state.re_mobile;
        
        getregister(fromData,res =>{
            StorageUtil.clear();
            // console.log(res)
            // console.log(res.data.token)
            
            if(res.code == 1){
                Toast.show(res.msg, 2000);
                navigation.navigate('login')
            }else{
                Toast.show(res.msg, 2000);
            }
        })
    }
    render(){
        let {navigation} = this.props;
        return(
            <View style={[common.body, { paddingBottom: 0, }]}>
                <ImageBackground style={{ flex: 1 }} source={require('../../image/login-bg.png')}>
                    {/* 头部 */}
                    <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                        <Image source={require('../../image/return.png')} style={css.returnIcon} />
                    </TouchableOpacity >
                <ScrollView>
                <TouchableOpacity onPress={()=>{navigation.goBack();}}>
                    <Image style={css.topClose} source={require("../../img/close-1.png")} />
                </TouchableOpacity >
                <View style={[css.main,{marginTop:60,}]}>
                    <View style={css.hi}><Text style={css.hiTitle}>您好!</Text><Image style={css.hibg} source={require("../../img/bg-1.png")} /></View>
                    <View style={css.welcome}><Text>欢 迎 来 到</Text><Text style={{fontWeight:'bold',}}> 萤 火 虫</Text><Text> ，请 注 册</Text></View>
                    <View style={css.inputItem}>
                        <TextInput type="text" value={this.state.pid} onChangeText={(text)=>{this.setState({pid:text})}} placeholder="推荐人ID"/>
                    </View>
                    <View style={css.inputItem}>
                        <TextInput type="tel" value={this.state.mobile} onChangeText={(text)=>{this.setState({mobile:text})}} placeholder="手机号码"/>
                    </View>
                    <View style={css.inputItem}>
                        <TextInput type="text" value={this.state.myvalidate} onChangeText={(text)=>{this.setState({myvalidate:text})}} placeholder="图形验证码"/>
                        <VerificationCode callBack={(m)=>{this.validate(m);}}/>
                    </View>
                    <View style={css.inputItem}>
                        <TextInput type="password" value={this.state.pwd} onChangeText={(text)=>{this.setState({pwd:text})}} placeholder="登录密码（6-16位字母数字组合）"/>
                    </View>
                    <View style={css.inputItem}>
                        <TextInput type="password" value={this.state.re_pwd} onChangeText={(text)=>{this.setState({re_pwd:text})}} placeholder="确认登录密码"/>
                    </View>
                    <View style={css.inputItem}>
                        <TextInput type="password" value={this.state.pay_pwd} onChangeText={(text)=>{this.setState({pay_pwd:text})}} placeholder="交易密码（6位数字）"/>
                    </View>
                    <View style={css.inputItem}>
                        <TextInput type="password" value={this.state.re_pay_pwd} onChangeText={(text)=>{this.setState({re_pay_pwd:text})}} placeholder="确认交易密码"/>
                    </View>
                    <View style={css.inputItem}>
                        <TextInput type="password" value={this.state.re_mobile} onChangeText={(text)=>{this.setState({re_mobile:text})}} placeholder="手动输入确认手机号码"/>
                    </View>
                    <View><Text style={css.tips}>温馨提示：请务必用真实手机号，否则后续【提现】或【修改密码】等操作收不到验证码，用户自己承担！</Text></View>
                    
                    <TouchableOpacity onPress={()=>{this.submit()}} style={[css.linearBtn,{marginTop:38,width:width-68}]}>
                        <LinearGradient colors={['#4767FF', '#B657FF']} style={common.linearBtn} start={{x: 0, y: 0}} end={{x: 1, y: 1}}><Text style={common.linearBtnText}>注册</Text></LinearGradient>
                    </TouchableOpacity>
                    <View style={css.download}>
                        <Text style={{color:'#4867FF'}} href="">安卓下载</Text>
                        <Text style={{color:'#B657FF'}} href="https://api.lianzhushou.net/Rotd">苹果下载</Text>
                    </View>
                </View>
                </ScrollView>
                </ImageBackground>
            </View>
        )
    }
}
export default register;