
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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import HTMLView from 'react-native-htmlview'
import { getaddressIndex, getPhoneCode, getCardIndex, getUserDetail, getWalletCash, getCashSetting } from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import common from '../../css/common.js'
// import css from '../../css/address'
import css from '../../css/cash'
import Code from '../auth/code';

class page extends React.Component {
    render() {
        var that = this;
        let { navigation } = this.props;
        return (
            <View style={common.body}>
                {/* 头部 */}
                <View style={[common.header]}>
                    <TouchableOpacity onPress={() => { navigation.goBack(); }} style={common.headerLeft}>
                        <Image source={require('../../image/return.png')} style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>提现</Text></View>
                    <TouchableOpacity onPress={() => { navigation.navigate('cashrecord'); }} style={common.headerRight}><Text style={common.headerRightText}>提现记录</Text></TouchableOpacity>
                </View>

                <View style={[common.main, { paddingLeft: 20, paddingRight: 20, marginTop: 0 }]}>
                    {this.state.list.length == 0 ?
                        <View style={[common.alignItemsB, css.to]}><Text style={css.text}>请先绑定银行卡</Text>
                            <TouchableOpacity onPress={this.toAdd.bind(this)}>
                                <Text style={common.yellow}>点击前往</Text>
                            </TouchableOpacity>
                        </View> :
                        <View style={[common.alignItemsB, css.to]}><Text style={css.text}>到账银行卡</Text>
                            <TouchableOpacity onPress={this.showPayModal.bind(this)}>
                                <Text style={this.state.liIndex == -1 ? common.gray : css.text}>{this.state.liIndex == -1 ? '请选择' : this.state.list[this.state.liIndex].bank_name + '(尾号' + this.getStr(this.state.list[this.state.liIndex].card_number) + ')'}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    <View style={[common.columnStart, css.pad]}>
                        <Text style={css.text}>提现金额</Text>
                        <View style={common.alignItemsB}>
                            <View style={common.alignItemsCenter}>
                                <Text style={css.symbol}>￥</Text>
                                <TextInput
                                    style={[css.TextInput, { width: '72%', fontSize: 17, }]}
                                    onChangeText={(value) => this.setState({ inputValue: value })}
                                    value={this.state.inputValue} placeholder='请输入提现金额' placeholderTextColor={'#D4D4D4'}
                                />
                            </View>
                            <TouchableOpacity onPress={this.allIn.bind(this)}><Text style={css.all}>全部提现</Text></TouchableOpacity>
                        </View>
                    </View>
                    
                    <View style={[common.alignItemsCenter, { marginTop: 14 }]}><Text style={{ color: '#A5A5A5' }}>当前可用余额：</Text><Text style={{ color: '#999999' }}>￥</Text><Text style={{ color: '#999999', fontSize: 17, fontWeight: 'bold', marginTop: -3 }}>{this.state.all}</Text></View>
                    
                    <View style={[common.alignItemsCenter, css.password, { paddingBottom:0 }]}>
                        <Text style={css.text}>交易密码</Text>
                        <TextInput secureTextEntry={true} value={this.state.payment} onChangeText={(text) => { this.setState({ payment: text }) }} placeholder="请输入交易密码" placeholderTextColor={'#D4D4D4'} style={[css.TextInput, { marginLeft: 10, }]} />
                    </View>
                    <View style={[common.alignItemsCenter, css.password,{marginBottom: 45,marginTop:10}]}>
                        <Text style={css.text}>验证码</Text>
                        <TextInput type="text" value={this.state.code} onChangeText={(text) => { this.setState({ code: text }) }} placeholder="请输入短信验证码" placeholderTextColor={'#D4D4D4'}  style={[css.TextInput, { marginLeft: 25,width: width / 1.5 - 60 }]}/>
                        <Code ref="child" onRef={(ref) => { this.child = ref }} MakeMoney={this.getcode.bind(this)} />
                    </View>
                    {
                        this.state.settingData != '' ?
                            <HTMLView
                                stylesheet={style}
                                value={this.escape2Html(this.state.settingData.des)}
                            /> : null
                    }
                </View>

                {
                    this.state.showPayModal == true ?
                        <View style={common.maskCenter}>
                            <View style={common.payModal}>
                                <Text style={[common.modalTittle, { marginBottom: 20 }]}>请选择银行卡</Text>
                                <TouchableOpacity onPress={this.showPayModal.bind(this)} style={common.closeWrap}><Image source={require('../../image/close.png')} style={common.close} /></TouchableOpacity>

                                <ScrollView style={{ maxHeight: height / 2 }}>
                                    {this.state.list.map((item, index) => {
                                        return (
                                            <TouchableOpacity onPress={this.changeCard.bind(this, index)} style={common.payLi} key={index}>
                                                <View style={common.alignItemsCenter}>
                                                    {/* <Image source={require('../../image/card.png')} style={common.payIcon} /> */}
                                                    <Text style={common.payStrong}>{item.bank_name}<Text style={{ color: '#A5A5A5' }}>(尾号{this.getStr(item.card_number)})</Text></Text>
                                                </View>
                                                {this.state.liIndex == index ? <Image source={require('../../image/tick.png')} style={common.payTick} /> : null}
                                            </TouchableOpacity>
                                        );
                                    })}
                                </ScrollView>
                            </View>
                        </View> : null
                }
                {/* 空页面时的按钮  重要！勿删 */}
                <TouchableOpacity onPress={this.submit.bind(this)} style={[css.linearBtn, { position: 'absolute', bottom: 10, marginTop: 58, marginLeft: 15, width: width - 30 }]}>
                    <LinearGradient colors={['#F6BF0A', '#F3A316']} style={common.linearBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>提现</Text></LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            ifshowmodal: 0,
            from: 0,
            all: '',
            inputValue: '',
            payment: '',
            liIndex: -1,
            showPayModal: false,
            settingData: '',
            begin:0,
            timeLeft:60,
            timeLeftString:'获取验证码',
        }
    }

    componentDidMount() {
        // console.log(this.props.route.params.from)
        // Toast.show('res.msg, 2000');
        // this.state.from = this.props.route.params.from;
        this.getUserDetails();
        this.getCardIndexs();
        this.getCashSettings();
    }

    init(){
        this.getCardIndexs();
    }

    toAdd() {
        let that = this;
        let { navigation } = this.props;
        navigation.navigate("cardAdd", {
            refresh: function () {
                that.init();
            }
        });
    }

    getCashSettings() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getCashSetting(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                this.setState({
                    settingData: res.data.setting
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

    submit() {
        var that = this;
        let { navigation } = this.props;
        if (this.state.liIndex == -1) { return Toast.show('请选择银行卡'); }
        if (this.state.total_money == '') { return Toast.show('请输入提现金额'); }
        if (this.state.payment == '') { return Toast.show('请选择银行卡'); }
        var fromData = {};
        fromData['card_id'] = this.state.list[this.state.liIndex].card_id;
        fromData['total_money'] = this.state.inputValue;
        fromData['payment'] = this.state.payment;
        fromData['code'] = this.state.code;
    // console.log(fromData)
        getWalletCash(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                Toast.show('提交成功');

                setTimeout(() => {
                    that.setState({
                        inputValue: '',
                        payment: '',
                    })
                    that.getUserDetails()
                    navigation.navigate('cashrecord')
                }, 1000);
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

    
    getcode() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        fromData['type'] = 5;
        getPhoneCode(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                Toast.show('发送成功');
                that.child._beginCountDown();
            } else {
                Toast.show(res.msg);
            }
        })
    }

    escape2Html(str) {
        // console.log(str)
        var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
        return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; });
    }

    getStr(str) {
        var res = str.substr(-4)
        return res;
    }

    getCardIndexs() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getCardIndex(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                this.setState({
                    list: res.data.list.data
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

    changeCard(index) {
        this.setState({
            liIndex: index
        }, this.showPayModal())
    }

    showPayModal() {
        this.setState({
            showPayModal: !this.state.showPayModal
        })
    }

    // 用户信息
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
                    all: res.data.userCoin.money,
                })
            }
        })
    }

    allIn() {
        this.setState({
            inputValue: this.state.userCoin.money.toString(),
        })
    }
    returnWhere(item) {
        var that = this;
    // console.log('item-------')
    // console.log(item)
        // return;
        // Toast.show(id)
        // Toast.show(this.state.from)
        // console.log(this.props.route)
        // return;
        if (that.state.from == 1) {
            // Toast.show('res.msg, 2000');
            AsyncStorage.setItem('addressdata', JSON.stringify(item), function (error) {
                if (error) {
                // console.log(error)
                } else {
                    that.props.route.params.refresh();
                    that.props.navigation.goBack();
                }
            })
        }
    }

}
const style = StyleSheet.create({
    p: {
        padding: 0,
        margin: 0,
        // lineHeight:10,
        // backgroundColor:'pink',
        marginTop: -25,
    }
});
export default page;