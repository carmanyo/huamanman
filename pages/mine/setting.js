setting
import React from 'react';
import {
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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getLogin, getLogout } from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;

import common from '../../css/common.js'
import css from '../../css/setting.js'
import DeviceInfo from 'react-native-device-info';
import { getpoolTotal, getnews, getbanner, getvideoNum, getCompleteAdv, getVersions, getnoticepopup } from '../../network/authapi.js'

class setting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            version: '',
            currentVersion: '',
        }
    }
    componentDidMount() {
        var that = this;
        that.setState({
            // over:true,
            version: DeviceInfo.getVersion()
        })
        that.version();
    }
    version() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getVersions(fromData, res => {
        // console.log(res.data)
            if (res.code == 1) {
                var v_url = '';
                if (Platform.OS === 'android') {
                    v_url = res.data.version_android_url;

                } else if (Platform.OS == "ios") {
                    v_url = res.data.version_ios_url;
                }
                // 比较版本
                var currentVersion = res.data.version;
                if (that.state.version != currentVersion) {
                    that.setState({
                        v_url: v_url,
                        update: 1,
                        currentVersion: currentVersion,
                    })
                }
            } else if (res.code == -1) {
            } else {
            }
        })
    }

    init(){
        
    }

    // 退出登录
    logout() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getLogout(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                AsyncStorage.setItem('token', '', function (error) { })
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
            <View style={common.body}>
                {/* 头部 */}
                <View style={[common.header]}>
                    <TouchableOpacity onPress={() => { navigation.goBack(); }} style={common.headerLeft}>
                        <Image source={require('../../image/return.png')} style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>安全中心</Text></View>
                </View>

                <View style={[common.main,{marginTop:0}]}>
                    <TouchableOpacity onPress={() => { navigation.navigate('setloginpwd'); }} style={css.listBlock}><Text>修改登录密码</Text><Image style={common.more} source={require("../../img/more.png")} /></TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('setpaypwd'); }} style={css.listBlock}><Text>修改交易密码</Text><Image style={common.more} source={require("../../img/more.png")} /></TouchableOpacity>
                    <TouchableOpacity style={css.listBlock}><Text>当前版本</Text><Text>V{this.state.version}</Text></TouchableOpacity>
                    <TouchableOpacity onPress={this.logout.bind(this)} style={[css.linearBtn, { marginTop: 58, marginLeft: 15, width: width - 30 }]}>
                        <LinearGradient colors={['#F6BF0A', '#F3A316']} style={common.linearBtn} start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }}><Text style={common.linearBtnText}>退出登录</Text></LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default setting;