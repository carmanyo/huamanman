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
import loadingImage from '../../img/lo.gif'
import Geolocation from 'react-native-geolocation-service';
import Barcode from 'react-native-smart-barcode'
import HTMLView from 'react-native-htmlview'


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
                        <View style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                            <Text style={{ textAlign: 'center' }}>??????????????????{this.state.currentVersion}??????????????????{this.state.version}??????????????????</Text>
                        </View>
                        <View style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                            <Text style={{ textAlign: 'center' }}>???????????????{this.state.v_url}</Text>
                        </View>
                        <View style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                            <Text style={{ textAlign: 'center' }}>?????????8888</Text>
                        </View>
                        <View style={common.askOperation}>
                            <TouchableOpacity onPress={this.update.bind(this)} type="default" style={{ width: width - 50, border: 0, textAlign: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}><Text style={[common.confirmBtn, { borderLeftWidth: 0 }]}>??????</Text></TouchableOpacity>

                        </View>
                    </View>
                </View>
            </View> : null;
        // console.log(this.state.viewAppear)

        let scanWindow = this.state.viewAppear == 1 ?
            <View style={common.body}>
                {/* ?????? */}
                <View style={[common.header]}>
                    <TouchableOpacity onPress={() => { this.setState({ viewAppear: 0 }) }} style={common.headerLeft}>
                        <Image source={require('../../image/return.png')} style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>??????</Text></View>
                </View>

                <Barcode style={{ flex: 1, }} ref={component => this._barCode = component} onBarCodeRead={this._onBarCodeRead} />
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
                            <Text style={{ color: '#333333', fontSize: 15 }}>????????????????????????</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => { 
                            if(this.state.agree==0){
                                Toast.show('?????????????????????????????????')
                            }else{
                                this.setState({ ifshowmodal: 0 })
                                navigation.navigate('invite')
                            }
                    }}
                        style={[css.linearBtn, { position: 'absolute', bottom: 10, marginTop: 58, marginLeft: 15, width: '100%', flex: 1 }]}
                    >
                        {/* <LinearGradient colors={['#F6BF0A', '#F6BF0A']} style={[common.linearBtn, {}]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>??????</Text></LinearGradient> */}
                        {
                            this.state.agree==1?
                            <LinearGradient colors={['#F6BF0A', '#F6BF0A']} style={[common.linearBtn, {}]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>??????</Text></LinearGradient>:
                            <LinearGradient colors={['#CAC8C6', '#CAC8C6']} style={[common.linearBtn, {}]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>??????</Text></LinearGradient>
                        }
                    </TouchableOpacity>
                </View>
            </View> : null;
        return (
            <View style={[common.whiteBg, common.padBottom, { flex: 1, width: width, height: height }]}>
                {modal}
                {scanWindow}
                {ifupdate}
                {this.state.viewAppear != 1 ?
                    <ScrollView
                        style={[common.ScrollView]}
                        showsVerticalScrollIndicator={false}
                        onMomentumScrollEnd={this._contentViewScroll.bind(this)}

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
                                        onChangeText={(value) => this.setState({ searchValue: value })}
                                        value={this.state.searchValue} style={css.textInput} placeholder='?????????????????????'
                                    />
                                </View>
                                <TouchableOpacity onPress={this.search.bind(this)} style={css.searchBtn}>
                                    <Text style={[css.searchText]}>??????</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={css.funWrap}>
                                <TouchableOpacity onPress={() => { this.setState({ ifshowmodal: 1 }) }} style={common.columnCenter}><Image style={css.funIcon} source={require('../../image/index-1.png')} /><Text style={css.funText}>?????????</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => { navigation.navigate('team') }} style={common.columnCenter}><Image style={css.funIcon} source={require('../../image/index-2.png')} /><Text style={css.funText}>????????????</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => { navigation.navigate('balance') }} style={common.columnCenter}><Image style={css.funIcon} source={require('../../image/index-3.png')} /><Text style={css.funText}>??????</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => { navigation.navigate('integral') }} style={common.columnCenter}><Image style={css.funIcon} source={require('../../image/index-4.png')} /><Text style={css.funText}>??????</Text></TouchableOpacity>
                            </View>

                            {
                                this.state.imgArr.length != 0 ?
                                    <View style={{ height: 150, borderRadius: 6, width: width - 30 }}>
                                        <Swiper
                                            removeClippedSubviews={false}
                                            showsButtons={false}         //??????????????????
                                            loop={true}                    //???????????????false?????????????????????????????????????????????????????????????????????????????????
                                            autoplay={true}                //????????????
                                            autoplayTimeout={3}          //??????3?????????

                                            dot={<View style={{           //????????????????????????
                                                backgroundColor: 'rgba(0,0,0,0.2)',
                                                width: 12,
                                                height: 3,
                                                borderRadius: 4,
                                                marginLeft: 5,
                                                marginRight: 5,
                                                marginTop: 9,
                                                marginBottom: -20,
                                            }} />}
                                            activeDot={<View style={{    //?????????????????????
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


                            {/* ???????????? */}
                            <View style={css.scrollNotice}>
                                <Image style={[css.indexNewsIcon, { marginRight: 10 }]} source={require('../../image/notice.png')} />
                                <MarqueeVertical
                                    // textList={[
                                    //     { label: '1', value: 'XXX??????????????????????????????' },
                                    // ]}
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

                            {/* {
                                this.state.priceData.price ? <View style={[common.alignItemsCenter, { marginTop: 10 }]}><Text style={{ backgroundColor: 'rgba(244,175,19,0.2)', color: '#F2A514', paddingLeft: 10, paddingRight: 10, lineHeight: 28, borderRadius: 50 }}>???????????????{this.state.priceData.price}</Text></View> : null
                            } */}

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
                                {/* <View style={css.navBlock}><Text style={[css.bigText, css.bigTextActive]}>????????????</Text><Text style={[css.smallText, css.smallTextActive]}>????????????</Text></View>
                            <View style={css.navBlock}><Text style={css.bigText}>????????????</Text><Text style={css.smallText}>????????????</Text></View>
                            <View style={css.navBlock}><Text style={css.bigText}>????????????</Text><Text style={css.smallText}>????????????</Text></View>
                            <View style={css.navBlock}><Text style={css.bigText}>????????????</Text><Text style={css.smallText}>????????????</Text></View> */}
                            </ScrollView>

                            {/* ???????????? ??????????????? */}
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
                                                        {parseInt(item.goods_sku.goods_coupon) != 0 ? <Text style={css.goodsSku}>???{parseInt(item.goods_sku.goods_price)}???{parseInt(item.goods_sku.goods_coupon)}</Text> : null}
                                                    </View>
                                                    <View style={css.goodsPriceWrap}>
                                                        <Text style={css.sPrice}>???</Text>
                                                        <Text style={css.bPrice}>{Number(item.goods_sku.goods_price) - Number(item.goods_sku.goods_coupon)}</Text>
                                                        <Text style={css.sPrice}>?????????</Text>
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
                                                <Text style={common.emptyH1}>????????????</Text>
                                            </View> : null
                                    }
                                </View>
                                : null}


                        </View>
                        {/* <Image style={{ width: width, height: height }} source={require('../../img/bg.png')} /> */}
                    </ScrollView > : null}
                {/* ?????? */}
                {/* {this.state.viewAppear ? <Barcode style={{flex: 1, }}
                                                  ref={ component => this._barCode = component }
                                                  onBarCodeRead={this._onBarCodeRead}/> : null} */}
                {/* <Text>{this.state.viewAppear?'true':'false'}</Text> */}

                <View style={common.navBar}>
                    <TouchableOpacity onPress={() => { navigation.navigate('home') }} style={common.navBarBlock}>
                        <Image style={common.navBarIcon} source={require('../../image/tabbar-1-s.png')} />
                        <Text style={[common.navBarText, { color: '#F3A316' }]}>??????</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('category') }} style={common.navBarBlock}>
                        <Image style={common.navBarIcon} source={require('../../image/tabbar-2.png')} />
                        <Text style={common.navBarText}>??????</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('orderIndex') }} style={common.navBarBlock}>
                        <Image style={common.navBarIcon} source={require('../../image/tabbar-3.png')} />
                        <Text style={common.navBarText}>??????</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('mine') }} style={common.navBarBlock}>
                        <Image style={common.navBarIcon} source={require('../../image/tabbar-4.png')} />
                        <Text style={common.navBarText}>??????</Text>
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
            update: 0,
            priceData: '',
            viewAppear: 0,
            type: '',
            camera: '',
            ruleData: '',
            agree: 0,

        }
        this.componentWillUnmount = this.componentWillUnmount.bind(this)
        this.showScan = this.showScan.bind(this)
    }
    componentWillUnmount() {

    }

    //????????????
    async componentDidMount() {
        var that = this;
        that.setState({
            // over:true,
            version: DeviceInfo.getVersion()
        }, that.init())


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
            // Toast.show('?????????')
            navigation.navigate('scan')
        } else {
            Toast.show('??????????????????????????????????????????')
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
            Toast.show('??????????????????????????????????????????')
        }

    }

    _onBarCodeRead = (e) => {
        var that = this;
        // this._stopScan()
        this._stopScan()
        Alert.alert(e.nativeEvent.data.type, e.nativeEvent.data.code, [
            { text: 'OK', onPress: () => this._startScan() },
        ])
        // let { navigation } = this.props;
        // var fromData = {};
        // fromData['order_no'] = e.nativeEvent.data.code;
        // getScanCode(fromData, res => {
        // // console.log(res)
        //     Toast.show(res.msg)
        //     // that.setState({
        //     //     viewAppear: 0
        //     // })
        // })
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
        // console.log(res)
            if (res.code == 1) {
                var v_url = '';
                if (Platform.OS === 'android') {
                    v_url = res.data.url;

                } else if (Platform.OS == "ios") {
                    v_url = res.data.url;
                }
                // ????????????
                var currentVersion = res.data.version;
            // console.log('0111111111')
            // console.log(that.state.version)
            // console.log(currentVersion)
                if (that.state.version == '') { return }
                if (that.state.version != currentVersion) {
                    Alert.alert('0111111111')
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
        that.setState({
            update: 0,
        })
        Linking.openURL(that.state.v_url)
    }

    /**
     * ?????????????????????
     * @param lon
     * @param lat
     * @param name
     * @param targetAppName browser-?????????????????? gaode-??????APP??? baidu-??????APP???????????????????????????APP???????????????????????????
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
            console.warn('??????????????????');
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

    getCity(longitude, latitude) {
        var that = this;
        // console.log('getCity-------')
        // var url = `https://restapi.amap.com/v3/assistant/coordinate/convert?locations=${longitude},${latitude}&coordsys=gps&output=json&key=7836bbd1b87fc0130d6922edddea24e8`;
        // console.log(url)
        fetch(`https://restapi.amap.com/v3/assistant/coordinate/convert?locations=${longitude},${latitude}&coordsys=gps&output=json&key=7836bbd1b87fc0130d6922edddea24e8`, { method: "GET" })
            .then(response => response.json())
            .then((jsonDa) => {
                // console.log('getCity-------2')
                // console.log(jsonDa)
                // console.log(jsonDa.locations)
                let newVar = jsonDa.locations.split(',')
                that.setState({
                    longitude: newVar[0],//??????
                    latitude: newVar[1],//??????
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
        //??????????????????
        fetch('https://restapi.amap.com/v3/geocode/regeo?key=7836bbd1b87fc0130d6922edddea24e8&location=' + longitude + ',' + latitude + '&radius=1000&extensions=all&batch=false&roadlevel=0', {
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
                        // Toast.show('????????????')
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
        //??????????????????
    }


    async requestCameraPermission() {
        var that = this;
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: '??????',
                message: '????????????????????????',
            },
        ).then((res) => {
        // console.log(res);
            try {
                // Alert.alert('11111')
                Geolocation.getCurrentPosition(location => {
                    // Alert.alert('11111')
                // console.log('locations----------------------?????????')
                    // console.log(location)

                    that.setState({
                        longitude: location.coords.longitude,//??????
                        latitude: location.coords.latitude,//??????
                    }, () => {
                        // Toast.show('????????????')
                        // that.getCity(113.056031, 23.681763);
                        that.getCity(location.coords.longitude, location.coords.latitude)
                        // setTimeout(() => {
                        //     that.getCity(location.coords.longitude, location.coords.latitude)
                        // }, 500);
                    });
                }, error => {
                    // Alert.alert('11111')
                // console.log(error)
                })

                // Geolocation.watchPosition(
                //     (position) => {
                //         // Toast.show('????????????')
                //         let longitude = JSON.stringify(position.coords.longitude);//??????
                //         let latitude = JSON.stringify(position.coords.latitude);//??????
                //         that.getCity(longitude, latitude)
                //     },
                //     (error) => {
                //         // Toast.show('??????????????????')
                //         // Toast.show(error)
                //         // console.log(error);
                //     },
                //     { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 }
                // );

            } catch (err) {
                // Alert.alert('22222')
            // console.log(err);
            }
        });
        // RNLocation.requestPermission({
        //     ios: "whenInUse",
        //     android: {
        //         detail: "coarse"
        //     }
        // }).then(granted => {
        //     if (granted) {
        //         // console.log('locations----------------------' + granted)
        //         try {
        //             Geolocation.getCurrentPosition(location => {
        //                 // console.log('locations----------------------?????????')
        //                 // console.log(location)

        //                 that.setState({
        //                     longitude: location.coords.longitude,//??????
        //                     latitude: location.coords.latitude,//??????
        //                 }, that.getCity(location.coords.longitude, location.coords.latitude));
        //             }, error => {
        //             // console.log(error)
        //             })
        //         } catch (err) {
        //             // Alert.alert('222222223')
        //         // console.log('err/////////////3');
        //         // console.log(err);
        //         }

        //     }
        // })

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


            // ????????????
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
        this.requestCameraPermission();
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
                title: '??????',
                message: '?????????????????????',
            },
        ).then((res) => {
            that.setState({
                camera: res
            })
        // console.log(res);
        });
    }

    // ??????
    _contentViewScroll(e) {
        var that = this;
        var offsetY = e.nativeEvent.contentOffset.y; //????????????
        var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize??????
        var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView??????
        if (offsetY + oriageScrollHeight >= contentSizeHeight) {
            // Console.log('???????????????????????????')
            this.setState({
                page: this.state.page + 1,
            }, this.getGoodsListsPage(this.state.page + 1))

        }
    }

    // ????????????
    getIndexGetPrices() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getIndexGetPrice(fromData, res => {
        // console.log('????????????----' + res)
        // console.log(res)
            if (res.code == 1) {
                this.setState({
                    priceData: res.data,
                })
            }
        })
    }

    // ??????
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

    // ????????????
    getGoodsLists() {
        // console.log('page----------------')
        // console.log(this.state.page)
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        fromData['page'] = this.state.page;
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

    // ??????
    search() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        fromData['page'] = 1;
        fromData['search'] = this.state.searchValue;
        getGoodsList(fromData, res => {
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

    // ?????????
    getBanner() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getbanner(fromData, res => {
            // console.log(res)
            if (res.code == 1) {
                // Toast.show('????????????')
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
            } else {
                Toast.show('???????????????');
                navigation.navigate("login", {
                    id: that.state.id,
                    refresh: function () {
                        that.init();
                    }
                });
            }
        })
    }

    // ????????????
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

    // ??????
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

    // ????????????
    navClick(index, type) {
        // Toast.show('?????????')
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