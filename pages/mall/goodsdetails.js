
import React from 'react';
import {
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
    Animated,
    Easing,
} from 'react-native';

// import WebView from 'react-native-webview'
import HTMLView from 'react-native-htmlview'
import Swiper from 'react-native-swiper';
import { getLogin, getgoodsdetail, getBuyRule } from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import common from '../../css/common.js'
import indexCss from '../../css/css.js'
import css from '../../css/goodsdetails'

let specAttrComponent;
let goodsSpecArr;
class goodsdetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgArr: [],
            id: 0,
            banner: [],
            num: '1',
            img: '',
            inputValue: '1',
            showMask: 0,
            myData: {},
            ruleData: {},
            ifshowmodal: 0,
            agree: 0,
        }

    }
    componentDidMount() {
        var that = this;
        // var data = that._initGoodsDetailData(this.state.myData);
        // this.setState({
        //     myData: data,
        // })
        // Toast.show(this.props.route.params.id);

        this.setState({
            id: this.props.route.params.id,
        })
        this.getData(this.props.route.params.id);
        this.getBuyRules();
    }

    getBuyRules() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getBuyRule(fromData, res => {
        // console.log('res--------')
        // console.log(res)
            if (res.code == 1) {
                this.setState({
                    ruleData: res.data.setting.buy_rule,
                })
            }
        })
    }

    getData(id) {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        fromData['goods_id'] = id;
        getgoodsdetail(fromData, res => {
            if (res.code == 1) {
            // console.log(222222222222222)
                var data = that._initGoodsDetailData(res.data);
                this.setState({
                    myData: data,
                    imgArr: data.detail.image,
                })
            // console.log(this.state.myData)
            }
        })
    }

    add() {
        this.setState({
            num: (Number(this.state.num) + 1).toString()
        })
    }
    jian() {
        if (Number(this.state.num) == 1) { return; }
        this.setState({
            num: (Number(this.state.num) - 1).toString()
        })
    }

    escape2Html(str) {
        if (str == '') { return; }
        var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
        return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; });
    }
    html2Escape(sHtml) {
        return sHtml.replace(/[<>&"]/g, function (c) {
            return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c];
        });
    }

    filter(str) {
        var str1 = "<p><img";
        var str2 = "/></p>";
        var reg1 = new RegExp("<p><img", "g");
        var reg2 = new RegExp('"/></p>', "g");
        var newStr = str.replace(reg1, '<img');
        var newStr2 = newStr.replace(reg2, '"/>');

        return newStr2;
    }
    render() {
        let { navigation } = this.props;
        let imgArr = this.state.imgArr;
    // console.log(imgArr)
        let maskBg = this.state.showMask == 1 ? <View style={common.mask}></View> : null;
        let mask = this.state.showMask == 1 ? <TouchableOpacity style={[common.mask, { opacity: 0 }]} onPress={this.hideModal.bind(this)}></TouchableOpacity> : null;
        let detail = this.state.myData.detail;

        let modal = this.state.ifshowmodal == 1 && this.state.ruleData ?
            <View style={{ position: 'absolute', top: 0, left: 0, width: width, height: height }}>
                <TouchableOpacity onPress={() => { this.setState({ ifshowmodal: 0 }) }} style={common.mask}></TouchableOpacity>
                <View style={[common.askModal, { paddingLeft: 15, paddingRight: 15, paddingBottom: 60, paddingTop: 0, top: height / 6 }]}>
                    {/* <Text style={common.askTitle}></Text> */}
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
                            <Text style={{ color: '#333333', fontSize: 15 }}>我已同意下单规则</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={this.showModal.bind(this)}
                        style={[css.linearBtn, { position: 'absolute', bottom: 10, marginTop: 58, marginLeft: 15, width: '100%', flex: 1 }]}
                    >
                        {
                            this.state.agree == 1 ?
                                <LinearGradient colors={['#F6BF0A', '#F6BF0A']} style={[common.linearBtn, {}]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>确定</Text></LinearGradient> :
                                <LinearGradient colors={['#CAC8C6', '#CAC8C6']} style={[common.linearBtn, {}]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>确定</Text></LinearGradient>
                        }
                    </TouchableOpacity>
                </View>
            </View> : null;
        return (
            <View style={common.body}>
                {modal}
                {/* 头部 */}
                <View style={[common.header]}>
                    <TouchableOpacity onPress={() => { navigation.goBack(); }} style={[common.headerLeft, {}]}>
                        <Image source={require('../../image/return.png')} style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>商品详情</Text></View>
                </View>
                {this.state.myData.detail ?
                    <ScrollView style={[common.ScrollViewHasHeaderAndBottom]} showsVerticalScrollIndicator={false}>
                        <View style={css.main}>
                            {/* 轮播图 */}
                            <View style={{ height: width }}>
                                <Swiper>
                                    {
                                        imgArr.map((item, index) => {
                                        // console.log(item.file_path)
                                            return (
                                                <View key={index}>
                                                    <Image source={{ uri: item.file_path }} style={{ width: width, height: width }} />
                                                </View>
                                            )
                                        })
                                    }
                                </Swiper>
                            </View>


                            <View style={css.goodsinfo}>
                                <Text style={css.goodsTitle}>{detail.goods_name}</Text>
                                {/* <View style={common.alignItemsStart}>
                                    {parseInt(detail.goods_sku.goods_coupon) != 0 ? <Text style={css.goodsSku}>满{parseInt(detail.goods_sku.goods_price)}减{parseInt(this.state.myData.detail.goods_sku.goods_coupon)}</Text> : null}
                                </View> */}
                                <View style={css.priceWrap}>
                                    <View style={css.nowPrice}>
                                        <Text style={css.priceIcon}>￥</Text>
                                        <Text style={css.priceStrong}>{detail.goods_sku.goods_price}</Text>
                                    </View>
                                    {/* <Text style={css.linePrice}>劵后价</Text> */}
                                    {
                                        detail.goods_sku.goods_coupon != 0 ? <Text style={css.linePrice}>劵可抵：{detail.goods_sku.goods_coupon}元</Text> : null
                                    }
                                </View>
                                {/* <Text style={css.goodsTitle}>{this.state.mydata.name}</Text> */}
                                <View style={common.FBR}>
                                    <Text style={css.sale}>库存：{detail.goods_sku.stock_num}</Text>
                                    {/* <Text style={css.stock}>已售：{detail.goods_sales}</Text> */}
                                </View>
                            </View>

                            {/* <View style={{ marginTop: 40, paddingLeft: 15, paddingRight: 15 }}> */}
                            {/* <Text></Text> */}
                            {/* <HTMLView
                                    style={{ width: width - 30 }}
                                    stylesheet={style}
                                    value={this.escape2Html(this.state.ruleData.value)}
                                /> */}
                            {/* </View> */}

                            <View style={css.details}>
                                <View style={common.columnCenter}>
                                    <Image source={require("../../image/invite-2.png")} style={css.inviteLogo} />
                                    <Text style={css.inviteTitle}>商·品·详·情</Text>
                                </View>
                                {/* <u-parse v-show="details!=''" :content="details" @preview="preview"></u-parse> */}
                                {/* <Text>{this.state.myData.detail.content}</Text> */}
                                <View style={[css.allDetails, { paddingTop: 40, }]}>
                                    <HTMLView
                                        style={{ width: width }}
                                        stylesheet={style}
                                        value={this.filter(this.state.myData.detail.content)}
                                    />
                                </View>
                                {/* <WebView
                                    // useWebKit
                                    // userAgent="RNWebView"
                                    source={{
                                        html: this.state.myData.detail.content,
                                    }}
                                /> */}
                                {/* {content} */}
                            </View>
                        </View>
                    </ScrollView>
                    : null}
                <TouchableOpacity
                    onPress={() => { this.setState({ ifshowmodal: 1 }) }}
                    style={[css.linearBtn, { position: 'absolute', bottom: 10, marginTop: 58, marginLeft: 15, width: width - 30, flex: 1 }]}
                >
                    <LinearGradient colors={['#F6BF0A', '#F6BF0A']} style={[common.linearBtn, {}]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>立即购买</Text></LinearGradient>
                </TouchableOpacity>




                {/* 规格弹窗 */}
                {maskBg}
                <Animated.View style={[common.modal, { transform: [{ translateY: this.translateY }] }]}>
                    {mask}
                    {this.state.myData.detail ?
                        <View style={[common.tradeMain, { paddingBottom: 60 }]}>
                            <View style={common.goodsInfos}>
                                {/* <Image style={common.goodsImage} source={{ uri: this.state.myData.detail.goods_image }} /> */}
                                <Image source={{ uri: this.state.myData.skuCoverImage }} style={common.goodsImage} />
                                <View>
                                    <View style={[common.alignItemsCenter]}>
                                        {/* <Text style={common.priceS}>劵后价：￥</Text> */}
                                        <Text style={common.priceS}>￥</Text>
                                        <Text style={common.priceB}>{this.state.myData.goods_price}</Text>
                                        {
                                            detail.goods_sku.goods_coupon != 0 ? <Text style={css.linePrice}>劵可抵：{detail.goods_sku.goods_coupon}元</Text> : null
                                        }
                                    </View>
                                    <View style={common.modalStockWrap}>
                                        <Text style={common.modalStockNum}>库存：{this.state.myData.stock_num}</Text>
                                    </View>
                                    <View style={common.modalStockWrap}>
                                        <Text style={common.modalStockNum}>最低购买数量：{this.state.myData.start_num}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={common.goodsAttr}>
                                <View style={common.goodsAttrAcroll} scroll-y="true">
                                    {this.state.myData.goodsMultiSpec && this.state.myData.goodsMultiSpec.spec_attr.map((item, index) => {
                                        return (
                                            <View style={common.groupItem} key={index}>
                                                <Text style={common.tipsText}>{item.group_name}</Text>
                                                <View style={[common.alignItemsCenter, { display: 'flex', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }]}>
                                                    {this.specItems(item.spec_items, index)}
                                                </View>
                                            </View>
                                        );
                                    })}
                                </View>
                            </View>

                            <View style={common.alignItemsB}>
                                <Text style={common.buyNum}>购买数量</Text>
                                {
                                    detail.is_online == 2 ? <Text>1</Text> :
                                        <View style={common.alignItemsCenter}>
                                            <TouchableOpacity onPress={this.jianNum.bind(this)}>
                                                <Image style={common.numImage} source={require('../../image/jian.png')} />
                                            </TouchableOpacity>
                                            <TextInput
                                                onChangeText={(value) => this.setState({ inputValue: value })}
                                                value={this.state.inputValue} style={common.numInput} editable={false} />
                                            <TouchableOpacity onPress={this.addNum.bind(this)}>
                                                <Image style={common.numImage} source={require('../../image/add.png')} />
                                            </TouchableOpacity>
                                        </View>
                                }

                            </View>

                            {/* {parseInt(detail.goods_sku.goods_coupon) != 0 ? <View style={common.alignItemsB}><Text style={common.tipsText}>优惠</Text><Text style={common.red}>满{parseInt(detail.goods_sku.goods_price)}减{parseInt(this.state.myData.detail.goods_sku.goods_coupon)}</Text></View> : null} */}
                            {/* <View style={common.alignItemsB}><Text style={common.tipsText}>返还</Text><Text style={common.red}>购买可赠送200积分</Text></View> */}
                            {
                                detail.goods_sku.stock_num == 0 ?
                                    <TouchableOpacity
                                        onPress={() => { Toast.show('暂无库存') }}
                                        style={[css.linearBtn, { position: 'absolute', bottom: 10, marginTop: 58, marginLeft: 15, width: width - 30, flex: 1 }]}
                                    >
                                        <LinearGradient colors={['#CAC8C6', '#CAC8C6']} style={[common.linearBtn, {}]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>暂无库存</Text></LinearGradient>
                                    </TouchableOpacity> :
                                    <TouchableOpacity
                                        // onPress={() => { this.setState({ ifbuy: 1, id: item.id }) }} 
                                        onPress={() => {
                                            // if(Number(this.state.inputValue)<detail.start_num){
                                            //     Toast.show('该商品的购买数量必须大于等于'+detail.start_num)
                                            // }
                                            if(Number(this.state.inputValue)<this.state.myData.start_num){
                                                Toast.show('该商品规格最低购买数量为'+this.state.myData.start_num)
                                            }else{
                                                navigation.navigate('orderConfirm', {
                                                    goods_id: detail.goods_id,
                                                    goods_num: this.state.inputValue,
                                                    goods_sku_id: this.state.myData.goods_sku_id,
                                                    is_check: 0,
                                                });
                                            }
                                        }}
                                        style={[common.linearBtn, common.marginTop40]}>
                                        <LinearGradient colors={['#F6BF0A', '#F3A316']} style={[common.FCR, { width: width - 48, borderBottomLeftRadius: 50, borderTopRightRadius: 50, borderTopLeftRadius: 50, borderBottomRightRadius: 50 }]}>
                                            <Text style={common.linearBtnText}>立即购买</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                            }

                        </View>
                        : null}
                </Animated.View>
            </View >
        )
    }

    // 购买弹窗
    translateY = new Animated.Value(height) //初始值设为0
    // translateY = new Animated.Value(-height) //初始值设为0
    showModal() {
        // Toast.show('showModal');
        var that = this;
        if (that.state.agree == 0) {
            return Toast.show('请先阅读并勾选下单规则')
        }
        that.setState({
            ifshowmodal: 0,
            showMask: 1
        })
        Animated.timing(
            that.translateY,
            {
                toValue: 0,
                duration: 500,
                easing: Easing.linear,
                useNativeDriver: true,
            }
        ).start();
    }
    // 隐藏购买弹窗
    hideModal() {
        // Toast.show('showModal');
        var that = this;
        that.setState({
            showMask: 0
        })
        Animated.timing(
            that.translateY,
            {
                toValue: height,
                duration: 500,
                easing: Easing.linear,
                useNativeDriver: true,
            }
        ).start();
    }

    // 渲染规格值
    specItems(data, index) {
        // console.log(data)
        return (
            data.map((item, indexs) => {
                return (
                    // <TouchableOpacity onClick={() => this.onSwitchSpec(index,indexs)} key={indexs}></TouchableOpacity>
                    <TouchableOpacity onPress={this.onSwitchSpec.bind(this, index, indexs)} key={indexs} style={{ marginBottom: 10, }}>
                        {
                            item.checked ?
                                <View><Text style={[common.specValue, common.specValueActive]}>{item.spec_value}</Text></View>
                                :
                                <View><Text style={[common.specValue]}>{item.spec_value}</Text></View>
                        }
                    </TouchableOpacity>
                )
            })
        )
    }

    /**
   * 点击切换不同规格
   */
    onSwitchSpec = (index, indexs) => {
    // console.log(index)
    // console.log(indexs)
        var that = this;
        var attrIdx = index;
        var itemIdx = indexs;
        var goodsMultiSpec = that.state.myData.goodsMultiSpec;
        // var goodsMultiSpec = that.state.myData.detail.goodsMultiSpec;

        // // 记录formid
        // App.saveFormId(e.detail.formId);

        // console.log(that.state.myData.detail.goodsMultiSpec)
    // console.log(goodsMultiSpec.spec_attr)
        for (let i in goodsMultiSpec.spec_attr) {
            for (let j in goodsMultiSpec.spec_attr[i].spec_items) {
                if (attrIdx == i) {
                    goodsMultiSpec.spec_attr[i].spec_items[j].checked = false;
                    if (itemIdx == j) {
                        goodsMultiSpec.spec_attr[i].spec_items[itemIdx].checked = true;
                        goodsSpecArr[i] = goodsMultiSpec.spec_attr[i].spec_items[itemIdx].item_id;
                    }
                }
            }
        }
        // // console.log(goodsMultiSpec)
        this.state.myData.goodsMultiSpec = goodsMultiSpec;
        that.setState({
            goodsMultiSpec
        });
        // // // 更新商品规格信息
        that._updateSpecGoods();
    }

    // 更新商品规格信息
    _updateSpecGoods() {
        // this.$forceUpdate()
        let _this = this,
            specSkuId = goodsSpecArr.join('_');
        // console.log(_this.myData.goodsMultiSpec)
        // 查找skuItem
        let spec_list = _this.state.myData.goodsMultiSpec.spec_list,
            skuItem = spec_list.find((val) => {
                return val.spec_sku_id == specSkuId;
            });

        // 记录goods_sku_id
        // 更新商品价格、划线价、库存
        if (typeof skuItem === 'object') {
            var myData = _this.state.myData;
            myData.goods_sku_id = skuItem.spec_sku_id;
            myData.goods_price = skuItem.form.goods_price;
            myData.line_price = skuItem.form.line_price + _this.state.myData.detail.goods_sku.goods_points;
            myData.stock_num = skuItem.form.stock_num;
            myData.start_num = skuItem.form.start_num;
            myData.skuCoverImage = skuItem.form.image_id > 0 ? skuItem.form.image_path : _this.state.myData.detail.goods_image;
            _this.setState({
                myData
            })
        }
    }

    // 初始化商品详情数据
    _initGoodsDetailData(data) {
        // this.$forceUpdate()
        let that = this;
        // 商品详情
        let goodsDetail = data.detail;
        // 富文本转码
        // 商品价格/划线价/库存
        data.goods_sku_id = goodsDetail.goods_sku.spec_sku_id;
        data.goods_price = goodsDetail.goods_sku.goods_price;
        // data.sharing_price = goodsDetail.goods_sku.sharing_price;
        data.line_price = goodsDetail.goods_sku.line_price + goodsDetail.goods_sku.goods_points;
        data.stock_num = goodsDetail.goods_sku.stock_num;
        data.start_num = goodsDetail.goods_sku.start_num;
        // 商品封面图(确认弹窗)
        data.skuCoverImage = goodsDetail.goods_image;
        // 多规格商品封面图(确认弹窗)
        if (goodsDetail.spec_type == 20 && goodsDetail.goods_sku['image']) {
            data.skuCoverImage = goodsDetail.goods_sku['image']['file_path'];
        }
        // 初始化商品多规格
        if (goodsDetail.spec_type == 20) {
            data.goodsMultiSpec = that.initManySpecData(goodsDetail.goods_multi_spec);
        }
        // 记录倒计时时间
        // data['actEndTimeList'] = [];
        // if (data.activeList.length > 0) {
        // 	data.activeList.forEach(item => {
        // 		data['actEndTimeList'].push(item.end_time.text);
        // 	});
        // }
        return data;
    }

    // 初始化商品多规格
    initManySpecData(data) {
        goodsSpecArr = [];
        for (let i in data.spec_attr) {
            for (let j in data.spec_attr[i].spec_items) {
                if (j < 1) {
                    data.spec_attr[i].spec_items[0].checked = true;
                    goodsSpecArr[i] = data.spec_attr[i].spec_items[0].item_id;
                }
            }
        }
        return data;
    }

    // 数量 加
    addNum() {
        var num = Number(this.state.inputValue) + 1;
    // console.log(num);
        this.setState({
            inputValue: num.toString()
        })
    }

    // 数量 减
    jianNum() {
        if (Number(this.state.inputValue) == 1) {
            return;
        }
        var num = Number(this.state.inputValue) - 1;
    // console.log(num);
        this.setState({
            inputValue: num.toString()
        })
    }
}
const style = StyleSheet.create({
    body: {
        width: '100%'
    },
    img: {
        width: width,
        display: 'block',
        margin: '0 auto',
        marginLeft: '88'
    },
    p: {
        padding: 0,
        margin: 0,
        // lineHeight:10,
        // backgroundColor:'pink',
        marginTop: -25,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor:'yellow',
        width: '100%',
    }
});
export default goodsdetails;