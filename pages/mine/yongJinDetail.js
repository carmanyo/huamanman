
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
        var offsetY = e.nativeEvent.contentOffset.y; //????????????
        var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize??????
        var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView??????
        if (offsetY + oriageScrollHeight >= contentSizeHeight) {
            // Console.log('???????????????????????????')
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
                {/* ?????? */}
                <View style={[common.header]}>
                    <TouchableOpacity onPress={() => { navigation.goBack(); }} style={common.headerLeft}>
                        <Image source={require('../../image/return.png')} style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>????????????</Text></View>
                </View>

                <View style={[common.tab,{marginTop:20}]}>
                    <TouchableOpacity onPress={this.tabClick.bind(this, 1)}><Text style={[common.tabText, this.state.tab == 1 ? common.tabTextActive : null]}>??????</Text></TouchableOpacity>
                    <TouchableOpacity onPress={this.tabClick.bind(this, 2)}><Text style={[common.tabText, this.state.tab == 2 ? common.tabTextActive : null]}>??????</Text></TouchableOpacity>
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
                        {/* ?????????  ??????????????? */}
                        {
                            this.state.list.length == 0 ?
                                <View style={common.empty}>
                                    <Image style={common.emptyIcon} source={require('../../image/empty2.png')} />
                                    <Text style={common.emptyH1}>????????????~</Text>
                                </View> : null
                        }
                        {this.state.list.map((item, index) => {
                            return (
                                <View style={css.recordBlock}>
                                    <View style={common.alignItemsB}>
                                        <View style={common.alignItemsCenter}><Text style={[this.state.tab == 1 ?common.red:common.green, { marginRight: 10 }]}>{this.state.tab == 1 ?'??????':'??????'}</Text><Text>{item.typeName}</Text></View>
                                        <Text style={this.state.tab == 1 ?common.red:common.green}>{this.state.tab == 1 ?'+':'-'}???{item.num}</Text>
                                    </View>
                                    {item.desc!=''?<Text style={css.time}>?????????{item.desc}</Text>:null}
                                    <Text style={css.time}>{item.create_time}</Text>
                                </View>
                            );
                        })}

                        {/* ?????????  ??????????????? */}
                        {/* <View style={common.empty}>
                            <Image style={common.emptyIcon} source={require('../../image/empty2.png')} />
                            <Text style={common.emptyH1}>??????????????????</Text>
                            <Text style={common.emptyP}>???????????????????????????</Text>
                        </View> */}

                        {/* <View style={css.recordBlock}>
                            <View style={common.alignItemsB}>
                                <View style={common.alignItemsCenter}><Text style={[common.green, { marginRight: 10 }]}>??????</Text><Text>??????????????????</Text></View>
                                <Text style={common.green}>-???10000.00</Text>
                            </View>
                            <Text style={css.time}>2022/09/22 14:40:24</Text>
                        </View>
                        <View style={css.recordBlock}>
                            <View style={common.alignItemsB}>
                                <View style={common.alignItemsCenter}><Text style={[common.red, { marginRight: 10 }]}>??????</Text><Text>????????????</Text></View>
                                <Text style={common.red}>+???1300.00</Text>
                            </View>
                            <Text style={css.time}>2022/09/22 14:40:24</Text>
                        </View> */}
                    </ScrollView>

                    {/* <View style={css.recordBlock}>
                        <View style={css.typeName}><Text>FEF</Text><Text>-item.total_money</Text></View>
                        <View style={css.typeName}><Text>????????????:</Text><Text>item.money</Text></View>
                        <View style={css.typeName}><Text>?????????:</Text><Text>item.charge</Text></View>
                        <View style={css.typeName}><Text v-show="item.status==5">?????????</Text><Text style={css.yellow}>?????????</Text></View>
                        <View style={css.typeName}><Text v-show="item.status==10">?????????</Text><Text style={css.green}>????????????</Text></View>
                        <View style={css.typeName}><Text v-show="item.status==15">?????????</Text><Text style={css.red}>????????????</Text></View>
                        <View style={css.typeName}><Text>?????????</Text><Text>`+da[i].addtime+`</Text></View>
                        <View style={css.typeName}><Text>?????????</Text><Text>`+da[i].info+`</Text></View>
                        <View style={css.typeName}><Text>?????????</Text><Text>`+da[i].remark+`</Text></View>
                    </View> */}
                </View>
            </View>
        )
    }
}
export default cashrecord;
