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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Utils from '../../utils/Util';
import Swiper from 'react-native-swiper';
import { MarqueeHorizontal, MarqueeVertical } from 'react-native-marquee-ab';
import DeviceInfo from 'react-native-device-info';

import { getpoolTotal, getnews, getbanner, getvideoNum, getCompleteAdv, getVersions, getnoticepopup, getCategory, getGoodsList } from '../../network/authapi.js'
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
            imgArr: [],
            catList: [],
            catIndex: 0,
            page: 1,
            goodsList: [],
            searchValue: '',
            isRefreshing: false,
            version: '',
            currentVersion: '',
            
        }
        this.componentWillUnmount = this.componentWillUnmount.bind(this)
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
        getCategory(fromData, res => {
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
    changeCat(category_id) {
        var that = this;
        that.setState({
            category_id: category_id,
            page: 1,
            goodsList: [],
            searchValue: '',
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
        fromData['page'] = this.state.isRefreshing ? 1 : this.state.page;
        fromData['search'] = this.state.searchValue;

        getGoodsList(fromData, res => {
            // console.log(res)
            if (res.code == 1) {
                if (res.data.list.data.length > 0) {
                    if (this.state.isRefreshing) {
                        this.setState({
                            goodsList: res.data.list.data,
                            isRefreshing: false,
                        })
                    } else {
                        this.setState({
                            goodsList: this.state.goodsList.concat(res.data.list.data),
                            isRefreshing: false,
                        })
                    }

                }
            }
        })
    }

    // 商品列表
    getGoodsLists() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        fromData['category_id'] = this.state.category_id;
        fromData['page'] = this.state.isRefreshing ? 1 : this.state.page;
        fromData['search'] = this.state.searchValue;
        getGoodsList(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                if (res.data.list.data.length > 0) {
                    if (this.state.isRefreshing) {
                        this.setState({
                            goodsList: res.data.list.data,
                            isRefreshing: false,
                        })
                    } else {
                        this.setState({
                            goodsList: this.state.goodsList.concat(res.data.list.data),
                            isRefreshing: false,
                        })
                    }

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
        // Toast.show('到底啦')
        var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
        if (offsetY + oriageScrollHeight >= contentSizeHeight) {
            // Console.log('上传滑动到底部事件')
            this.setState({
                page: this.state.page + 1,
            }, ()=>{
                this.getGoodsLists()
            })

        }
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
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>商城分类</Text></View>
                </View>
                {this.state.catList.length != 0 ?
                    <ScrollView style={[common.ScrollView, common.hasHeader]}
                    >
                        {/* 搜索 */}
                        <TouchableOpacity style={[common.alignItemsCenter, css.searchWrap, catCss.searchWrap]} onPress={() => { navigation.navigate('search') }}>
                            <View style={common.alignItemsCenter}>
                                <Image style={css.searchIcon} source={require('../../image/search.png')} />
                                <TextInput
                                    onChangeText={(value) => this.setState({ inputValue: value })}
                                    value={this.state.inputValue} style={css.textInput} placeholder='请输入商品名称' editable={false}
                                />
                            </View>
                            <TouchableOpacity style={css.searchBtn}>
                                <Text style={[css.searchText]}>搜索</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                        <View style={catCss.content}>
                            <ScrollView
                                style={catCss.contentLeft}
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
                            <ScrollView style={catCss.contentRight} showsVerticalScrollIndicator={false} onMomentumScrollEnd={this._contentViewScroll.bind(this)}>
                                {/* <Image style={catCss.catBanner} source={require('../../image/catbanner.png')} /> */}
                                {/* <Text style={catCss.catTittle}>推荐商品</Text> */}
                                <View style={[catCss.goodsWrap]}>
                                    {
                                        this.state.goodsList && this.state.goodsList.map((item, index) => {
                                            return (
                                                <TouchableOpacity onPress={() => { navigation.navigate('goodsdetails', { id: item.goods_id }) }} style={[catCss.goodsBlock, { padding: 5 }]} key={index}>
                                                    <Image style={catCss.goodsImage} source={{ uri: item.goods_image }} />
                                                    <Text style={css.goodsName}>{item.goods_name}</Text>
                                                    {/* <Text style={catCss.goodsSku}>满200减10</Text>+ */}
                                                    <View style={common.alignItemsCenter}>
                                                        <Text style={css.goodsSku}>{item.discount}</Text>
                                                        {/* {parseInt(item.goods_sku.goods_coupon) != 0 ? <Text style={css.goodsSku}>满{parseInt(item.goods_sku.goods_price)}减{parseInt(item.goods_sku.goods_coupon)}</Text> : null} */}
                                                    </View>
                                                    <View style={[common.alignItemsCenter,{width:'100%'}]}>
                                                        <Text style={[css.goodsSku,{width:'100%',paddingLeft:0,paddingRight:0,textAlign:'center'}]}>立送≈价值{item.rebate}元积分</Text>
                                                        {/* <Text style={[css.goodsSku,{width:130,paddingLeft:0,paddingRight:0,textAlign:'center',marginLeft:-10}]}>立送≈价值{item.rebate}元积分</Text> */}
                                                    </View>
                                                    {/* <Text style={css.sPrice}>劵后价</Text>
                                                    <View style={css.goodsPriceWrap}>
                                                        <Text style={css.sPrice}>￥</Text>
                                                        <Text style={css.bPrice}>{(Number(item.goods_sku.goods_price) - Number(item.goods_sku.goods_coupon)).toFixed(2)}</Text>
                                                    </View> */}
                                                    <View>
                                                        <View style={common.alignItemsCenter}>
                                                            <Text style={css.sPrice}>￥</Text>
                                                            {/* <Text style={css.bPrice}>{(Number(item.goods_sku.goods_price) - Number(item.goods_sku.goods_coupon)).toFixed(2)}</Text>
                                                            <Text style={css.sPrice}>劵后价</Text> */}

                                                            <Text style={css.bPrice}>{ item.goods_sku.goods_price }</Text>
                                                        </View>
                                                        {
                                                            item.goods_sku.goods_coupon!=0?<Text style={css.sPrice}>劵可抵：{ item.goods_sku.goods_coupon }元</Text>:null
                                                        }
                                                        
                                                    </View>
                                                    <Image style={catCss.dotIcon} source={require('../../image/dot.png')} />
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                    {
                                        this.state.goodsList.length == 0 ?
                                            <View style={[common.empty,{width:width-137,paddingBottom:150}]}>
                                                <Image style={common.emptyIcon} source={require('../../image/empty2.png')} />
                                                <Text style={common.emptyH1}>暂无商品</Text>
                                                <Text style={common.emptyP}>即将上架，敬请期待~</Text>
                                            </View> : null
                                    }
                                </View>
                            </ScrollView>
                        </View>

                    </ScrollView>
                    : null}
                <View style={common.navBar}>
                    <TouchableOpacity onPress={() => { navigation.navigate('home') }} style={common.navBarBlock}>
                        <Image style={common.navBarIcon} source={require('../../image/tabbar-1.png')} />
                        <Text style={[common.navBarText]}>首页</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('category') }} style={common.navBarBlock}>
                        <Image style={common.navBarIcon} source={require('../../image/tabbar-2-s.png')} />
                        <Text style={[common.navBarText, { color: '#F3A316' }]}>分类</Text>
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