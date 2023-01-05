
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
import { getWalletExchangeBalance, getaddressDel, getCardIndex, getUserDetail, getWalletCash, getExchangeSetting, getWalletExchange } from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import common from '../../css/common.js'
// import css from '../../css/address'
import css from '../../css/cash'

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
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>佣金转入余额</Text></View>
                    <TouchableOpacity onPress={() => { navigation.navigate('yongjinToyueRecord'); }} style={common.headerRight}><Text style={common.headerRightText}>转入记录</Text></TouchableOpacity>
                </View>
                <View style={[common.alignItemsCenter, { marginTop: 14, marginLeft: 20, }]}><Text style={{ color: '#A5A5A5' }}>当前佣金：</Text><Text style={{ color: '#999999' }}></Text><Text style={{ color: '#999999', fontSize: 17, fontWeight: 'bold', marginTop: -3 }}>{this.state.all}</Text></View>
                <View style={[common.main, { paddingLeft: 20, paddingRight: 20, marginTop: 0 }]}>
                    <View style={[common.columnStart, css.pad]}>
                        <Text style={css.text}>转入数量</Text>
                        <View style={common.alignItemsB}>
                            <View style={common.alignItemsCenter}>
                                <Text style={css.symbol}>￥</Text>
                                <TextInput
                                    style={[css.TextInput, { width: '72%', fontSize: 17, }]}
                                    onChangeText={(value) => this.numInput({ inputValue: value })}
                                    value={this.state.inputValue} placeholder='请输入转入数量' placeholderTextColor={'#D4D4D4'}
                                />
                            </View>
                            <TouchableOpacity onPress={this.allIn.bind(this)}><Text style={css.all}>全部转入</Text></TouchableOpacity>
                        </View>
                    </View>

                    {/* <View style={common.alignItemsB}> */}
                    {/* <View style={[common.alignItemsCenter, { marginTop: 14 }]}><Text style={{ color: '#A5A5A5' }}>销毁积分：</Text><Text style={{ color: '#999999' }}></Text><Text style={{ color: '#999999', fontSize: 17, fontWeight: 'bold', marginTop: -3 }}>{this.state.destroy}</Text></View> */}
                    {/* <View style={[common.alignItemsCenter, { marginTop: 14 }]}><Text style={{ color: '#A5A5A5' }}>实际转入：</Text><Text style={{ color: '#999999' }}></Text><Text style={{ color: '#999999', fontSize: 17, fontWeight: 'bold', marginTop: -3 }}>{this.state.get}</Text></View> */}
                    {/* </View> */}
                    <View style={[common.alignItemsCenter, css.password, { marginBottom: 50 }]}>
                        <Text style={css.text}>交易密码</Text>
                        <TextInput secureTextEntry={true} value={this.state.payment} onChangeText={(text) => { this.setState({ payment: text }) }} placeholder="请输入交易密码" placeholderTextColor={'#D4D4D4'} style={[css.TextInput, { marginLeft: 10, }]} />
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
                                                    <Image source={require('../../image/card.png')} style={common.payIcon} />
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
                    <LinearGradient colors={['#F6BF0A', '#F3A316']} style={common.linearBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>转入</Text></LinearGradient>
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
            destroy: 0,
            get: 0,
            biliData: '',
            pondData: '',
        }
    }

    componentDidMount() {
        // console.log(this.props.route.params.from)
        // Toast.show('res.msg, 2000');
        // this.state.from = this.props.route.params.from;
        this.getUserDetails();
        this.getCardIndexs();
        this.getExchangeSettings();
    }

    numInput(e) {
    // console.log(e)
    // console.log(Number(e.inputValue))
    // console.log(Number(this.state.all))
        if (Number(e.inputValue) > Number(this.state.all)) {
            return Toast.show('可用积分不足');
        }
        this.setState({
            inputValue: e.inputValue
        }, () => {
        // console.log(this.state.biliData)
        // console.log(this.state.pondData)
            var biliData = this.state.biliData;
            var pondData = this.state.pondData;
            for (var i = 0; i < biliData.length; i++) {
                if (Number(pondData.integral) <= biliData[i].val) {
                    var rate = biliData[i].rate;
                    this.setState({
                        destroy: (Number(e.inputValue) * rate / 100).toFixed(6),
                        get: (Number(e.inputValue) - Number(e.inputValue) * rate / 100).toFixed(6),
                    })
                    break;
                }
            }
        })
    }

    allIn() {
        // this.setState({
        //     inputValue: this.state.userCoin.integral.toString(),
        // })
        if(Number(this.state.userCoin.integral) == 0){
            return Toast.show('可用积分不足');
        }

        var biliData = this.state.biliData;
        var pondData = this.state.pondData;
        for (var i = 0; i < biliData.length; i++) {
            if (Number(pondData.integral) <= biliData[i].val) {
                var rate = biliData[i].rate;
                this.setState({
                    inputValue:this.state.userCoin.balance.toString(),
                    destroy: (Number(this.state.userCoin.integral) * rate / 100).toFixed(6),
                    get: (Number(this.state.userCoin.integral) - Number(this.state.userCoin.integral) * rate / 100).toFixed(6),
                })
                break;
            }
        }
    }

    getExchangeSettings() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getExchangeSetting(fromData, res => {
        // console.log('res-------------')
        // console.log(res)
            if (res.code == 1) {
                this.setState({
                    settingData: res.data.setting,
                    biliData: res.data.bili,
                    pondData: res.data.pond,
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
        // if (this.state.liIndex == -1) { return Toast.show('请选择银行卡'); }
        if (this.state.inputValue == '') { return Toast.show('请输入转入数量'); }
        if (this.state.payment == '') { return Toast.show('请输入交易密码'); }
        var fromData = {};
        // fromData['card_id'] = this.state.list[this.state.liIndex].card_id;
        fromData['number'] = this.state.inputValue;
        fromData['payment'] = this.state.payment;
    // console.log(fromData)
    getWalletExchangeBalance(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                Toast.show('提交成功');

                setTimeout(() => {
                    that.setState({
                        inputValue: '',
                        payment: '',
                    })
                    that.getUserDetails()
                    navigation.navigate('yongjinToyueRecord')
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

    escape2Html(str) {
        // console.log(str)
        var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"', };
        // console.log(str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; }))
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
                    all: res.data.userCoin.balance,
                })
            }
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