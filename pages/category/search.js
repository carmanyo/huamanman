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
    Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Utils from '../../utils/Util';
import Swiper from 'react-native-swiper';
import { MarqueeHorizontal, MarqueeVertical } from 'react-native-marquee-ab';
import DeviceInfo from 'react-native-device-info';

import { getpoolTotal, getnews, getbanner, getvideoNum, getCompleteAdv, getVersions, getnoticepopup, getGoodsList } from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import common from '../../css/common.js'
import css from '../../css/index.js'
import catCss from '../../css/category.js'

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
            page: 1,
            inputValue: '',
            goodsList: [],
            searchList: '',
            searchArr: [],
        }
        this.componentWillUnmount = this.componentWillUnmount.bind(this)
    }
    //获取权限
    componentDidMount() {
        this.removeSearchList();
        // this.goSearch()
        // this.getStorage();
    }

    getStorage() {
        var that = this;
        AsyncStorage.getItem('searchList').then((value) => {
            // console.log('缓存数据')
        // console.log(value)
            that.setState({
                searchList: value == null ? '' : value,
            })

            var arr = [];
            // var str = that.state.searchList.substring(0, that.state.searchList.lastIndexOf(','));
            var str = that.state.searchList;
            if (str != '') {
                // console.log('有缓存')
                var res = str.split(',')
                // console.log(res)
                for (var i = 0; i < res.length; i++) {
                    arr.push(res[i])
                }
                // console.log(res)
                // console.log(arr)
                that.setState({
                    searchArr: arr
                })

            }

        });
    }

    searchThis(str) {
        this.setState({
            page: 1,
            goodsList: [],
            inputValue: str
        }, this.getGoodsLists())
    }

    search() {
        var that = this;
        that.goSearch();
        // var str;
        // var arr;
        // AsyncStorage.getItem('searchList').then((value) => {
        //     // console.log('缓存数据')
        //     // console.log(value)
        //     if (value == null) { 
        //         return that.goSearch(); 
        //     }else{
        //         that.setState({
        //             searchList: value,
        //         }, that.goSearch())
        //     }

        // });

    }

    goSearch() {
        var that = this;
        Keyboard.dismiss();
        that.setState({
            page: 1,
            goodsList: [],
        }, that.getGoodsLists())
        // var arr = [];
        // var inputValue = that.state.inputValue
        // var searchList = that.state.searchList;
        // console.log(searchList)
        // if (searchList == '') {
        // // console.log('没')
        //     arr.push(inputValue)
        //     that.setState({
        //         page: 1,
        //         goodsList: [],
        //         searchArr: arr,
        //     }, this.getGoodsLists())
        //     AsyncStorage.setItem('searchList', JSON.stringify(this.state.inputValue), function (error) {console.log(error)})
        //     // AsyncStorage.setItem('searchList', that.state.inputValue)
        // } else {
        // // console.log('有缓存')
        //     var str = this.state.searchList;
        // // console.log(str)
        //     var res = str.split(',')
        //     // arr.push(inputValue)
        //     for (var i = 0; i < res.length; i++) {
        //         if (this.state.inputValue != res[i]) {
        //             arr.push(res[i])
        //         }
        //     }
        //     that.setState({
        //         page: 1,
        //         goodsList: [],
        //         searchArr: arr,
        //     }, this.getGoodsLists())
        //     AsyncStorage.setItem('searchList', JSON.stringify(that.state.inputValue+','+str), function (error) {console.log(error)})
        //     // AsyncStorage.setItem('searchList', that.state.inputValue+','+str)
        // }
    }

    // 商品列表
    getGoodsLists() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        fromData['page'] = this.state.page;
        fromData['search'] = this.state.inputValue;
    // console.log(fromData)
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
                page: that.state.page + 1,
            }, ()=>{
                that.getGoodsLists()
            })

        }
    }
    removeSearchList() {
        AsyncStorage.removeItem('searchList')
        this.setState({
            searchList: '',
            searchArr: [],
        })
    }
    render() {
        let { navigation } = this.props;
        // console.log(this.state.searchArr)
        // console.log(this.state.searchArr.length)
        return (
            <View style={[common.whiteBg, { flex: 1 }]}>
                {/* 头部 */}
                <View style={[common.headerNoBorder]}>
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>搜索</Text></View>
                </View>
                <View style={[common.ScrollViewB, common.hasHeader]}>
                    {/* 搜索 */}
                    <View style={[common.alignItemsCenter, { overflow: 'hidden' }]}>
                        <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                            <Image style={common.returnImage} source={require('../../image/return.png')} />
                        </TouchableOpacity >
                        <View style={[common.alignItemsCenter, css.searchWrap, catCss.searchWrap]}>
                            <View style={common.alignItemsCenter}>
                                <Image style={css.searchIcon} source={require('../../image/search.png')} />
                                <TextInput
                                    onChangeText={(value) => this.setState({ inputValue: value })}
                                    value={this.state.inputValue} style={[css.textInput, { width: '63%', }]} placeholder='请输入商品名称'
                                    autoFocus={true}
                                />
                            </View>
                            <TouchableOpacity onPress={this.search.bind(this)} style={css.searchBtn}>
                                <Text style={[css.searchText]}>搜索</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={catCss.grayLine}></View>
                </View>
                <ScrollView onMomentumScrollEnd={this._contentViewScroll.bind(this)} style={[common.ScrollView, { marginTop: height / 1000, marginLeft: 15, marginRight: 15, maxWidth: width - 30 }]} showsVerticalScrollIndicator={false}>
                    {
                        this.state.searchArr.length != 0 ?
                            <View>
                                <View style={[common.alignItemsB, { width: width - 30 }]}><Text style={catCss.title}>历史搜索</Text>
                                    <TouchableOpacity onPress={this.removeSearchList.bind(this)}><Image style={catCss.deleteIcon} source={require('../../image/delete.png')} /></TouchableOpacity>
                                </View>
                                <View style={catCss.history}>
                                    {
                                        this.state.searchArr.map((item, index) => {
                                            return (
                                                <TouchableOpacity onPress={this.searchThis.bind(this, item)} key={index}><Text style={catCss.historyText}>{item}</Text></TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                            : null
                    }



                    {/* 空页面 */}
                    {/* <View style={common.empty}>
                        <Image style={common.emptyIcon} source={require('../../image/empty.png')} />
                        <Text style={common.emptyH1}>暂无搜索物品</Text>
                        <Text style={common.emptyP}>请重新进行物品搜索</Text>
                    </View> */}
                    {
                        this.state.goodsList.length == 0 ?
                            <View style={[common.empty, { marginLeft: -15 }]}>
                                <Image style={common.emptyIcon} source={require('../../image/empty.png')} />
                                <Text style={common.emptyH1}>暂无商品</Text>
                                <Text style={common.emptyP}>请重新进行商品搜索</Text>
                            </View>
                            :
                            <View style={[css.goodsWrap, { marginTop: 0, width: width - 24 }]}>
                                {
                                    this.state.goodsList.map((item, index) => {
                                        return (
                                            <TouchableOpacity onPress={() => { navigation.navigate('goodsdetails', { id: item.goods_id }) }} style={[catCss.goodsBlock, { padding: 6 }]} key={index}>
                                                <Image style={[catCss.goodsImage, { height: 159 }]} source={{ uri: item.goods_image }} />
                                                <Text style={css.goodsName}>{item.goods_name}</Text>
                                                {/* <Text style={catCss.goodsSku}>满200减10</Text>+ */}
                                                <View style={common.alignItemsCenter}>
                                                    <Text style={css.goodsSku}>{item.discount}</Text>
                                                    {/* {parseInt(item.goods_sku.goods_coupon) != 0 ? <Text style={css.goodsSku}>满{parseInt(item.goods_sku.goods_price)}减{parseInt(item.goods_sku.goods_coupon)}</Text> : null} */}
                                                </View>
                                                <View style={common.alignItemsCenter}>
                                                    <Text style={css.goodsSku}>立送≈价值{item.rebate}元积分</Text>
                                                </View>
                                                {/* <View style={css.goodsPriceWrap}>
                                                    <Text style={css.sPrice}>￥</Text>
                                                    <Text style={css.bPrice}>{(Number(item.goods_sku.goods_price) - Number(item.goods_sku.goods_coupon)).toFixed(2)}</Text>
                                                    <Text style={css.sPrice}>劵后价</Text>
                                                </View> */}
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
                                                <Image style={catCss.dotIcon} source={require('../../image/dot.png')} />
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                    }

                    {/* <View style={css.goodsWrap}>
                        <View style={css.goodsBlock}>
                            <Image style={css.goodsImage} source={require('../../image/product.png')} />
                            <Text style={css.goodsName} numberOfLines={2}>日系连衣裙少女夏装2020年新款背带裙两件套 白色两件套两件套两件套两件套两件套</Text>
                            <Text style={css.goodsSku}>满200减10</Text>
                            <View style={css.goodsPriceWrap}>
                                <Text style={css.sPrice}>￥</Text>
                                <Text style={css.bPrice}>3000</Text>
                                <Text style={css.sPrice}>劵后价</Text>
                            </View>
                            <Image style={css.dotIcon} source={require('../../image/dot.png')} />
                        </View>
                        <View style={css.goodsBlock}>
                            <Image style={css.goodsImage} source={require('../../image/product.png')} />
                            <Text style={css.goodsName} numberOfLines={2}>日系连衣裙少女夏装2020年新款背带裙两件套 白色两件套两件套两件套两件套两件套</Text>
                            <Text style={css.goodsSku}>满200减10</Text>
                            <View style={css.goodsPriceWrap}>
                                <Text style={css.sPrice}>￥</Text>
                                <Text style={css.bPrice}>3000</Text>
                                <Text style={css.sPrice}>劵后价</Text>
                            </View>
                            <Image style={css.dotIcon} source={require('../../image/dot.png')} />
                        </View>
                        <View style={css.goodsBlock}>
                            <Image style={css.goodsImage} source={require('../../image/product.png')} />
                            <Text style={css.goodsName} numberOfLines={2}>日系连衣裙少女夏装2020年新款背带裙两件套 白色两件套两件套两件套两件套两件套</Text>
                            <Text style={css.goodsSku}>满200减10</Text>
                            <View style={css.goodsPriceWrap}>
                                <Text style={css.sPrice}>￥</Text>
                                <Text style={css.bPrice}>3000</Text>
                                <Text style={css.sPrice}>劵后价</Text>
                            </View>
                            <Image style={css.dotIcon} source={require('../../image/dot.png')} />
                        </View>
                        <View style={css.goodsBlock}>
                            <Image style={css.goodsImage} source={require('../../image/product.png')} />
                            <Text style={css.goodsName} numberOfLines={2}>日系连衣裙少女夏装2020年新款背带裙两件套 白色两件套两件套两件套两件套两件套</Text>
                            <Text style={css.goodsSku}>满200减10</Text>
                            <View style={css.goodsPriceWrap}>
                                <Text style={css.sPrice}>￥</Text>
                                <Text style={css.bPrice}>3000</Text>
                                <Text style={css.sPrice}>劵后价</Text>
                            </View>
                            <Image style={css.dotIcon} source={require('../../image/dot.png')} />
                        </View>
                    </View> */}
                </ScrollView >
            </View >
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