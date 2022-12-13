
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

import { getLogin, getOrderLists, getOrderCancel, getUserAgent } from '../../network/authapi.js'
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
        return (
            <View style={[common.whiteBg, common.padBottom, { flex: 1 }]}>
                {/* 头部 */}
                <View style={[common.headerNoBorder]}>
                    <TouchableOpacity onPress={() => { navigation.goBack(); }} style={common.headerLeft}>
                        <Image source={require('../../image/return.png')} style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>我的代理</Text></View>
                </View>
                <View style={[common.navRowScrollView, { width: width }]} horizontal={true} contentContainerStyle={{ alignItems: 'center' }} showsHorizontalScrollIndicator={false}>
                    <View style={[common.navRowWrap, { justifyContent: 'space-around', width: width, paddingRight: 25 }]} horizontal={true}>
                        {/* all 全部, payment 待付款, delivery 待发货, received 待收货, comment 待评论 */}
                        {
                            this.state.tabList.map((item, index) => {
                                return (
                                    <TouchableOpacity onPress={this.tabClick.bind(this, item.dataType)} key={index}><Text style={[common.navRowBlock, this.state.dataType == index + 1 ? common.navRowActive : null]}>{item.name}</Text></TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
                {this.state.list ?
                    <ScrollView
                        style={common.orderScrollView}
                    // refreshControl={

                    //     <RefreshControl
                    //         refreshing={this.state.isRefreshing}
                    //         onRefresh={this.refresh.bind(this, 0)}
                    //     />

                    // }
                    >
                        {/* 空页面  重要！勿删 */}
                        {
                            this.state.list.length == 0 ?
                                <View style={common.empty}>
                                    <Image style={common.emptyIcon} source={require('../../image/empty2.png')} />
                                    <Text style={common.emptyH1}>暂无代理</Text>
                                    {/* <Text style={common.emptyP}>快去逛一逛吧~</Text> */}
                                </View> : null
                        }
                        {
                            this.state.list.map((item, index) => {
                                return (
                                    <View style={{ borderColor: '#f5f5f5',borderWidth: 1, marginLeft: 10, marginRight: 10,marginBottom:10,borderRadius:5}}>
                                        <View style={[css.orderBlock, common.alignItemsCenter, {  borderBottomWidth: 0, }]} key={index}>
                                            <Text>{item.region.province} </Text>
                                            {
                                                this.state.dataType==2||this.state.dataType==3?<Text>{item.region.city} </Text>:null
                                            }
                                             {
                                                this.state.dataType==3?<Text>{item.region.region}</Text>:null
                                            }
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </ScrollView > : null
                }
            </View >
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            dataType: '1',
            order_id: 0,
            tabList: [{
                dataType: '1',
                name: '省代理'
            }, {
                dataType: '2',
                name: '市代理'
            }, {
                dataType: '3',
                name: '区代理'
            }],
            list: [],
        }
        // this.componentWillUnmount = this.componentWillUnmount.bind(this)
    }
    componentDidMount() {
        this.getUserAgents()
    }

    // refresh() {
    // this.setState({
    //     isRefreshing: true
    // }, this.getOrderList())
    // }

    // 订单列表
    getUserAgents() {
        var that = this;
    // console.log(this.state.dataType)
        let { navigation } = this.props;
        var fromData = {};
        fromData['type'] = this.state.dataType;
        getUserAgent(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                this.setState({
                    list: res.data.list.data,
                })
            }
        })
    }

    
    getUserAgents2(dataType) {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        fromData['type'] = dataType;
        getUserAgent(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                this.setState({
                    list: res.data.list.data,
                })
            }
        })
    }


    // 切换导航
    tabClick(dataType) {
        if (dataType == this.state.dataType) { return }
        var that = this;
        that.setState({
            dataType,
            list: [],
        }, that.getUserAgents2(dataType))
    }

}
export default addFriend;