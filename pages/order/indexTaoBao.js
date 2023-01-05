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

import { getMerchantCategoryIndex, getMerchantListss, getTbList, getDataokeGoodsIndex, getCompleteAdv, getVersions, getnoticepopup, getCategory, getGoodsList } from '../../network/authapi.js'
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
            tabList: [],
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
        // that.getCategorys();
        that.getTbLists();
        that.setState({
            // over:true,
            version: DeviceInfo.getVersion()
        }, ()=>{
            that.version()
        })
    }

    // 淘宝分类
    getTbLists() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getTbList(fromData, res => {
            // console.log('淘宝分类')
        // console.log(res)
            if (res.code == 1) {
                if (res.data.length > 0) {
                    that.setState({
                        dataType: res.data[0].cid,
                        category_id: res.data[0].cid,
                        tabList: res.data,
                    },()=>{
                        that.getGoodsLists();
                    })
                }
            }
        })
    }

    // 商品列表
    getGoodsLists() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        fromData['cids'] = this.state.category_id;
        // fromData['page'] = this.state.isRefreshing ? 1 : this.state.page;
        fromData['pageId'] = this.state.isRefreshing ? 1 : this.state.page;
        fromData['search'] = this.state.inputValue;
        getDataokeGoodsIndex(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                if (res.data.list.length > 0) {
                    this.setState({
                        goodsList: this.state.goodsList.concat(res.data.list),
                    })
                }
            }
        })
    }

    // 切换导航
    tabClick(dataType) {
        // console.log(dataType)
        if (dataType == this.state.dataType) { return }
        var that = this;
        that.setState({
            dataType,
            category_id:dataType,
            goodsList: [],
        }, ()=>{
            that.getGoodsLists()
        })
    }

    // 分类
    getCategorys() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getMerchantCategoryIndex(fromData, res => {
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
        console.log(value)
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
            goodsList: [],
        }, that.getGoodsLists())
    }
    changeCat(category_id) {
        var that = this;
        that.setState({
            category_id: category_id,
            // page: 1,
            storeList: [],
            // inputValue: '',
        },()=>{
            that.getGoodsListsBy(category_id)
        })
    }

    // 商品列表
    getGoodsListsBy(category_id) {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        fromData['category_id'] = category_id;
        // fromData['page'] = this.state.isRefreshing ? 1 : this.state.page;
        fromData['search'] = this.state.inputValue;

        getMerchantListss(fromData, res => {
            // console.log(res)
            if (res.code == 1) {
                if (res.data.list.length > 0) {
                    this.setState({
                        storeList: res.data.list,
                    })
                }
            }
        })
    }

    

    // 刷新
    refresh() {
        this.setState({
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
        var that = this;
        // Toast.show('到底啦')
        var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
        if (parseInt(offsetY + oriageScrollHeight) >= parseInt(contentSizeHeight)) {
            // Console.log('上传滑动到底部事件')
            that.setState({
                page: this.state.page + 1,
            }, ()=>{
                that.getGoodsLists()
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
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>返佣精选</Text></View>
                </View>
                {this.state.tabList.length != 0 ?
                    <View style={[common.ScrollView, common.hasHeader]}
                    >
                        <View style={[css.catWrap2,{}]}>
                            <TouchableOpacity onPress={() => { navigation.navigate('categoryOld', { category_id: item.category_id }); }} style={css.cats} horizontal={true} contentContainerStyle={{ alignItems: 'center' }} showsHorizontalScrollIndicator={false}>
                                <Image style={css.catIcon} source={require('../../image/taobao.png')} /><Text style={css.catText}>淘宝返现</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('categoryOld', { category_id: item.category_id }); }} style={css.cats} horizontal={true} contentContainerStyle={{ alignItems: 'center' }} showsHorizontalScrollIndicator={false}>
                                <Image style={css.catIcon} source={require('../../image/jd.png')} /><Text style={css.catText}>京东返现</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('categoryOld', { category_id: item.category_id }); }} style={css.cats} horizontal={true} contentContainerStyle={{ alignItems: 'center' }} showsHorizontalScrollIndicator={false}>
                                <Image style={css.catIcon} source={require('../../image/pdd.png')} /><Text style={css.catText}>拼多多返现</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('categoryOld', { category_id: item.category_id }); }} style={css.cats} horizontal={true} contentContainerStyle={{ alignItems: 'center' }} showsHorizontalScrollIndicator={false}>
                                <Image style={css.catIcon} source={require('../../image/douyin.png')} /><Text style={css.catText}>抖音返现</Text>
                            </TouchableOpacity>
                        </View> 
                        {/* 搜索 */}
                        <View style={[common.alignItemsCenter, css.searchWrap, catCss.searchWrap,{width:width-32}]}>
                            <View style={common.alignItemsCenter}>
                                <Image style={css.searchIcon} source={require('../../image/search.png')} />
                                <TextInput
                                    onChangeText={(value) => {this.setState({ inputValue: value })}}
                                    // onChange={this.updateList.bind(this)}
                                    onChange={(event) => this.updateList(
                                        event.nativeEvent.text
                                     )}
                                    value={this.state.inputValue} style={css.textInput} placeholder='请输入商品名称'
                                />
                            </View>
                            <TouchableOpacity onPress={this.search.bind(this)} style={css.searchBtn}>
                                <Text style={[css.searchText]}>搜索</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[common.navRowScrollView, { width: width,marginTop:15 }]} horizontal={true} contentContainerStyle={{ alignItems: 'center' }} showsHorizontalScrollIndicator={false}>
                            <View style={[common.navRowWrap, { justifyContent: 'space-between', width: width, paddingRight: 25 }]} horizontal={true}>
                                {
                                    this.state.tabList.map((item, index) => {
                                        return (
                                            <TouchableOpacity onPress={this.tabClick.bind(this, item.cid)} key={item.cid}><Text style={[common.navRowBlock, this.state.dataType == item.cid ? common.navRowActive : null]}>{item.cname}</Text></TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        <View style={[catCss.content]}>
                            <ScrollView
                                style={[catCss.contentLeft,{width:width,height:height - height/2.9,}]}
                                showsVerticalScrollIndicator={false}
                                onMomentumScrollEnd={this._contentViewScroll.bind(this)}
                            >
                                {/* {
                                    this.state.catList.map((item, index) => {
                                        return (
                                            <TouchableOpacity onPress={this.changeCat.bind(this, item.category_id)} key={index}><Text style={[catCss.catText, this.state.category_id == item.category_id ? catCss.catTextActive : null]}>{item.name}</Text></TouchableOpacity>
                                        )
                                    })
                                } */}
                                <View style={[css.goodsWrap, { marginTop: 0 }]}>
                                    {
                                        this.state.goodsList.map((item, index) => {
                                            return (
                                                <TouchableOpacity onPress={() => { navigation.navigate('ordergoodsdetails', { id: item.id }) }} style={css.goodsBlock} key={index}>
                                                    <Image onError={(e)=>{
                                                        console.log('wwwwwwwwww-------------错误')
                                                        console.log(item.goods_image)
                                                        console.log(e)
                                                    }} style={[css.goodsImage,{width:159,height:159}]} 
                                                    source={{ uri: item.mainPic, cache: "force-cache" }} 
                                                    resizeMode='center' resizeMethod='resize'/>
                                                   <Text style={css.goodsName}>{item.title}</Text>
                                                   {
                                                    item.monthSales>10000?
                                                    <View style={{width:'100%',marginTop:5}}><Text style={{color:'#999',fontSize:12}}>{(item.monthSales/10000).toFixed(0)}万+人已购</Text></View>
                                                    :<View style={{width:'100%',marginTop:5}}><Text style={{color:'#999',fontSize:12}}>{item.monthSales}人已购</Text></View>
                                                   }
                                                   
                                                   <View style={common.alignItemsCenter}>
                                                        <View style={css.goodsSku2}><Text style={[{backgroundColor:'#F3A316',color:'#fff',paddingLeft:2,paddingRight:2}]}>返</Text><Text style={{color:'#F3A316',fontSize:12,paddingLeft:6,paddingRight:6}}>{item.rakeBack}</Text></View>
                                                        
                                                    </View>
                                                    <View style={[common.alignItemsB,{width:'100%'}]}>
                                                        <View style={common.alignItemsCenter}>
                                                            <Text style={css.sPrice}>到手价：￥</Text>
                                                            <Text style={css.bPrice}>{item.actualPrice}</Text>
                                                        </View>
                                                        <Text style={{color:'#999',fontSize:12,textDecorationLine:'line-through',}}>￥{item.originalPrice}</Text>
                                                        {/* <View style={common.alignItemsCenter}>
                                                            <Text style={{color:'#999',fontSize:12}}>原价：</Text>
                                                            <Text style={{color:'#999',fontSize:12}}>{item.originalPrice}</Text>
                                                        </View> */}
                                                    </View>
                                                    {/* <Image style={css.dotIcon} source={require('../../image/dot.png')} /> */}
                                                    {/* <View style={common.alignItemsCenter}>
                                                        <Text style={css.goodsSku}>{item.discount}</Text>
                                                    </View>

                                                     <View style={common.alignItemsCenter}>
                                                        <Text style={css.goodsSku}>立送≈价值{item.rebate}元积分</Text>
                                                    </View>
                                                    <View>
                                                        <View style={common.alignItemsCenter}>
                                                            <Text style={css.sPrice}>￥</Text>
                                                            <Text style={css.bPrice}>{item.goods_sku.goods_price}</Text>
                                                        </View>
                                                        {
                                                            item.goods_sku.goods_coupon != 0 ? <Text style={css.sPrice}>劵可抵：{item.goods_sku.goods_coupon}元</Text> : null
                                                        }

                                                    </View>
                                                    <Image style={css.dotIcon} source={require('../../image/dot.png')} /> */}
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                                <View style={{height:50}}></View>
                            </ScrollView>
                        </View>
                        {/* <View style={[catCss.content]}>
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
                                <View style={[catCss.goodsWrap]}>
                                    {this.state.storeList.map((item, index) => {
                                        return (
                                            <View style={[common.alignItemsCenter, css.store,{width:width/1.35,overflow:'hidden'}]} key={index}>
                                                <TouchableOpacity onPress={() => { navigation.navigate('shop', { id: item.merchant_id }) }}><Image style={[css.storeLogo,{width:80,height:80}]} source={{ uri: item.logo.file_path }} /></TouchableOpacity>
                                                <View style={[common.columnStart,{}]}>
                                                    <TouchableOpacity onPress={() => { navigation.navigate('shop', { id: item.merchant_id }) }}><Text style={[css.storeName,{width: width / 2.5}]}>{item.merchant_name}</Text></TouchableOpacity>
                                                    <TouchableOpacity onPress={() => { return Linking.openURL('tel:' + item.phone); }} style={[common.alignItemsCenter, { marginTop: 5, }]}><Image style={css.storeIcon} source={require('../../image/call.png')} /><Text style={{ color: '#808080' }}>{item.phone}</Text></TouchableOpacity>
                                                    <TouchableOpacity onPress={this.turn2MapApp.bind(this, item.longitude, item.latitude, 'gaode', item.province.name + item.city.name + item.region.name + item.address)} style={[common.alignItemsB, { marginTop: 5 }]}>
                                                        <View style={common.alignItemsCenter}><Image style={css.storeIcon} source={require('../../image/daohang.jpg')} />
                                                            <Text style={{ color: '#808080', width: width / 2.5 }}>{item.province.name}{item.city.name}{item.region.name}{item.address}</Text>
                                                        </View>
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
                        </View> */}

                    </View>
                    : null}
                <View style={common.navBar}>
                    <TouchableOpacity onPress={() => { navigation.navigate('home') }} style={common.navBarBlock}>
                        <Image style={common.navBarIcon} source={require('../../image/tabbar-1.png')} />
                        <Text style={[common.navBarText]}>首页</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('category') }} style={common.navBarBlock}>
                        <Image style={common.navBarIcon} source={require('../../image/tabbar-2.png')} />
                        <Text style={[common.navBarText]}>本地生活</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('orderIndex') }} style={common.navBarBlock}>
                        <Image style={common.navBarIcon} source={require('../../image/tabbar-3-s.png')} />
                        <Text style={[common.navBarText, { color: '#F3A316' }]}>返佣精选</Text>
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