
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

import {getrechargeRecord} from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient  from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;

import common from '../../css/common.js'
import css from '../../css/exchangerecord'
import Item from 'antd/lib/list/Item';

class rechargerecord extends React.Component{
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
        getrechargeRecord(fromData,res =>{
        // console.log(res)
            if(res.code == 1){
                if(res.data.length==0){
                    Toast.show('暂无数据')
                }
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
        // console.log('上传滑动到底部事件')
            this.setState({
                pageNum:this.state.pageNum+1,
            },this.getData())

        }
    }
    render(){
        let {navigation} = this.props;
        return(
            <View style={common.bodyGray}>
                {/* 头部 */}
                <View style={[common.header]}>
                    <TouchableOpacity onPress={()=>{navigation.goBack();}} style={common.headerLeft}>
                    <Image source={require('../../images/return.png')}  style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>充值记录</Text></View>
                </View>
                
                <View style={[css.main,{marginTop:40}]}>
                    <ScrollView
                            onMomentumScrollEnd = {this._contentViewScroll.bind(this)}
                        >
                        {this.state.list.map((item, index) => {
                            return (
                                <View style={css.recordBlock}>
                                    <View style={css.typeName}><Text>{item.typeName}</Text><Text>+{item.number}</Text></View>
                                    <View style={css.typeName}><Text>状态：</Text><Text>{item.statusName}</Text></View>
                                    <View style={css.typeName}><Text>时间：</Text><Text>{item.addtime}</Text></View>
                                    <View style={css.typeName}><Text>地址：</Text><Text>{item.address}</Text></View>
                                    <View style={css.typeName}><Text>流水号：</Text><Text>{item.order_sn}</Text></View>
                                    {
                                        item.remark!==''||item.remark!=null?
                                        <View style={css.typeName}><Text>原因：</Text><Text>{item.remark}</Text></View>:null
                                    }
                                </View>
                            );
                        })}
                    </ScrollView>
                    {/* <View style={css.recordBlock}>
                        <Text style={css.typeName}>USDT<Text>+100</Text></Text>
                        <Text style={css.typeName}>时间：2020.04.19 13:00</Text>
                        <Text style={css.typeName}>地址：Ydk596Kf574TG233KJ78OJ1236Kf574T</Text>
                        <Text style={css.typeName}>流水号：202028943875847843889489</Text>
                    </View> */}
                </View>
            </View>
        )
    }
}
export default rechargerecord;
