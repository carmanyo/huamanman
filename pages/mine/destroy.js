
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
    RefreshControl
} from 'react-native';

import Picker from 'react-native-picker';
// import moment from 'moment';
import { getLogin, getOrderLists, getOrderCancel, getPond } from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import common from '../../css/common.js'
import css from '../../css/orderIndex.js'

class addFriend extends React.Component {
    // state = {
    //     tab:1,
    // }
    render() {
        let { navigation } = this.props;
        let deleteModal = this.state.ifshowmodal == 1 ?
            <View style={{ position: 'absolute', top: 0, left: 0, width: width, height: height }}>
                <View style={common.mask}></View>
                <View style={common.askModal}>
                    <Text style={common.askTitle}>确定要取消该订单吗？</Text>
                    <View style={common.askOperation}>
                        <TouchableOpacity onPress={() => { this.setState({ ifshowmodal: 0 }) }} type="default"><Text style={common.cancelBtn}>取消</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.cancelOrder() }} type="default"><Text style={common.confirmBtn}>删除</Text></TouchableOpacity>
                    </View>
                </View>
            </View> : null;
        let date = this.state.date;
    // console.log(date)
        return (
            <View style={[common.whiteBg, common.padBottom, { flex: 1 }]}>
                {deleteModal}
                {/* 头部 */}
                <View style={[common.headerNoBorder]}>
                    <TouchableOpacity onPress={() => { navigation.goBack(); }} style={common.headerLeft}>
                        <Image source={require('../../image/return.png')} style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>销毁</Text></View>
                </View>
                <View style={[common.navRowScrollView, { width: width, borderWidth: 0, height: height / 2 }]}>
                    <View style={[common.navRowWrap,common.columnCenter, { justifyContent: 'center', width: width,height: height,backgroundColor:'#f5f5f5' }]} horizontal={true}>
                        <View style={[common.columnCenter, { marginTop: -120 }]}>
                            <Text style={[common.navRowBlock, { marginLeft: 0,color:'#333' }]}>销毁总量</Text>
                            <Text style={[common.navRowBig,{marginTop:4,fontSize:20,color:'#F5BA0B'}]}>{this.state.myData.burn == null ? 0 : this.state.myData.burn}</Text>
                        </View>
                        <View style={[common.columnCenter, { marginTop: 50 }]}>
                            <Text style={[common.navRowBlock, { marginLeft: 0,color:'#333' }]}>当前值</Text>
                            <Text style={[common.navRowBig,{marginTop:4,fontSize:20,color:'#F5BA0B'}]}>{this.state.myData.price == null ? 0 : this.state.myData.price}</Text>
                        </View>
                    </View>
                </View>

            </View >
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            dataType: 'all',
            order_id: 0,
            tabList: [{
                dataType: 'all',
                name: '当日数据'
            }, {
                dataType: 'payment',
                name: '本月数据'
            }],
            myData: {
                today_achievement: '',
                month_achievement: '',
            },
            date: this.getCurrTime(),
        }
        this.getCurrTime = this.getCurrTime.bind(this)
    }

    componentDidMount() {
        this.getStatisticsList()
        // this._createDateData()
    }

    // 获取数据
    getStatisticsList() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        // fromData['date'] = this.state.date;
        getPond(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                this.setState({
                    myData: res.data.pond
                })
            }
        })
    }

    getCurrTime() {
        const date = new Date();
        let time = {
            year: date.getFullYear(), //年
            month: date.getMonth() + 1, // 月
            day: date.getDate(), // 日
            hours: date.getHours(), // 时
            minutes: date.getMinutes(), // 分
            seconds: date.getSeconds() // 秒
        };
        // time.month = (time.month < 10) ? ('0'+ time.month) : time.month
        if (time.month < 10) {
            time.month = '0' + time.month;
        }
        if (time.day < 10) {
            time.day = '0' + time.day;
        }
        if (time.hours < 10) {
            time.hours = '0' + time.hours;
        }
        if (time.minutes < 10) {
            time.minutes = '0' + time.minutes;
        }
        if (time.seconds < 10) {
            time.seconds = '0' + time.seconds;
        }
        // const currTime = time.year + '-' + time.month + '-' + time.day + ' ' + time.hours + ':' + time.minutes + ':' + time.seconds;
        const currTime = time.year + '-' + time.month + '-' + time.day;
        return currTime;
    }

    //组装日期数据
    _createDateData() {
        let date = [];
        var currDate = new Date()
        var year = currDate.getFullYear()
        var months = currDate.getMonth() + 1
        // console.log(months)
        for (let i = currDate.getFullYear(); i <= year; i++) {
            let month = [];
            for (let j = months; j <= months; j++) {
                let day = [];
                if (j === 2) {
                    for (let k = 1; k < 29; k++) {
                        day.push(k + '日');
                    }
                    //Leap day for years that are divisible by 4, such as 2000, 2004
                    if (i % 4 === 0) {
                        day.push(29 + '日');
                    }
                }
                else if (j in { 1: 1, 3: 1, 5: 1, 7: 1, 8: 1, 10: 1, 12: 1 }) {
                    for (let k = 1; k < 32; k++) {
                        day.push(k + '日');
                    }
                }
                else {
                    for (let k = 1; k < 31; k++) {
                        day.push(k + '日');
                    }
                }
                let _month = {};
                _month[j + '月'] = day;
                month.push(_month);
            }
            let _date = {};
            _date[i + '年'] = month;
            date.push(_date);
        }
        return date;
    }

    _showDatePicker() {
        var that = this
        const { dispatch } = this.props
        var year = ''
        var month = ''
        var day = ''
        // var dateStr = moment().format("YYYY-MM-DD")
        var dateStr = this.getCurrTime()
        //console.log('dateStr',dateStr)
        year = dateStr.substring(0, 4)
        month = parseInt(dateStr.substring(5, 7))
        day = parseInt(dateStr.substring(8, 10))

        Picker.init({
            pickerTitleText: '时间选择',
            pickerCancelBtnText: '取消',
            // pickerCancelBtnColor: [244, 157, 18, 1],
            pickerConfirmBtnText: '确定',
            // pickerConfirmBtnColor: [244, 157, 18, 1],

            pickerData: this._createDateData(),
            selectedValue: [year + '年', month + '月', day + '日'],

            onPickerConfirm: (pickedValue, pickedIndex) => {
                var year = pickedValue[0].substring(0, pickedValue[0].length - 1)
                var month = pickedValue[1].substring(0, pickedValue[1].length - 1)
                month = month.padStart(2, '0')
                var day = pickedValue[2].substring(0, pickedValue[2].length - 1)
                day = day.padStart(2, '0')
                let str = year + '-' + month + '-' + day
            // console.log(str)
                setTimeout(() => {
                    that.setState({
                        date: str,
                    }, () => {
                    // console.log('日期：' + that.state.date);
                        that.getStatisticsList();
                    });
                }, 500);
                // console.log(str)
                // console.log(that.state.date)
                // dispatch({
                //     type: 'updateStates',
                //     payload: {
                //         date: str
                //     }
                // })

            },
        });
        Picker.show();
    }

    refresh() {
        // this.setState({
        //     isRefreshing: true
        // }, this.getOrderList())
    }

    // 切换导航
    tabClick(dataType) {
        // console.log(dataType)
        if (dataType == this.state.dataType) { return }
        var that = this;
        that.setState({
            dataType,
            goodsList: [],
        }, that.getOrderList2(dataType))
    }

}
export default addFriend;