
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
    Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
// 读取本地json文件
let jsonData = require('./area.json')
import { getCountyByName, city } from './area.js'
import { getaddressAdd } from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
// console.log('height--------')
// console.log(height)

import common from '../../css/common.js'
import css from '../../css/addressadd.js'

class addressadd extends React.Component {
    render() {
        let { navigation } = this.props;
        let maskBg = this.state.showMask == 1 ? <View style={common.mask}></View> : null;
        let mask = this.state.showMask == 1 ? <TouchableOpacity style={[common.mask, { opacity: 0 }]} onPress={this.hideModal.bind(this)}></TouchableOpacity> : null;
        return (
            <View style={common.bodyGray}>
                {/* 头部 */}
                <View style={[common.header]}>
                    <TouchableOpacity onPress={() => { navigation.goBack(); }} style={common.headerLeft}>
                        <Image source={require('../../image/return.png')} style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>添加新地址</Text></View>
                </View>

                <View style={[common.main,{marginTop:0}]}>
                    <View style={css.whiteBg}>
                        <View style={css.inputWrap}>
                            <Text style={css.inputWrapLabel}>收货人:</Text>
                            <TextInput type="text" value={this.state.name} onChangeText={(text) => { this.setState({ name: text }) }} placeholder="收货人姓名" />
                        </View>
                        <View style={css.inputWrapNoBorder}>
                            <Text style={css.inputWrapLabel}>手机号：</Text>
                            <TextInput type="tel" value={this.state.mobile} onChangeText={(text) => { this.setState({ mobile: text }) }} placeholder="收货人手机号" />
                        </View>
                        <View style={[common.grayLine5, { marginLeft: -30 }]}></View>

                        <View style={[css.inputWrap]}>
                            <Text style={css.inputWrapLabel}>所在地区：</Text>
                            <View style={[css.inputItem, { display: 'flex', flexDirection: 'row',flexWrap:'wrap', alignItems: 'center', width: width - 150, marginLeft: 5, }]}>
                                <TouchableOpacity onPress={this.showModal.bind(this, 1)}>
                                    <Text>{this.state.selectedProvince}</Text>
                                </TouchableOpacity>
                                {
                                    this.state.cityArr.length != 0 ?
                                        <View style={common.alignItemsCenter}>
                                            <Text style={{ marginLeft: 16, marginRight: 16 }}>-</Text>
                                            <TouchableOpacity onPress={this.showModal.bind(this, 2)}>
                                                <Text>{this.state.selectedCity}</Text>
                                            </TouchableOpacity>
                                        </View> : null
                                }

                                {
                                    this.state.areaArr.length != 0 ?
                                        <View style={common.alignItemsCenter}>
                                            <Text style={{ marginLeft: 16, marginRight: 16 }}>-</Text>
                                            <TouchableOpacity onPress={this.showModal.bind(this, 3)}>
                                                <Text>{this.state.selectedArea}</Text>
                                            </TouchableOpacity>
                                        </View> : null
                                }
                            </View>
                        </View>
                        <View style={css.detail}>
                            <Text style={css.inputWrapLabel}>详细地址:</Text>
                            <TextInput multiline={true} type="text" value={this.state.detail} onChangeText={(text) => { this.setState({ detail: text }) }} placeholder="请输入详细地址，如小区名称、小区楼栋等" style={{ height: 80, textAlignVertical: 'top', }} />
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => this.setState({ type: this.state.type == 1 ? 0 : 1 })} style={css.setdefault}>
                        <Text>设为默认地址</Text>
                        <Image style={this.state.type == 1 ? common.tick : common.hidden} source={require("../../image/check2.png")} />
                        <Image style={this.state.type == 0 ? common.tick : common.hidden} source={require("../../image/uncheck2.png")} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.submit.bind(this)} style={[css.linearBtn, { marginTop: 58, marginLeft: 15, width: width - 30 }]}>
                        <LinearGradient colors={['#F6BF0A', '#F3A316']} style={common.linearBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>确定</Text></LinearGradient>
                    </TouchableOpacity>
                    {/* 地址弹窗 */}
                    {maskBg}
                    <Animated.View style={[common.addressModal, { transform: [{ translateY: this.translateY }], height: height, backgroundColor: '' }]}>
                        {mask}
                        <View style={common.putScrollView}>
                            <View style={[common.alignItemsE, { paddingTop: 15, paddingBottom: 5, backgroundColor: '#fff', width: width }]}><TouchableOpacity onPress={this.hideModal.bind(this)}><Image style={[common.close, { marginRight: 20 }]} source={require("../../image/close.png")} /></TouchableOpacity></View>
                            <ScrollView style={{ maxHeight: height / 2, paddingBottom: 50, backgroundColor: '#fff',marginTop:-1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center' }}>
                                {this.state.step == 1 && this.state.provinceArr ? this.state.provinceArr.map((key, i) => this.renderPicker(key, i)) : null}
                                {this.state.step == 2 && this.state.cityArr ? this.state.cityArr.map((key, i) => this.renderPicker(key, i)) : null}
                                {this.state.step == 3 && this.state.areaArr ? this.state.areaArr.map((key, i) => this.renderPicker(key, i)) : null}
                                <View style={{ height: 110, }}></View>
                            </ScrollView>
                            <View style={{ height: 110,backgroundColor:'#fff',width:width }}></View>
                        </View>

                    </Animated.View>
                </View>



            </View>
        )
    }

    // 定义默认属性
    static defaultProps = {
        // // 默认显示北京(省)
        // selectedProvince: '北京',
        // // 默认显示北京省会市)
        // selectedCity: '北京',
        // // 默认显示(区)
        // selectedArea: '东城区',
    }

    // 通过 state 更新
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.state = {
            // 省
            province: [],
            // 市
            city: [],
            // 区
            area: [],
            // 选中的省
            selectedProvince: this.props.selectedProvince,
            // 选中的市
            selectedCity: this.props.selectedCity,
            // 选中的地区
            selectedArea: this.props.selectedArea,


            type: 1,
            name: '',
            mobile: '',
            detail: '',
            showMask: 0,
            step: 1,
            provinceArr: [],
            cityArr: [],
            areaArr: [],
        }
    }
    componentDidMount() {
    // console.log(this.props.route.params)
        // var provinceArr = [];
        // var cityArr = [];
        // var areaArr = [];
        // var areaData = getCountyByName("广东省");
        // var dataObj = {};
        // dataObj['data'] = areaData;

        // for (var i in dataObj) {
        //     provinceArr.push(dataObj[i]);
        // }
        // for (var i = 0; i < 1; i++) {
        //     for (var j in provinceArr[0].child) {
        //         cityArr.push(provinceArr[0].child[j]);
        //     }
        // }
        // for (var i = 0; i < 1; i++) {
        //     for (var j in cityArr[0].child) {
        //         areaArr.push(cityArr[0].child[j]);
        //     }
        // }
        // this.setState({
        //     provinceArr: provinceArr,
        //     cityArr: cityArr,
        //     areaArr: areaArr,
        //     selectedProvince: "广东省",
        //     selectedCity: cityArr[0].name,
        //     selectedArea: areaArr[1],
        // });

        var provinceArr = [];
        var cityArr = [];
        var areaArr = [];
        var allData = [];
        var areaData = city;
    // console.log(areaData)
        var provinceIndex = 18;//广东省

        for (var i in areaData) {
            allData.push(areaData[i]);
        }
        for (var i = 0; i < allData.length; i++) {
            provinceArr.push(allData[i]);
        }
        for (var i = 0; i < 1; i++) {
            for (var j in provinceArr[provinceIndex].child) {
                cityArr.push(provinceArr[provinceIndex].child[j]);
            }
        }
        for (var i = 0; i < 1; i++) {
            for (var j in cityArr[0].child) {
                areaArr.push(cityArr[0].child[j]);
            }
        }
    // console.log(allData)
        this.setState({
            provinceArr: provinceArr,
            cityArr: cityArr,
            areaArr: areaArr,
            selectedProvince: provinceArr[provinceIndex].name,
            selectedCity: cityArr[0].name,
            selectedArea: areaArr[1],
        });
    }


    submit() {
        // Toast.show('res.msg');
        var that = this;
        let { navigation } = this.props;

        if (this.state.name == '') { return Toast.show('请输入收货人姓名'); }
        if (this.state.mobile == '') { return Toast.show('请输入收货人手机号'); }
        if (this.state.detail == '') { return Toast.show('请输入详细地址'); }
        var fromData = {};
        fromData['name'] = this.state.name;
        fromData['phone'] = this.state.mobile;
        fromData['region'] = this.state.selectedProvince + ',' + this.state.selectedCity + ',' + this.state.selectedArea;
        fromData['detail'] = this.state.detail;
        fromData['is_default'] = this.state.type;
    // console.log(fromData)
        getaddressAdd(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                Toast.show(res.msg);
                this.props.route.params.refresh();
                this.props.navigation.goBack();
            } else if (res.code == -1) {
                Toast.show(res.msg);
            } else {
                Toast.show(res.msg, 2000);
            }
        })
    }

    renderPicker(key, i) {
        return <View key={i}>
            {this.state.step == 1 ? <TouchableOpacity onPress={() => { this.updateProvince(key.name) }} style={common.addressLi}><Text style={{ textAlign: 'center' }}>{key.name}</Text></TouchableOpacity> : null}
            {this.state.step == 2 ? <TouchableOpacity onPress={() => { this.updateProvinceCity(key.name,key) }} style={common.addressLi}><Text style={{ textAlign: 'center' }}>{key.name}</Text></TouchableOpacity> : null}
            {this.state.step == 3 ? <TouchableOpacity onPress={() => { this.updateProvinceCityArea(key) }} style={common.addressLi}><Text style={{ textAlign: 'center' }}>{key}</Text></TouchableOpacity> : null}
        </View>
    }
    // 购买弹窗
    translateY = new Animated.Value(height) //初始值设为0
    // translateY = new Animated.Value(-height) //初始值设为0
    showModal(step) {
        Keyboard.dismiss();
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


    updateProvince(param) {
        var provinceArr = [];
        var cityArr = [];
        var areaArr = [];
        var areaData = getCountyByName(param);
        var dataObj = {};
        dataObj['data'] = areaData;

        for (var i in dataObj) {
            provinceArr.push(dataObj[i]);
        }
    // console.log(provinceArr)
        if (provinceArr[0].child.length != 0) {
            for (var i = 0; i < 1; i++) {
                for (var j in provinceArr[0].child) {
                    cityArr.push(provinceArr[0].child[j]);
                }
            }

            if (cityArr[0].child.length != 0) {
                for (var i = 0; i < 1; i++) {
                    for (var j in cityArr[0].child) {
                        areaArr.push(cityArr[0].child[j]);
                    }
                }
            }else{
                areaArr = [];
            }
        }else{
            cityArr = [];
        }


        this.setState({
            cityArr: cityArr,
            areaArr: areaArr,
            selectedProvince: param,
            selectedCity: cityArr.length != 0 ? cityArr[0].name : [],
            selectedArea: areaArr.length != 0 ? areaArr[1] : [],
        });
        this.hideModal();
    }

    updateProvinceCity(param,key) {
        // console.log('param------');
        // console.log(param);
        // console.log(key);
        var provinceArr = [];
        var cityArr = [];
        var areaArr = [];
        // var areaData = getCountyByName(param);
        var areaData = key;
        var areaData2 = param;
        var dataObj = {};
        dataObj['data'] = areaData;


        for (var i in dataObj) {
            cityArr.push(dataObj[i]);
        }

        for (var i in dataObj) {
            cityArr.push(dataObj[i]);
        }
        if (cityArr[0].child.length != 0) {
            for (var i = 0; i < 1; i++) {
                for (var j in cityArr[0].child) {
                    areaArr.push(cityArr[0].child[j]);
                }
            }
        }else{
            areaArr = [];
        }

        this.setState({
            areaArr: areaArr,
            selectedCity: param,
            selectedArea: areaArr.length != 0 ? areaArr[1] : [],
        });
        this.hideModal();
    }

    updateProvinceCityArea(param) {

        this.setState({
            selectedArea: param,
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