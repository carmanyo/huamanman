
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
import { getaddressIndex, getaddressDel } from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import common from '../../css/common.js'
// import css from '../../css/address'
import css from '../../css/cash'

class page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            ifshowmodal: 0,
            from: 0,
            all:'499.90',
            inputValue:'',
        }
        this.addressedit = this.addressedit.bind(this)
    }
    render() {
        var that = this;
        setTimeout(function () {
            that.getData();
        }, 100)
        let { navigation } = this.props;
        let deleteModal = this.state.ifshowmodal == 1 ?
            <View style={{ position: 'absolute', top: 0, left: 0, width: width, height: height }}>
                <View style={common.mask}></View>
                <View style={common.askModal}>
                    <Text style={common.askTitle}>确定要删除该地址吗？</Text>
                    <View style={common.askOperation}>
                        <TouchableOpacity onPress={() => { this.setState({ ifshowmodal: 0 }) }} type="default"><Text style={common.cancelBtn}>取消</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.delete() }} type="default"><Text style={common.confirmBtn}>删除</Text></TouchableOpacity>
                    </View>
                </View>
            </View> : null;
        return (
            <View style={common.body}>
                {deleteModal}
                {/* 头部 */}
                <View style={[common.header]}>
                    <TouchableOpacity onPress={() => { navigation.goBack(); }} style={common.headerLeft}>
                        <Image source={require('../../image/return.png')} style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>兑换余额</Text></View>
                    <TouchableOpacity onPress={()=>{navigation.navigate('exchangeRecord');}} style={common.headerRight}><Text style={common.headerRightText}>兑换记录</Text></TouchableOpacity>
                </View>

                <View style={[common.main, { paddingLeft: 20, paddingRight: 20 }]}>
                    <View style={[common.alignItemsB, css.to]}><Text style={css.text}>兑换方式</Text><Text style={css.text}>积分兑换余额</Text></View>
                    <View style={[common.alignItemsB, css.to]}><Text style={css.text}>兑换比例</Text><Text style={css.text}>积分：余额 =2：1</Text></View>
                    <View style={[common.columnStart, css.pad]}>
                        <Text style={css.text}>兑换金额</Text>
                        <View style={common.alignItemsB}>
                            <View style={common.alignItemsCenter}>
                                {/* <Text style={css.symbol}>￥</Text> */}
                                <TextInput
                                    style={[css.TextInput,{ width: '78%', fontSize:17,}]}
                                    onChangeText={(value) => this.setState({ inputValue: value })}
                                    value={this.state.inputValue} placeholder='请输入兑换金额' placeholderTextColor={'#D4D4D4'}
                                />
                            </View>
                            <TouchableOpacity onPress={this.all.bind(this)}><Text style={css.all}>全部兑换</Text></TouchableOpacity>
                        </View>
                    </View>
                    <View style={[common.alignItemsCenter,{marginTop:14}]}><Text style={{color:'#A5A5A5'}}>当前可用积分：</Text><Text style={{color:'#999999'}}>￥</Text><Text style={{color:'#999999',fontSize:17,fontWeight:'bold',marginTop:-3}}>{this.state.all}</Text></View>
                    <View style={[common.alignItemsCenter,css.password]}>
                        <Text style={css.text}>交易密码</Text>
                        <TextInput secureTextEntry={true}  onChangeText={(text) => { this.setState({ oldPwd: text }) }} placeholder="请输入交易密码" placeholderTextColor={'#D4D4D4'} style={[css.TextInput,{marginLeft:10,}]}/>
                    </View>
                </View>
                <View style={[common.alignItemsB,{position: 'absolute', bottom: 70,width:width-60,marginLeft:30,marginRight:30,}]}><Text style={css.text}>实际到账</Text><Text style={css.all}>200</Text></View>
                {/* 空页面时的按钮  重要！勿删 */}
                <TouchableOpacity onPress={this.addressadd.bind(this)} style={[css.linearBtn, { position: 'absolute', bottom: 10, marginTop: 58, marginLeft: 15, width: width - 30 }]}>
                    <LinearGradient colors={['#F6BF0A', '#F3A316']} style={common.linearBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>兑换</Text></LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }

    componentDidMount() {
        // console.log(this.props.route.params.from)
        // Toast.show('res.msg, 2000');
        // this.state.from = this.props.route.params.from;
        // this.getData();
    }

    all(){
        this.setState({
            inputValue:this.state.all,
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
    getData() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getaddressIndex(fromData, res => {
        // console.log(res.data)
            if (res.code == 1) {
                this.setState({
                    list: res.data
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
    delete() {
        var fromData = {};
        fromData['id'] = this.state.id;
        getaddressDel(fromData, res => {
        // console.log(res.data.news)
            if (res.code == 1) {
                Toast.show(res.msg);
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
    addressadd() {
        let that = this;
        let { navigation } = this.props;
        navigation.navigate("addressadd", {
            refresh: function () {
                that.init();
            }
        });
    }
    addressedit() {
        // Toast.show(this.state.id)
        // id:item.id,name:item.name,mobile:item.mobile,area:item.area,detail:item.detail,type:item.type
        let that = this;
        let { navigation } = this.props;
        navigation.navigate("addressedit", {
            id: this.state.id,
            name: this.state.name,
            mobile: this.state.mobile,
            area: this.state.area,
            detail: this.state.detail,
            type: this.state.type,
        }, {
            refresh: function () {
                that.init();
            }
        });
    }
}
export default page;