
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
import css from '../../css/discounts.js'

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
                {/* 头部 */}
                <View style={[common.header]}>
                    <TouchableOpacity onPress={() => { navigation.goBack(); }} style={common.headerLeft}>
                        <Image source={require('../../image/return.png')} style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>优惠</Text></View>
                </View>
                <ScrollView style={[common.ScrollViewHasHeader]} showsVerticalScrollIndicator={false}>
                    <View style={css.block}>
                        <View style={common.alignItemsB}><Text style={css.money}>￥10</Text><Text style={css.jian}>满减折扣</Text></View>
                        <Text style={css.full}>满200可用</Text>
                        <View style={[common.alignItemsB,{borderTopWidth:1,borderColor:'#F2F2F2',marginTop:6,paddingTop:10}]}>
                            <Text style={css.own}>优惠券金额和解释权归商家所有</Text>
                            <TouchableOpacity style={[css.linearBtn, {width: 60,}]}>
                                <LinearGradient colors={['#F6BF0A', '#F3A316']} style={[common.linearBtn,{height:28,borderRadius:3}]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={[common.linearBtnText,{lineHeight:28,}]}>使用</Text></LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={css.block}>
                        <View style={common.alignItemsB}><Text style={css.money}>￥10</Text><Text style={css.jian}>满减折扣</Text></View>
                        <Text style={css.full}>满200可用</Text>
                        <View style={[common.alignItemsB,{borderTopWidth:1,borderColor:'#F2F2F2',marginTop:6,paddingTop:10}]}>
                            <Text style={css.own}>优惠券金额和解释权归商家所有</Text>
                            <TouchableOpacity style={[css.linearBtn, {width: 60,}]}>
                                <LinearGradient colors={['#F6BF0A', '#F3A316']} style={[common.linearBtn,{height:28,borderRadius:3}]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={[common.linearBtnText,{lineHeight:28,}]}>使用</Text></LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
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