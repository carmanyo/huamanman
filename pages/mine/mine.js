import React, { Component } from 'react';
import {
    Clipboard,
    // AsyncStorage,
    Platform,
    Linking,
    NativeModules,
    NativeEventEmitter,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    PanResponder,
    ImageBackground,
    Alert,
    Dimensions,
    Overlay,
    Animated,
    Easing,
    InteractionManager,
    Button,
    PermissionsAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Utils from '../../utils/Util';
import Swiper from 'react-native-swiper';
import { MarqueeHorizontal, MarqueeVertical } from 'react-native-marquee-ab';
import DeviceInfo from 'react-native-device-info';

import { getInviteRule, getnews, getbanner, getvideoNum, getCompleteAdv, getVersions, getnoticepopup, getUserDetail, getConfig } from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import common from '../../css/common.js'
import css from '../../css/mine.js'

const EXPROTHEIGHT = 20;
const window = Dimensions.get('window');
// import BottomTabNavigator from '../root/root'
// import App from '../../App'


import ToastExample from './ToastExample';
import loadingImage from '../../img/lo.gif'
import HTMLView from 'react-native-htmlview'
// import { set } from 'react-native-reanimated';
// import RNLocation from 'react-native-location';


export default class home extends Component {
    render() {
        let { navigation } = this.props;
        let modal = this.state.ifshowmodal == 1 && this.state.ruleData ?
            <View style={{ position: 'absolute', top: 0, left: 0, width: width, height: height }}>
                <TouchableOpacity onPress={() => { this.setState({ ifshowmodal: 0 }) }} style={common.mask}></TouchableOpacity>
                <View style={[common.askModal, { paddingLeft: 15, paddingRight: 15, paddingBottom: 60, paddingTop: 0, top: height / 6 }]}>
                    <Text style={common.askTitle}></Text>
                    <ScrollView style={{ maxHeight: height / 2 }}>
                        <HTMLView
                            style={{ width: width - 75 }}
                            stylesheet={style}
                            value={this.escape2Html(this.state.ruleData.value)}
                        />
                    </ScrollView>
                    <View style={css.jump}>
                        <TouchableOpacity onPress={() => { this.setState({ agree: this.state.agree == 1 ? 0 : 1 }) }} style={css.remember}>
                            <Image style={this.state.agree == 1 ? css.tick : common.hidden} source={require("../../image/check-3.png")} />
                            <Image style={this.state.agree == 0 ? css.tick : common.hidden} source={require("../../image/uncheck-3.png")} />
                            <Text style={{ color: '#333333', fontSize: 15 }}>我已同意相关协议</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        // onPress={() => { this.setState({ ifshowmodal: 0 },()=>{navigation.navigate('invite')}) }}
                        onPress={() => { 
                            if(this.state.agree==0){
                                Toast.show('请先阅读并勾选相关协议')
                            }else{
                                this.setState({ ifshowmodal: 0 })
                                navigation.navigate('invite')
                            }
                        }}
                        style={[css.linearBtn, { position: 'absolute', bottom: 10, marginTop: 58, marginLeft: 15, width: '100%', flex: 1 }]}
                    >
                        {/* <LinearGradient colors={['#F6BF0A', '#F6BF0A']} style={[common.linearBtn, {}]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>同意</Text></LinearGradient> */}
                        {
                            this.state.agree==1?
                            <LinearGradient colors={['#F6BF0A', '#F6BF0A']} style={[common.linearBtn, {}]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>确定</Text></LinearGradient>:
                            <LinearGradient colors={['#CAC8C6', '#CAC8C6']} style={[common.linearBtn, {}]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>确定</Text></LinearGradient>
                        }
                    </TouchableOpacity>
                </View>
            </View> : null;
            let ifupdate = this.state.update == 1 ?
            <View style={{ position: 'absolute', width: width, height: height, top: 0, zIndex: 10 }}>
                <TouchableOpacity onPress={() => { }} style={[common.mask, { zIndex: 10 }]}></TouchableOpacity>
                <View style={{ position: 'absolute', width: width, height: height, top: 0 }}>
                    <TouchableOpacity onPress={() => { this.setState({ update: 0 }) }} style={common.mask}></TouchableOpacity>
                    <View style={common.askModal}>
                        <View style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                            <Text style={{ textAlign: 'center' }}>检测到新版本{this.state.currentVersion}，您的版本是{this.state.version}，立即更新！</Text>
                        </View>
                        <View style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                            <Text style={{ textAlign: 'center' }}>下载链接：{this.state.v_url}</Text>
                        </View>
                        {/* <View style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                            <Text style={{ textAlign: 'center' }}>密码：8888</Text>
                        </View> */}
                        <View style={common.askOperation}>
                            <TouchableOpacity onPress={this.update.bind(this)} type="default" style={{ width: width - 50, border: 0, textAlign: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}><Text style={[common.confirmBtn, { borderLeftWidth: 0 }]}>确认</Text></TouchableOpacity>

                        </View>
                    </View>
                </View>
            </View> : null;
        return (
            <View style={[common.whiteBg, common.padBottom, { flex: 1 }]}>
                {ifupdate}
                {modal}
                {/* 头部 */}
                <View style={[common.header, { backgroundColor: 'transparent' }]}>
                    <View style={common.headerTitle}><Text style={common.headerTitleTextW}>我的</Text></View>
                </View>
                {this.state.userInfo.user_grade ?
                    <ScrollView style={[common.ScrollView, { marginTop: -45, zIndex: -1 }]} showsVerticalScrollIndicator={false}>
                        <LinearGradient start={{ x: 0.25, y: 0.25 }} end={{ x: 0.75, y: 0.75 }} colors={['#F6BF0A', '#F3A316']} style={[css.topBg, { marginTop: 0, borderBottomLeftRadius: 50, borderTopRightRadius: 0, borderTopLeftRadius: 0, borderBottomRightRadius: 50 }]}></LinearGradient>
                        <View style={css.maFu}>
                            <View style={[common.alignItemsCenter, { marginTop: 20 }]}>
                                {
                                    this.state.user.avatar_url == '' ?
                                        <Image style={css.head} source={require('../../image/logo.png')} />
                                        : <Image style={css.head} source={{ uri: this.state.user.avatar_url }} />
                                }

                                <View style={common.columnStart}>
                                    <View style={common.alignItemsCenter}>
                                        <Text style={css.tel}>{this.hidePhone(this.state.user.mobile)}</Text>
                                        {/* <Image style={css.vip} source={require('../../image/vip6.png')} /> */}
                                    </View>
                                    <Text style={css.level}>{this.state.userInfo.user_grade.name}</Text>
                                </View>
                            </View>

                            <View style={[common.alignItemsB, { marginTop: 25, }]}>
                                <View style={common.columnCenter}><Text style={css.strong}>{this.state.userCoin.money}</Text><Text style={css.span}>可用余额</Text></View>
                                <View style={common.columnCenter}><Text style={css.strong}>{this.state.userCoin.integral}</Text><Text style={css.span}>可用积分</Text></View>
                                <View style={common.columnCenter}><Text style={css.strong}>{this.state.userCoin.coupon}</Text><Text style={css.span}>优惠券</Text></View>
                                {/* <TouchableOpacity onPress={() => { navigation.navigate('balance') }} style={common.columnCenter}><Text style={css.strong}>{this.state.userCoin.money}</Text><Text style={css.span}>可用余额</Text></TouchableOpacity> */}
                                {/* <TouchableOpacity onPress={() => { navigation.navigate('integral') }} style={common.columnCenter}><Text style={css.strong}>{this.state.userCoin.integral}</Text><Text style={css.span}>可用积分</Text></TouchableOpacity> */}
                                {/* <TouchableOpacity onPress={() => { navigation.navigate('integral') }} style={[common.alignItemsCenter, { width: '50%', borderLeftWidth: 1, borderLeftColor: '#FFE1AD', justifyContent: 'flex-end' }]}><Text style={css.span}>可用积分：</Text><Text style={css.strong}>{this.state.userCoin.integral}</Text></TouchableOpacity> */}
                            </View>

                            <View style={css.myOrder}>
                                <TouchableOpacity onPress={() => { navigation.navigate('orderIndex', { dataType: 'all' }); }} style={[common.alignItemsB]}>
                                    <View style={common.alignItemsCenter}><View style={css.dot}></View><Text style={css.title}>我的订单</Text></View>
                                    <View style={common.alignItemsCenter}><Text style={css.allText}>全部</Text><Image style={css.all} source={require('../../image/all.png')} /></View>
                                </TouchableOpacity>
                                <View style={[common.alignItemsB, { marginTop: 20 }]}>
                                    <TouchableOpacity style={common.columnCenter} onPress={() => { navigation.navigate('orderIndex', { dataType: 'payment' }); }}>
                                        <Image style={css.funImage} source={require('../../image/mine-1.png')} />
                                        <Text style={css.funText}>待付款</Text>
                                        {/* <Text style={css.redDot}>3</Text> */}
                                    </TouchableOpacity>
                                    <TouchableOpacity style={common.columnCenter} onPress={() => { navigation.navigate('orderIndex', { dataType: 'delivery' }); }}><Image style={css.funImage} source={require('../../image/mine-2.png')} /><Text style={css.funText}>待发货</Text></TouchableOpacity>
                                    <TouchableOpacity style={common.columnCenter} onPress={() => { navigation.navigate('orderIndex', { dataType: 'received' }); }}><Image style={css.funImage} source={require('../../image/mine-3.png')} /><Text style={css.funText}>待收货</Text></TouchableOpacity>
                                    <TouchableOpacity style={common.columnCenter} onPress={() => { navigation.navigate('orderIndex', { dataType: 'comment' }); }}><Image style={css.funImage} source={require('../../image/mine-4.png')} /><Text style={css.funText}>已完成</Text></TouchableOpacity>
                                </View>
                            </View>

                            <View style={css.commonFunc}>
                                <View style={[common.alignItemsB]}>
                                    <View style={common.alignItemsCenter}><View style={css.dot}></View><Text style={css.title}>常用功能</Text></View>
                                </View>
                                <View style={[common.flexWrap, { marginTop: 20 }]}>
                                    <TouchableOpacity onPress={() => { navigation.navigate('rank') }} style={[common.columnCenter,common.part4]}><Image style={css.funImage} source={require('../../image/rank-4.jpg')} /><Text style={css.funText}>排行榜</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => { this.setState({ifshowmodal:1}) }} style={[common.columnCenter,common.part4]}><Image style={css.funImage} source={require('../../image/mine-5.png')} /><Text style={css.funText}>推广码</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => { navigation.navigate('team') }} style={[common.columnCenter,common.part4]}><Image style={css.funImage} source={require('../../image/mine-6.png')} /><Text style={css.funText}>我的推广</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => { navigation.navigate('detail') }} style={[common.columnCenter,common.part4]}><Image style={css.funImage} source={require('../../image/mine-ye.png')} /><Text style={css.funText}>余额明细</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => { navigation.navigate('integralDetail') }} style={[common.columnCenter,common.part4]}><Image style={css.funImage} source={require('../../image/mine-jf.png')} /><Text style={css.funText}>积分明细</Text></TouchableOpacity>
                                    {/* <TouchableOpacity onPress={() => { navigation.navigate('card') }} style={[common.columnCenter,common.part4]}><Image style={css.funImage} source={require('../../image/mine-9.png')} /><Text style={css.funText}>银行卡</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => { navigation.navigate('address') }} style={[common.columnCenter,common.part4]}><Image style={css.funImage} source={require('../../image/mine-7.png')} /><Text style={css.funText}>地址管理</Text></TouchableOpacity> */}
                                    <TouchableOpacity onPress={() => { navigation.navigate('myAgent') }} style={[common.columnCenter,common.part4]}><Image style={css.funImage} source={require('../../image/mine-13.png')} /><Text style={css.funText}>我的代理</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => { navigation.navigate('dataAll') }} style={[common.columnCenter,common.part4]}><Image style={css.funImage} source={require('../../image/mine-14.png')} /><Text style={css.funText}>数据统计</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => { navigation.navigate('destroy') }} style={[common.columnCenter,common.part4]}><Image style={css.funImage} source={require('../../image/jiantou.jpg')} /><Text style={css.funText}>销毁</Text></TouchableOpacity>
                                    {/* <View style={[common.columnCenter,common.part4]}></View> */}
                                    <View style={[common.columnCenter,common.part4]}></View>
                                </View>
                                <View style={[common.alignItemsB,{marginTop:30}]}>
                                    <View style={common.alignItemsCenter}><View style={css.dot}></View><Text style={css.title}>更多服务</Text></View>
                                </View>
                                <View style={[common.flexWrap, { marginTop: 15 }]}>
                                    <TouchableOpacity onPress={() => { navigation.navigate('card') }} style={[common.columnCenter,common.part4]}><Image style={css.funImage} source={require('../../image/mine-9.png')} /><Text style={css.funText}>银行卡</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => { navigation.navigate('address') }} style={[common.columnCenter,common.part4]}><Image style={css.funImage} source={require('../../image/mine-7.png')} /><Text style={css.funText}>地址管理</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => { navigation.navigate('infolist') }} style={[common.columnCenter,common.part4]}><Image style={css.funImage} source={require('../../image/mine-10.png')} /><Text style={css.funText}>系统公告</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => { navigation.navigate('service') }} style={[common.columnCenter,common.part4]}><Image style={css.funImage} source={require('../../image/kefu.png')} /><Text style={css.funText}>联系客服</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => { navigation.navigate('setting') }} style={[common.columnCenter,common.part4]}><Image style={css.funImage} source={require('../../image/mine-11.png')} /><Text style={css.funText}>安全中心</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => { navigation.navigate('rule') }} style={[common.columnCenter,common.part4]}><Image style={css.funImage} source={require('../../image/rule.png')} /><Text style={css.funText}>积分规则</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => { navigation.navigate('agreement') }} style={[common.columnCenter,common.part4]}><Image style={css.funImage} source={require('../../image/rule.png')} /><Text style={css.funText}>相关协议</Text></TouchableOpacity>
                                    <View style={[common.columnCenter,common.part4]}></View>
                                    {/* <View style={[common.columnCenter,common.part4]}></View> */}
                                    {/* <View style={common.columnCenter}><Image style={css.funImage} source={require('../../image/mine-12.png')} /><Text style={css.funText}>在线客服</Text></View> */}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    : null}
                <View style={common.navBar}>
                    <TouchableOpacity onPress={() => { navigation.navigate('home') }} style={common.navBarBlock}>
                        <Image style={common.navBarIcon} source={require('../../image/tabbar-1.png')} />
                        <Text style={[common.navBarText]}>首页</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('category') }} style={common.navBarBlock}>
                        <Image style={common.navBarIcon} source={require('../../image/tabbar-2.png')} />
                        <Text style={common.navBarText}>分类</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('orderIndex') }} style={common.navBarBlock}>
                        <Image style={common.navBarIcon} source={require('../../image/tabbar-3.png')} />
                        <Text style={common.navBarText}>订单</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('mine') }} style={common.navBarBlock}>
                        <Image style={common.navBarIcon} source={require('../../image/tabbar-4-s.png')} />
                        <Text style={[common.navBarText, { color: '#F3A316' }]}>我的</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            userCoin: {},
            userInfo: {},
            ifshowmodal:0,
            agree:0,
            version: '',
            currentVersion: '',
        }
        this.componentWillUnmount = this.componentWillUnmount.bind(this)
    }
    //获取权限
    async componentDidMount() {
        this.init();
    }
    init() {
        this.getUserDetails();
        this.getRule();
        this.getConfigs();
        var that = this;
        that.setState({
            // over:true,
            version: DeviceInfo.getVersion()
        }, ()=>{
            that.version()
        })
    }

    version() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getVersions(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                var v_url = '';
                if (Platform.OS === 'android') {
                    v_url = res.data.url;

                } else if (Platform.OS == "ios") {
                    v_url = res.data.url;
                }
                // 比较版本
                var currentVersion = res.data.version;
            // console.log('0111111111')
            // console.log(that.state.version)
            // console.log(currentVersion)
                if (that.state.version == '') { return }
                if (that.state.version < currentVersion) {
                    // Alert.alert('0111111111')
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
    update() {
        // Toast.show('url:'+this.state.v_url,1000000);

        var that = this;
        // that.setState({
        //     update: 0,
        // })
        Linking.openURL(that.state.v_url)
    }

    // 隐藏号码
    hidePhone(phone){
        var str = phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
        return str;
    }

    escape2Html(str) {
        if (str == '') { return; }
        var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
        return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; });
    }

    getRule() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getInviteRule(fromData, res => {
        // console.log('res--------')
        // console.log(res)
            if (res.code == 1) {
                this.setState({
                    ruleData: res.data.setting.invite_rule,
                })
            }
        })
    }


    getUserDetails() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getUserDetail(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                this.setState({
                    user: res.data.user,
                    userCoin: res.data.userCoin,
                    userInfo: res.data.userInfo,
                })
            }
        })
    }

    componentWillUnmount() {

    }

}

const style = StyleSheet.create({
    body: {
        padding: 16,
        paddingTop: Platform.OS === "ios" ? 48 : 16,
    },
    controls: {
        flexWrap: "wrap",
        alignItems: "flex-start",
        flexDirection: "row",
        marginBottom: 16,
    },
    button: {
        flexDirection: "column",
        marginRight: 8,
        marginBottom: 8,
    },
    result: {
        fontFamily: Platform.OS === "ios" ? "menlo" : "monospace",
    },
});