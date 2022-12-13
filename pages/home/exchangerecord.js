
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

import {getexchangeRecord,} from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient  from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;

import common from '../../css/common.js'
import css from '../../css/exchangerecord.js'

class exchangerecord extends React.Component{
    state = { 
        list:[],
        pageNum:1,
    }
    componentDidMount(){
        // Toast.show('res.msg, 2000');
        this.getData();
    }
    getData(){
        var that = this;
        let {navigation} = this.props;
        var fromData = {};
        fromData['page'] = this.state.pageNum;
        fromData['type'] = 2;
        // console.log(fromData)
        getexchangeRecord(fromData,res =>{
        // console.log(res.data)
            if(res.code == 1){
                this.setState({
                    list:this.state.list.concat(res.data)
                })
            }else if(res.code == -1){
                Toast.show(res.msg);
                setTimeout(function(){
                    navigation.navigate('login')
                },2000)
            }else{
                Toast.show(res.msg, 2000);
            }
        })
    }

    _contentViewScroll(e){
        var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
        if (offsetY + oriageScrollHeight >= contentSizeHeight){
            // Console.log('上传滑动到底部事件')
            this.setState({
                pageNum:this.state.pageNum+1,
            },this.getData())

        }
    }
    render(){
        let {navigation} = this.props;
        return(
            <View style={common.body}>
                {/* 头部 */} 
                <View style={[common.header]}>
                    <TouchableOpacity onPress={()=>{navigation.goBack();}} style={common.headerLeft}>
                    <Image source={require('../../images/return.png')}  style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>兑换记录</Text></View>
                </View>
                
                <ScrollView onMomentumScrollEnd = {this._contentViewScroll.bind(this)} style={common.main}>
                        {this.state.list.map((item, index) => {
                            return (
                                <View style={css.recordBlock}>
                                    <View style={css.typeName}><Text>类型</Text><Text>{item.typeName}</Text></View>
                                    <View style={css.beforeNum}><Text>数量：</Text><Text>{item.before_num}</Text></View>
                                    <View style={css.charge}><Text>手续费：</Text><Text>{item.charge}</Text></View>
                                    <View style={css.addtime}><Text>时间：</Text><Text>{item.addtime}</Text></View>
                                </View>
                            );
                        })}
                    {/* <View style={[css.navWrap]}> */}
                        {/* <Text style={[css.nav,css.navActive]}>充值USDT兑换FT</Text> */}
                        {/* <Text style={css.nav}>FT兑换FEF</Text> */}
                        {/* <Text style={css.nav}>FEF兑换可用USDT</Text>
                        <Text style={css.nav}>充值USDT兑换可用USDT</Text> */}
                    {/* </View> */}
                    {/* <View style={css.recordBlock}>
                        <View style={css.typeName}><Text>类型</Text><Text>item.typeName</Text></View>
                        <View style={css.beforeNum}><Text>数量：</Text><Text>item.before_num</Text></View>
                        <View style={css.charge}><Text>手续费：</Text><Text>item.charge</Text></View>
                        <View style={css.addtime}><Text>时间：</Text><Text>item.addtime</Text></View>
                    </View> */}
                </ScrollView>
            </View>
        )
    }
}
export default exchangerecord;
