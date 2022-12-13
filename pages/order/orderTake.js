
import React from 'react';
import {
    Clipboard,
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

import { getUserDetail, getUserOrderDetail, getOrderCancel, getOrderReceipt, getProductPay, getOrderOfflineCancel } from '../../network/authapi.js'
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
        let deleteModal = this.state.ifshowmodal == 1 ?
            <View style={{ position: 'absolute', top: 0, left: 0, width: width, height: height }}>
                <View style={common.mask}></View>
                <View style={common.askModal}>
                    {
                        this.state.detail.order.is_online == 2 ?
                            <Text style={common.askTitle}>确定申请退款吗？</Text> :
                            <Text style={common.askTitle}>确定要取消该订单吗？</Text>
                    }
                    <View style={common.askOperation}>
                        <TouchableOpacity onPress={() => { this.setState({ ifshowmodal: 0 }) }} type="default"><Text style={common.cancelBtn}>取消</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.cancelOrder() }} type="default"><Text style={common.confirmBtn}>确定</Text></TouchableOpacity>
                    </View>
                </View>
            </View> : null;

        let showPic = this.state.ifshowpic == 1 ?
            <View style={{ position: 'absolute', top: 0, left: 0, width: width, height: height, zIndex: 9 }}>
                <TouchableOpacity onPress={() => { this.setState({ ifshowpic: 0 }) }} style={[common.mask, { backgroundColor: 'rgba(0,0,0,.8)' }]}></TouchableOpacity>
                <Text style={{ position: 'relative', zIndex: 9, color: '#fff', marginTop: height / 3, textAlign: 'center', fontSize: 16 }}>请出示给店家扫描消费</Text>
                <Image source={{ uri: this.state.detail.qrcode }} style={{ width: 200, height: 200, marginTop: 20, marginLeft: width / 2 - 100, position: 'relative', zIndex: 9 }} />
            </View> : null;

        let confirmModal = this.state.ifshowmodal2 == 1 ?
            <View style={{ position: 'absolute', top: 0, left: 0, width: width, height: height }}>
                <View style={common.mask}></View>
                <View style={common.askModal}>
                    <Text style={common.askTitle}>确定已收到货吗？</Text>
                    <View style={common.askOperation}>
                        <TouchableOpacity onPress={() => { this.setState({ ifshowmodal2: 0 }) }} type="default"><Text style={common.cancelBtn}>取消</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.confirmGet() }} type="default"><Text style={common.confirmBtn}>确定</Text></TouchableOpacity>
                    </View>
                </View>
            </View> : null;
        return (
            <View style={common.body}>
                {showPic}
                {confirmModal}
                {deleteModal}
                {this.state.detail.order ?
                    <ScrollView style={[common.ScrollView, { height: height - 100 }]} showsVerticalScrollIndicator={false}>
                        <Image source={require('../../image/orderbg.png')} style={ca.orderbg} />
                        {/* 头部 */}
                        <View style={[common.headerIn, common.headerInT, { backgroundColor: 'transparent', }]}>
                            {/* <TouchableOpacity onPress={() => { navigation.goBack(); }} style={common.headerLeft}> */}
                            <TouchableOpacity onPress={() => { navigation.navigate('orderIndex') }} style={common.headerLeft}>
                                <Image source={require('../../image/return2.png')} style={common.returnIcon} />
                            </TouchableOpacity >
                            <View style={common.headerTitle}><Text style={common.headerTitleText2}>订单详情</Text></View>
                        </View>

                        <View style={[common.columnCenter, { paddingBottom: 15 }]}>
                            <Image source={require('../../image/clock.png')} style={ca.clock} />
                            {/* <Text style={ca.clockH1}>{this.state.detail.order.state_text}</Text> */}

                            {
                                this.state.detail.order.is_online == 2 ?
                                    <Text style={ca.clockH1}>{this.state.detail.order.verify_status.text}</Text> :
                                    <Text style={ca.clockH1}>{this.state.detail.order.state_text}</Text>
                            }

                            {/* <Text style={ca.clockP}>剩余{time.hours}小时{time.min}分{time.sec}秒自动收货</Text> */}
                        </View>
                        {
                            this.state.detail.order.is_online == 1 ?
                                <View style={[common.alignItemsB, ca.address]}>
                                    <Image source={require('../../image/address2.png')} style={ca.addressIcon} />
                                    <View style={[common.columnStart, { width: '87%' }]}>
                                        <View style={common.alignItemsCenter}><Text style={ca.name}>{this.state.detail.order.address.name}</Text><Text style={ca.tel}>{this.state.detail.order.address.phone}</Text></View>
                                        <Text style={ca.detail}>{this.state.detail.order.address.region.province}-{this.state.detail.order.address.region.city}-{this.state.detail.order.address.region.region} {this.state.detail.order.address.detail}</Text>
                                    </View>
                                </View> :
                                <View style={[common.alignItemsB, ca.address]}>
                                    {/* <Image source={require('../../image/address2.png')} style={ca.addressIcon} /> */}
                                    <View style={[common.columnStart, { width: '87%' }]}>
                                        <View style={common.alignItemsCenter}><Text style={ca.name}>{this.state.detail.order.address.name}</Text><Text style={ca.tel}>(请前往该店核销二维码进行消费)</Text></View>
                                        <Text style={ca.detail}>{this.state.detail.order.address.region.province}-{this.state.detail.order.address.region.city}-{this.state.detail.order.address.region.region} {this.state.detail.order.address.detail}</Text>
                                    </View>
                                </View>
                        }


                        <View style={common.grayLine5}></View>

                        <View style={[css.orderBlock, { backgroundColor: '#fff' }]}>
                            <View style={[common.alignItemsB, {
                                marginTop: 10, borderBottomWidth: 1,
                                borderColor: '#f5f5f5',
                                paddingBottom: 15,
                            }]}>
                                <Image style={css.orderImage} source={{ uri: this.state.detail.order.goods[0].image.file_path }} />
                                <View style={css.orderInfoName}>
                                    <Text style={css.orderName} numberOfLines={2}>{this.state.detail.order.goods[0].goods.goods_name}</Text>
                                    <Text style={css.orderSku}>{this.state.detail.order.goods[0].goods_attr}</Text>
                                    <View style={common.alignItemsB}>
                                        <Text style={css.price}>￥{this.state.detail.order.goods[0].goods_price}</Text>
                                        <Text style={css.number}>X1</Text>
                                    </View>
                                </View>
                            </View>

                            {
                                this.state.detail.order.is_online == 2 ? <TouchableOpacity onPress={() => this.setState({ ifshowpic: 1 })} style={ca.li}><Text style={ca.label}>核销二维码</Text><Image source={{ uri: this.state.detail.qrcode }} style={ca.addressIcon} /></TouchableOpacity> : null
                            }
                            {/* {
                                this.state.detail.order.is_check == 0 ?
                                    <View style={ca.li}><Text style={ca.label}>优惠</Text><Text style={[ca.strong, { color: '#333333' }]}>未选择优惠</Text></View>
                                    : null
                            }
                            {
                                this.state.detail.order.is_check != 0 && this.state.detail.order.goods[0].goods_coupon != 0 ?
                                    <View style={ca.li}><Text style={ca.label}>优惠</Text><Text style={ca.strong}>满{parseInt(this.state.detail.order.goods[0].goods_price)}减{parseInt(this.state.detail.order.goods[0].goods_coupon)}</Text></View>
                                    : null
                            } */}
                            {/* <View style={ca.li}><Text style={ca.label}>返还</Text><Text style={ca.strong}>购买可赠送200积分</Text></View> */}
                            <View style={ca.li}><Text style={ca.label}>购买数量</Text><Text style={ca.label}>{this.state.detail.order.goods[0].total_num} 件</Text></View>
                            <View style={ca.li}><Text style={ca.label}>商品总价</Text><Text style={ca.label}>￥{this.state.detail.order.order_price}</Text></View>
                            <View style={[common.alignItemsE, { marginTop: 25 }]}>
                                <Text style={common.gray}>共{this.state.detail.order.goods[0].total_num}件商品，实际支付：</Text>
                                <Text style={common.red}>￥</Text>
                                <Text style={[css.totalPrice, { fontSize: 18, marginTop: -3 }]}>{this.state.detail.order.order_price}</Text>
                            </View>
                        </View>

                        {
                            this.state.detail.order && this.state.detail.order.state_text == '已发货，待收货' || this.state.detail.order && this.state.detail.order.state_text == '已完成' ?
                                <View>
                                    <View style={common.title}><View style={common.titleDot}></View><Text style={common.titleText}>物流信息</Text></View>
                                    <View style={ca.p}>
                                        <Text style={ca.pText}>物流公司</Text>
                                        <Text style={ca.pText}>{this.state.detail.order.express_company == '' ? '暂无信息' : this.state.detail.order.express_company}</Text>
                                    </View>
                                    <View style={ca.p}>
                                        <Text style={ca.pText}>物流单号</Text>
                                        <TouchableOpacity style={common.alignItemsCenter} onPress={this.copy.bind(this, this.state.detail.order.express_no)}>
                                            <Text style={ca.pText}>{this.state.detail.order.express_no == '' ? '暂无信息' : this.state.detail.order.express_no}</Text>
                                            <Image style={common.copyIcon} source={require('../../image/copy.png')} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ height: 5, backgroundColor: '#F5F5F5' }}></View>
                                </View> : null
                        }


                        <View style={[common.title, {}]}><View style={common.titleDot}></View><Text style={common.titleText}>订单详情</Text></View>
                        <View style={ca.p}><Text style={ca.pText}>订单编号</Text><Text style={ca.pText}>{this.state.detail.order.order_no}</Text></View>
                        <View style={ca.p}><Text style={ca.pText}>创建时间</Text><Text style={ca.pText}>{this.state.detail.order.create_time}</Text></View>
                        <View style={[ca.p, { paddingBottom: 40 }]}><Text style={[ca.pText]}>付款时间</Text><Text style={ca.pText}>{this.state.detail.order.pay_time}</Text></View>
                        {/* <View style={[ca.p, { paddingBottom: 20 }]}><Text style={ca.pText}>完成时间</Text><Text style={ca.pText}>--</Text></View> */}

                        {/* <View style={common.grayLine5}></View>
                    <View style={common.title}><View style={common.titleDot}></View><Text style={common.titleText}>快递详情</Text></View>
                    <View style={ca.p}><Text style={ca.pText}>快递名称</Text><Text style={ca.pText}>韵达快递</Text></View>
                    <View style={[ca.p, { paddingBottom: 40 }]}><Text style={ca.pText}>快递单号</Text><TouchableOpacity style={common.alignItemsCenter} onPress={this.copy.bind(this, 'DJ24640045400000458')}><Text style={ca.pText}>DJ24640045400000458</Text><Image style={common.copyIcon} source={require('../../image/copy.png')} /></TouchableOpacity></View> */}

                    </ScrollView>
                    : null}

                {
                    this.state.showPayModal == true ?
                        <View style={common.maskCenter}>
                            <View style={common.payModal}>
                                <Text style={common.modalTittle}>确认支付</Text>
                                <TouchableOpacity onPress={this.showPayModal.bind(this)} style={common.closeWrap}><Image source={require('../../image/close.png')} style={common.close} /></TouchableOpacity>
                                <Text style={common.need}>需支付</Text>
                                <Text style={common.money}>￥{this.state.detail.order.order_price}</Text>

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
                                <TouchableOpacity style={common.payLi} onPress={this.changePayType.bind(this, 3)}>
                                    <View style={common.alignItemsCenter}>
                                        <Image source={require('../../image/yinlian.jpg')} style={common.payIcon} />
                                        <Text style={common.payStrong}>银联</Text>
                                        {/* <Text style={common.paySpan}>（尾号0245）</Text> */}
                                    </View>
                                    {this.state.pay_type == 3 ? <Image source={require('../../image/tick.png')} style={common.payTick} /> : null}
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

                                <TouchableOpacity onPress={this.payNow.bind(this)} style={[css.linearBtn, { marginTop: 53, }]}>
                                    <LinearGradient colors={['#F6BF0A', '#F3A316']} style={common.linearBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>立即支付</Text></LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View> : null
                }

                {
                    this.state.detail.order && this.state.detail.order.is_online == 2 && this.state.detail.order.verify_status.value == 10 && this.state.detail.order.pay_status.value == 20 && this.state.detail.order.order_status.value == 10 ?
                        <View style={[common.btnWrap, common.footerBtn]}>
                            <TouchableOpacity onPress={() => this.setState({ ifshowmodal: 1 })} style={common.minGrayBtn}>
                                <Text style={[common.minGrayBtnText]}>申请退款</Text>
                            </TouchableOpacity>
                        </View> : null
                }
                {
                    this.state.detail.order && this.state.detail.order.state_text == '待付款' ?
                        <View style={[common.btnWrap, common.footerBtn]}>
                            <TouchableOpacity onPress={() => this.setState({ ifshowmodal: 1 })} style={common.minGrayBtn}>
                                <Text style={[common.minGrayBtnText]}>取消订单</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.showPayModal.bind(this)} style={[common.minYellowBtn, { marginLeft: 10, }]}>
                                <Text style={[common.minYellowBtnText]}>去支付</Text>
                            </TouchableOpacity>
                        </View> : null
                }
                {
                    this.state.detail.order && this.state.detail.order.state_text == '已发货，待收货' ?
                        <View style={[common.btnWrap, common.footerBtn]}>
                            <TouchableOpacity onPress={() => this.setState({ ifshowmodal2: 1 })} style={[common.minYellowFillBtn, { marginLeft: 10, }]}>
                                <Text style={[common.minYellowFillBtnText]}>确认收货</Text>
                            </TouchableOpacity>
                        </View> : null
                }

            </View>
        )
    }


    constructor(props) {
        super(props);
        this.state = {
            date: '2022/09/30 14:40:24',
            time: {},
            detail: {},
            ifshowpic: 0,
            showPayModal: false,
            pay_type: 10,

            user: {},
            userCoin: {},
            userInfo: {},
        }
    }

    componentWillUnmount() {
        this.stop();
    }
    componentDidMount() {
        this.getUserDetails()
        this.getUserOrderDetails()
        // this.interval = setInterval(() => {
        //     var time = this.getDateData(this.state.date);
        //     if (time) {
        //         this.setState({ time });
        //     } else {
        //         this.stop();
        //     }
        // }, 1000);
    }

    payNow() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        // console.log(this.state.detail)
        fromData['order_id'] = this.state.detail.order.order_id;
        fromData['pay_type'] = this.state.pay_type;
        // console.log(fromData)
        getProductPay(fromData, res => {
        // console.log('res-----------1')
        // console.log(res)
            if (res.code == 1) {
                // 余额
                if (this.state.pay_type == 10) {
                    Toast.show('支付成功');
                    that.getUserOrderDetails()
                }
                // 支付宝
                if (this.state.pay_type == 15) {
                    that.getUserOrderDetails()
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


    getUserDetails() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getUserDetail(fromData, res => {
        // console.log('res--------')
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

    confirmGet() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        fromData['order_id'] = this.props.route.params.order_id;
        getOrderReceipt(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                Toast.show('提交成功')
                that.setState({
                    ifshowmodal2: 0
                }, () => {
                    that.getUserOrderDetails()
                })
            } else {
                Toast.show(res.msg, 2000);
            }
        })
    }

    getUserOrderDetails() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        fromData['order_id'] = this.props.route.params.order_id;
        getUserOrderDetail(fromData, res => {
        // console.log('res-----------22')
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

    // 取消订单
    cancelOrder() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        fromData['order_id'] = this.props.route.params.order_id;

        if (this.state.detail.order.is_online == 2) {
            getOrderOfflineCancel(fromData, res => {
            // console.log(res)
                if (res.code == 1) {
                    Toast.show('提交成功')
                    this.setState({
                        ifshowmodal: 0
                    })
                    setTimeout(function () {
                        that.props.route.params.refresh();
                        navigation.navigate('orderIndex')
                    }, 1000)
                } else {
                    this.setState({
                        ifshowmodal: 0
                    })
                    Toast.show(res.msg)
                }
            })
        } else {
            getOrderCancel(fromData, res => {
            // console.log(res)
                if (res.code == 1) {
                    Toast.show('提交成功')
                    this.setState({
                        ifshowmodal: 0
                    })
                    setTimeout(function () {
                        that.props.route.params.refresh();
                        navigation.navigate('orderIndex')
                    }, 1000)
                } else {
                    this.setState({
                        ifshowmodal: 0
                    })
                    Toast.show(res.msg)
                }
            })
        }
    }

    // getOrders() {
    //     var that = this;
    //     AsyncStorage.getItem('address_id').then((value) => {
    //     // console.log(value)
    //         that.setState({
    //             address_id: value == null ? 0 : value,
    //         })
    //     });
    //     let { navigation } = this.props;
    //     var fromData = {};
    //     fromData['goods_id'] = this.props.route.params.goods_id;
    //     fromData['goods_num'] = this.props.route.params.goods_num;
    //     fromData['goods_sku_id'] = this.props.route.params.goods_sku_id;
    //     fromData['address_id'] = this.state.address_id;
    //     fromData['pay_type'] = this.state.pay_type;
    // // console.log(fromData)
    //     getBuyNowPost(fromData, res => {
    //     // console.log(res)
    //         if (res.code == 1) {
    //             this.setState({
    //                 detail: res.data
    //             })
    //         } else if (res.code == -1) {
    //             Toast.show(res.msg);
    //             setTimeout(function () {
    //                 navigation.navigate('login')
    //             }, 2000)
    //         } else {
    //             Toast.show(res.msg, 2000);
    //         }
    //     })
    // }

    async copy(strs) {
        if (strs == '') {
            return;
        }
        Clipboard.setString(strs);
        let str = await Clipboard.getString();
        // console.log(str)//我是文本
        Toast.show('复制成功');
    }
    stop() {
        clearInterval(this.interval);
    }
    // 数字前面补0
    leadingZeros(num, length = null) {
        let length_ = length;
        let num_ = num;
        if (length_ === null) {
            length_ = 2;
        }
        num_ = String(num_);
        while (num_.length < length_) {
            num_ = '0' + num_;
        }
        return num_;
    }
    getDateData(endDate) {
        let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date)) / 1000;
        if (!!this.state.isOrederTime) {
            diff = (Date.parse(new Date(endDate)) + (Number(this.state.isOrederTime) * 60 * 1000) - Date.parse(new Date)) / 1000;
        }

        if (diff <= 0) {
            return false;
        }
        const timeLeft = {
            years: 0,
            days: 0,
            hours: 0,
            min: 0,
            sec: 0,
            millisec: 0,
        };

        if (diff >= (365.25 * 86400)) {
            timeLeft.years = Math.floor(diff / (365.25 * 86400));
            diff -= timeLeft.years * 365.25 * 86400;
        }
        if (diff >= 86400) {
            timeLeft.days = Math.floor(diff / 86400);
            diff -= timeLeft.days * 86400;
        }
        if (diff >= 3600) {
            timeLeft.hours = Math.floor(diff / 3600);
            diff -= timeLeft.hours * 3600;
        }
        if (diff >= 60) {
            timeLeft.min = Math.floor(diff / 60);
            diff -= timeLeft.min * 60;
        }
        timeLeft.sec = diff;
        // console.log(timeLeft)
        return timeLeft;
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

    showPayModal() {
        this.setState({
            showPayModal: !this.state.showPayModal
        })
    }


}
export default page;