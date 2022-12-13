
import React from 'react';
import {
    // AsyncStorage,
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
    Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getConfig, getBuyNowGet, getBuyNowPost, getUserDetail } from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import common from '../../css/common.js'
import css from '../../css/orderIndex.js'
import ca from '../../css/orderWaitPay.js'

class page extends React.Component {
    render() {
        let { navigation } = this.props;
        let time = this.state.time;
        let detail = this.state.detail;
    // console.log(detail)
        return (
            <View style={common.body}>
                {this.state.detail.pay_type ?
                    <ScrollView style={[common.ScrollView, { height: height - 100 }]} showsVerticalScrollIndicator={false}>
                        {/* <Image source={require('../../image/orderbg.png')} style={ca.orderbg} /> */}
                        {/* 头部 */}
                        <View style={[common.headerIn, common.headerInT, { backgroundColor: 'transparent', }]}>
                            <TouchableOpacity onPress={() => { navigation.goBack(); }} style={common.headerLeft}>
                                <Image source={require('../../image/return.png')} style={common.returnIcon} />
                            </TouchableOpacity >
                            <View style={common.headerTitle}><Text style={common.headerTitleText}>确认订单</Text></View>
                        </View>

                        {
                            this.state.detail.is_online == 1 && this.state.detail.address.length != 0 ?
                                <TouchableOpacity onPress={this.toAddress.bind(this)} style={[common.alignItemsB, ca.address]}>
                                    <Image source={require('../../image/address2.png')} style={ca.addressIcon} />
                                    <View style={[common.columnStart, { width: '80%' }]}>
                                        <View style={common.alignItemsCenter}>
                                            <Text style={ca.name}>{this.state.detail.address.name}</Text>
                                            <Text style={ca.tel}>{this.state.detail.address.phone}</Text>
                                        </View>
                                        <Text style={ca.detail}>
                                            {this.state.detail.address.region.province}-
                                            {this.state.detail.address.region.city}-
                                            {this.state.detail.address.region.region}&nbsp;
                                            {this.state.detail.address.detail}
                                        </Text>
                                    </View>
                                    <Image source={require('../../image/more.png')} style={ca.addressMore} />
                                </TouchableOpacity> :
                                null
                        }

                        {
                            this.state.detail.is_online == 1 && this.state.detail.address.length == 0 ?
                                <TouchableOpacity onPress={this.toAddress.bind(this)} style={[common.alignItemsB, ca.address]}>
                                    <Image source={require('../../image/address2.png')} style={ca.addressIcon} />
                                    <View style={[common.columnStart, { width: '80%' }]}>
                                        <Text>请选择地址</Text>
                                    </View>
                                    <Image source={require('../../image/more.png')} style={ca.addressMore} />
                                </TouchableOpacity> : null
                        }


                        <View style={common.grayLine5}></View>

                        <View style={[css.orderBlock, { borderBottomWidth: 0 }]}>
                            <View style={[common.alignItemsB, {
                                marginTop: 10, borderBottomWidth: 1,
                                borderColor: '#f5f5f5',
                                paddingBottom: 15,
                            }]}>
                                <Image style={css.orderImage} source={{ uri: this.state.detail.goods_list[0].goods_image }} />
                                <View style={css.orderInfoName}>
                                    <Text style={css.orderName} numberOfLines={2}>{this.state.detail.goods_list[0].goods_name}</Text>
                                    {this.state.detail.goods_list[0].goods_multi_spec != null ? <Text style={css.orderSku}>{this.state.detail.goods_list[0].goods_sku.goods_attr}</Text> : null}
                                    <View style={common.alignItemsB}>
                                        {/* <Text style={css.price}>￥{Number(this.state.detail.goods_list[0].goods_sku.goods_price) - Number(this.state.detail.goods_list[0].goods_sku.goods_coupon)}</Text> */}
                                        <Text style={css.price}>￥{this.state.detail.goods_list[0].goods_sku.goods_price}</Text>
                                        <Text style={css.number}>X1</Text>
                                    </View>
                                </View>
                            </View>
                            {/* {
                                Number(this.state.detail.goods_list[0].goods_sku.goods_coupon) != 0 ?
                                    <View style={ca.li}><Text style={ca.label}>优惠</Text>
                                        <View style={common.alignItemsCenter}>
                                            <Text style={ca.strong}>满{Number(this.state.detail.goods_list[0].goods_sku.goods_price)}减{Number(this.state.detail.goods_list[0].goods_sku.goods_coupon)}</Text>

                                        </View>
                                    </View> : null
                            } */}

                            <View style={ca.li}><Text style={ca.label}>购买数量</Text><Text style={ca.label}>{this.state.detail.goods_list[0].total_num} 件</Text></View>
                            <View style={ca.li}><Text style={ca.label}>商品总价</Text><Text style={ca.label}>￥{this.state.detail.order_pay_price}</Text></View>
                            <View style={[common.columnEnd, { marginTop: 25 }]}>
                                {
                                    this.state.detail.goods_list[0].goods_coupon != 0 ?
                                        <TouchableOpacity onPress={this.changeCheck.bind(this)} style={[common.alignItemsCenter]}>
                                            {
                                                this.state.is_check == 1 ? <Image source={require('../../image/check.png')} style={ca.check} /> : <Image source={require('../../image/uncheck.png')} style={ca.check} />
                                            }
                                            <Text style={{ color: this.state.is_check == 1 ? '#F3A316' : '#A5A5A5' }}>当前优惠券：{this.state.userCoin.coupon}   可抵扣￥{this.state.detail.goods_list[0].goods_coupon}</Text>
                                        </TouchableOpacity> : null
                                }

                                <View style={[common.alignItemsE, { marginTop: 10 }]}>
                                    <Text style={common.gray}>共{this.state.detail.goods_list[0].total_num}件商品，实际支付：</Text>
                                    <Text style={common.red}>￥</Text>
                                    <Text style={[css.totalPrice, { fontSize: 18, marginTop: -3 }]}>{this.state.is_check == 1 ? this.state.detail.goods_list[0].coupon_total_pay_price : this.state.detail.goods_list[0].total_pay_price}</Text>
                                </View>
                            </View>
                        </View>

                    </ScrollView>
                    : null
                }

                {
                    this.state.showPayModal == true ?
                        <View style={common.maskCenter}>
                            <View style={common.payModal}>
                                <Text style={common.modalTittle}>确认支付</Text>
                                <TouchableOpacity onPress={this.showPayModal.bind(this)} style={common.closeWrap}><Image source={require('../../image/close.png')} style={common.close} /></TouchableOpacity>
                                <Text style={common.need}>需支付</Text>
                                <Text style={common.money}>￥{this.state.is_check == 1 ? this.state.detail.goods_list[0].coupon_total_pay_price : this.state.detail.goods_list[0].total_pay_price}</Text>

                                <TouchableOpacity style={common.payLi} onPress={this.changePayType.bind(this, 15)}>
                                    <View style={common.alignItemsCenter}>
                                        <Image source={require('../../image/alipay.png')} style={common.payIcon} />
                                        <Text style={common.payStrong}>支付宝</Text>
                                    </View>
                                    {this.state.pay_type == 15 ? <Image source={require('../../image/tick.png')} style={common.payTick} /> : null}
                                </TouchableOpacity>
                                <TouchableOpacity style={common.payLi} onPress={this.changePayType.bind(this, 20)}>
                                    <View style={common.alignItemsCenter}>
                                        <Image source={require('../../image/wechat.png')} style={common.payIcon} />
                                        <Text style={common.payStrong}>微信</Text>
                                    </View>
                                    {this.state.pay_type == 20 ? <Image source={require('../../image/tick.png')} style={common.payTick} /> : null}
                                </TouchableOpacity>
                                <TouchableOpacity style={common.payLi} onPress={this.changePayType.bind(this, 25)}>
                                    <View style={common.alignItemsCenter}>
                                        <Image source={require('../../image/yinlian.jpg')} style={common.payIcon} />
                                        <Text style={common.payStrong}>银联</Text>
                                        {/* <Text style={common.paySpan}>（尾号0245）</Text> */}
                                    </View>
                                    {this.state.pay_type == 25 ? <Image source={require('../../image/tick.png')} style={common.payTick} /> : null}
                                </TouchableOpacity>
                                <TouchableOpacity style={common.payLi} onPress={this.changePayType.bind(this, 40)}>
                                    <View style={common.alignItemsCenter}>
                                        <Image source={require('../../image/pi-2.jpg')} style={common.payIcon} />
                                        <Text style={common.payStrong}>Pi支付</Text>
                                        {/* <Text style={common.paySpan}>（尾号0245）</Text> */}
                                    </View>
                                    {this.state.pay_type == 40 ? <Image source={require('../../image/tick.png')} style={common.payTick} /> : null}
                                </TouchableOpacity>
                                <TouchableOpacity style={[common.payLi, common.hasBottomBoder]} onPress={this.changePayType.bind(this, 10)}>
                                    <View style={common.alignItemsCenter}>
                                        <Image source={require('../../image/yue.png')} style={common.payIcon} />
                                        <Text style={common.payStrong}>余额</Text>
                                        <Text style={common.paySpan}>（{this.state.userCoin.money}）</Text>
                                    </View>
                                    {this.state.pay_type == 10 ? <Image source={require('../../image/tick.png')} style={common.payTick} /> : null}
                                </TouchableOpacity>
                                {/* 重要!勿删 */}
                                {/* {this.state.pay_type == 10 ?
                                    <View style={[common.hasBottomBoder, common.alignItemsCenter, { paddingTop: 5, paddingBottom: 5 }]}>
                                        <Text style={[common.payStrong, { marginRight: 15 }]}>交易密码</Text>
                                        <TextInput secureTextEntry={true} value={this.state.pwd} onChangeText={(text) => { this.setState({ pwd: text }) }} placeholder="请输入交易密码" placeholderTextColor={'#D4D4D4'} style={{ fontSize: 16 }} />
                                    </View> : null
                                } */}
                                {
                                    this.state.ifClick ?
                                        <TouchableOpacity style={[css.linearBtn, { marginTop: 53, }]}>
                                            <LinearGradient colors={['#CAC8C6', '#CAC8C6']} style={common.linearBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>立即支付</Text></LinearGradient>
                                        </TouchableOpacity> :
                                        <TouchableOpacity onPress={this.payNow.bind(this)} style={[css.linearBtn, { marginTop: 53, }]}>
                                            <LinearGradient colors={['#F6BF0A', '#F3A316']} style={common.linearBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>立即支付</Text></LinearGradient>
                                        </TouchableOpacity>
                                }

                            </View>
                        </View> : null
                }

                {
                    this.state.payOpen == 1 ?
                        <TouchableOpacity onPress={this.showPayModal.bind(this)} style={[css.linearBtn, { position: 'absolute', bottom: 10, marginTop: 58, marginLeft: 15, width: width - 30 }]}>
                            <LinearGradient colors={['#F6BF0A', '#F3A316']} style={common.linearBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>立即支付</Text></LinearGradient>
                        </TouchableOpacity> :
                        <TouchableOpacity style={[css.linearBtn, { position: 'absolute', bottom: 10, marginTop: 58, marginLeft: 15, width: width - 30 }]}>
                            <LinearGradient colors={['#CAC8C6', '#CAC8C6']} style={common.linearBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>立即支付</Text></LinearGradient>
                        </TouchableOpacity>
                }

            </View >
        )
    }
    constructor(props) {
        super(props);
        this.state = {
            date: '2022/09/30 14:40:24',
            time: {},
            user: {},
            userCoin: {},
            userInfo: {},
            goods_id: '',
            goods_num: '',
            goods_sku_id: '',
            address_id: 0,
            pay_type: 10,
            detail: {},
            is_check: 0,
            payOpen: '',
            ifClick: false,
        }
    }
    componentWillUnmount() {
        // this.stop();
    }

    componentDidMount() {
    // console.log(this.props.route.params)
        var goods_id = this.props.route.params.goods_id;
        var goods_num = this.props.route.params.goods_num;
        var goods_sku_id = this.props.route.params.goods_sku_id;
        this.getUserDetails()
        this.getConfigs()
        this.setState({
            goods_id,
            goods_num,
            goods_sku_id,
        }, this.getOrders())
    }

    getConfigs() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getConfig(fromData, res => {
        // console.log('res--------')
        // console.log(res)
            if (res.code == 1) {
                this.setState({
                    payOpen: Number(res.data.setting.pay_open.value)
                    // ruleData: res.data.setting.invite_rule,
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

    // 是否勾选使用折扣
    changeCheck() {
        if (this.state.userCoin.coupon == 0) { return Toast.show("暂无优惠券") }
        this.setState({
            is_check: this.state.is_check == 1 ? 0 : 1
        })
    }

    payNow() {
        var that = this;
        if (that.state.ifClick) {
            Toast.show('正在提交，请勿重复点击');
            return;
        }
        that.setState({
            ifClick: true
        })
        let { navigation } = this.props;
        var fromData = {};
        fromData['goods_id'] = this.props.route.params.goods_id;
        fromData['goods_num'] = this.props.route.params.goods_num;
        fromData['goods_sku_id'] = this.props.route.params.goods_sku_id;
        fromData['address_id'] = this.state.detail.is_online == 2 ? 0 : this.state.address_id;
        fromData['pay_type'] = this.state.pay_type;
        fromData['is_check'] = this.state.is_check;
    // console.log(fromData)
        getBuyNowPost(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                // 余额
                if (this.state.pay_type == 10) {
                    Toast.show('支付成功');
                    setTimeout(function () {
                        navigation.navigate('orderIndex')
                    }, 2000)
                }
                // 支付宝
                if (this.state.pay_type == 15) {
                    navigation.navigate('orderIndex')
                    Linking.openURL(res.data.payment)
                }
                // 微信
                if (this.state.pay_type == 20) {
                    navigation.navigate('orderIndex')
                    Linking.openURL(res.data.payment)
                }
                // 银联
                if (this.state.pay_type == 25) {
                    navigation.navigate('orderIndex')
                    Linking.openURL(res.data.payment)
                }
                // Pi支付
                if (this.state.pay_type == 40) {
                    // Toast.show(res.msg)
                }
                this.getUserDetails()
            } else if (res.code == -1) {
                Toast.show(res.msg);
                setTimeout(function () {
                    navigation.navigate('login')
                }, 2000)
            } else {
                Toast.show(res.msg, 2000);
            }

            that.setState({
                ifClick: false
            })
        })
    }
    toAddress() {
        this.removeStorage();
        let that = this;
        let { navigation } = this.props;
        navigation.navigate("address", {
            from: 1,
            callback: () => {
                this.getOrders()
            }
        });
    }
    removeStorage() {
        AsyncStorage.removeItem('address_id')
    }
    changePayType(type) {
        if (type == 10) {
            this.setState({
                pay_type: type,
            })
        }
        else {
            this.setState({
                pay_type: type,
                // showPayModal: false,
            })
        }
    }

    getOrders() {
        var that = this;
        AsyncStorage.getItem('address_id').then((value) => {
        // console.log(Number(value))
        // console.log(Number(that.state.address_id))

            if (Number(value) != Number(that.state.address_id)) {
                // Toast.show('budengyu')
                let { navigation } = that.props;
                var fromData = {};
                fromData['goods_id'] = that.props.route.params.goods_id;
                fromData['goods_num'] = that.props.route.params.goods_num;
                fromData['goods_sku_id'] = that.props.route.params.goods_sku_id;
                fromData['address_id'] = Number(value);
                fromData['pay_type'] = that.state.pay_type;
            // console.log(fromData)
                getBuyNowGet(fromData, res => {
                // console.log(res)
                    if (res.code == 1) {
                        that.setState({
                            detail: res.data
                        })
                    } else if (res.code == -1) {
                        Toast.show(res.msg);
                        setTimeout(function () {
                            navigation.navigate('login')
                        }, 2000)
                    } else {
                        Toast.show(res.msg, 2000);
                    }
                })
                // return;
            } else {
                let { navigation } = this.props;
                var fromData = {};
                fromData['goods_id'] = this.props.route.params.goods_id;
                fromData['goods_num'] = this.props.route.params.goods_num;
                fromData['goods_sku_id'] = this.props.route.params.goods_sku_id;
                fromData['address_id'] = this.state.address_id;
                fromData['pay_type'] = this.state.pay_type;
            // console.log(fromData)
                getBuyNowGet(fromData, res => {
                // console.log(res)
                    if (res.code == 1) {
                        this.setState({
                            detail: res.data
                        })
                    } else if (res.code == -1) {
                        Toast.show(res.msg);
                        setTimeout(function () {
                            navigation.navigate('login')
                        }, 2000)
                    } else {
                        Toast.show(res.msg, 2000);
                    }
                })
            }

            that.setState({
                address_id: value == null ? 0 : Number(value),
            })
        });

    }

    showPayModal() {
        this.setState({
            showPayModal: !this.state.showPayModal
        })
    }
}
export default page;