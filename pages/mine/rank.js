
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

import { getStatisticsData } from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import common from '../../css/common.js'
import css from '../../css/rank.js'
import Item from 'antd/lib/list/Item.js';

class page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order_id: 0,
            tabIndex: 0,
            tabList: [{
                type: 0,
                name: '今日排行'
            }, {
                type: 1,
                name: '本周排行'
            }],
            list: {
                today_lists:[],
                week_lists:[],
            },
        }
    }
    componentDidMount() {
        // Toast.show('res.msg, 2000');
        this.getStatisticsDatas();
    }
    getStatisticsDatas() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getStatisticsData(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
            // console.log(res.data)
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
    // 切换导航
    tabClick(type) {
        // console.log(dataType)
        // if (dataType == this.state.dataType) { return }
        var that = this;
        that.setState({
            tabIndex: type,
            // goodsList: [],
        }, () => {
            // that.getOrderList2(dataType)
        })
    }
    render() {
        let { navigation } = this.props;
        return (
            <View style={common.body}>
                <ScrollView style={[common.ScrollView, { backgroundColor: '#FFF9EE' }]} showsVerticalScrollIndicator={false}>
                    {/* 头部 */}
                    <View style={[common.header, { backgroundColor: 'transparent', zIndex: 9 }]}>
                        <TouchableOpacity onPress={() => { navigation.goBack(); }} style={common.headerLeft}>
                            <Image source={require('../../image/return2.png')} style={common.returnIcon} />
                        </TouchableOpacity >
                        <View style={common.headerTitle}><Text style={common.headerTitleTextW}>排行榜</Text></View>
                    </View>
                    <Image source={require('../../image/rank.png')} style={css.rankBg} />
                    <View style={[common.navRowWrap, { justifyContent: 'space-around', width: width, paddingRight: 25 }]} horizontal={true}>
                        {/* all 全部, payment 待付款, delivery 待发货, received 待收货, comment 待评论 */}
                        {
                            this.state.tabList.map((item, index) => {
                                return (
                                    <TouchableOpacity onPress={this.tabClick.bind(this, item.type)} key={index}><Text style={[common.navRowBlock, this.state.tabIndex == index ? common.navRowActive : null]}>{item.name}</Text></TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    {/* <View style={{paddingLeft:15,paddingRight:15}}> */}
                    <View>
                        <View style={[common.alignItemsB, css.thead]}>
                            <Text style={css.th}>排名</Text>
                            <Text style={css.th}>账号</Text>
                            <Text style={css.th}>直推人数</Text>
                        </View>
                        {
                            this.state.list.today_lists && this.state.tabIndex == 0 && this.state.list.today_lists.map((item, index) => {
                                return (
                                    <View style={[common.alignItemsB, css.thead]} key={index}>
                                        <View style={[common.columnCenter, css.td]}>
                                            {index == 0 ? <Image source={require('../../image/rank-1.png')} style={css.rankIcon} /> : null}
                                            {index == 1 ? <Image source={require('../../image/rank-2.png')} style={css.rankIcon} /> : null}
                                            {index == 2 ? <Image source={require('../../image/rank-3.png')} style={css.rankIcon} /> : null}
                                        </View>
                                        <Text style={css.td}>{item.mobile}</Text>
                                        <Text style={css.td}>{item.num}</Text>
                                    </View>
                                )
                            })
                        }
                        {
                            this.state.list.today_lists && this.state.tabIndex == 0 && this.state.list.today_lists.length == 0 ?
                                <View style={[common.empty, { paddingBottom: 50, marginTop: 100,}]}>
                                    <Image style={common.emptyIcon} source={require('../../image/empty2.png')} />
                                    <Text style={common.emptyH1}>暂无数据</Text>
                                </View> : null
                        }
                        {
                            this.state.list.week_lists && this.state.tabIndex == 1 && this.state.list.week_lists.map((item, index) => {
                                return (
                                    <View style={[common.alignItemsB, css.thead]} key={index}>
                                        <View style={[common.columnCenter, css.td]}>
                                            {index == 0 ? <Image source={require('../../image/rank-1.png')} style={css.rankIcon} /> : null}
                                            {index == 1 ? <Image source={require('../../image/rank-2.png')} style={css.rankIcon} /> : null}
                                            {index == 2 ? <Image source={require('../../image/rank-3.png')} style={css.rankIcon} /> : null}
                                        </View>
                                        <Text style={css.td}>{item.mobile}</Text>
                                        <Text style={css.td}>{item.num}</Text>
                                    </View>
                                )
                            })
                        }
                        {
                            this.state.list.week_lists && this.state.tabIndex == 1 && this.state.list.week_lists.length == 0 ?
                                <View style={[common.empty, { paddingBottom: 50, marginTop: 100,}]}>
                                    <Image style={common.emptyIcon} source={require('../../image/empty2.png')} />
                                    <Text style={common.emptyH1}>暂无数据</Text>
                                </View> : null
                        }
                        {/* <View style={[common.alignItemsB, css.thead]}>
                            <View style={[common.columnCenter,css.td]}><Image source={require('../../image/rank-1.png')} style={css.rankIcon} /></View>
                            <Text style={css.td}>大黑猫</Text>
                            <Text style={css.td}>16500</Text>
                        </View>
                        <View style={[common.alignItemsB, css.thead]}>
                            <View style={[common.columnCenter,css.td]}><Image source={require('../../image/rank-2.png')} style={css.rankIcon} /></View>
                            <Text style={css.td}>大黑猫</Text>
                            <Text style={css.td}>16500</Text>
                        </View>
                        <View style={[common.alignItemsB, css.thead]}>
                            <View style={[common.columnCenter,css.td]}><Image source={require('../../image/rank-3.png')} style={css.rankIcon} /></View>
                            <Text style={css.td}>大黑猫</Text>
                            <Text style={css.td}>16500</Text>
                        </View> */}
                    </View>
                </ScrollView>
            </View>
        )
    }
}
export default page;