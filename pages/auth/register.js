
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
    Linking,
} from 'react-native';

import { getregister, getPhoneCode } from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;

import common from '../../css/common.js'
import css from '../../css/login.js'
import VerificationCode from './verificationCode';
import StorageUtil from '../../network/StorageUtil.js'
import Code from './code';


class register extends React.Component {
    state = {
        validate: '',
        myvalidate: '',
        pid: '',
        code: '',
        mobile: '',
        pwd: '',
        re_pwd: '',
        pay_pwd: '',
        re_pay_pwd: '',
        re_mobile: '',
        eye: 0,
        eye2: 0,
        agree: 0,
    }
    componentDidMount() {
        // this.validate();
    }
    getcode() {
    // console.log('getcode')
        var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        var that = this;
        if (this.state.mobile == '') { return Toast.show('请输入手机号码') }
        if (!reg_tel.test(this.state.mobile)) {
            return Toast.show('请输入正确的手机号码')
        }
        let { navigation } = this.props;
        var fromData = {};
        fromData['type'] = 1;
        fromData['mobile'] = this.state.mobile;
        // fromData['token'] = '';
        // getPhoneCode(fromData,res =>{
        getPhoneCode(fromData, res => {
            // console.log(res)
            if (res.code == 1) {
                Toast.show('发送成功');
                that.child._beginCountDown();
            } else {
                Toast.show(res.msg);
            }
        })
    }
    validate(m) {
    // console.log('ssss---' + m)
        var str = '';
        for (let index = 0; index < m.length; index++) {
            str += m[index];
        }
        this.setState({
            validate: str
        })
    // console.log('sdfasdas-----' + str)
    }
    submit() {
        if(this.state.agree != 1){
            Toast.show('请阅读并勾选协议', 2000);return;
        }
        var that = this;
    // console.log(this.state.myvalidate)
    // console.log(this.state.validate)
        if (this.state.mobile == '') { return Toast.show('请输入手机号码') }
        // if (this.state.myvalidate == '') { return Toast.show('请输入图形验证码') }
        // if (this.state.myvalidate != this.state.validate) { return Toast.show('图形验证码错误,注意区分大小写') }
        if (this.state.pwd == '') { return Toast.show('请输入登录密码') }
        if (this.state.re_pwd == '') { return Toast.show('请再次输入登录密码') }
        if (this.state.re_pwd != this.state.pwd) { return Toast.show('两次输入的密码不一致') }
        
        // if (this.state.pay_pwd == '') { return Toast.show('请输入交易密码') }
        // if (this.state.re_pay_pwd == '') { return Toast.show('请再次输入交易密码') }
        // if (this.state.re_mobile == '') { return Toast.show('请手动输入确认手机号码') }
        let { navigation } = this.props;
        var fromData = {};
        fromData['mobile'] = this.state.mobile;
        fromData['code'] = this.state.code;
        fromData['password'] = this.state.pwd;
        fromData['password_confirm'] = this.state.re_pwd;
        fromData['referee'] = this.state.pid;
        // fromData['pay_pwd'] = this.state.pay_pwd;
        // fromData['re_pay_pwd'] = this.state.re_pay_pwd;

        getregister(fromData, res => {
            StorageUtil.clear();
            // console.log(res)
            // console.log(res.data.token)

            if (res.code == 1) {
                Toast.show(res.msg, 2000);
                navigation.navigate('login');
            } else {
                Toast.show(res.msg, 2000);
            }
        })
    }
    render() {
        let { navigation } = this.props;
        return (
            <View style={[common.body, { paddingBottom: 0, }]}>
                <ImageBackground style={{ flex: 1 }} source={require('../../image/login-bg.png')}>
                    {/* 头部 */}
                    <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                        <Image source={require('../../image/return.png')} style={css.returnIcon} />
                    </TouchableOpacity >
                    <ScrollView>
                        <View style={[css.main, { marginTop: 40, }]}>
                            <Text style={css.pageTittle}>欢迎注册</Text>
                            <View style={css.inputItem}>
                                <Image source={require("../../image/auth-3.png")} style={css.itemIcon} />
                                <Text style={css.itemText}>手机号：</Text>
                                <TextInput type="tel" value={this.state.mobile} onChangeText={(text) => { this.setState({ mobile: text }) }} placeholder="请输入手机号码" placeholderTextColor={'#D4D4D4'} style={{ width: width, color: '#333333', fontSize: 15 }} />
                            </View>
                            <View style={css.inputItem}>
                                <Image source={require("../../image/auth-4.png")} style={css.itemIcon} />
                                <Text style={css.itemText}>验证码：</Text>
                                <TextInput type="tel" value={this.state.code} onChangeText={(text) => { this.setState({ code: text }) }} placeholder="请输入短信验证码" placeholderTextColor={'#D4D4D4'} style={{ width: '50%', color: '#333333', fontSize: 15 }} />
                                <Code ref="child" onRef={(ref) => { this.child = ref }} MakeMoney={this.getcode.bind(this)} />
                            </View>
                            <View style={[css.inputItem,{justifyContent:'flex-start'}]}>
                                <Image source={require("../../image/auth-2.png")} style={css.itemIcon} />
                                <Text style={css.itemText}>密码：</Text>
                                <TextInput secureTextEntry={this.state.eye == 1 ? false : true} value={this.state.pwd} onChangeText={(text) => { this.setState({ pwd: text }) }} placeholder="请输入登录密码" placeholderTextColor={'#D4D4D4'} style={{ width: width / 2 + 20, color: '#333333', fontSize: 15 }} />
                                {
                                    this.state.eye == 1 ?
                                        <TouchableOpacity onPress={() => { this.setState({ eye: this.state.eye == 1 ? 0 : 1 }) }}><Image source={require("../../image/eye-s.png")} style={common.eye} /></TouchableOpacity>
                                        : <TouchableOpacity onPress={() => { this.setState({ eye: this.state.eye == 1 ? 0 : 1 }) }}><Image source={require("../../image/eye.png")} style={common.eye} /></TouchableOpacity>
                                }
                            </View>
                            <View style={[css.inputItem,{justifyContent:'flex-start'}]}>
                                <Image source={require("../../image/auth-2.png")} style={css.itemIcon} />
                                <Text style={css.itemText}>确认密码：</Text>
                                <TextInput secureTextEntry={this.state.eye2 == 1 ? false : true} value={this.state.re_pwd} onChangeText={(text) => { this.setState({ re_pwd: text }) }} placeholder="请再次输入登录密码" placeholderTextColor={'#D4D4D4'} style={{ width: width / 2 - 10, color: '#333333', fontSize: 15 }} />
                                {
                                    this.state.eye2 == 1 ?
                                        <TouchableOpacity onPress={() => { this.setState({ eye2: this.state.eye2 == 1 ? 0 : 1 }) }}><Image source={require("../../image/eye-s.png")} style={common.eye} /></TouchableOpacity>
                                        : <TouchableOpacity onPress={() => { this.setState({ eye2: this.state.eye2 == 1 ? 0 : 1 }) }}><Image source={require("../../image/eye.png")} style={common.eye} /></TouchableOpacity>
                                }
                            </View>
                            <View style={css.inputItem}>
                                <Image source={require("../../image/auth-5.png")} style={css.itemIcon} />
                                <Text style={css.itemText}>邀请码：</Text>
                                <TextInput value={this.state.pid} onChangeText={(text) => { this.setState({ pid: text }) }} placeholder="请输入邀请码" placeholderTextColor={'#D4D4D4'} style={{ width: width, color: '#333333', fontSize: 15 }} />
                            </View>
                            <View style={[common.alignItemsCenter,{ marginTop: 68,}]}>
                                <TouchableOpacity onPress={() => { this.setState({ agree: this.state.agree == 1 ? 0 : 1 }) }} style={css.remember}>
                                    <Image style={this.state.agree == 1 ? css.tick : common.hidden} source={require("../../image/check-3.png")} />
                                    <Image style={this.state.agree == 0 ? css.tick : common.hidden} source={require("../../image/uncheck-3.png")} />
                                    <Text style={{ color: '#333333', fontSize: 15 }}>阅读并同意</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {Linking.openURL('https://hmmshop888.com/index.php?s=/index/app/treaty')}} style={[css.listBlock]}><Text style={{color:'#F6BF0A'}}>《用户协议》</Text></TouchableOpacity><Text>和</Text>
                                <TouchableOpacity onPress={() => {Linking.openURL('https://hmmshop888.com/index.php?s=/index/app/policy')}} style={css.listBlock}><Text style={{color:'#F6BF0A'}}>《隐私政策》</Text></TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={this.submit.bind(this)} style={[css.linearBtn, { marginTop: 10, width: width - 68 }]}>
                                <LinearGradient colors={['#F3A316', '#F6BF0A']} style={common.linearBtn} start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }}><Text style={common.linearBtnText}>确认</Text></LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>
        )
    }
}
export default register;