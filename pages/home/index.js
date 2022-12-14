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
// import ImageAutoHeight from './ImageAutoHeight'

const EXPROTHEIGHT = 20;
const window = Dimensions.get('window');
// import App from '../../App'


import ToastExample from './ToastExample';
import loadingImage from '../../img/lo.gif';
import Geolocation from 'react-native-geolocation-service';
import Barcode from 'react-native-smart-barcode';
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
                            <Text style={{ textAlign: 'center' }}>??????????????????{this.state.currentVersion}??????????????????{this.state.version}??????????????????</Text>
                        </View>
                        <View style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                            {/* <Text style={{ textAlign: 'center' }}>?????????8888</Text> */}
                            {
                                this.state.updateMsg.map((item, index) => {
                                    return (
                                        <Text key="index" style={{ textAlign: 'center' }}>{index + 1}???{item}</Text>
                                    )
                                })
                            }
                        </View>
                        <View style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                            <Text style={{ textAlign: 'center' }}>???????????????{this.state.v_url}</Text>
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
                            if (this.state.agree == 0) {
                                Toast.show('?????????????????????????????????')
                            } else {
                                this.setState({ ifshowmodal: 0 })
                                navigation.navigate('invite')
                            }
                        }}
                        style={[css.linearBtn, { position: 'absolute', bottom: 10, marginTop: 58, marginLeft: 15, width: '100%', flex: 1 }]}
                    >
                        {/* <LinearGradient colors={['#F6BF0A', '#F6BF0A']} style={[common.linearBtn, {}]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>??????</Text></LinearGradient> */}
                        {
                            this.state.agree == 1 ?
                                <LinearGradient colors={['#F6BF0A', '#F6BF0A']} style={[common.linearBtn, {}]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>??????</Text></LinearGradient> :
                                <LinearGradient colors={['#CAC8C6', '#CAC8C6']} style={[common.linearBtn, {}]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>??????</Text></LinearGradient>
                        }
                    </TouchableOpacity>
                </View>
            </View> : null;

        let privacy = 1 != 1 ?
            <View style={{ position: 'absolute', top: 0, left: 0, width: width, height: height }}>
                <TouchableOpacity onPress={() => { this.setState({ ifshowmodal: 0 }) }} style={common.mask}></TouchableOpacity>
                <View style={[common.askModal, { paddingLeft: 15, paddingRight: 15, paddingBottom: 20, paddingTop: 0, top: height / 4 }]}>
                    <Text style={[common.askTitle, { paddingTop: 22, marginBottom: 20, fontSize: 18 }]}>??????????????????</Text>
                    <ScrollView style={{ maxHeight: height / 2 }}>
                        <View style={common.alignItemsCenter}>
                            <Text style={{ fontSize: 15 }}>??????????????????????????????????????????????????????????????????????????????APP????????????????????????????????????
                                <TouchableOpacity onPress={() => { Linking.openURL('https://hmmshop888.com/index.php?s=/index/app/treaty') }}><Text style={{ color: '#F3A316' }}>??????????????????</Text></TouchableOpacity>???
                                <TouchableOpacity onPress={() => { Linking.openURL('https://hmmshop888.com/index.php?s=/index/app/policy') }}><Text style={{ color: '#F3A316' }}>??????????????????</Text></TouchableOpacity>
                                ????????????????????????????????????????????????????????????????????????????????????</Text>
                        </View>
                    </ScrollView>
                    <TouchableOpacity
                        onPress={() => { }}
                        style={[css.linearBtn, { position: 'relative', bottom: 10, marginTop: 58, marginLeft: '5%', width: '90%', flex: 1 }]}
                    >
                        <LinearGradient colors={['#F6BF0A', '#F6BF0A']} style={[common.linearBtn, {}]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>???????????????</Text></LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { }}
                        style={[css.linearBtn, { position: 'relative', bottom: 10, marginTop: 8, marginLeft: '5%', width: '90%', flex: 1 }]}
                    >
                        <LinearGradient colors={['#ffffff', '#ffffff']} style={[common.linearBtn, {}]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={[common.linearBtnText, { color: '#333' }]}>?????????</Text></LinearGradient>
                    </TouchableOpacity>
                </View>
            </View> : null;
        // console.log('this.state.newsList--------')
        // console.log(this.state.newsList)
        let notice = this.state.ifNotice == true ?
            <View style={{ position: 'absolute', top: 0, left: 0, width: width, height: height }}>
                <TouchableOpacity onPress={() => { this.setState({ ifNotice: 0 }) }} style={common.mask}></TouchableOpacity>
                <View style={[common.askModal, { paddingLeft: 15, paddingRight: 15, paddingBottom: 60, paddingTop: 20, top: height / 3.5 }]}>
                    <Text style={[common.askTitle, { fontSize: 16 }]}>{this.state.newsList[0].title}</Text>
                    <ScrollView style={{ maxHeight: height / 2.5, marginTop: 30, marginBottom: 20 }}>
                        <HTMLView
                            style={{ width: width - 75 }}
                            stylesheet={style}
                            value={this.escape2Html(this.state.newsList[0].content)}
                        />
                    </ScrollView>
                    <TouchableOpacity
                        onPress={() => { this.setState({ ifNotice: 0 }) }}
                        style={[css.linearBtn, { position: 'absolute', bottom: 10, marginTop: 58, marginLeft: 15, width: '100%', flex: 1 }]}
                    >
                        <LinearGradient colors={['#F6BF0A', '#F6BF0A']} style={[common.linearBtn, {}]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>??????</Text></LinearGradient>
                    </TouchableOpacity>
                </View>
            </View> : null;
        return (
            <View style={[common.whiteBg, common.padBottom, { flex: 1, width: width, height: height }]}>
                {/* {privacy} */}
                {modal}
                {scanWindow}
                {ifupdate}
                {notice}
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
                                {/* <TouchableOpacity onPress={this.refresh.bind(this, 1)} style={common.alignItemsCenter}>
                                    <Image style={css.addressIcon} source={require('../../image/dingwei.png')} />
                                    <Text style={css.addressText}>{this.state.position}</Text>
                                    <Image style={[css.arrowIcon, { width: 16, height: 16 }]} source={require('../../image/refresh2.png')} />
                                </TouchableOpacity> */}
                                <Text style={{ opacity: 0 }}>?????????</Text>
                                <Text style={{ color: '#fff', fontSize: 16, marginLeft: -21 }}>?????????</Text>
                                <TouchableOpacity onPress={() => { navigation.navigate('scan') }}><Image style={css.newsIcon} source={require('../../image/scan.png')} /></TouchableOpacity>
                            </View>

                            <View style={[common.alignItemsCenter, css.searchWrap]}>
                                <View style={common.alignItemsCenter}>
                                    <Image style={css.searchIcon} source={require('../../image/search.png')} />
                                    <TextInput
                                        onChangeText={(value) => this.setState({ searchValue: value }, () => { this.searchClear() })}
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
                                        <TouchableOpacity onPress={() => { navigation.navigate('categoryOld', { category_id: item.category_id }); }} style={css.cat} horizontal={true} contentContainerStyle={{ alignItems: 'center' }} showsHorizontalScrollIndicator={false} key={index}>
                                            <Image style={css.catIcon} source={{ uri: item.file_path }} /><Text style={css.catText}>{item.name}</Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>

                            <View style={css.grayLine}></View>

                            <ScrollView style={css.nav} horizontal={true} contentContainerStyle={{ alignItems: 'center', justifyContent: 'space-around' }} showsHorizontalScrollIndicator={false}>

                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minWidth: width,}}>
                                    {this.state.navList.map((item, index) => {
                                        return (
                                            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}} key={index}>
                                                {/* <TouchableOpacity onPress={() => {
                                                        // this.setState({navIndex:index});
                                                        this.navClick(index, item.type)
                                                    }} style={[css.navBlock, { width: 'auto'}]}><Text style={[css.bigText, this.state.navIndex == index ? css.bigTextActive : null]}>{item.name}</Text>
                                                    <Text style={[css.smallText, this.state.navIndex == index ? css.smallTextActive : null]}>{item.tag}</Text>
                                                </TouchableOpacity> */}
                                                {
                                                    index==0?
                                                    <TouchableOpacity onPress={() => {
                                                        // this.setState({navIndex:index});
                                                        this.navClick(index, item.type)
                                                    }} style={[css.navBlock, { width: 'auto'}]} key={index}><Text style={[css.bigText, this.state.navIndex == index ? css.bigTextActive : null]}>{item.name}</Text>
                                                    <Text style={[css.smallText, this.state.navIndex == index ? css.smallTextActive : null]}>{item.tag}</Text>
                                                    </TouchableOpacity>:null
                                                }
                                            </View>
                                        );
                                    })}
                                </View>
                            </ScrollView>

                            {/* ???????????? ??????????????? */}
                            {this.state.navIndex == 0 ?
                                <View style={[css.goodsWrap, { marginTop: 0 }]}>
                                    {
                                        this.state.goodsList.map((item, index) => {
                                            return (
                                                <TouchableOpacity onPress={() => { navigation.navigate('goodsdetails', { id: item.goods_id }) }} style={css.goodsBlock} key={item.goods_id}>
                                                    <Image onError={(e)=>{
                                                        console.log('wwwwwwwwww-------------??????')
                                                        console.log(item.goods_image)
                                                        console.log(e)
                                                    }} 
                                                    onLoadEnd={()=>{
                                                        this.getImageWidth.bind(this,item.goods_image)
                                                    }} style={[css.goodsImage,{width:159,height:159,}]} 
                                                    source={{ uri: item.goods_image, cache: "force-cache" }} 
                                                    // source={{ uri: item.goods_image, cache: "force-cache" }} 
                                                    // source={{ uri: item.goods_image, cache: "force-cache" }} 
                                                    resizeMode='cover' resizeMethod='resize'/>
                                                    <Text style={css.goodsName}>{item.goods_name}</Text>
                                                    <View style={common.alignItemsCenter}>
                                                        <Text style={css.goodsSku}>{item.discount}</Text>
                                                    </View>

                                                    <View style={common.alignItemsCenter}>
                                                        <Text style={css.goodsSku}>???????????????{item.rebate}?????????</Text>
                                                    </View>
                                                    <View>
                                                        <View style={common.alignItemsCenter}>
                                                            <Text style={css.sPrice}>???</Text>
                                                            <Text style={css.bPrice}>{item.goods_sku.goods_price}</Text>
                                                        </View>
                                                        {
                                                            item.goods_sku.goods_coupon != 0 ? <Text style={css.sPrice}>????????????{item.goods_sku.goods_coupon}???</Text> : null
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
                                            <View style={[common.alignItemsCenter, css.store]} key={item.merchant_id}>
                                                <TouchableOpacity onPress={() => { navigation.navigate('shop', { id: item.merchant_id }) }}><Image style={css.storeLogo} source={{ uri: item.logo.file_path }} /></TouchableOpacity>
                                                <View style={common.columnStart}>
                                                    <TouchableOpacity onPress={() => { navigation.navigate('shop', { id: item.merchant_id }) }}><Text style={css.storeName}>{item.merchant_name}</Text></TouchableOpacity>
                                                    <TouchableOpacity onPress={() => { return Linking.openURL('tel:' + item.phone); }} style={[common.alignItemsCenter, { marginTop: 15, }]}><Image style={css.storeIcon} source={require('../../image/call.png')} /><Text style={{ color: '#808080' }}>{item.phone}</Text></TouchableOpacity>
                                                    <TouchableOpacity onPress={this.turn2MapApp.bind(this, item.longitude, item.latitude, 'gaode', item.province.name + item.city.name + item.region.name + item.address)} style={[common.alignItemsB, { marginTop: 10 }]}>
                                                        {/* <TouchableOpacity style={[common.alignItemsB, { marginTop: 10 }]}> */}
                                                        <View style={common.alignItemsCenter}><Image style={css.storeIcon} source={require('../../image/daohang.jpg')} />
                                                            <Text style={{ color: '#808080', width: width / 2 }}>{item.province.name}{item.city.name}{item.region.name}{item.address}</Text>
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
                                            <View style={[common.empty, { paddingBottom: 50, marginTop: 30, marginLeft: -10 }]}>
                                                <Image style={common.emptyIcon} source={require('../../image/empty2.png')} />
                                                <Text style={common.emptyH1}>????????????</Text>
                                            </View> : null
                                    }
                                </View>
                                : null}


                        </View>
                        {/* <Text>{this.state.isLoading?'true':this.state.isLoading}</Text> */}
                        {this.state.isLoading && this.state.navIndex == 0 ? <Text style={{ textAlign: 'center' }}>?????????????????????~</Text> : null}
                        {this.state.isLoading == 0 && this.state.navIndex == 0 ? <Text style={{ textAlign: 'center' }}>????????????~</Text> : null}
                    </ScrollView > : null}
                <View style={common.navBar}>
                    <TouchableOpacity onPress={() => { navigation.navigate('home') }} style={common.navBarBlock}>
                        <Image style={common.navBarIcon} source={require('../../image/tabbar-1-s.png')} />
                        <Text style={[common.navBarText, { color: '#F3A316' }]}>??????</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('category') }} style={common.navBarBlock}>
                        <Image style={common.navBarIcon} source={require('../../image/tabbar-2.png')} />
                        <Text style={common.navBarText}>????????????</Text>
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
            updateMsg: [],
            update: 0,
            priceData: '',
            viewAppear: 0,
            type: '',
            camera: '',
            ruleData: '',
            agree: 0,
            isLoading: false,
            ifNotice: false,
            newsList: [],
            style: {},
            imgWidth:0,
            imgHeight:0,
        }
        this.componentWillUnmount = this.componentWillUnmount.bind(this)
        this.showScan = this.showScan.bind(this);
        // WeChat.registerApp('com.firefly.app');
        // WeChat.registerApp('wx6a41d8f51c0c5ff8');
    }
    componentWillUnmount() {

    }

    //????????????
    async componentDidMount() {
        // ???????????????

        // WeChat.isWXAppInstalled()
        //     .then((isInstalled) => {
        //         if (isInstalled) {
        //             // WeChat.launchMini()
        //             let weixinMiniProgramShareInfo = {
        //                 userName: 'gh_5c2fd1ae192d',//???????????????ID
        //                 appId: "com.firefly.app",//????????????id
        //                 path: "pages/index/index"//?????????????????????path
        //             }
        //             WeChat.launchMini(weixinMiniProgramShareInfo).then((res) => {
        //             // console.log('????????????', res)
        //             }).catch((clickErr) => {
        //             // console.log('????????????', clickErr)
        //             })
        //         } else {
        //             Alert.alert('???????????????');
        //         }
        //     });

        // Linking.canOpenURL('weixin://').then(supported => {
        //     if (supported) {
        //     // console.log('supported---------')
        //     // console.log(WeChat)
        //         // WeChat.launchMini({
        //         //     userName: "gh_5c2fd1ae192d", // ?????????????????????username
        //         //     miniProgramType: 0, // ????????????????????????. 0-????????? 1-????????? 2-?????????
        //         //     path: 'pages/index/index' // ???????????????????????????????????????????????????????????????????????????
        //         // });
        //         let miniShareInfo = {
        //             userName: 'gh_5c2fd1ae192d', // ???????????????id 
        //             // appId: 'com.firefly.app', // ????????????id
        //             appId: 'wx6a41d8f51c0c5ff8', // ????????????id
        //             path: 'pages/index/index', // ?????????????????????path
        //             type: 0 // 0???????????? 2???????????? 
        //         };
        //     // console.log(miniShareInfo)
        //         WeChat.launchMini(miniShareInfo)
        //             .then(res => {
        //             // console.log('????????????', res);
        //             })
        //             .catch(clickErr => {
        //             // console.log('????????????', clickErr);
        //             });
        //     } else {
        //         // Alert.alert('????????????', '??????????????????');
        //         Toast.show('????????????', '??????????????????')
        //     }
        // })
        // WeChat.isWXAppInstalled().then(isInstalled => {
        //     if (isInstalled) {
        //       let miniShareInfo = {
        //         userName:'gh_5c2fd1ae192d', // ???????????????id 
        //         appId: 'com.firefly.app', // ????????????id
        //         path: 'pages/index/index', // ?????????????????????path
        //         type: 0 // 0???????????? 2???????????? 
        //       };
        //       WeChat.launchMini(miniShareInfo)
        //         .then(res => {
        //       // console.log('????????????', res);
        //         })
        //         .catch(clickErr => {
        //       // console.log('????????????', clickErr);
        //         });
        //     } else {
        //       Alert.alert('???????????????');
        //     }
        //   });

        // https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
        // console.log('???????????????')
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
        //         //         //?????????????????????
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
        // this._listeners = [
        //     this.props.navigator.navigationContext.addListener('didfocus', viewAppearCallBack)
        // ]



    }

    getImageWidth(imageUri) {
        var that = this;
        // console.log(imageUri)
        let screenWidth = Dimensions.get('window').width;
        let screenHeight = Dimensions.get('window').height;
        Image.getSize(imageUri, (width,height) => {
            // console.log('dasdasda----------123')
            // console.log(width)
            // console.log(height)
            that.setState({
                imgWidth:width,
                imgHeight:height,
            })
            //width ??????????????? Math.floor????????????
            //height ???????????????
            // let widthss = width/screenWidth;
            // return widthss;
        })
    }

    //??????????????????????????????onLayout??????????????????????????????????????????????????????
    //???????????????????????????????????????????????????????????????????????????????????????
    onImageLayout(event) {
        Image.getSize(imageUri, (width, height) => {
            //width ??????????????? Math.floor????????????
            //height ???????????????
            let proportion = width / screenWidth;
            let myHeight = height / screenHeight;
        })
        // let layout = event.nativeEvent.layout;
        // if (layout.width <= this.props.originalWidth)
        //     return;
        // if (layout.height <= this.props.originalHeight)
        //     return;

        // let originalAspectRatio = this.props.originalWidth / this.props.originalHeight;
        // let currentAspectRatio = layout.width / layout.height;

        // if (originalAspectRatio === currentAspectRatio) return;

        // if (originalAspectRatio > currentAspectRatio) {
        //     let newHeight = layout.width / originalAspectRatio;
        //     this.setState({
        //         style: {
        //             height: newHeight,
        //         }
        //     });
        //     return;
        // }
        // let newWidth = layout.height * originalAspectRatio;
        // this.setState({
        //     style: {
        //         width: newWidth,
        //     }
        // });
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
            // console.log('??????----------')
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
        fetch('https://restapi.amap.com/v3/geocode/regeo?key=3be5718d299c29e72fced80f03514b90&location=' + longitude + ',' + latitude + '&radius=1000&extensions=all&batch=false&roadlevel=0', {
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


            if(this.state.navIndex!=0){
                // ????????????
                var fromData = {};
                fromData['page'] = this.state.page;
                fromData['type'] = this.state.type;
                fromData['longitude'] = this.state.longitude;
                fromData['latitude'] = this.state.latitude;
                getMerchantLists(fromData, res => {
                    // console.log(res)
                    if (res.code == 1) {
                        if (res.data.list.data.length > 0) {
                            this.setState({
                                storeList: res.data.list.data,
                            })
                        }
                    }
                })
            }
        }

    }

    init() {
        this.getBanner();
        this.getNews();
        this.getIndexNavs();
        this.getGoodsLists();
        this.getCategorys();
        // this.requestCameraPermission2();//?????????????????????
        this.version();
        this.getIndexGetPrices();
        this.getRule()

        // this.requestCameraPermission();//??????????????????
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
        // Toast.show('?????????~')
        var that = this;
        var offsetY = e.nativeEvent.contentOffset.y; //????????????
        var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize??????
        var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView??????
        // console.log(offsetY + oriageScrollHeight)
        // console.log(contentSizeHeight)
        if (parseInt(offsetY + oriageScrollHeight) >= parseInt(contentSizeHeight)) {
            // console.log('????????????')
            that.setState({
                page: that.state.page + 1,
                isLoading: true,
            }, () => {
                // that.getGoodsLists()
                if (that.state.navIndex != 0) {
                    that.getMerchantList();
                }else{
                    that.getGoodsLists();
                }
            })

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
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        // fromData['listRows'] = 100;
        fromData['page'] = this.state.page;
        fromData['search'] = this.state.searchValue;
        getGoodsList(fromData, res => {
            // console.log('????????????')
            // console.log(fromData)
            // console.log(res)
            // console.log('????????????end')
            if (res.code == 1) {
                //     // if(this.state.page == res)
                if (res.data.list.data.length > 0) {
                    if (this.state.goodsList.length == 0) {
                        this.setState({
                            isLoading: true,
                            goodsList: res.data.list.data
                        })
                    } else {
                        this.setState({
                            isLoading: true,
                            goodsList: this.state.goodsList.concat(res.data.list.data)
                        })
                    }

                    return;
                }
                this.setState({
                    isLoading: 0,
                })

            }
        })
    }


    // getGoodsListsPage(page) {
    //     // console.log('page----------------')
    //     // console.log(page)
    //     var that = this;
    //     let { navigation } = this.props;
    //     var fromData = {};
    //     fromData['page'] = page;
    //     fromData['search'] = this.state.searchValue;
    //     getGoodsList(fromData, res => {
    //         // console.log(res)
    //         if (res.code == 1) {
    //             if (res.data.list.data.length > 0) {
    //                 this.setState({
    //                     goodsList: this.state.goodsList.concat(res.data.list.data)
    //                 })
    //             }
    //         }
    //     })
    // }

    // ??????
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

    // ??????
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

    // ?????????
    getBanner() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        fromData['version'] = this.state.version;
        getbanner(fromData, res => {
            console.log('res----------999')
            console.log(res)
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
            } else if (res.code == -1) {
                Toast.show('???????????????');
                navigation.navigate("login", {
                    id: 0,
                    refresh: function () {
                        that.init();
                    }
                });
            } else {

            }
        })
    }

    // ????????????
    getNews() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getnews(fromData, res => {
            // console.log('res-----------getNews')
            // console.log(res)
            if (res.code == 1) {
                if (res.data.list.data.length > 0) {
                    this.setState({
                        newsList: res.data.list.data,
                        ifNotice: true,
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
            // console.log('res------------11')
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
            page:1,
            goodsList:[],
        },()=>{
            if (index != 0) {
                this.getMerchantList();
            }else{
                this.getGoodsLists();
            }
        })

        
    }

    // ??????????????????
    getMerchantList(){
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        // console.log(this.state.longitude)
        fromData['page'] = this.state.page;
        // fromData['type'] = this.state.type;
        fromData['longitude'] = this.state.longitude;
        fromData['latitude'] = this.state.latitude;
        getMerchantLists(fromData, res => {
            console.log('sssss---------')
            console.log(fromData)
            console.log(res)
            if (res.code == 1) {
                if (res.data.list.data.length > 0) {
                    this.setState({
                        isLoading: true,
                        storeList: this.state.storeList.concat(res.data.list.data),
                    })
                    return;
                }
                this.setState({
                    isLoading: 0,
                })
            }
        })
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