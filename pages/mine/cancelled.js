
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
import { getLogin, getvideoNum,getLogout } from '../../network/authapi.js'
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
        this.state = {
            mobile: '',
            pwd: '',
            ifshowmodal: 0,
            // mobile:'18318651349',
            // pwd:'a123456',
            remember: 1,
            eye: 0,
            privacy:1,
            agree:0,
        }
    }
    componentDidMount() {
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
    init(){
        
    }
    // 退出登录
    logout() {
        if(this.state.agree != 1){
            Toast.show('请阅读并勾选协议', 2000);return;
        }
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getLogout(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                AsyncStorage.setItem('token', '', function (error) { })
                AsyncStorage.setItem('mobile', '', function (error) { })
                AsyncStorage.setItem('pwd', '', function (error) { })
                Toast.show('退出成功');
                navigation.navigate("login", {
                    id: that.state.id,
                    refresh: function () {
                        that.init();
                    }
                });
            }
        })

    }

    render() {
        let { navigation } = this.props;
        return (
            <View style={[common.body, { paddingBottom: 0, }]}>
                <ScrollView keyboardShouldPersistTaps="always">
                    {/* 头部 */}
                    <View style={[common.header]}>
                        <TouchableOpacity onPress={() => { navigation.goBack(); }} style={common.headerLeft}>
                            <Image source={require('../../image/return.png')} style={common.returnIcon} />
                        </TouchableOpacity >
                        <View style={common.headerTitle}><Text style={common.headerTitleText}>注销账号</Text></View>
                    </View>
                    <View style={css.main}>
                        <Text style={{marginTop:30}}>一旦账户注销：</Text>
                        <View style={{backgroundColor:'#fff'}}>
                            <Text style={{color:'#F6BF0A',marginTop:10}}>1. 您的账户信息将永久删除且无法恢复</Text>
                            <Text style={{color:'#999',marginTop:5}}>2. 您账户所关联的订单将无法查询</Text>
                            <Text style={{color:'#999',marginTop:5}}>3. 您账户未结清的收入将被清空，请注销前去提现</Text>
                        </View>
                        <View style={[common.alignItemsCenter,{ marginTop: 68,}]}>
                            <TouchableOpacity onPress={() => { this.setState({ agree: this.state.agree == 1 ? 0 : 1 }) }} style={css.remember}>
                                <Image style={this.state.agree == 1 ? css.tick : common.hidden} source={require("../../image/check-3.png")} />
                                <Image style={this.state.agree == 0 ? css.tick : common.hidden} source={require("../../image/uncheck-3.png")} />
                                <Text style={{ color: '#333333', fontSize: 15 }}>阅读并同意</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {Linking.openURL('https://hmmshop888.com/index.php?s=/index/app/cancel')}} style={[css.listBlock]}><Text style={{color:'#F6BF0A'}}>《花满佳账号注销须知》</Text></TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={this.logout.bind(this)} style={[common.linearBtn, { marginTop: 10, }]}>
                            <LinearGradient colors={['#F3A316', '#F6BF0A']} style={[common.linearBtn, { width: width - 68, height: 44, }]} start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }}><Text style={[common.linearBtnText, { fontSize: 15 }]}>我已知晓上述内容，确认注销</Text></LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
export default login;