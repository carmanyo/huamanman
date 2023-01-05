
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

import { getVersions, getOrderLists, getOrderCancel, getOrderReceipt } from '../../network/authapi.js'
const Toast = Overlay.Toast;
import DeviceInfo from 'react-native-device-info';

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
        var that = this;
        let { navigation } = this.props;
        let deleteModal = this.state.ifshowmodal == 1 ?
            <View style={{ position: 'absolute', top: 0, left: 0, width: width, height: height }}>
                <View style={common.mask}></View>
                <View style={common.askModal}>
                    <Text style={common.askTitle}>确定要取消该订单吗？</Text>
                    <View style={common.askOperation}>
                        <TouchableOpacity onPress={() => { this.setState({ ifshowmodal: 0 }) }} type="default"><Text style={common.cancelBtn}>取消</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.cancelOrder() }} type="default"><Text style={common.confirmBtn}>确定</Text></TouchableOpacity>
                    </View>
                </View>
            </View> : null;
        let confirmModal = this.state.ifshowmodal2 == 1 ?
            <View style={{ position: 'absolute', top: 0, left: 0, width: width, height: height }}>
                <View style={common.mask}></View>
                <View style={common.askModal}>
                    <Text style={common.askTitle}>确定已收到货吗？</Text>
                    <View style={common.askOperation}>
                        <TouchableOpacity onPress={() => { this.setState({ ifshowmodal2: 0 }) }} type="default"><Text style={common.cancelBtn}>取消</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.confirmGet() }} type="default"><Text style={common.confirmBtn}>确定</Text></TouchableOpacity>
                    </View>
                </View>
            </View> : null;
        let ifupdate = this.state.update == 1 ?
            <View style={{ position: 'absolute', width: width, height: height, top: 0, zIndex: 10 }}>
                <TouchableOpacity onPress={() => { }} style={[common.mask, { zIndex: 10 }]}></TouchableOpacity>
                <View style={{ position: 'absolute', width: width, height: height, top: 0 }}>
                    <TouchableOpacity onPress={() => { this.setState({ update: 0 }) }} style={common.mask}></TouchableOpacity>
                    <View style={common.askModal}>
                        <View style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                            <Text style={{ textAlign: 'center' }}>检测到新版本{this.state.currentVersion}，您的版本是{this.state.version}，立即更新！</Text>
                        </View>
                        <View style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                            <Text style={{ textAlign: 'center' }}>下载链接：{this.state.v_url}</Text>
                        </View>
                        {/* <View style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                            <Text style={{ textAlign: 'center' }}>密码：8888</Text>
                        </View> */}
                        <View style={common.askOperation}>
                            <TouchableOpacity onPress={this.update.bind(this)} type="default" style={{ width: width - 50, border: 0, textAlign: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}><Text style={[common.confirmBtn, { borderLeftWidth: 0 }]}>确认</Text></TouchableOpacity>

                        </View>
                    </View>
                </View>
            </View> : null;
        return (
            <View style={[common.whiteBg, common.padBottom, { flex: 1 }]}>
                {ifupdate}
                {confirmModal}
                {deleteModal}
                {/* 头部 */}
                <View style={[common.headerNoBorder]}>
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>我的订单</Text></View>
                </View>
                <View style={[common.navRowScrollView, { width: width }]} horizontal={true} contentContainerStyle={{ alignItems: 'center' }} showsHorizontalScrollIndicator={false}>
                    <View style={[common.navRowWrap, { justifyContent: 'space-between', width: width, paddingRight: 25 }]} horizontal={true}>
                        {/* all 全部, payment 待付款, delivery 待发货, received 待收货, comment 待评论 */}
                        {
                            this.state.tabList.map((item, index) => {
                                return (
                                    <TouchableOpacity onPress={this.tabClick.bind(this, item.dataType)} key={index}><Text style={[common.navRowBlock, this.state.dataType == item.dataType ? common.navRowActive : null]}>{item.name}</Text></TouchableOpacity>
                                )
                            })
                        }
                        {/* <TouchableOpacity onPress={this.tabClick.bind(this, 1)}><Text style={[common.navRowBlock, this.state.tab == 1 ? common.navRowActive : null]}>全部订单</Text></TouchableOpacity>
                        <TouchableOpacity onPress={this.tabClick.bind(this, 2)}><Text style={[common.navRowBlock, this.state.tab == 2 ? common.navRowActive : null]}>待付款</Text></TouchableOpacity>
                        <TouchableOpacity onPress={this.tabClick.bind(this, 3)}><Text style={[common.navRowBlock, this.state.tab == 3 ? common.navRowActive : null]}>待发货</Text></TouchableOpacity>
                        <TouchableOpacity onPress={this.tabClick.bind(this, 4)}><Text style={[common.navRowBlock, this.state.tab == 4 ? common.navRowActive : null]}>待收货</Text></TouchableOpacity>
                        <TouchableOpacity onPress={this.tabClick.bind(this, 5)}><Text style={[common.navRowBlock, this.state.tab == 5 ? common.navRowActive : null]}>已完成</Text></TouchableOpacity> */}
                    </View>
                </View>
                {this.state.goodsList ?
                    <ScrollView
                        style={common.orderScrollView}
                        refreshControl={

                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this.refresh.bind(this, 0)}
                                colors={["#F5B50E"]}
                            />

                        }
                    >
                        {/* 空页面  重要！勿删 */}
                        {
                            this.state.goodsList.length == 0 ?
                                <View style={common.empty}>
                                    <Image style={common.emptyIcon} source={require('../../image/empty2.png')} />
                                    <Text style={common.emptyH1}>暂无订单</Text>
                                    <Text style={common.emptyP}>快去逛一逛吧~</Text>
                                </View> : null
                        }
                        {
                            this.state.goodsList.map((item, index) => {
                                return (
                                    <View style={css.orderBlock} key={index}>
                                        <TouchableOpacity onPress={() => { navigation.navigate('orderTake', { order_id: item.order_id,refresh: function () {
                        that.init();
                    } }); }}>
                                            <View style={common.alignItemsB}>
                                                <Text>订单状态</Text>
                                                {/* <Text style={common.yellow}>{item.state_text}</Text> */}
                                                {
                                                    item.is_online == 2 ? <Text style={common.yellow}>{item.verify_status.text}</Text> :
                                                        <Text style={common.yellow}>{item.state_text}</Text>
                                                }
                                            </View>
                                            <View style={[common.alignItemsB, { marginTop: 10 }]}>
                                                <Image style={css.orderImage} source={{ uri: item.goods[0].image.file_path }} />
                                                <View style={css.orderInfoName}>
                                                    <Text style={css.orderName} numberOfLines={2}>{item.goods[0].goods_name}</Text>
                                                    <Text style={css.orderSku}>{item.goods[0].goods_attr}</Text>
                                                    <View style={common.alignItemsB}>
                                                        <Text style={css.price}>￥{item.goods[0].goods_price}</Text>
                                                        <Text style={css.number}>X{item.goods[0].total_num}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={[common.alignItemsE, { marginTop: 25 }]}>
                                                <Text style={common.gray}>共{item.goods[0].total_num}件商品，合计：</Text>
                                                <Text style={common.red}>￥</Text>
                                                <Text style={css.totalPrice}>{item.order_price}</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <View style={common.btnWrap}>
                                            {/* {
                                                item.state_text == '待核销' ?
                                                    <TouchableOpacity onPress={() => this.setState({ ifshowmodal: 1, order_id: item.order_id })} style={common.minGrayBtn}>
                                                        <Text style={[common.minGrayBtnText]}>取消订单</Text>
                                                    </TouchableOpacity> : null
                                            } */}
                                            {
                                                item.state_text == '待付款' ?
                                                    <TouchableOpacity onPress={() => { navigation.navigate('orderTake', { order_id: item.order_id }); }} style={[common.minYellowBtn, { marginLeft: 10, }]}>
                                                        <Text style={[common.minYellowBtnText]}>去支付</Text>
                                                    </TouchableOpacity> : null
                                            }
                                            {
                                                item.state_text == '已发货，待收货' ?
                                                    <TouchableOpacity onPress={() => this.setState({ ifshowmodal2: 1, order_id: item.order_id })} style={[common.minYellowBtn, { marginLeft: 10, }]}>
                                                        <Text style={[common.minYellowBtnText]}>确认收货</Text>
                                                    </TouchableOpacity> : null
                                            }
                                            {/* <TouchableOpacity onPress={() => { navigation.navigate('home') }} style={common.minGrayBtn}>
                                                <Text style={[common.minGrayBtnText]}>取消</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => { navigation.navigate('home') }} style={[common.minYellowBtn, { marginLeft: 10, }]}>
                                                <Text style={[common.minYellowBtnText]}>去支付</Text>
                                            </TouchableOpacity> */}
                                        </View>
                                    </View>
                                )
                            })
                        }

                        {/* <view class="btn-wrap" v-if="item.state_text=='待付款'||item.state_text=='待收货'||item.order_status.text=='进行中'">
                            <button class="gray-border-btn" v-if="item.state_text=='待付款'||item.order_status.text=='进行中'" @tap.stop="cancelOrder(item.order_id)">取消订单</button>
                        <button class="blue-btn" v-if="item.state_text=='待付款'">去支付</button>
                        <button class="blue-btn" v-if="item.state_text=='待收货'" @tap.stop="confirmGet(item.order_id)">确认收货</button>
				</view>

                 */}
                        {/* <View style={css.orderBlock}>
                        <View style={common.alignItemsB}><Text>订单状态</Text><Text style={common.yellow}>待付款</Text></View>
                        <View style={[common.alignItemsB, { marginTop: 10 }]}>
                            <Image style={css.orderImage} source={require('../../image/product.png')} />
                            <View style={css.orderInfoName}>
                                <Text style={css.orderName} numberOfLines={2}>MIUCO法式印花刺绣花边领高腰修身荷叶边摆连衣裙女2021夏季新款MIUCO法式印花刺绣花边领高腰修身荷叶边摆连衣裙女2021夏季新款</Text>
                                <Text style={css.orderSku}>清新绿，L码</Text>
                                <View style={common.alignItemsB}>
                                    <Text style={css.price}>￥499.90</Text>
                                    <Text style={css.number}>X1</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[common.alignItemsE, { marginTop: 25 }]}>
                            <Text style={common.gray}>共1件商品，合计：</Text>
                            <Text style={common.red}>￥</Text>
                            <Text style={css.totalPrice}>499.90</Text>
                        </View>
                        <View style={common.btnWrap}>
                            <TouchableOpacity onPress={() => { navigation.navigate('home') }} style={common.minGrayBtn}>
                                <Text style={[common.minGrayBtnText]}>取消</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('home') }} style={[common.minYellowBtn, { marginLeft: 10, }]}>
                                <Text style={[common.minYellowBtnText]}>去支付</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={css.orderBlock}>
                        <View style={common.alignItemsB}><Text>订单状态</Text><Text style={common.yellow}>待收货</Text></View>
                        <View style={[common.alignItemsB, { marginTop: 10 }]}>
                            <Image style={css.orderImage} source={require('../../image/product.png')} />
                            <View style={css.orderInfoName}>
                                <Text style={css.orderName} numberOfLines={2}>MIUCO法式印花刺绣花边领高腰修身荷叶边摆连衣裙女2021夏季新款MIUCO法式印花刺绣花边领高腰修身荷叶边摆连衣裙女2021夏季新款</Text>
                                <Text style={css.orderSku}>清新绿，L码</Text>
                                <View style={common.alignItemsB}>
                                    <Text style={css.price}>￥499.90</Text>
                                    <Text style={css.number}>X1</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[common.alignItemsE, { marginTop: 25 }]}>
                            <Text style={common.gray}>共1件商品，合计：</Text>
                            <Text style={common.red}>￥</Text>
                            <Text style={css.totalPrice}>499.90</Text>
                        </View>
                        <View style={common.btnWrap}>
                            <TouchableOpacity onPress={() => { navigation.navigate('home') }} style={[common.minYellowFillBtn, { marginLeft: 10, }]}>
                                <Text style={[common.minYellowFillBtnText]}>确认收货</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={css.orderBlock}>
                        <View style={common.alignItemsB}><Text>订单状态</Text><Text style={common.yellow}>待付款</Text></View>
                        <View style={[common.alignItemsB, { marginTop: 10 }]}>
                            <Image style={css.orderImage} source={require('../../image/product.png')} />
                            <View style={css.orderInfoName}>
                                <Text style={css.orderName} numberOfLines={2}>MIUCO法式印花刺绣花边领高腰修身荷叶边摆连衣裙女2021夏季新款MIUCO法式印花刺绣花边领高腰修身荷叶边摆连衣裙女2021夏季新款</Text>
                                <Text style={css.orderSku}>清新绿，L码</Text>
                                <View style={common.alignItemsB}>
                                    <Text style={css.price}>￥499.90</Text>
                                    <Text style={css.number}>X1</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[common.alignItemsE, { marginTop: 25 }]}>
                            <Text style={common.gray}>共1件商品，合计：</Text>
                            <Text style={common.red}>￥</Text>
                            <Text style={css.totalPrice}>499.90</Text>
                        </View>
                        <View style={common.btnWrap}>
                            <TouchableOpacity onPress={() => { navigation.navigate('home') }} style={[common.minGrayFillBtn, { marginLeft: 10, }]}>
                                <Text style={[common.minGrayFillBtnText]}>删除订单</Text>
                            </TouchableOpacity>
                        </View>
                    </View> */}
                    </ScrollView > : null
                }

                <View style={common.navBar}>
                    <TouchableOpacity onPress={() => { navigation.navigate('home') }} style={common.navBarBlock}>
                        <Image style={common.navBarIcon} source={require('../../image/tabbar-1.png')} />
                        <Text style={[common.navBarText]}>首页</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('category') }} style={common.navBarBlock}>
                        <Image style={common.navBarIcon} source={require('../../image/tabbar-2.png')} />
                        <Text style={[common.navBarText]}>分类</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('orderIndex') }} style={common.navBarBlock}>
                        <Image style={common.navBarIcon} source={require('../../image/tabbar-3-s.png')} />
                        <Text style={[common.navBarText, { color: '#F3A316' }]}>订单</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('mine') }} style={common.navBarBlock}>
                        <Image style={common.navBarIcon} source={require('../../image/tabbar-4.png')} />
                        <Text style={common.navBarText}>我的</Text>
                    </TouchableOpacity>
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
                name: '全部'
            }, {
                dataType: 'payment',
                name: '待付款'
            }, {
                dataType: 'delivery',
                name: '待发货'
            }, {
                dataType: 'received',
                name: '待收货'
            }, {
                dataType: 'comment',
                name: '已完成'
            },],

            version: '',
            currentVersion: '',
        }
        // this.componentWillUnmount = this.componentWillUnmount.bind(this)
    }
    componentDidMount() {
        if (this.props.route.params) {
            this.setState({
                dataType: this.props.route.params.dataType
            })
            this.getOrderList2(this.props.route.params.dataType)
        } else {
            this.getOrderList();
        }
        var that = this;
        that.setState({
            // over:true,
            version: DeviceInfo.getVersion()
        }, () => {
            that.version()
        })
    }

    init(){
        var that = this;
        this.setState({
            dataType:'all'
        },()=>{
            that.getOrderList();
        })
    }

    version() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getVersions(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                var v_url = '';
                if (Platform.OS === 'android') {
                    v_url = res.data.url;

                } else if (Platform.OS == "ios") {
                    v_url = res.data.url;
                }
                // 比较版本
                var currentVersion = res.data.version;
            // console.log('0111111111')
            // console.log(that.state.version)
            // console.log(currentVersion)
                if (that.state.version == '') { return }
                if (that.state.version < currentVersion) {
                    // Alert.alert('0111111111')
                    that.setState({
                        v_url: v_url,
                        update: 1,
                        currentVersion: currentVersion,
                    })
                }
            } else if (res.code == -1) {
            } else {
            }
        })
    }
    update() {
        // Toast.show('url:'+this.state.v_url,1000000);

        var that = this;
        // that.setState({
        //     update: 0,
        // })
        Linking.openURL(that.state.v_url)
    }

    confirmGet() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        fromData['order_id'] = this.state.order_id;
        getOrderReceipt(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                Toast.show('提交成功')
                that.setState({
                    ifshowmodal2: 0
                }, () => {
                    that.getOrderList()
                })
            } else {
                Toast.show(res.msg, 2000);
            }
        })
    }

    refresh() {
        this.setState({
            isRefreshing: true
        }, this.getOrderList())
    }

    // 取消订单
    cancelOrder() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        fromData['order_id'] = this.state.order_id;
        getOrderCancel(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                Toast.show('提交成功')
                this.setState({
                    ifshowmodal: 0
                })
                this.getOrderList()
            }
        })
    }

    // 订单列表
    getOrderList() {
        var that = this;
    // console.log(this.state.dataType)
        let { navigation } = this.props;
        var fromData = {};
        fromData['dataType'] = this.state.dataType;
        getOrderLists(fromData, res => {
            // console.log(this.state.dataType)
        // console.log(res)
            if (res.code == 1) {
                this.setState({
                    goodsList: res.data.list.data,
                    isRefreshing: false
                })
            }
        })
    }

    // 订单列表
    getOrderList2(dataType) {
        var that = this;
    // console.log(dataType)
        let { navigation } = this.props;
        var fromData = {};
        fromData['dataType'] = dataType;
        getOrderLists(fromData, res => {
            // console.log(this.state.dataType)
        // console.log(res)
            if (res.code == 1) {
                this.setState({
                    goodsList: res.data.list.data,
                })
            }
        })
    }

    // 切换导航
    tabClick(dataType) {
        // console.log(dataType)
        if (dataType == this.state.dataType) { return }
        var that = this;
        that.setState({
            dataType,
            goodsList: [],
        }, ()=>{
            that.getOrderList2(dataType)
        })
    }

}
export default addFriend;