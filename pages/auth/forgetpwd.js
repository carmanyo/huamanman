
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

import { getforget, getNoTokenPhoneCode, getPhoneCode } from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;

import common from '../../css/common.js'
import css from '../../css/login.js'
import Code from './code';

class forgetpwd extends React.Component {
    constructor(props) {
        super(props);
        // this.getcode = this.getcode.bind(this);
    }
    state = {
        mobile: '',
        code: '',
        pwd: '',
        re_pwd: '',
        eye: 0,
        eye2: 0,
    }

    getcode() {
        var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        var that = this;
        if (this.state.mobile == '') { return Toast.show('请输入手机号码') }
        if (!reg_tel.test(this.state.mobile)) {
            return Toast.show('请输入正确的手机号码')
        }
        let { navigation } = this.props;
        var fromData = {};
        fromData['type'] = 2;
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
    submit() {
        var that = this;
        if (this.state.mobile == '') { return Toast.show('请输入手机号码') }
        if (this.state.code == '') { return Toast.show('请输入验证码') }
        if (this.state.pwd == '') { return Toast.show('请输入登录密码') }
        if (this.state.re_pwd == '') { return Toast.show('请再次输入登录密码') }
        if (this.state.re_pwd != this.state.pwd) { return Toast.show('两次输入的密码不一致') }
        let { navigation } = this.props;
        var fromData = {};
        fromData['code'] = this.state.code;
        fromData['mobile'] = this.state.mobile;
        fromData['password'] = this.state.pwd;
        fromData['password_confirm'] = this.state.re_pwd;

        getforget(fromData, res => {
            if (res.code == 1) {
                Toast.show(res.msg, 2000);
                navigation.navigate('login')
            } else {
                Toast.show(res.msg, 2000);
            }
        })
    }
    MakeMoney() {
        // alert("哈哈哈哈");
        // this.getcode;
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

                    <View style={[css.main, { marginTop: 40, }]}>
                        <Text style={css.pageTittle}>忘记密码</Text>
                        <View style={css.inputItem}>
                            <Image source={require("../../image/auth-3.png")} style={css.itemIcon} />
                            <Text style={css.itemText}>手机号：</Text>
                            <TextInput type="tel" value={this.state.mobile} onChangeText={(text) => { this.setState({ mobile: text }) }} placeholder="请输入手机号码" placeholderTextColor={'#D4D4D4'} style={{ width: width, color: '#333333', fontSize: 15 }} />
                        </View>
                        <View style={css.inputItem}>
                            <Image source={require("../../image/auth-4.png")} style={css.itemIcon} />
                            <Text style={css.itemText}>验证码：</Text>
                            <TextInput type="tel" value={this.state.code} onChangeText={(text) => { this.setState({ code: text }) }} placeholder="请输入短信验证码" placeholderTextColor={'#D4D4D4'} style={{ width: '50%', color: '#333333', fontSize: 15 }} />
                            {/* <Code ref="child" onRef={(ref)=>{ this.child = ref}} MakeMoney={this.getcode}/> */}
                            <Code ref="child" onRef={(ref) => { this.child = ref }} MakeMoney={this.getcode.bind(this)} />
                        </View>
                        <View style={[css.inputItem, { justifyContent: 'flex-start' }]}>
                            <Image source={require("../../image/auth-2.png")} style={css.itemIcon} />
                            <Text style={css.itemText}>密码：</Text>
                            <TextInput secureTextEntry={this.state.eye == 1 ? false : true} value={this.state.pwd} onChangeText={(text) => { this.setState({ pwd: text }) }} placeholder="请输入登录密码" placeholderTextColor={'#D4D4D4'} style={{ width: width / 2 + 20, color: '#333333', fontSize: 15 }} />
                            {
                                this.state.eye == 1 ?
                                    <TouchableOpacity onPress={() => { this.setState({ eye: this.state.eye == 1 ? 0 : 1 }) }}><Image source={require("../../image/eye-s.png")} style={common.eye} /></TouchableOpacity>
                                    : <TouchableOpacity onPress={() => { this.setState({ eye: this.state.eye == 1 ? 0 : 1 }) }}><Image source={require("../../image/eye.png")} style={common.eye} /></TouchableOpacity>
                            }
                        </View>
                        <View style={[css.inputItem, { justifyContent: 'flex-start' }]}>
                            <Image source={require("../../image/auth-2.png")} style={css.itemIcon} />
                            <Text style={css.itemText}>确认密码：</Text>
                            <TextInput secureTextEntry={this.state.eye2 == 1 ? false : true} value={this.state.re_pwd} onChangeText={(text) => { this.setState({ re_pwd: text }) }} placeholder="请再次输入登录密码" placeholderTextColor={'#D4D4D4'} style={{ width: width / 2 - 10, color: '#333333', fontSize: 15 }} />
                            {
                                this.state.eye2 == 1 ?
                                    <TouchableOpacity onPress={() => { this.setState({ eye2: this.state.eye2 == 1 ? 0 : 1 }) }}><Image source={require("../../image/eye-s.png")} style={common.eye} /></TouchableOpacity>
                                    : <TouchableOpacity onPress={() => { this.setState({ eye2: this.state.eye2 == 1 ? 0 : 1 }) }}><Image source={require("../../image/eye.png")} style={common.eye} /></TouchableOpacity>
                            }
                        </View>
                        <TouchableOpacity onPress={this.submit.bind(this)} style={[css.linearBtn, { marginTop: 68, width: width - 68 }]}>
                            <LinearGradient colors={['#F3A316', '#F6BF0A']} style={common.linearBtn} start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }}><Text style={common.linearBtnText}>确认</Text></LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}
export default forgetpwd;