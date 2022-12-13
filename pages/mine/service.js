setting
import React from 'react';
import {
    Clipboard,
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
const height = Dimensions.get('window').height;

import common from '../../css/common.js'
import css from '../../css/setting.js'
import DeviceInfo from 'react-native-device-info';
import { getpoolTotal, getnews, getbanner, getvideoNum, getCompleteAdv, getVersions, getConfig } from '../../network/authapi.js'

class setting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            version: '',
            currentVersion: '',
            configData: '',
        }
    }
    componentDidMount() {
        var that = this;
        that.setState({
            // over:true,
            version: DeviceInfo.getVersion()
        })
        that.version();
        that.getConfigs();
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

    
    getConfigs() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getConfig(fromData, res => {
        // console.log('res--------configData')
        // console.log(res)
            if (res.code == 1) {
                this.setState({
                    configData: res.data.setting,
                })
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
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>联系客服</Text></View>
                </View>

                <View style={[common.main,common.alignItemsCenter,common.columnCenter,{marginTop:0}]}>
                    {/* <Image style={{width:width/1.5,marginTop:-height+300}} resizeMode="center" source={require("../../image/kefu.jpg")} /> */}
                    <View style={common.columnCenter}>
                        {
                            this.state.configData!=''?
                            <Image style={{width:width/1.1,height:500,}} source={{ uri: this.state.configData.kefu.value }} />:null
                        }
                        
                        {/* <Text style={{textAlign:'center'}}>打开微信扫上方二维码</Text>  */}
                        {
                            this.state.configData!=''?
                            <Text style={{textAlign:'center'}}>微信：{this.state.configData.kefu.info}</Text>:null
                        }
                        {/* <Text style={{textAlign:'center'}}>微信：MLNL888888</Text>  */}
                         
                        <TouchableOpacity onPress={()=>{
                            Clipboard.setString(this.state.configData.kefu.info);
                            let str = Clipboard.getString();
                        // console.log(str)//我是文本
                            Toast.show('复制成功')
                        }} style={[css.linearBtn,{marginTop:20,width:width/1.35}]}>
                                <LinearGradient colors={['#FED93F', '#FDB22C']} style={common.linearBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={[common.linearBtnText,{color:'#333',lineHeight:40,fontSize:14,}]}>复制微信号</Text></LinearGradient>
                            </TouchableOpacity>  
                    </View>
                </View>
            </View>
        )
    }
}
export default setting;