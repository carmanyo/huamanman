
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

import { getPhoneCode, getsetEdit, getSetPassword } from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;

import common from '../../css/common.js'
import css from '../../css/login.js'
import Code from '../auth/code';

class setloginpwd extends React.Component {
    state = {
        code: '',
        pwd: '',
        re_pwd: '',
        eye: 0,
        eye2: 0,
    }

    getcode() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        fromData['type'] = 3;
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
        if (this.state.code == '') { return Toast.show('请输入验证码') }
        if (this.state.pwd == '') { return Toast.show('请输入登录密码') }
        if (this.state.re_pwd == '') { return Toast.show('请再次输入登录密码') }
        if (this.state.re_pwd != this.state.pwd) { return Toast.show('两次输入的密码不一致') }
        let { navigation } = this.props;
        var fromData = {};
        fromData['code'] = this.state.code;
        fromData['password'] = this.state.pwd;
        fromData['password_confirm'] = this.state.re_pwd;
    // console.log(fromData)
        getSetPassword(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                Toast.show('修改成功', 2000);
                setTimeout(() => {
                    this.setState({
                        code: '',
                        pwd: '',
                        re_pwd: '',
                    })
                    navigation.goBack();
                }, 1000);
            } else {
                Toast.show(res.msg, 2000);
            }
        })
    }
    render() {
        let { navigation } = this.props;
        return (
            <View style={common.body}>
                {/* 头部 */}
                <View style={[common.header]}>
                    <TouchableOpacity onPress={() => { navigation.goBack(); }} style={common.headerLeft}>
                        <Image source={require('../../image/return.png')} style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>修改登录密码</Text></View>
                </View>

                <View style={[css.main, { marginTop: 0, }]}>
                    {/* <View style={css.inputItem}>
                        <Text>验证码</Text>
                        <TextInput style={{width:width/2}} type="text" value={this.state.code} onChangeText={(text)=>{this.setState({code:text})}} placeholder="请输入验证码" placeholderTextColor={'#D4D4D4'}/>
                        <Code ref="child" onRef={(ref)=>{ this.child = ref}} MakeMoney={this.getcode.bind(this)}/>
                    </View> */}
                    <View style={css.inputItem}>
                        <Text>验证码</Text>
                        <TextInput style={{ width: width / 2 - 40 }} type="text" value={this.state.code} onChangeText={(text) => { this.setState({ code: text }) }} placeholder="请输入短信验证码" placeholderTextColor={'#D4D4D4'} />
                        <Code ref="child" onRef={(ref) => { this.child = ref }} MakeMoney={this.getcode.bind(this)} />
                    </View>
                    <View style={css.inputItem}>
                        <Text>新密码</Text>
                        <TextInput style={{ width: width / 2 }} secureTextEntry={this.state.eye == 1 ? false : true} value={this.state.pwd} onChangeText={(text) => { this.setState({ pwd: text }) }} placeholder="请输入新的登录密码" placeholderTextColor={'#D4D4D4'} />
                        {
                            this.state.eye == 1 ?
                                <TouchableOpacity onPress={() => { this.setState({ eye: this.state.eye == 1 ? 0 : 1 }) }}><Image source={require("../../image/eye-s.png")} style={common.eye} /></TouchableOpacity>
                                : <TouchableOpacity onPress={() => { this.setState({ eye: this.state.eye == 1 ? 0 : 1 }) }}><Image source={require("../../image/eye.png")} style={common.eye} /></TouchableOpacity>
                        }
                    </View>
                    <View style={css.inputItem}>
                        <Text>确认密码</Text>
                        <TextInput style={{ width: width / 2 + 10 }} secureTextEntry={this.state.eye2 == 1 ? false : true} value={this.state.re_pwd} onChangeText={(text) => { this.setState({ re_pwd: text }) }} placeholder="请再次输入密码进行二次确认" placeholderTextColor={'#D4D4D4'} />
                        {
                            this.state.eye2 == 1 ?
                                <TouchableOpacity onPress={() => { this.setState({ eye2: this.state.eye2 == 1 ? 0 : 1 }) }}><Image source={require("../../image/eye-s.png")} style={common.eye} /></TouchableOpacity>
                                : <TouchableOpacity onPress={() => { this.setState({ eye2: this.state.eye2 == 1 ? 0 : 1 }) }}><Image source={require("../../image/eye.png")} style={common.eye} /></TouchableOpacity>
                        }
                    </View>

                    <TouchableOpacity onPress={this.submit.bind(this)} style={[css.linearBtn, { width: width - 75, marginTop: 70, }]}>
                        <LinearGradient colors={['#F6BF0A', '#F3A316']} style={common.linearBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>确定</Text></LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default setloginpwd;