
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
    Picker,
    Dimensions,
    Overlay,
    Animated,
    Easing,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
// 读取本地json文件
let jsonData = require('./area.json')
import { getaddressAdd, getPhoneCode, getCardAdd } from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
// console.log('height--------')
// console.log(height)

import common from '../../css/common.js'
import css from '../../css/addressadd.js'
import Code from '../auth/code';

class addressadd extends React.Component {
    render() {
        let { navigation } = this.props;
        let maskBg = this.state.showMask == 1 ? <View style={common.mask}></View> : null;
        let mask = this.state.showMask == 1 ? <TouchableOpacity style={[common.mask, { opacity: 0 }]} onPress={this.hideModal.bind(this)}></TouchableOpacity> : null;
        return (
            <View style={[common.bodyGrayHasS, { flex: 1 }]}>
                {/* 头部 */}
                <View style={[common.header]}>
                    <TouchableOpacity onPress={() => { navigation.goBack(); }} style={common.headerLeft}>
                        <Image source={require('../../image/return.png')} style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>添加银行卡</Text></View>
                </View>

                <ScrollView style={common.ScrollViewHasHeader} showsVerticalScrollIndicator={false}>
                    <View style={css.whiteBg}>
                        <View style={css.inputWrap}>
                            <Text style={css.inputWrapLabel}>持卡人:</Text>
                            <TextInput type="text" value={this.state.realname} onChangeText={(text) => { this.setState({ realname: text }) }} placeholder="户主姓名" />
                        </View>
                        <View style={css.inputWrapNoBorder}>
                            <Text style={css.inputWrapLabel}>开户行:</Text>
                            <TextInput type="tel" value={this.state.bank_name} onChangeText={(text) => { this.setState({ bank_name: text }) }} placeholder="开户行名称" />
                        </View>
                        <View style={css.inputWrap}>
                            <Text style={css.inputWrapLabel}>开户支行:</Text>
                            <TextInput type="text" value={this.state.branch} onChangeText={(text) => { this.setState({ branch: text }) }} placeholder="开户行支行" />
                        </View>
                        <View style={css.inputWrap}>
                            <Text style={css.inputWrapLabel}>银行卡号:</Text>
                            <TextInput type="text" value={this.state.card_number} onChangeText={(text) => { this.setState({ card_number: text }) }} placeholder="银行卡号" />
                        </View>
                        <View style={[common.grayLine5, { marginLeft: -30 }]}></View>

                        {/* <View style={[css.inputWrap]}>
                            <Text style={css.inputWrapLabel}>卡类型：</Text>
                            <View style={[css.inputItem, { display: 'flex', flexDirection: 'row', alignItems: 'center', width: width - 150, marginLeft: 5, }]}>
                                <TouchableOpacity onPress={this.showModal.bind(this, 1)}>
                                    <TextInput type="text" value={this.state.name} onChangeText={(text) => { this.setState({ name: text }) }} placeholder="请选择银行卡所属银行" editable={false} />
                                </TouchableOpacity>
                            </View>
                            <Image style={common.more} source={require("../../image/more.png")} />
                        </View> */}
                        {/* <View style={css.inputWrap}>
                            <Text style={css.inputWrapLabel}>手机号码:</Text>
                            <TextInput type="text" value={this.state.name} onChangeText={(text) => { this.setState({ name: text }) }} placeholder="请输入银行预留手机号码" />
                        </View> */}
                        <View style={[css.inputWrap, { justifyContent: 'space-between' }]}>
                            <Text style={css.inputWrapLabel}>短信验证:</Text>
                            <TextInput type="text" value={this.state.code} onChangeText={(text) => { this.setState({ code: text }) }} placeholder="请输入短信验证码" style={{ width: '55%' }} />
                            <Code ref="child" onRef={(ref) => { this.child = ref }} MakeMoney={this.getcode.bind(this)} />
                        </View>
                        <View style={css.inputWrap}>
                            <Text style={css.inputWrapLabel}>交易密码:</Text>
                            <TextInput type="text" secureTextEntry={true} value={this.state.payment} onChangeText={(text) => { this.setState({ payment: text }) }} placeholder="请输入交易密码" />
                        </View>
                    </View>
                    <TouchableOpacity onPress={this.submit.bind(this)} style={[css.linearBtn, { marginTop: 58, marginLeft: 15, width: width - 30 }]}>
                        <LinearGradient colors={['#F6BF0A', '#F3A316']} style={common.linearBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>确定</Text></LinearGradient>
                    </TouchableOpacity>
                    {/* 地址弹窗 */}
                    {maskBg}
                    <Animated.View style={[common.addressModal, { transform: [{ translateY: this.translateY }], height: height, backgroundColor: '' }]}>
                        {mask}
                        <View style={common.putScrollView}>
                            <ScrollView style={{ maxHeight: height / 2, paddingBottom: 50, backgroundColor: '#fff' }} showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center' }}>
                                {this.state.step == 1 ? this.state.province.map((key, i) => this.renderPicker(key, i)) : null}
                                <View style={{ height: 50, }}></View>
                            </ScrollView>
                        </View>

                    </Animated.View>
                </ScrollView>



            </View>
        )
    }

    constructor(props) {
        super(props);
        // this.submit = this.submit.bind(this);
        this.state = {
            bank_name: '',
            branch: '',
            card_number: '',
            realname: '',
            code: '',
            payment: '',

            // bank_name: '招商银行',
            // branch: '测试支行',
            // card_number: '6227335261726354758',
            // realname: '测试版',
            // code: '110120',
            // payment: '123456',
        }
    }

    submit() {
        var that = this;
        let { navigation } = this.props;

        if (this.state.realname == '') { return Toast.show('请输入户主姓名'); }
        if (this.state.bank_name == '') { return Toast.show('请输入开户行'); }
        if (this.state.branch == '') { return Toast.show('请输入开户支行'); }
        if (this.state.card_number == '') { return Toast.show('请输入银行卡号'); }
        if (this.state.code == '') { return Toast.show('请输入短信验证码'); }
        if (this.state.payment == '') { return Toast.show('请输入交易密码'); }
        var fromData = {};
        fromData['realname'] = this.state.realname;
        fromData['bank_name'] = this.state.bank_name;
        fromData['branch'] = this.state.branch;
        fromData['card_number'] = this.state.card_number;
        fromData['code'] = this.state.code;
        fromData['payment'] = this.state.payment;
    // console.log(fromData)
        getCardAdd(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                this.setState({
                    realname: '',
                    bank_name: '',
                    branch: '',
                    card_number: '',
                    code: '',
                    payment: '',
                })
                this.props.route.params.refresh();
                this.props.navigation.goBack();
            } else if (res.code == -1) {
                Toast.show(res.msg);
            } else {
                Toast.show(res.msg, 2000);
            }
        })
    }


    getcode() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        fromData['type'] = 6;
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

    // 购买弹窗
    translateY = new Animated.Value(height) //初始值设为0
    // translateY = new Animated.Value(-height) //初始值设为0
    showModal(step) {
        // Toast.show('showModal');
        var that = this;
        that.setState({
            step: step,
            showMask: 1,
        })
        Animated.timing(
            that.translateY,
            {
                toValue: -height / 2 - 80,
                // toValue: 0,
                duration: 500,
                easing: Easing.linear,
                useNativeDriver: true
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
                useNativeDriver: true
            }
        ).start();
    }


    renderPicker(key, i) {
        // console.log(key)
        // return  <Picker.Item key={i} label={key} value={key} />
        return <View key={i}>
            {this.state.step == 1 ? <TouchableOpacity onPress={() => { this.updateProvince(key) }} style={common.addressLi}><Text style={{ textAlign: 'center' }}>{key}</Text></TouchableOpacity> : null}
            {this.state.step == 2 ? <TouchableOpacity onPress={() => { this.updateProvinceCity(key) }} style={common.addressLi}><Text style={{ textAlign: 'center' }}>{key}</Text></TouchableOpacity> : null}
            {this.state.step == 3 ? <TouchableOpacity onPress={() => { this.updateProvinceCityArea(key) }} style={common.addressLi}><Text style={{ textAlign: 'center' }}>{key}</Text></TouchableOpacity> : null}
        </View>
    }
    
    componentDidMount() {

        // var province = this.getProvince();
        // this.state.selectedProvince = province[0];

        // var city = this.getProvinceCity(this.state.selectedProvince)
        // this.state.selectedCity = city[0]

        // var area = this.getProvinceCityArea(this.state.selectedProvince, this.state.selectedCity)
        // this.state.selectedArea = area[0]


        // this.setState({
        //     province: province,
        //     city: city,
        //     area: area
        // });
    }

    updateProvince(param) {

        var cityData = this.getProvinceCity(param)
        let defaultCity = cityData[0]

        var areaData = this.getProvinceCityArea(param, defaultCity)
        let defaultArea = areaData[0]

        this.setState({
            selectedProvince: param,
            selectedCity: defaultCity,
            selectedArea: defaultArea,
            city: cityData,
            area: areaData,

        })
        this.hideModal();
    }

    updateProvinceCity(city) {

        var areaData = this.getProvinceCityArea(this.state.selectedProvince, city)
        let defaultArea = areaData[0]

        // console.log(this.state.selectedProvince, city, areaData)

        this.setState({
            selectedCity: city,
            selectedArea: defaultArea,
            area: areaData,

        })
        this.hideModal();
    }

    updateProvinceCityArea(area) {

        this.setState({
            selectedArea: area,

        })
        this.hideModal();
    }
}
export default addressadd;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#F5FCFF'
    },
    text: {
        // width: 200,
        // height: 60,
        // marginTop: 100,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    pickerViewContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // paddingTop: 30
        maxHeight: height / 2,

    },
    pickerItem: {
        flex: 1,
    }
})