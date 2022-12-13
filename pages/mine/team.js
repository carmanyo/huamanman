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

import { getpoolTotal, getnews, getbanner, getvideoNum, getCompleteAdv, getVersions, getnoticepopup, getUserDetail, getTeamLists } from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import common from '../../css/common.js'
import css from '../../css/mine.js'

const EXPROTHEIGHT = 20;
const window = Dimensions.get('window');
// import BottomTabNavigator from '../root/root'
import App from '../../App'


import ToastExample from './ToastExample';
import loadingImage from '../../img/lo.gif'
// import { set } from 'react-native-reanimated';
// import RNLocation from 'react-native-location';


export default class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgArr: [],
            teamList: [],
        }
        this.componentWillUnmount = this.componentWillUnmount.bind(this)
    }
    //获取权限
    async componentDidMount() {
        this.getUserDetails()
        this.getTeamList()
    }

    getTeamList() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getTeamLists(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                this.setState({
                    teamList: res.data.list.data,
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

    // 隐藏号码
    hidePhone(phone) {
        var str = phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
        return str;
    }

    render() {
        let { navigation } = this.props;
        return (
            <View style={[common.whiteBg, { flex: 1 }]}>
                {/* 头部 */}
                <View style={[common.header, { backgroundColor: 'transparent' }]}>
                    <TouchableOpacity onPress={() => { navigation.goBack(); }} style={[common.headerLeft,]}>
                        <Image source={require('../../image/return2.png')} style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleTextW}>我的推广</Text></View>
                </View>
                {this.state.user ?
                    <ScrollView style={[common.ScrollView, { marginTop: -45, zIndex: -1 }]} showsVerticalScrollIndicator={false}>
                        <LinearGradient start={{ x: 0.25, y: 0.25 }} end={{ x: 0.75, y: 0.75 }} colors={['#F6BF0A', '#F3A316']} style={[css.topBg, { height: 200, marginTop: 0, borderBottomLeftRadius: 0, borderTopRightRadius: 0, borderTopLeftRadius: 0, borderBottomRightRadius: 0 }]}></LinearGradient>
                        <View style={[css.maFu, { marginLeft: 25, marginRight: 25, marginTop: -155 }]}>
                            <View style={[common.alignItemsCenter, { marginTop: 20 }]}>
                                {
                                    this.state.user.avatar_url == '' ?
                                        <Image style={css.head} source={require('../../image/logo.png')} />
                                        : <Image style={css.head} source={{ uri: this.state.user.avatar_url }} />
                                }
                                {/* <Image style={css.head} source={{ uri: this.state.user.avatar_url }} /> */}
                                <View style={common.columnStart}>
                                    <View style={common.alignItemsCenter}><Text style={css.tel}>
                                        {this.hidePhone(this.state.user.mobile)}</Text>
                                        {/* <Image style={css.vip} source={require('../../image/vip6.png')} /> */}
                                    </View>
                                    <Text style={css.level}>{this.state.userInfo.user_grade.name}</Text>
                                </View>
                            </View>

                            <View style={[common.alignItemsS, { marginTop: 26 }]}>
                                <View style={common.columnCenter}><Text style={css.numTittle}>直推人数</Text><Text style={css.num}>{this.state.userInfo.direct}/{this.state.userInfo.directing}</Text></View>
                                <View style={common.columnCenter}><Text style={css.numTittle}>团队人数</Text><Text style={css.num}>{this.state.userInfo.team}/{this.state.userInfo.teaming}</Text></View>
                                {/* <View style={common.columnCenter}><Text style={css.numTittle}>新增用户</Text><Text style={css.num}>10</Text></View> */}
                                {/* <View style={common.columnCenter}><Text style={css.numTittle}>新增有效用户</Text><Text style={css.num}>8</Text></View> */}
                            </View>

                            <View style={[common.alignItemsCenter, { marginTop: 17, marginBottom: 10 }]}><View style={css.dot}></View><Text style={[css.title, { fontSize: 16 }]}>推广用户</Text></View>

                            {
                                this.state.teamList.map((item, index) => {
                                    return (
                                        <View style={css.teamBlock} key={index}>
                                            <View style={[common.alignItemsB, { marginBottom: 10 }]}>
                                                <View style={common.alignItemsCenter}>
                                                    <Text style={[css.teamTel]}>
                                                        {item.mobile}
                                                    </Text>
                                                    {/* <Text style={[css.teamStrActive]}>已激活</Text> */}
                                                    {
                                                        item.statusName=='已激活'?
                                                        <Text style={[item.statusName=='已激活'?css.teamStrActive:null]}>{item.statusName}</Text>:
                                                        <Text style={[css.teamStrActive2]}>{item.statusName}</Text>
                                                    }
                                                </View>
                                                <Text style={css.teamStr}>{item.user_info.user_grade.name}</Text>
                                                {/* <Image style={css.teamLevel} source={require('../../image/vip1.png')} /> */}
                                            </View>
                                            <View style={common.alignItemsB}><Text style={css.teamTime}>直推人数:{item.user_info.direct}/{item.user_info.directing}</Text><Text style={css.teamTime}>团队人数:{item.user_info.team}/{item.user_info.teaming}</Text></View>
                                            <View style={[common.alignItemsB, { marginTop: 10 }]}><Text style={css.teamTime}>{item.create_time}</Text></View>
                                        </View>
                                    )
                                })
                            }

                        </View>
                    </ScrollView> : null}
            </View>
        )
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