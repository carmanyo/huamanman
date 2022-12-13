
import React from 'react';
import {
    Navigator,
    // AsyncStorage,
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
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Redirect } from 'react-router-dom'
import StorageUtil from '../../network/StorageUtil.js'
import { getLogin, getvideoNum } from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import DeviceInfo from 'react-native-device-info';

import common from '../../css/common.js'
import css from '../../css/login.js'
import { responsiveArray } from 'antd/lib/_util/responsiveObserve';
class login extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.state = {
            mobile: '',
            pwd: '',
            ifshowmodal: 0,
            // mobile:'18318651349',
            // pwd:'a123456',
            remember: 1,
            eye: 0,
            privacy:1,
        }
    }
    componentDidMount() {
        var that = this;
        // that.videoNum();
        var mobile = ''
        var pwd = ''
        AsyncStorage.getItem('mobile', function (error, result) {
            if (error) {
            // console.log(error)
            } else {
                that.setState({
                    mobile: result,
                    privacy:2
                })
            }
        })
        AsyncStorage.getItem('pwd', function (error, result) {
            if (error) {
            // console.log(error)
            } else {
                that.setState({
                    pwd: result
                })
            }
        })

    }
    videoNum() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getvideoNum(fromData, res => {
            // console.log('00000000000000000000000000000000000')
            // console.log(res)
            // if (res.code == 1) {
            //     navigation.navigate("home", {});
            // }
        })
    }
    onMobile = (value) => {
        this.setState({ mobile: value });
    }
    onPwd = (value) => {
        this.setState({ pwd: value });
    }

    submit() {
        // if(this.state.privacy==0){
        //     Toast.show('请重新进入APP，同意隐私政策', 2000);return;
        // }
        // Toast.show('点击了', 2000);return;


        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        fromData['version'] = DeviceInfo.getVersion();
        fromData['mobile'] = this.state.mobile;
        fromData['password'] = this.state.pwd;
        getLogin(fromData, res => {
        // console.log('登录---------')
        // console.log(res)
            if (res.code == 1) {
                var value = res.data.token;
                AsyncStorage.setItem('token', res.data.token)
                if (this.state.remember == 1) {
                    AsyncStorage.setItem('mobile', this.state.mobile, function (error) { console.log(error) })
                    AsyncStorage.setItem('pwd', this.state.pwd, function (error) { console.log(error) })
                } else {
                    AsyncStorage.setItem('mobile', '', function (error) { })
                    AsyncStorage.setItem('pwd', '', function (error) { })
                }

                Toast.show('登录成功', 2000);
                // 原版
                for (let i in this.props.route.params) {
                    this.props.route.params.refresh();
                    navigation.navigate('home')
                }
                navigation.navigate('home')
            } else {
                Toast.show(res.msg, 2000);
            }
        })
    }

    render() {
        let { navigation } = this.props;
        let privacy = this.state.privacy==1 ?
            <View style={{ position: 'absolute', top: 0, left: 0, width: width, height: height }}>
                <TouchableOpacity onPress={() => { this.setState({ ifshowmodal: 0 }) }} style={common.mask}></TouchableOpacity>
                <View style={[common.askModal, { paddingLeft: 15, paddingRight: 15, paddingBottom: 20, paddingTop: 0, top: height / 4 }]}>
                    <Text style={[common.askTitle, { paddingTop: 22, marginBottom: 20, fontSize: 18 }]}>用户隐私政策</Text>
                    <ScrollView style={{ maxHeight: height / 2 }}>
                        <View style={common.alignItemsCenter}>
                            <Text style={{ fontSize: 15 }}>我们非常重视您的用户权益与个人信息的保护，在您使用本APP服务前，请充分阅读并理解
                                <TouchableOpacity onPress={() => {Linking.openURL('https://hmmshop888.com/index.php?s=/index/app/treaty')}}><Text style={{ color: '#F3A316' }}>《用户协议》</Text></TouchableOpacity>和
                                <TouchableOpacity onPress={() => {Linking.openURL('https://hmmshop888.com/index.php?s=/index/app/policy')}}><Text style={{ color: '#F3A316' }}>《隐私政策》</Text></TouchableOpacity>
                                。如果您同意，请点击下面”同意“按钮开始接受我们的服务。</Text>
                        </View>
                    </ScrollView>
                    <TouchableOpacity
                        onPress={() => {this.setState({privacy:2})}}
                        style={[css.linearBtn, { position: 'relative', bottom: 10, marginTop: 58, marginLeft: '5%', width: '90%', flex: 1 }]}
                    >
                        <LinearGradient colors={['#F6BF0A', '#F6BF0A']} style={[common.linearBtn, {}]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>同意并继续</Text></LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {this.setState({privacy:0})}}
                        style={[css.linearBtn, { position: 'relative', bottom: 10, marginTop: 8, marginLeft: '5%', width: '90%', flex: 1 }]}
                    >
                        <LinearGradient colors={['#ffffff', '#ffffff']} style={[common.linearBtn, {}]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={[common.linearBtnText, { color: '#333' }]}>不同意</Text></LinearGradient>
                    </TouchableOpacity>
                </View>
            </View> : null;
        return (
            <View style={[common.body, { paddingBottom: 0, }]}>
                {/* {privacy} */}
                <ImageBackground style={{ flex: 1 }} source={require('../../image/login-bg.png')}>
                    <ScrollView keyboardShouldPersistTaps="always">
                        <View style={css.main}>
                            <View style={css.logoWrap}><Image source={require("../../image/logo.png")} style={css.logo} /></View>
                            
                            <View style={css.inputItem}>
                                <Image source={require("../../image/auth-1.png")} style={css.itemIcon} />
                                <Text style={css.itemText}>账户：</Text>
                                <TextInput type="tel" value={this.state.mobile} onChangeText={this.onMobile} placeholder="请输入手机号码" placeholderTextColor={'#D4D4D4'} style={{ width: width, color: '#333333', fontSize: 15 }} />
                            </View>
                            <View style={[css.inputItem, { justifyContent: 'flex-start' }]}>
                                <Image source={require("../../image/auth-2.png")} style={css.itemIcon} />
                                <Text style={css.itemText}>密码：</Text>
                                <TextInput secureTextEntry={this.state.eye == 1 ? false : true} value={this.state.pwd} onChangeText={this.onPwd} placeholder="请输入登录密码" placeholderTextColor={'#D4D4D4'} style={{ width: width / 2 + 10, color: '#333333', fontSize: 15 }} />
                                {
                                    this.state.eye == 1 ?
                                        <TouchableOpacity onPress={() => { this.setState({ eye: this.state.eye == 1 ? 0 : 1 }) }}><Image source={require("../../image/eye-s.png")} style={common.eye} /></TouchableOpacity>
                                        : <TouchableOpacity onPress={() => { this.setState({ eye: this.state.eye == 1 ? 0 : 1 }) }}><Image source={require("../../image/eye.png")} style={common.eye} /></TouchableOpacity>
                                }
                            </View>
                            <View style={css.jump}>
                                <TouchableOpacity onPress={() => { this.setState({ remember: this.state.remember == 1 ? 0 : 1 }) }} style={css.remember}>
                                    <Image style={this.state.remember == 1 ? css.tick : common.hidden} source={require("../../image/check-3.png")} />
                                    <Image style={this.state.remember == 0 ? css.tick : common.hidden} source={require("../../image/uncheck-3.png")} />
                                    <Text style={{ color: '#333333', fontSize: 15 }}>记住密码</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={this.submit.bind(this)} style={[common.linearBtn, { marginTop: 68, }]}>
                                <LinearGradient colors={['#F3A316', '#F6BF0A']} style={[common.linearBtn, { width: width - 68, height: 44, }]} start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }}><Text style={[common.linearBtnText, { fontSize: 15 }]}>立即登录</Text></LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('register'); }} style={[common.borderBtn, { marginTop: 18, width: width - 68, height: 42 }]}>
                                <Text style={[common.borderBtnText, { lineHeight: 42 }]}>注册账户</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('forgetpwd'); }}><Text style={css.forgetpwdText}>忘记密码?</Text></TouchableOpacity>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>
        )
    }
}
export default login;