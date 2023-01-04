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
    RefreshControl,
    Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Utils from '../../utils/Util';
import Swiper from 'react-native-swiper';
import { MarqueeHorizontal, MarqueeVertical } from 'react-native-marquee-ab';
import DeviceInfo from 'react-native-device-info';

import { getMerchantCategoryIndex, getMerchantIndex, getbanner, getvideoNum, getCompleteAdv, getVersions, getnoticepopup, getCategory, getGoodsList } from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import common from '../../css/common.js'
import css from '../../css/index.js'
import catCss from '../../css/category.js'

const EXPROTHEIGHT = 20;
const window = Dimensions.get('window');
// import App from '../../App'


import ToastExample from './ToastExample';
import loadingImage from '../../img/lo.gif'


export default class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storeList: [],
            imgArr: [],
            catList: [],
            catIndex: 0,
            page: 1,
            goodsList: [],
            inputValue: '',
            isRefreshing: false,
            version: '',
            currentVersion: '',
            
        }
        // this.componentWillUnmount = this.componentWillUnmount.bind(this)
    }
    //获取权限
    componentDidMount() {
        var that = this;
        that.getCategorys()
        that.setState({
            // over:true,
            version: DeviceInfo.getVersion()
        }, ()=>{
            that.version()
        })
    }

    // 分类
    getCategorys() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getMerchantCategoryIndex(fromData, res => {
        // console.log('res------')
        // console.log(res)
            if (res.code == 1) {
                if (res.data.length > 0) {
                    if (this.props.route.params) {
                        this.setState({
                            catList: res.data,
                            category_id: this.props.route.params.category_id
                        })
                    } else {
                        this.setState({
                            catList: res.data,
                            category_id: res.data[0].category_id,
                        })
                    }
                    this.getGoodsLists()
                }
            }
        })
    }
    updateList(value){
        // console.log(value)
        var that = this;
        that.setState({
            inputValue:value,
            page: 1,
            storeList: [],
        },()=>{
            that.getGoodsLists()
        })
    }
    search() {
        var that = this;
        that.goSearch();
    }
    goSearch() {
        var that = this;
        Keyboard.dismiss();
        that.setState({
            page: 1,
            storeList: [],
        }, that.getGoodsLists())
    }
    changeCat(category_id) {
        var that = this;
        that.setState({
            category_id: category_id,
            page: 1,
            storeList: [],
            // inputValue: '',
        },()=>{
            that.getGoodsLists()
        })
    }

    // 商品列表
    // getGoodsListsBy(category_id) {
    //     var that = this;
    //     let { navigation } = this.props;
    //     var fromData = {};
    //     fromData['category_id'] = category_id;
    //     // fromData['page'] = this.state.isRefreshing ? 1 : this.state.page;
    //     fromData['search'] = this.state.inputValue;

    //     getMerchantIndex(fromData, res => {
    //         // console.log(res)
    //         if (res.code == 1) {
    //             if (res.data.list.length > 0) {
    //                 this.setState({
    //                     storeList: res.data.list,
    //                 })
    //             }
    //         }
    //     })
    // }

    // 商品列表
    getGoodsLists() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        fromData['category_id'] = this.state.category_id;
        // fromData['page'] = this.state.isRefreshing ? 1 : this.state.page;
        fromData['page'] = this.state.page;
        fromData['search'] = this.state.inputValue;
        getMerchantIndex(fromData, res => {
        // console.log(fromData)
        // console.log(res)
            if (res.code == 1) {
                if (res.data.list.data.length > 0) {
                    this.setState({
                        storeList: this.state.storeList.concat(res.data.list.data),
                    })
                }
            }
        })
    }

    // 刷新
    refresh() {
        this.setState({
            page:1,
            storeList:[],
            isRefreshing: true,
        }, this.getCategorys())
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

    // 分页
    _contentViewScroll(e) {
        // Toast.show('到底啦')
        var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
        // if (offsetY + oriageScrollHeight >= contentSizeHeight) {
        if (parseInt(offsetY + oriageScrollHeight) >= parseInt(contentSizeHeight)) {
            // Console.log('上传滑动到底部事件')
            this.setState({
                page: this.state.page + 1,
            }, ()=>{
                this.getGoodsLists()
            })

        }
    }

    turn2MapApp(lon, lat, targetAppName, name) {
        // console.log(lon)
        // console.log(lat)
        // console.log(targetAppName)
        // console.log(name)
        if (0 == lat && 0 == lon) {
            console.warn('暂时不能导航');
            return;
        }

        let url = '';
        let webUrl = `https://uri.amap.com/navigation?to=${lon},${lat},${name}&mode=bus&coordinate=gaode`;
        let webUrlGaode = `https://uri.amap.com/navigation?to=${lon},${lat},${name}&mode=bus&coordinate=gaode`;
        let webUrlBaidu = `https://api.map.baidu.com/direction?destination=latlng:${lat},${lon}|name=${name}&mode=transit&coord_type=gcj02&output=html&src=mybaoxiu|wxy`;

        url = webUrl;
        if (Platform.OS == 'android') {//android

            if (targetAppName == 'gaode') {
                // webUrl = 'androidamap://navi?sourceApplication=appname&poiname=fangheng&lat=36.547901&lon=104.258354&dev=1&style=2';
                url = `androidamap://route?sourceApplication=appname&dev=0&m=0&t=1&dlon=${lon}&dlat=${lat}&dname=${name}`;
                webUrl = webUrlGaode;
            } else if (targetAppName == 'baidu') {
                url = `baidumap://map/direction?destination=name:${name}|latlng:${lat},${lon}&mode=transit&coord_type=gcj02&src=thirdapp.navi.mybaoxiu.wxy#Intent;scheme=bdapp;package=com.baidu.BaiduMap;end`;
                webUrl = webUrlBaidu;
            }
        } else if (Platform.OS == 'ios') {//ios

            if (targetAppName == 'gaode') {
                url = `iosamap://path?sourceApplication=appname&dev=0&m=0&t=1&dlon=${lon}&dlat=${lat}&dname=${name}`;
                webUrl = webUrlGaode;
            } else if (targetAppName == 'baidu') {
                url = `baidumap://map/direction?destination=name:${name}|latlng:${lat},${lon}&mode=transit&coord_type=gcj02&src=thirdapp.navi.mybaoxiu.wxy#Intent;scheme=bdapp;package=com.baidu.BaiduMap;end`;
                webUrl = webUrlBaidu;
            }

        }

        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                // console.log('Can\'t handle url: ' + url);
                return Linking.openURL(webUrl).catch(e => console.warn(e));
            } else {
                return Linking.openURL(url).catch(e => console.warn(e));
            }
        }).catch(err => console.error('An error occurred', err));
    }
    render() {
        let { navigation } = this.props;
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
            <View style={[common.whiteBg, { flex: 1 }]}>
                {ifupdate}
                {/* 头部 */}
                <View style={[common.headerNoBorder]}>
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>本地生活</Text></View>
                </View>
                {this.state.catList.length != 0 ?
                    <ScrollView style={[common.ScrollView, common.hasHeader]}
                    >
                        {/* 搜索 */}
                        <View style={[common.alignItemsCenter, css.searchWrap, catCss.searchWrap]}>
                            <View style={common.alignItemsCenter}>
                                <Image style={css.searchIcon} source={require('../../image/search.png')} />
                                <TextInput
                                    onChangeText={(value) => {this.setState({ inputValue: value })}}
                                    // onChange={this.updateList.bind(this)}
                                    onChange={(event) => this.updateList(
                                        event.nativeEvent.text
                                     )}
                                    value={this.state.inputValue} style={css.textInput} placeholder='请输入店铺名称'
                                />
                            </View>
                            <TouchableOpacity onPress={this.search.bind(this)} style={css.searchBtn}>
                                <Text style={[css.searchText]}>搜索</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[catCss.content]}>
                            <ScrollView
                                style={[catCss.contentLeft,{}]}
                                showsVerticalScrollIndicator={false}
                            >
                                {
                                    this.state.catList.map((item, index) => {
                                        return (
                                            <TouchableOpacity onPress={this.changeCat.bind(this, item.category_id)} key={index}><Text style={[catCss.catText, this.state.category_id == item.category_id ? catCss.catTextActive : null]}>{item.name}</Text></TouchableOpacity>
                                        )
                                    })
                                }
                            </ScrollView>
                            <ScrollView style={[catCss.contentRight,{}]} showsVerticalScrollIndicator={false} onMomentumScrollEnd={this._contentViewScroll.bind(this)}>
                                {/* <Image style={catCss.catBanner} source={require('../../image/catbanner.png')} /> */}
                                {/* <Text style={catCss.catTittle}>推荐商品</Text> */}
                                <View style={[catCss.goodsWrap]}>
                                    {this.state.storeList.map((item, index) => {
                                        return (
                                            <View style={[common.alignItemsCenter, css.store,{width:width/1.35,overflow:'hidden'}]} key={index}>
                                                <TouchableOpacity onPress={() => { navigation.navigate('shop', { id: item.merchant_id }) }}><Image style={[css.storeLogo,{width:80,height:80}]} source={{ uri: item.logo.file_path }} /></TouchableOpacity>
                                                <View style={[common.columnStart,{}]}>
                                                    <TouchableOpacity onPress={() => { navigation.navigate('shop', { id: item.merchant_id }) }}><Text style={[css.storeName,{width: width / 2.5}]}>{item.merchant_name}</Text></TouchableOpacity>
                                                    <TouchableOpacity onPress={() => { return Linking.openURL('tel:' + item.phone); }} style={[common.alignItemsCenter, { marginTop: 5, }]}><Image style={css.storeIcon} source={require('../../image/call.png')} /><Text style={{ color: '#808080' }}>{item.phone}</Text></TouchableOpacity>
                                                    <TouchableOpacity onPress={this.turn2MapApp.bind(this, item.longitude, item.latitude, 'gaode', item.province.name + item.city.name + item.region.name + item.address)} style={[common.alignItemsB, { marginTop: 5 }]}>
                                                        {/* <TouchableOpacity style={[common.alignItemsB, { marginTop: 10 }]}> */}
                                                        <View style={common.alignItemsCenter}><Image style={css.storeIcon} source={require('../../image/daohang.jpg')} />
                                                            <Text style={{ color: '#808080', width: width / 2.5 }}>{item.province.name}{item.city.name}{item.region.name}{item.address}</Text>
                                                        </View>
                                                        {/* <Text style={{ color: '#808080' }}>{item.distance_unit}</Text> */}
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )
                                    })
                                    }
                                    {
                                        this.state.storeList.length == 0 ?
                                            <View style={[common.empty,{width:width-105,paddingBottom:150}]}>
                                                <Image style={common.emptyIcon} source={require('../../image/empty2.png')} />
                                                <Text style={common.emptyH1}>暂无店铺</Text>
                                                <Text style={common.emptyP}>即将上架，敬请期待~</Text>
                                            </View> : null
                                    }
                                </View>
                            </ScrollView>
                        </View>

                    </ScrollView>
                    : 
                    <View style={[common.empty,{width:width,paddingBottom:150}]}>
                        <Image style={common.emptyIcon} source={require('../../image/empty2.png')} />
                        <Text style={common.emptyH1}>暂无店铺</Text>
                        <Text style={common.emptyP}>敬请期待~</Text>
                    </View>
                    }
                <View style={common.navBar}>
                    <TouchableOpacity onPress={() => { navigation.navigate('home') }} style={common.navBarBlock}>
                        <Image style={common.navBarIcon} source={require('../../image/tabbar-1.png')} />
                        <Text style={[common.navBarText]}>首页</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('category') }} style={common.navBarBlock}>
                        <Image style={common.navBarIcon} source={require('../../image/tabbar-2-s.png')} />
                        <Text style={[common.navBarText, { color: '#F3A316' }]}>本地生活</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('orderIndex') }} style={common.navBarBlock}>
                        <Image style={common.navBarIcon} source={require('../../image/tabbar-3.png')} />
                        <Text style={common.navBarText}>订单</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('mine') }} style={common.navBarBlock}>
                        <Image style={common.navBarIcon} source={require('../../image/tabbar-4.png')} />
                        <Text style={common.navBarText}>我的</Text>
                    </TouchableOpacity>
                </View>
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