
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
import { getaddressIndex, getaddressDel, getCardIndex, getCardDelete } from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import common from '../../css/common.js'
import css from '../../css/address'
import css2 from '../../css/discounts.js'

class page extends React.Component {
    render() {
        var that = this;
        let { navigation } = this.props;
        let deleteModal = this.state.ifshowmodal == 1 ?
            <View style={{ position: 'absolute', top: 0, left: 0, width: width, height: height }}>
                <View style={common.mask}></View>
                <View style={common.askModal}>
                    <Text style={common.askTitle}>确定要解绑该银行卡吗？</Text>
                    <View style={common.askOperation}>
                        <TouchableOpacity onPress={() => { this.setState({ ifshowmodal: 0 }) }} type="default"><Text style={common.cancelBtn}>取消</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.delete() }} type="default"><Text style={common.confirmBtn}>解绑</Text></TouchableOpacity>
                    </View>
                </View>
            </View> : null;
        return (
            <View style={[common.body, { paddingBottom: 0 }]}>
                {deleteModal}
                {/* 头部 */}
                <View style={[common.header]}>
                    <TouchableOpacity onPress={() => { navigation.goBack(); }} style={common.headerLeft}>
                        <Image source={require('../../image/return.png')} style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>银行卡</Text></View>
                    <TouchableOpacity onPress={this.toAdd.bind(this)} style={common.headerRight}><Text style={common.headerRightText}>添加</Text></TouchableOpacity>
                </View>

                <ScrollView style={[common.ScrollViewHasHeader]} showsVerticalScrollIndicator={false}>
                    <View style={[css.addressList, { marginTop: 15, paddingBottom: 100 }]}>

                        {/* 空页面  重要！勿删 */}
                        {
                            this.state.list.length == 0 ?
                                <View style={[common.empty,{marginLeft:-15}]}>
                                    <Image style={common.emptyIcon} source={require('../../image/empty2.png')} />
                                    <Text style={common.emptyH1}>暂无银行卡</Text>
                                    <Text style={common.emptyP}>您还未绑定银行卡</Text>
                                    <Text style={common.emptyP}>为保障您的权益,方便进行操作请及时绑定</Text>
                                </View> : null
                        }

                        {
                            this.state.list.map((item, index) => {
                                return (
                                    <View style={[css2.block, { marginLeft: 0, marginRight: 0, marginTop: 0, marginBottom: 10, width: width - 30 }]} key={index}>
                                        <View style={common.alignItemsB}><Text style={[css2.money, { color: '#333333' }]}>{item.bank_name}</Text></View>
                                        <Text style={[css2.full, { color: '#333333' }]}>持卡人：{item.realname}</Text>
                                        <View style={[common.alignItemsB, { borderTopWidth: 1, borderColor: '#F2F2F2', marginTop: 6, paddingTop: 10 }]}>
                                            <Text style={[css2.own, { color: '#333333' }]}>{item.card_number}</Text>
                                            <TouchableOpacity onPress={() => { this.setState({ ifshowmodal: 1, id: item.card_id }) }} style={[css2.linearBtn, { width: 60, }]}>
                                                <LinearGradient colors={['#F2F2F2', '#F2F2F2']} style={[common.linearBtn, { height: 28, borderRadius: 3 }]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={[common.linearBtnText, { lineHeight: 28, color: '#333333' }]}>解绑</Text></LinearGradient>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            })
                        }

                        {/* <View style={[common.empty, { marginBottom: 104 }]}>
                        <Image style={common.emptyIcon} source={require('../../image/card2.png')} />
                        <Text style={common.emptyH1}>已绑定银行卡</Text>
                    </View>
                    <View style={css.cardLi}><Text style={css.cardText}>姓名</Text><Text style={css.cardText}>肖**</Text></View>
                    <View style={css.cardLi}><Text style={css.cardText}>卡类型</Text><Text style={css.cardText}>中国建设银行</Text></View>
                    <View style={css.cardLi}><Text style={css.cardText}>银行卡卡号</Text><Text style={css.cardText}>620 **** **** **** **** 254</Text></View> */}

                    </View>
                </ScrollView>
                {/* 空页面时的按钮  重要！勿删 */}
                {/* <TouchableOpacity onPress={this.addressadd.bind(this)} style={[css.linearBtn, { position: 'absolute', bottom: 10, marginTop: 58, marginLeft: 15, width: width - 30 }]}>
                    <LinearGradient colors={['#F6BF0A', '#F3A316']} style={common.linearBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>添加银行卡</Text></LinearGradient>
                </TouchableOpacity> */}

                {/* <TouchableOpacity onPress={this.addressadd.bind(this)} style={[common.borderBtn, { position: 'absolute', bottom: 10, marginTop: 58, marginLeft: 15, width: width - 30 }]}>
                    <Text style={common.borderBtnText}>删除银行卡</Text>
                </TouchableOpacity> */}
            </View>
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            ifshowmodal: 0,
            from: 0,
        }
    }
    componentDidMount() {
        // console.log(this.props.route.params.from)
        // Toast.show('res.msg, 2000');
        // this.state.from = this.props.route.params.from;
        this.getData();
    }

    getData() {
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
    init() {
        this.getData();
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

    delete() {
        var fromData = {};
        fromData['card_id'] = this.state.id;
        getCardDelete(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                Toast.show('解绑成功');
                this.getData();
                this.setState({
                    ifshowmodal: 0
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

}
export default page;