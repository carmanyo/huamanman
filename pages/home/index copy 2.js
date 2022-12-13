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
    TouchableHighlight,
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
    FlatList,
    PermissionsAndroid,
    RefreshControl,
    Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Utils from '../../utils/Util';
import Swiper from 'react-native-swiper';
import { MarqueeHorizontal, MarqueeVertical } from 'react-native-marquee-ab';
import DeviceInfo from 'react-native-device-info';

import { getInviteRule, getnews, getbanner, getvideoNum, getCompleteAdv, getVersions, getnoticepopup, getIndexNav, getGoodsList, getCategory, getUserDetail, getMerchantLists, getIndexGetPrice, getScanCode } from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import common from '../../css/common.js'
import css from '../../css/index.js'

const EXPROTHEIGHT = 20;
const window = Dimensions.get('window');
import App from '../../App'


import ToastExample from './ToastExample';
import loadingImage from '../../img/lo.gif';
import Geolocation from 'react-native-geolocation-service';
// import Barcode from 'react-native-smart-barcode';
import HTMLView from 'react-native-htmlview';
// import * as WeChat from 'react-native-wechat';


export default class home extends Component {
    render() {
        let { navigation } = this.props;
        let { imgArr } = this.state.imgArr;
        let ifupdate = this.state.update == 1 ?
            <View style={{ position: 'absolute', width: width, height: height, top: 0, zIndex: 10 }}>
                <TouchableOpacity onPress={() => { }} style={[common.mask, { zIndex: 10 }]}></TouchableOpacity>
                <View style={{ position: 'absolute', width: width, height: height, top: 0 }}>
                    <TouchableOpacity onPress={() => { this.setState({ update: 0 }) }} style={common.mask}></TouchableOpacity>
                    <View style={common.askModal}>
                        <View style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                            <Text style={{ textAlign: 'center' }}>检测到新版本{this.state.currentVersion}，您的版本是{this.state.version}，立即更新！</Text>
                        </View>
                        <View style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                            {/* <Text style={{ textAlign: 'center' }}>密码：8888</Text> */}
                            {
                                this.state.updateMsg.map((item, index) => {
                                    return (
                                        <Text key="index" style={{ textAlign: 'center' }}>{index + 1}、{item}</Text>
                                    )
                                })
                            }
                        </View>
                        <View style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                            <Text style={{ textAlign: 'center' }}>下载链接：{this.state.v_url}</Text>
                        </View>
                        <View style={common.askOperation}>
                            <TouchableOpacity onPress={this.update.bind(this)} type="default" style={{ width: width - 50, border: 0, textAlign: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}><Text style={[common.confirmBtn, { borderLeftWidth: 0 }]}>确认</Text></TouchableOpacity>

                        </View>
                    </View>
                </View>
            </View> : null;
        // console.log(this.state.viewAppear)

        let scanWindow = this.state.viewAppear == 1 ?
            <View style={common.body}>
                {/* 头部 */}
                <View style={[common.header]}>
                    <TouchableOpacity onPress={() => { this.setState({ viewAppear: 0 }) }} style={common.headerLeft}>
                        <Image source={require('../../image/return.png')} style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>扫码</Text></View>
                </View>

                {/* <Barcode style={{ flex: 1, }} ref={component => this._barCode = component} onBarCodeRead={this._onBarCodeRead} /> */}
            </View>
            : null;

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
                        onPress={() => {
                            if (this.state.agree == 0) {
                                Toast.show('请先阅读并勾选相关协议')
                            } else {
                                this.setState({ ifshowmodal: 0 })
                                navigation.navigate('invite')
                            }
                        }}
                        style={[css.linearBtn, { position: 'absolute', bottom: 10, marginTop: 58, marginLeft: 15, width: '100%', flex: 1 }]}
                    >
                        {/* <LinearGradient colors={['#F6BF0A', '#F6BF0A']} style={[common.linearBtn, {}]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>同意</Text></LinearGradient> */}
                        {
                            this.state.agree == 1 ?
                                <LinearGradient colors={['#F6BF0A', '#F6BF0A']} style={[common.linearBtn, {}]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>确定</Text></LinearGradient> :
                                <LinearGradient colors={['#CAC8C6', '#CAC8C6']} style={[common.linearBtn, {}]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>确定</Text></LinearGradient>
                        }
                    </TouchableOpacity>
                </View>
            </View> : null;

        let privacy = this.state.imgArr.length != 0 ?
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
                        onPress={() => { }}
                        style={[css.linearBtn, { position: 'relative', bottom: 10, marginTop: 58, marginLeft: '5%', width: '90%', flex: 1 }]}
                    >
                        <LinearGradient colors={['#F6BF0A', '#F6BF0A']} style={[common.linearBtn, {}]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>同意并继续</Text></LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { }}
                        style={[css.linearBtn, { position: 'relative', bottom: 10, marginTop: 8, marginLeft: '5%', width: '90%', flex: 1 }]}
                    >
                        <LinearGradient colors={['#ffffff', '#ffffff']} style={[common.linearBtn, {}]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={[common.linearBtnText, { color: '#333' }]}>不同意</Text></LinearGradient>
                    </TouchableOpacity>
                </View>
            </View> : null;
        return (
            <View style={[common.whiteBg, common.padBottom, { flex: 1, width: width, height: height }]}>
                {privacy}
                {modal}
                {scanWindow}
                {ifupdate}
                {this.state.viewAppear != 1 ?
                    <ScrollView
                        keyboardShouldPersistTaps="always"
                        style={[common.ScrollView]}
                        showsVerticalScrollIndicator={false}
                        onMomentumScrollEnd={this._contentViewScroll.bind(this)}
                        contentContainerStyle={{ paddingBottom: 60 }}
                        refreshControl={

                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this.refresh.bind(this, 0)}
                                colors={["#F5B50E"]}
                            />

                        }
                    >
                        <LinearGradient start={{ x: 0.25, y: 0.25 }} end={{ x: 0.75, y: 0.75 }} colors={['#F6BF0A', '#F3A316']} style={[css.topBg, { borderBottomLeftRadius: 50, borderTopRightRadius: 0, borderTopLeftRadius: 0, borderBottomRightRadius: 50 }]}></LinearGradient>

                        <View style={css.maFu}>
                            <View style={common.alignItemsB}>
                                <TouchableOpacity onPress={this.refresh.bind(this, 1)} style={common.alignItemsCenter}>
                                    <Image style={css.addressIcon} source={require('../../image/dingwei.png')} />
                                    <Text style={css.addressText}>{this.state.position}</Text>
                                    <Image style={[css.arrowIcon, { width: 16, height: 16 }]} source={require('../../image/refresh2.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { navigation.navigate('scan') }}><Image style={css.newsIcon} source={require('../../image/scan.png')} /></TouchableOpacity>
                                {/* <TouchableOpacity onPress={() => { this.toScan() }}><Image style={css.newsIcon} source={require('../../image/scan.png')} /></TouchableOpacity> */}
                                {/* <TouchableOpacity onPress={() => { this.showScan() }}><Image style={css.newsIcon} source={require('../../image/scan.png')} /></TouchableOpacity> */}
                            </View>

                            <View style={[common.alignItemsCenter, css.searchWrap]}>
                                <View style={common.alignItemsCenter}>
                                    <Image style={css.searchIcon} source={require('../../image/search.png')} />
                                    <TextInput
                                        onChangeText={(value) => this.setState({ searchValue: value }, () => { this.searchClear() })}
                                        value={this.state.searchValue} style={css.textInput} placeholder='请输入商品名称'
                                    />
                                </View>
                                <TouchableOpacity onPress={this.search.bind(this)} style={css.searchBtn}>
                                    <Text style={[css.searchText]}>搜索</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={css.funWrap}>
                                <TouchableOpacity onPress={() => { this.setState({ ifshowmodal: 1 }) }} style={common.columnCenter}><Image style={css.funIcon} source={require('../../image/index-1.png')} /><Text style={css.funText}>推广码</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => { navigation.navigate('team') }} style={common.columnCenter}><Image style={css.funIcon} source={require('../../image/index-2.png')} /><Text style={css.funText}>我的推广</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => { navigation.navigate('balance') }} style={common.columnCenter}><Image style={css.funIcon} source={require('../../image/index-3.png')} /><Text style={css.funText}>余额</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => { navigation.navigate('integral') }} style={common.columnCenter}><Image style={css.funIcon} source={require('../../image/index-4.png')} /><Text style={css.funText}>积分</Text></TouchableOpacity>
                            </View>

                            {
                                this.state.imgArr.length != 0 ?
                                    <View style={{ height: 150, borderRadius: 6, width: width - 30 }}>
                                        <Swiper
                                            removeClippedSubviews={false}
                                            showsButtons={false}         //显示控制按钮
                                            loop={true}                    //如果设置为false，那么滑动到最后一张时，再次滑动将不会滑到第一张图片。
                                            autoplay={true}                //自动轮播
                                            autoplayTimeout={3}          //每隔3秒切换

                                            dot={<View style={{           //未选中的圆点样式
                                                backgroundColor: 'rgba(0,0,0,0.2)',
                                                width: 12,
                                                height: 3,
                                                borderRadius: 4,
                                                marginLeft: 5,
                                                marginRight: 5,
                                                marginTop: 9,
                                                marginBottom: -20,
                                            }} />}
                                            activeDot={<View style={{    //选中的圆点样式
                                                backgroundColor: '#F6BF0A',
                                                width: 12,
                                                height: 3,
                                                borderRadius: 4,
                                                marginLeft: 5,
                                                marginRight: 5,
                                                marginTop: 9,
                                                marginBottom: -20,
                                            }} />}
                                            style={{ borderRadius: 6 }}
                                        >
                                            {this.state.imgArr.map((item, index) => {
                                                return (
                                                    <View key={index}>
                                                        {item.image != null ?
                                                            <Image style={css.banner} source={{ uri: item.image.file_path }} /> : null
                                                        }
                                                    </View>
                                                );
                                            })}
                                        </Swiper>
                                    </View> : null
                            }


                            {/* 文字滚动 */}
                            <View style={css.scrollNotice}>
                                <Image style={[css.indexNewsIcon, { marginRight: 10 }]} source={require('../../image/notice.png')} />
                                <MarqueeVertical
                                    textList={this.state.newsList}
                                    width={window.width}
                                    height={25}
                                    direction={'up'}
                                    numberOfLines={1}
                                    textStyle={{ fontSize: 14 }}
                                    onTextClick={(item) => {
                                    }}
                                />
                            </View>
                            <View style={css.catWrap}>
                                {this.state.catList.map((item, index) => {
                                    return (
                                        <TouchableOpacity onPress={() => { navigation.navigate('category', { category_id: item.category_id }); }} style={css.cat} horizontal={true} contentContainerStyle={{ alignItems: 'center' }} showsHorizontalScrollIndicator={false} key={index}>
                                            <Image style={css.catIcon} source={{ uri: item.file_path }} /><Text style={css.catText}>{item.name}</Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>

                            <View style={css.grayLine}></View>

                            <ScrollView style={css.nav} horizontal={true} contentContainerStyle={{ alignItems: 'center', justifyContent: 'space-around' }} showsHorizontalScrollIndicator={false}>

                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', minWidth: width - 100 }}>
                                    {this.state.navList.map((item, index) => {
                                        return (
                                            <TouchableOpacity onPress={() => {
                                                // this.setState({navIndex:index});
                                                this.navClick(index, item.type)
                                            }} style={css.navBlock} key={index}><Text style={[css.bigText, this.state.navIndex == index ? css.bigTextActive : null]}>{item.name}</Text><Text style={[css.smallText, this.state.navIndex == index ? css.smallTextActive : null]}>{item.tag}</Text></TouchableOpacity>


                                        );
                                    })}
                                </View>
                            </ScrollView>

                            {/* 商品列表 重要！勿删 */}
                            {this.state.navIndex == 0 ?
                                <View style={[css.goodsWrap, { marginTop: 0 }]}>
                                    {
                                        this.state.goodsList.map((item, index) => {
                                            return (
                                                <TouchableOpacity onPress={() => { navigation.navigate('goodsdetails', { id: item.goods_id }) }} style={css.goodsBlock} key={index}>
                                                    <Image style={css.goodsImage} source={{ uri: item.goods_image }} />
                                                    <Text style={css.goodsName} numberOfLines={1}>{item.goods_name}</Text>
                                                    <View style={common.alignItemsCenter}>
                                                        <Text style={css.goodsSku}>{item.discount}</Text>
                                                        {parseInt(item.goods_sku.goods_coupon) != 0 ? <Text style={css.goodsSku}>满{parseInt(item.goods_sku.goods_price)}减{parseInt(item.goods_sku.goods_coupon)}</Text> : null}
                                                    </View>
                                                    <View>
                                                        <View style={common.alignItemsCenter}>
                                                            <Text style={css.sPrice}>￥</Text>
                                                            {/* <Text style={css.bPrice}>{(Number(item.goods_sku.goods_price) - Number(item.goods_sku.goods_coupon)).toFixed(2)}</Text>
                                                            <Text style={css.sPrice}>劵后价</Text> */}

                                                            <Text style={css.bPrice}>{item.goods_sku.goods_price}</Text>
                                                        </View>
                                                        {
                                                            item.goods_sku.goods_coupon != 0 ? <Text style={css.sPrice}>劵可抵：{item.goods_sku.goods_coupon}元</Text> : null
                                                        }

                                                    </View>
                                                    <Image style={css.dotIcon} source={require('../../image/dot.png')} />
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View> : null}

                            {this.state.navIndex != 0 ?
                                <View style={css.storeWrap}>
                                    {this.state.storeList.map((item, index) => {
                                        return (
                                            <View style={[common.alignItemsCenter, css.store]}>
                                                <TouchableOpacity onPress={() => { navigation.navigate('shop', { id: item.merchant_id }) }}><Image style={css.storeLogo} source={{ uri: item.logo.file_path }} /></TouchableOpacity>
                                                <View style={common.columnStart}>
                                                    <Text style={css.storeName}>{item.merchant_name}</Text>
                                                    <TouchableOpacity onPress={() => { return Linking.openURL('tel:' + item.phone); }} style={[common.alignItemsCenter, { marginTop: 15, }]}><Image style={css.storeIcon} source={require('../../image/call.png')} /><Text style={{ color: '#808080' }}>{item.phone}</Text></TouchableOpacity>
                                                    <TouchableOpacity onPress={this.turn2MapApp.bind(this, item.longitude, item.latitude, 'gaode', item.province.name + item.city.name + item.region.name + item.address)} style={[common.alignItemsB, { marginTop: 10 }]}>
                                                        <View style={common.alignItemsCenter}><Image style={css.storeIcon} source={require('../../image/daohang.jpg')} />
                                                            <Text style={{ color: '#808080', width: width / 3 }} numberOfLines={1}>{item.province.name}{item.city.name}{item.region.name}{item.address}</Text>
                                                        </View>
                                                        <Text style={{ color: '#808080' }}>{item.distance_unit}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )
                                    })
                                    }

                                    {
                                        this.state.storeList.length == 0 ?
                                            <View style={[common.empty, { paddingBottom: 50, marginTop: 30, marginLeft: -10 }]}>
                                                <Image style={common.emptyIcon} source={require('../../image/empty2.png')} />
                                                <Text style={common.emptyH1}>暂无店铺</Text>
                                            </View> : null
                                    }
                                </View>
                                : null}


                        </View>
                        {/* <Text>{this.state.isLoading?'true':this.state.isLoading}</Text> */}
                        {this.state.isLoading ? <Text style={{ textAlign: 'center' }}>加载中，请稍等~</Text> : null}
                        {this.state.isLoading == 0 ? <Text style={{ textAlign: 'center' }}>暂无数据~</Text> : null}
                    </ScrollView > : null}
                <View style={common.navBar}>
                    <TouchableOpacity onPress={() => { navigation.navigate('home') }} style={common.navBarBlock}>
                        <Image style={common.navBarIcon} source={require('../../image/tabbar-1-s.png')} />
                        <Text style={[common.navBarText, { color: '#F3A316' }]}>首页</Text>
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
                        <Image style={common.navBarIcon} source={require('../../image/tabbar-4.png')} />
                        <Text style={common.navBarText}>我的</Text>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            navIndex: 0,
            page: 1,
            searchValue: '',
            isRefreshing: false,
            position: '',
            imgArr: [],
            navList: [],
            goodsList: [],
            catList: [],
            storeList: [],
            longitude: '114.06667',
            latitude: '22.61667',
            v_url: '',
            version: '',
            currentVersion: '',
            updateMsg: [],
            update: 0,
            priceData: '',
            viewAppear: 0,
            type: '',
            camera: '',
            ruleData: '',
            agree: 0,
            isLoading: false,
        }
        this.componentWillUnmount = this.componentWillUnmount.bind(this)
        this.showScan = this.showScan.bind(this);
        // WeChat.registerApp('com.firefly.app');
        // WeChat.registerApp('wx6a41d8f51c0c5ff8');
    }
    componentWillUnmount() {

    }

    //获取权限
    async componentDidMount() {
        // 拉起小程序

        // WeChat.isWXAppInstalled()
        //     .then((isInstalled) => {
        //         if (isInstalled) {
        //             // WeChat.launchMini()
        //             let weixinMiniProgramShareInfo = {
        //                 userName: 'gh_5c2fd1ae192d',//小程序原始ID
        //                 appId: "com.firefly.app",//安卓应用id
        //                 path: "pages/index/index"//你的小程序页面path
        //             }
        //             WeChat.launchMini(weixinMiniProgramShareInfo).then((res) => {
        //             // console.log('拉起成功', res)
        //             }).catch((clickErr) => {
        //             // console.log('拉起失败', clickErr)
        //             })
        //         } else {
        //             Alert.alert('请安装微信');
        //         }
        //     });

        // Linking.canOpenURL('weixin://').then(supported => {
        //     if (supported) {
        //     // console.log('supported---------')
        //     // console.log(WeChat)
        //         // WeChat.launchMini({
        //         //     userName: "gh_5c2fd1ae192d", // 拉起的小程序的username
        //         //     miniProgramType: 0, // 拉起小程序的类型. 0-正式版 1-开发版 2-体验版
        //         //     path: 'pages/index/index' // 拉起小程序页面的可带参路径，不填默认拉起小程序首页
        //         // });
        //         let miniShareInfo = {
        //             userName: 'gh_5c2fd1ae192d', // 小程序原始id 
        //             // appId: 'com.firefly.app', // 安卓应用id
        //             appId: 'wx6a41d8f51c0c5ff8', // 安卓应用id
        //             path: 'pages/index/index', // 你的小程序页面path
        //             type: 0 // 0正式环境 2开发环境 
        //         };
        //     // console.log(miniShareInfo)
        //         WeChat.launchMini(miniShareInfo)
        //             .then(res => {
        //             // console.log('拉起成功', res);
        //             })
        //             .catch(clickErr => {
        //             // console.log('拉起失败', clickErr);
        //             });
        //     } else {
        //         // Alert.alert('温馨提示', '请先安装微信');
        //         Toast.show('温馨提示', '请先安装微信')
        //     }
        // })
        // WeChat.isWXAppInstalled().then(isInstalled => {
        //     if (isInstalled) {
        //       let miniShareInfo = {
        //         userName:'gh_5c2fd1ae192d', // 小程序原始id 
        //         appId: 'com.firefly.app', // 安卓应用id
        //         path: 'pages/index/index', // 你的小程序页面path
        //         type: 0 // 0正式环境 2开发环境 
        //       };
        //       WeChat.launchMini(miniShareInfo)
        //         .then(res => {
        //       // console.log('拉起成功', res);
        //         })
        //         .catch(clickErr => {
        //       // console.log('拉起失败', clickErr);
        //         });
        //     } else {
        //       Alert.alert('请安装微信');
        //     }
        //   });

        // https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
        // console.log('拉起小程序')
        // fetch(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxa79a147df12a7604&secret=bc13b1cea574a7a058028510ee0e61a7`, { method: "GET" })
        //     .then(response => response.json())
        //     .then((jsonDa) => {
        //     // console.log('jsonDa-----------')
        //     // console.log(jsonDa)

        //         // var url = 'https://api.weixin.qq.com/wxa/generate_urllink?path=pages/index/index&expire_type=1&access_token='+jsonDa.access_token
        //         // Linking.openURL(url)

        //         // var bodyData = {};
        //         // var fromData = {};
        //         // fromData['expire_type'] = jsonDa.expires_in;
        //         // fromData['access_token'] = jsonDa.access_token;
        //         // fromData['path'] = 'pages/index/index';
        //         // fetch('https://api.weixin.qq.com/wxa/generate_urllink', {
        //         //     method: 'POST',
        //         //     headers: {
        //         //         // 'Accept':'application/json',
        //         //         // 'Content-Type':'application/x-www-form-urlencoded',
        //         //         'Content-Type': 'multipart/form-data',
        //         //         'Accept': 'application/json', 'Content-Type': 'application/json',
        //         //     },
        //         //     body: JSON.stringify(fromData),
        //         // }).then((response) => response.json())
        //         //     .then((responseData) => {
        //         //         //成功回调的数据
        //         //     // console.log('responseData------------');
        //         //     // console.log(responseData);
        //         //         // callback(responseData);
        //         //     })
        //         //     .catch((responseData) => {
        //         //     // console.log(responseData);
        //         //         // callback(responseData);
        //         //     }).done()

        //         // var url = 'https://api.weixin.qq.com/wxa/generate_urllink?path=pages/index/index&expire_type=1&access_token='+jsonDa.access_token
        //         // // Linking.openURL(url)

        //         // fetch(url, { method: "POST" })
        //         // .then(response => response.json())
        //         // .then((jsonDa) => {
        //         // // console.log('jsonDa-----------2')
        //         // // console.log(jsonDa)
        //         //     // var url = 'https://api.weixin.qq.com/wxa/generate_urllink?access_token='+jsonDa.access_token
        //         //     // Linking.openURL(url)

        //         // })
        //         // .catch(error => {
        //         // // console.log('error-----------2')
        //         // // console.log(error)
        //         // });

        //     })
        //     .catch(error => {
        //     // console.log('error-----------')
        //     // console.log(error)
        //     });


        var that = this;
        that.setState({
            // over:true,
            version: DeviceInfo.getVersion()
        }, () => {
            that.init()
        })


        let viewAppearCallBack = (event) => {
            this.setTimeout(() => {
                this.setState({
                    viewAppear: 1,
                })
            }, 255)

        }
        this._listeners = [
            this.props.navigator.navigationContext.addListener('didfocus', viewAppearCallBack)
        ]



    }

    set(i) {
        var that = this;
        setTimeout(() => {
            that.setD(i)
        }, 250);
    }

    setD(i) {
        var that = this;
        setTimeout(() => {
            that.setState({
                viewAppear: i
            })
        }, 250);
    }

    toScan() {
        let { navigation } = this.props;
        if (this.state.camera == 'granted') {
            // Toast.show('有权限')
            navigation.navigate('scan')
        } else {
            Toast.show('请在设备设置中启用摄像头权限')
        }
    }

    showScan() {
        var that = this;
        if (this.state.camera == 'granted') {
            // this.set(1)
            that.setState({
                viewAppear: 1
            })
        } else {
            Toast.show('请在设备设置中启用摄像头权限')
        }

    }

    _onBarCodeRead = (e) => {
        var that = this;
        // this._stopScan()
        this._stopScan()
        Alert.alert(e.nativeEvent.data.type, e.nativeEvent.data.code, [
            { text: 'OK', onPress: () => this._startScan() },
        ])
    }

    _startScan = (e) => {
        this._barCode.startScan()
    }

    _stopScan = (e) => {
        this._barCode.stopScan()
    }

    version() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getVersions(fromData, res => {
        // console.log('版本----------')
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
                        updateMsg: res.data.msg,
                    })
                }

                // that.setState({
                //     v_url: v_url,
                //     update: 1,
                //     currentVersion: currentVersion,
                //     updateMsg:res.data.msg,
                // })
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

    /**
     * 跳转到导航界面
     * @param lon
     * @param lat
     * @param name
     * @param targetAppName browser-浏览器打开， gaode-高德APP， baidu-百度APP，如果没有安装相应APP则使用浏览器打开。
     */
    // turn2MapAppFirst(lon,lat,targetAppName,name){
    //     this.turn2MapApp(lon,lat,targetAppName,name)
    // }
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
        let webUrl = `http://uri.amap.com/navigation?to=${lon},${lat},${name}&mode=bus&coordinate=gaode`;
        let webUrlGaode = `http://uri.amap.com/navigation?to=${lon},${lat},${name}&mode=bus&coordinate=gaode`;
        let webUrlBaidu = `http://api.map.baidu.com/direction?destination=latlng:${lat},${lon}|name=${name}&mode=transit&coord_type=gcj02&output=html&src=mybaoxiu|wxy`;

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

    getCity(longitude, latitude) {
        var that = this;
        // console.log('getCity-------')7836bbd1b87fc0130d6922edddea24e8
        // var url = `https://restapi.amap.com/v3/assistant/coordinate/convert?locations=${longitude},${latitude}&coordsys=gps&output=json&key=3be5718d299c29e72fced80f03514b90`;
        // console.log(url)
        fetch(`https://restapi.amap.com/v3/assistant/coordinate/convert?locations=${longitude},${latitude}&coordsys=gps&output=json&key=3be5718d299c29e72fced80f03514b90`, { method: "GET" })
            .then(response => response.json())
            .then((jsonDa) => {
                // console.log('getCity-------2')
                // console.log(jsonDa)
                // console.log(jsonDa.locations)
                let newVar = jsonDa.locations.split(',')
                that.setState({
                    longitude: newVar[0],//经度
                    latitude: newVar[1],//纬度
                }, that.getCityStep2(newVar[0], newVar[1]));
            })
            .catch(error => {
                // console.log('getCity-------4')
            // console.log(error)
                // reject(error);
            });
    }


    getCityStep2(longitude, latitude) {
        // console.log('getCity-------3')
        var that = this;
        //访问网络开始
        fetch('http://restapi.amap.com/v3/geocode/regeo?key=3be5718d299c29e72fced80f03514b90&location=' + longitude + ',' + latitude + '&radius=1000&extensions=all&batch=false&roadlevel=0', {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: ``
        })
            .then((response) => response.json())
            .then((jsonData) => {
                try {
                    // console.log('getCity-------3')
                    // console.log(jsonData)
                    //Toast.show(jsonData.result.formatted_address+jsonData.result.sematic_description)
                    that.setState({
                        // position: jsonData.regeocode.formatted_address,
                        position: jsonData.regeocode.addressComponent.province + jsonData.regeocode.addressComponent.city + jsonData.regeocode.addressComponent.district,
                    });
                    setTimeout(() => {
                        // Toast.show('刷新成功')
                        that.setState({
                            isRefreshing: false
                        })
                    }, 1000);
                } catch (e) {
                // console.log(e)
                }
            })
            .catch((error) => {
                console.error(error);
            });
        //访问网络结束
    }


    async requestCameraPermission() {
        var that = this;
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: '权限',
                message: '请求获取您的位置',
            },
        ).then((res) => {
        // console.log(res);
            try {
                // Alert.alert('11111')
                Geolocation.getCurrentPosition(location => {
                    // Alert.alert('11111')
                // console.log('locations----------------------拿到了')
                    // console.log(location)

                    that.setState({
                        longitude: location.coords.longitude,//经度
                        latitude: location.coords.latitude,//纬度
                    }, () => {
                        that.getCity(location.coords.longitude, location.coords.latitude)
                    });
                }, error => {
                // console.log(error)
                })

            } catch (err) {
                // Alert.alert('22222')
            // console.log(err);
            }
        });
    };


    refresh(type) {
    // console.log(type)
        if (type == 1) {
            this.setState({
                isRefreshing: true
            })
            this.requestCameraPermission();
        } else {
            this.setState({
                isRefreshing: true,
                page: 1,
                imgArr: [],
                navList: [],
                goodsList: [],
                catList: [],
                storeList: [],
            }, () => {
                this.init();
            })


            // 刷新店铺
            var fromData = {};
            fromData['type'] = this.state.type;
            fromData['longitude'] = this.state.longitude;
            fromData['latitude'] = this.state.latitude;
            getMerchantLists(fromData, res => {
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

    }

    init() {
        this.getBanner();
        this.getNews();
        this.getIndexNavs();
        this.getGoodsLists();
        this.getCategorys();
        // this.requestCameraPermission();
        this.requestCameraPermission2();
        this.version();
        this.getIndexGetPrices();
        this.getRule()

        // this.getUserDetails();
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

    requestCameraPermission2() {
        var that = this;
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: '权限',
                message: '启用摄像头权限',
            },
        ).then((res) => {
            that.setState({
                camera: res
            })
        // console.log(res);
        });
    }

    // 分页
    _contentViewScroll(e) {
        // Toast.show('到底了~')
        var that = this;
        var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
    // console.log(offsetY + oriageScrollHeight)
    // console.log(contentSizeHeight)
        if (parseInt(offsetY + oriageScrollHeight) >= parseInt(contentSizeHeight)) {
            // Console.log('上传滑动到底部事件')
            that.setState({
                page: that.state.page + 1,
                isLoading: true,
            }, () => {
                that.getGoodsLists()
            })

        }
    }

    // 盘面价格
    getIndexGetPrices() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getIndexGetPrice(fromData, res => {
        // console.log('盘面价格----' + res)
        // console.log(res)
            if (res.code == 1) {
                this.setState({
                    priceData: res.data,
                })
            }
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
                    this.setState({
                        catList: res.data,
                        isRefreshing: false,
                    })
                }
            }
        })
    }

    // 商品列表
    getGoodsLists() {
        // console.log('page----------------')
        // console.log(this.state.page)
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        fromData['page'] = this.state.page;
        fromData['search'] = this.state.searchValue;
        getGoodsList(fromData, res => {
        // console.log('res----------2')
        // console.log(res)
            if (res.code == 1) {
                // if(this.state.page == res)
                if (res.data.list.data.length > 0) {
                    this.setState({
                        isLoading: true,
                        goodsList: this.state.goodsList.concat(res.data.list.data)
                    })
                    return;
                }
                this.setState({
                    isLoading: 0,
                })

            }
        })
    }


    getGoodsListsPage(page) {
    // console.log('page----------------')
    // console.log(page)
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        fromData['page'] = page;
        fromData['search'] = this.state.searchValue;
        getGoodsList(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                if (res.data.list.data.length > 0) {
                    this.setState({
                        goodsList: this.state.goodsList.concat(res.data.list.data)
                    })
                }
            }
        })
    }

    // 搜索
    searchClear() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        fromData['page'] = 1;
        fromData['search'] = this.state.searchValue;
        getGoodsList(fromData, res => {
        // console.log('sss------------')
        // console.log(res)
            if (res.code == 1) {
                if (res.data.list.data.length > 0) {
                    this.setState({
                        goodsList: res.data.list.data
                    })
                }
            }
        })
    }

    // 搜索
    search() {
        Keyboard.dismiss();
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        fromData['page'] = 1;
        fromData['search'] = this.state.searchValue;
        getGoodsList(fromData, res => {
        // console.log('sss------------')
        // console.log(res)
            if (res.code == 1) {
                if (res.data.list.data.length > 0) {
                    this.setState({
                        goodsList: res.data.list.data
                    })
                }
            }
        })
    }

    // 轮播图
    getBanner() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        fromData['version'] = this.state.version;
        getbanner(fromData, res => {
        // console.log('res----------999')
        // console.log(res)
            if (res.code == 1) {
                // Toast.show('调接口了')
                var bannerList = res.data.list
                // var arr = [];
                var newList = []
                if (bannerList.length > 0) {
                    for (var i = 0; i < bannerList.length; i++) {
                        newList.push(bannerList[i])
                    }
                } else {
                    return;
                }
                // newList.push(arr)
                this.setState({
                    imgArr: newList,
                    newListLen: newList.length
                })
            } else if (res.code == -1) {
                Toast.show('请重新登录');
                navigation.navigate("login", {
                    id: that.state.id,
                    refresh: function () {
                        that.init();
                    }
                });
            } else {

            }
        })
    }

    // 消息列表
    getNews() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getnews(fromData, res => {
            // console.log(res)
            if (res.code == 1) {
                if (res.data.list.data.length > 0) {
                    this.setState({
                        newsList: res.data.list.data,
                    })
                }
            }
        })
    }

    // 导航
    getIndexNavs() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getIndexNav(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                if (res.data.list.length > 0) {
                    this.setState({
                        navList: res.data.list,
                    })
                }
            }
        })
    }

    // 导航点击
    navClick(index, type) {
        // Toast.show('点击了')
        this.setState({
            navIndex: index,
            storeList: [],
            type: type,
        })

        if (index != 0) {
            var that = this;
            let { navigation } = this.props;
            var fromData = {};
            // console.log(this.state.longitude)
            fromData['type'] = type;
            fromData['longitude'] = this.state.longitude;
            fromData['latitude'] = this.state.latitude;
            getMerchantLists(fromData, res => {
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