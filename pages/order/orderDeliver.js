
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
} from 'react-native';

import { getLogin } from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import common from '../../css/common.js'
import css from '../../css/orderIndex.js'
import ca from '../../css/orderWaitPay.js'

class page extends React.Component {
    state = {
        date: '2022/09/30 14:40:24',
        time: {},
    }
    render() {
        let { navigation } = this.props;
        let time = this.state.time;
        // console.log(time)
        return (
            <View style={common.body}>
                <ScrollView style={[common.ScrollView, { height: height }]} showsVerticalScrollIndicator={false}>
                    <Image source={require('../../image/orderbg.png')} style={ca.orderbg} />
                    {/* 头部 */}
                    <View style={[common.headerIn, common.headerInT, { backgroundColor: 'transparent', }]}>
                        <TouchableOpacity onPress={() => { navigation.goBack(); }} style={common.headerLeft}>
                            <Image source={require('../../image/return2.png')} style={common.returnIcon} />
                        </TouchableOpacity >
                        <View style={common.headerTitle}><Text style={common.headerTitleText2}>订单详情</Text></View>
                    </View>

                    <View style={common.columnCenter}>
                        <Image source={require('../../image/clock.png')} style={ca.clock} />
                        <Text style={ca.clockH1}>等待商家发货</Text>
                        <Text style={ca.clockP}>剩余{time.hours}小时{time.min}分{time.sec}秒自动关闭</Text>
                    </View>

                    <View style={[common.alignItemsB, ca.address]}>
                        <Image source={require('../../image/address2.png')} style={ca.addressIcon} />
                        <View style={[common.columnStart, { width: '87%' }]}>
                            <View style={common.alignItemsCenter}><Text style={ca.name}>肖沫沫</Text><Text style={ca.tel}>18888888888</Text></View>
                            <Text style={ca.detail}>广东省 深圳市 宝安区 长丰村云龙东路1号 银河商贸转321富路商店</Text>
                        </View>
                        {/* <Image source={require('../../image/more.png')} style={ca.addressMore} /> */}
                    </View>

                    <View style={common.grayLine5}></View>

                    <View style={css.orderBlock}>
                        <View style={[common.alignItemsB, {
                            marginTop: 10, borderBottomWidth: 1,
                            borderColor: '#f5f5f5',
                            paddingBottom: 15,
                        }]}>
                            <Image style={css.orderImage} source={require('../../image/product.png')} />
                            <View style={css.orderInfoName}>
                                <Text style={css.orderName} numberOfLines={2}>MIUCO法式印花刺绣花边领高腰修身荷叶边摆连衣裙女2021夏季新款MIUCO法式印花刺绣花边领高腰修身荷叶边摆连衣裙女2021夏季新款</Text>
                                <Text style={css.orderSku}>清新绿，L码</Text>
                                <View style={common.alignItemsB}>
                                    <Text style={css.price}>￥499.90</Text>
                                    <Text style={css.number}>X1</Text>
                                </View>
                            </View>
                        </View>
                        <View style={ca.li}><Text style={ca.label}>优惠</Text><Text style={ca.strong}>满200减10，购买赠送200积分</Text></View>
                        <View style={ca.li}><Text style={ca.label}>返还</Text><Text style={ca.strong}>购买可赠送200积分</Text></View>
                        <View style={ca.li}><Text style={ca.label}>购买数量</Text><Text style={ca.label}>1件</Text></View>
                        <View style={ca.li}><Text style={ca.label}>商品总价</Text><Text style={ca.label}>￥509.90</Text></View>
                        <View style={[common.alignItemsE, { marginTop: 25 }]}>
                            <Text style={common.gray}>共1件商品，实际支付：</Text>
                            <Text style={common.red}>￥</Text>
                            <Text style={[css.totalPrice, { fontSize: 18, marginTop: -3 }]}>499.90</Text>
                        </View>
                    </View>

                    <View style={common.title}><View style={common.titleDot}></View><Text style={common.titleText}>订单详情</Text></View>
                    <View style={ca.p}><Text style={ca.pText}>订单编号</Text><Text style={ca.pText}>DJ24640045400000458</Text></View>
                    <View style={ca.p}><Text style={ca.pText}>创建时间</Text><Text style={ca.pText}>2022/09/22 14:40:24</Text></View>
                    <View style={ca.p}><Text style={ca.pText}>付款时间</Text><Text style={ca.pText}>--</Text></View>
                    <View style={[ca.p, { paddingBottom: 40 }]}><Text style={ca.pText}>完成时间</Text><Text style={ca.pText}>--</Text></View>

                </ScrollView>
            </View>
        )
    }
    componentWillUnmount() {
        this.stop();
    }

    stop() {
        clearInterval(this.interval);
    }
    componentDidMount() {
        this.interval = setInterval(() => {
            var time = this.getDateData(this.state.date);
            if (time) {
                this.setState({ time });
            } else {
                this.stop();
            }
        }, 1000);
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


}
export default page;