
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

import { getcashRecord, getLogIndex } from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;

import common from '../../css/common.js'
import css from '../../css/exchangerecord.js'

class cashrecord extends React.Component {
    state = {
        list: [],
        page: 1,
        tab: 1,
    }
    componentDidMount() {
        // Toast.show('res.msg, 2000');
        this.getLogIndexs(this.state.tab);
    }
    getLogIndexs(tab) {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        fromData['currency'] = 4;
        fromData['status'] = tab;
        fromData['page'] = this.state.page;
        getLogIndex(fromData, res => {
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
    
    getLogIndexs2(tab,page) {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        fromData['currency'] = 4;
        fromData['status'] = tab;
        fromData['page'] = page;
        getLogIndex(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                this.setState({
                    list: this.state.list.concat(res.data.list.data)
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

    _contentViewScroll(e) {
        var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
        if (offsetY + oriageScrollHeight >= contentSizeHeight) {
            // Console.log('上传滑动到底部事件')
            this.setState({
                page: this.state.page + 1,
            }, this.getLogIndexs2(this.state.tab,this.state.page + 1))
        }
    }
    tabClick(tab) {
        var that = this;
        that.setState({
            list:[],
            tab
        },that.getLogIndexs(tab))
    }
    render() {
        let { navigation } = this.props;
        return (
            <View style={common.body}>
                {/* 头部 */}
                <View style={[common.header]}>
                    <TouchableOpacity onPress={() => { navigation.goBack(); }} style={common.headerLeft}>
                        <Image source={require('../../image/return.png')} style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>佣金明细</Text></View>
                </View>

                <View style={[common.tab,{marginTop:20}]}>
                    <TouchableOpacity onPress={this.tabClick.bind(this, 1)}><Text style={[common.tabText, this.state.tab == 1 ? common.tabTextActive : null]}>收入</Text></TouchableOpacity>
                    <TouchableOpacity onPress={this.tabClick.bind(this, 2)}><Text style={[common.tabText, this.state.tab == 2 ? common.tabTextActive : null]}>支出</Text></TouchableOpacity>
                </View>

                <View style={[common.main, { marginTop: 0 }]}>
                    {/* <View style={[css.navWrap]}>
                        <Text style={[css.nav,css.navActive]}>USDT</Text>
                        <Text style={css.nav}>FEF</Text>
                    </View> */}
                    <ScrollView
                        style={[common.ScrollViewHasHeader, { marginTop: 20 }]}
                        onMomentumScrollEnd={this._contentViewScroll.bind(this)}
                    >
                        {/* 空页面  重要！勿删 */}
                        {
                            this.state.list.length == 0 ?
                                <View style={common.empty}>
                                    <Image style={common.emptyIcon} source={require('../../image/empty2.png')} />
                                    <Text style={common.emptyH1}>暂无记录~</Text>
                                </View> : null
                        }
                        {this.state.list.map((item, index) => {
                            return (
                                <View style={css.recordBlock}>
                                    <View style={common.alignItemsB}>
                                        <View style={common.alignItemsCenter}><Text style={[this.state.tab == 1 ?common.red:common.green, { marginRight: 10 }]}>{this.state.tab == 1 ?'收入':'支出'}</Text><Text>{item.typeName}</Text></View>
                                        <Text style={this.state.tab == 1 ?common.red:common.green}>{this.state.tab == 1 ?'+':'-'}￥{item.num}</Text>
                                    </View>
                                    {item.desc!=''?<Text style={css.time}>备注：{item.desc}</Text>:null}
                                    <Text style={css.time}>{item.create_time}</Text>
                                </View>
                            );
                        })}

                        {/* 空页面  重要！勿删 */}
                        {/* <View style={common.empty}>
                            <Image style={common.emptyIcon} source={require('../../image/empty2.png')} />
                            <Text style={common.emptyH1}>暂无资金明细</Text>
                            <Text style={common.emptyP}>您还未进行系统消费</Text>
                        </View> */}

                        {/* <View style={css.recordBlock}>
                            <View style={common.alignItemsB}>
                                <View style={common.alignItemsCenter}><Text style={[common.green, { marginRight: 10 }]}>支出</Text><Text>提现至银行卡</Text></View>
                                <Text style={common.green}>-￥10000.00</Text>
                            </View>
                            <Text style={css.time}>2022/09/22 14:40:24</Text>
                        </View>
                        <View style={css.recordBlock}>
                            <View style={common.alignItemsB}>
                                <View style={common.alignItemsCenter}><Text style={[common.red, { marginRight: 10 }]}>收入</Text><Text>积分兑换</Text></View>
                                <Text style={common.red}>+￥1300.00</Text>
                            </View>
                            <Text style={css.time}>2022/09/22 14:40:24</Text>
                        </View> */}
                    </ScrollView>

                    {/* <View style={css.recordBlock}>
                        <View style={css.typeName}><Text>FEF</Text><Text>-item.total_money</Text></View>
                        <View style={css.typeName}><Text>实际到账:</Text><Text>item.money</Text></View>
                        <View style={css.typeName}><Text>手续费:</Text><Text>item.charge</Text></View>
                        <View style={css.typeName}><Text v-show="item.status==5">状态：</Text><Text style={css.yellow}>审核中</Text></View>
                        <View style={css.typeName}><Text v-show="item.status==10">状态：</Text><Text style={css.green}>提现成功</Text></View>
                        <View style={css.typeName}><Text v-show="item.status==15">状态：</Text><Text style={css.red}>提现驳回</Text></View>
                        <View style={css.typeName}><Text>时间：</Text><Text>`+da[i].addtime+`</Text></View>
                        <View style={css.typeName}><Text>地址：</Text><Text>`+da[i].info+`</Text></View>
                        <View style={css.typeName}><Text>备注：</Text><Text>`+da[i].remark+`</Text></View>
                    </View> */}
                </View>
            </View>
        )
    }
}
export default cashrecord;
