
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

import {getmyTeam} from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient  from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;

import common from '../../css/common.js'
import css from '../../css/myfan.js'

class myfan extends React.Component{
    state = {
        mydata:[],
        userinfo:[],
        list:[],
    }
    componentDidMount(){
        // Toast.show('res.msg, 2000');
        this.getData();
    }
    getData(){
        var that = this;
        let {navigation} = this.props;
        var fromData = {};
        getmyTeam(fromData,res =>{
        // console.log(res.data)
            if(res.code == 1){
                this.setState({
                    mydata:res.data,
                    userinfo:res.data.userinfo,
                    list:res.data.data
                })
            }else if(res.code == -1){
                Toast.show(res.msg);
                setTimeout(function(){
                    navigation.navigate("login", {
                        refresh: function () {
                            that.init();
                        }
                    });
                },2000)
            }else{
                Toast.show(res.msg, 2000);
            }
        })
    }
    render(){
        let {navigation} = this.props;
    // console.log('sdasfas~~~~~~~~')
    // console.log(this.state.userinfo.team_yj)
        return(
            <View style={common.body}>
                {/* 头部 */}
                <View style={[common.header,{backgroundColor:'#0F0833'}]}>
                    <TouchableOpacity onPress={()=>{navigation.goBack();}} style={common.headerLeft}>
                    <Image source={require('../../img/return-white.png')}  style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={[common.headerTitleText,{color:'#fff'}]}>我的萤粉</Text></View>
                </View>

                <ScrollView style={css.main}>
                    <ImageBackground style={[css.topdata,{height:181}]} source={require('../../img/myfan-bg.png')}>
                        {/* <Text style={css.strong}>{this.state.userinfo.ft_team_lock}</Text>
                        <Text style={css.font}>FT团队业绩</Text>
                        <Text style={[css.strong,{marginTop:15,}]}>{this.state.userinfo.fef_team_lock}</Text>
                        <Text style={css.font}>FEF团队业绩</Text> */}
                        <View style={[common.FCR,{marginTop:10,}]}>
                            <View style={common.FCC}>
                                <Text style={css.dataBlockNum}>{this.state.userinfo.ft_team_lock}</Text>
                                <Text style={css.dataBlockFont}>FT团队业绩</Text>
                            </View>
                            <View style={css.dataLine}></View>
                            <View style={common.FCC}>
                                <Text style={css.dataBlockNum}>{this.state.userinfo.zhitui}</Text>
                                <Text style={css.dataBlockFont}>FEF团队业绩</Text>
                            </View>
                            <View style={css.dataLine}></View>
                            <View style={common.FCC}>
                                <Text style={css.dataBlockNum}>{this.state.userinfo.team_num}</Text>
                                <Text style={css.dataBlockFont}>一代人数</Text>
                            </View>
                        </View>
                    </ImageBackground >

                    <Text style={css.title}>我的萤粉</Text>
                        {this.state.list.map((item, index) => {
                            return (
                                <View style={css.fanBlock}>
                                    <View style={[common.FBR,css.blockTitle]}>
                                        <View style={common.FCR}>
                                            <Image style={common.img24} source={require("../../image/logo.png")} />
                                            <Text>{item.user_id}</Text>
                                        </View>
                                        <Image style={css.statusIcon} source={require("../../img/realname.png")} />
                                    </View>
                                    <View style={css.width33}><Text style={css.gray}>FT团队业绩：</Text><Text style={css.blockNum}>{item.ft_team_lock}</Text></View>
                                    <View style={css.width33}><Text style={css.gray}>FEF团队业绩：</Text><Text style={css.blockNum}>{item.fef_team_lock}</Text></View>
                                    <View style={css.width33}><Text style={css.gray}>团队人数：</Text><Text style={css.blockNum}>{item.team_num}</Text></View>
                                    <View style={css.width100}><Text style={css.gray}>注册时间：</Text><Text style={css.blockNum}>{item.add_time}</Text></View>
                                </View>
                            );
                        })}
                    {/* <View style={css.fanBlock}>
                        <View style={[common.FBR,css.blockTitle]}>
                            <View style={common.FCR}>
                                <Image style={common.img24} source={require("../../image/logo.png")} />
                                <Text>秋香9527</Text>
                            </View>
                            <Image style={css.statusIcon} source={require("../../img/realname.png")} />
                        </View>
                        <View style={css.width33}><Text style={css.gray}>FT团队业绩：</Text><Text style={css.blockNum}>76.0000</Text></View>
                        <View style={css.width33}><Text style={css.gray}>FEF团队业绩：</Text><Text style={css.blockNum}>76.0000</Text></View>
                        <View style={css.width33}><Text style={css.gray}>团队人数：</Text><Text style={css.blockNum}>76.0000</Text></View>
                        <View style={css.width100}><Text style={css.gray}>注册时间：</Text><Text style={css.blockNum}>2021.05.12 12:44</Text></View>
                    </View> */}
                </ScrollView>
            </View>
        )
    }
}
export default myfan;
