
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

import {getconsume} from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient  from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;

import common from '../../css/common.js'
import css from '../../css/expensedetail.js'

class expensedetail extends React.Component{
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
        fromData['pageNum'] = this.state.pageNum
        getconsume(fromData,res =>{
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
            <View style={common.bodyGray}>
                {/* 头部 */}
                <View style={[common.header]}>
                    <TouchableOpacity onPress={()=>{navigation.goBack();}} style={common.headerLeft}>
                    <Image source={require('../../images/return.png')}  style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>消费明细</Text></View>
                </View>
                
                <View style={common.main}>
                    <ScrollView
                        onMomentumScrollEnd = {this._contentViewScroll.bind(this)}
                    >
                        {this.state.list.map((item, index) => {
                            return (
                                <View style={css.recordBlock}>
                                    <View style={css.recordTitle}><Text>{item.typeName}</Text><Text>{item.val}</Text></View>
                                    <Text style={css.recordText}>备注：{item.remark}</Text>
                                    <Text style={css.recordText}>时间：{item.time}</Text>
                                </View>
                            );
                        })}
                    </ScrollView>
                    {/* <View style={css.recordBlock}>
                        <View style={css.recordTitle}><Text>金额</Text><Text>130</Text></View>
                        <Text style={css.recordText}>备注：事实上</Text>
                        <Text style={css.recordText}>时间：2020-04-19 13:00:56</Text>
                    </View> */}
                </View>
            </View>
        )
    }
}
export default expensedetail;
