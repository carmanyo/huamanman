
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
// import AsyncStorage from '@react-native-async-storage/async-storage'

import { getaddressIndex, getaddressDel, getSetDefault } from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import common from '../../css/common.js'
import css from '../../css/address'

class address extends React.Component {
    render() {
        var that = this;
        // setTimeout(function () {
        //     that.getData();
        // }, 100)
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
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>收货地址</Text></View>
                </View>
                <ScrollView style={[common.ScrollViewHasHeaderAndBottom]} showsVerticalScrollIndicator={false}>
                    <View style={[css.addressList, { marginTop: 10 }]}>
                        {
                            this.state.list.length == 0 ?
                                <View style={common.empty}>
                                    <Image style={common.emptyIcon} source={require('../../image/empty2.png')} />
                                    <Text style={common.emptyH1}>暂无收货地址</Text>
                                    <Text style={common.emptyP}>您还未登记收货地址</Text>
                                    <Text style={common.emptyP}>为保障您的权益,方便进行操作请及时绑定</Text>
                                </View> : this.state.list.map((item, index) => {
                                    return (
                                        <TouchableOpacity onPress={this.ifGoBack.bind(this, item.address_id)} style={[css.addressBlock]} key={index}>
                                            <View style={css.leftText}>
                                                <View style={[css.relation, common.FLR]}>
                                                    <Text style={css.nameTel}>{item.name}</Text>
                                                    <Text style={css.tel}>{item.phone}</Text>
                                                </View>
                                                <Text style={css.addressBox}>{item.region.province}-{item.region.city}-{item.region.region} {item.detail}</Text>
                                            </View>
                                            <View style={[common.alignItemsB, { marginTop: 15, }]}>
                                                <TouchableOpacity onPress={this.setDefault.bind(this, item.address_id)} style={common.alignItemsCenter}>
                                                    {
                                                        item.is_default == 1 ? <Image style={css.check} source={require('../../image/check.png')} /> : <Image style={css.check} source={require('../../image/uncheck.png')} />
                                                    }
                                                    {
                                                        item.is_default == 1 ?<Text style={css.btnText}>默认地址</Text>:<Text style={css.btnText}>设为默认</Text>
                                                    }
                                                    
                                                </TouchableOpacity>
                                                <View style={common.alignItemsCenter}>
                                                    <TouchableOpacity onPress={() => { this.setState({ id: item.address_id, name: item.name, mobile: item.phone, area: item.region.province + '-' + item.region.city + '-' + item.region.region, detail: item.detail, type: item.is_default }, this.addressedit.bind(this)) }} style={common.alignItemsCenter}><Image style={css.editIcon} source={require('../../image/edit2.png')} /><Text style={css.btnText}>编辑</Text></TouchableOpacity>
                                                    <TouchableOpacity onPress={() => { this.setState({ ifshowmodal: 1, id: item.address_id }) }} style={[common.alignItemsCenter, { marginLeft: 37 }]}><Image style={css.editIcon} source={require('../../image/delete2.png')} /><Text style={css.btnText}>删除</Text></TouchableOpacity>
                                                </View>
                                            </View>
                                            <View style={[common.grayLine5, { marginLeft: -30, marginTop: 15 }]}></View>
                                        </TouchableOpacity>
                                    );
                                })
                        }
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={this.addressadd.bind(this)} style={[css.linearBtn, { position: 'absolute', bottom: 10, marginTop: 58, marginLeft: 15, width: width - 30 }]}>
                    <LinearGradient colors={['#F6BF0A', '#F3A316']} style={common.linearBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>添加收货地址</Text></LinearGradient>
                </TouchableOpacity>

                {/* 删除弹窗 */}
                {/* <View style={common.mask}></View>
                <View style={common.askModal}>
                    <Text style={common.askTitle}>确定要删除该地址吗？</Text>
                    <View style={common.askOperation}>
                        <TouchableOpacity onPress={()=>{navigation.goBack();}} type="default"><Text style={common.cancelBtn}>取消</Text></TouchableOpacity>
                        <TouchableOpacity onPress={()=>{navigation.goBack();}} type="default"><Text style={common.confirmBtn}>删除</Text></TouchableOpacity>
                    </View>
                </View> */}


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
        // this.addressedit = this.addressedit.bind(this)
    }

    componentDidMount() {
    // console.log(this.props.route.params)
        if (this.props.route.params != undefined) {
            this.state.from = this.props.route.params.from;
        }
        this.init();
    }
    async ifGoBack(address_id) {
    // console.log('ifGoBackifGoBackifGoBack')
        var that = this;
        if (that.state.from == 1) {
            // AsyncStorage.setItem('address_id', address_id.toString(), function (error) {console.log(error)})
            AsyncStorage.setItem('address_id', address_id.toString(), function (error) {
                if (error) {
                // console.log(error)
                } else {
                    that.props.route.params.callback()
                    that.props.navigation.goBack();
                }
            })

            // try {
            //     //设置
            //     await AsyncStorage.setItem('address_id', address_id.toString())
            //     that.props.route.params.callback()
            //     that.props.navigation.goBack();


            //     AsyncStorage.setItem('address_id', address_id.toString(), err => {
            //         err && console.log(err.toString());
            //      })
            //     //读取
            //     // AsyncStorage.getItem('键名',回调函数(可选))
            //     //删除
            //     //  AsyncStorage.removeItem('键名',回调函数(可选))

            // } catch (e) {
            // // console.log(e)
            // }
        }
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
                    // that.props.route.params.refresh();
                    // that.props.navigation.goBack();
                }
            })
        }
    }
    init() {
        this.getData();
    }
    setDefault(address_id) {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        fromData['address_id'] = address_id
        getSetDefault(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                Toast.show('已设置为默认地址')
                this.getData()
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
    getData() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getaddressIndex(fromData, res => {
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
    delete() {
        var fromData = {};
        fromData['address_id'] = this.state.id;
        getaddressDel(fromData, res => {
            // console.log(res.data.news)
            if (res.code == 1) {
                Toast.show('删除成功');
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
    refresh() {
        this.init
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
            callback: () => this.init()
        });
    }
}
export default address;