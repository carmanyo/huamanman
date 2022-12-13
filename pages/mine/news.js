
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

import {getnoticeIndex} from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient  from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;

import common from '../../css/common.js'
import css from '../../css/news.js'

class news extends React.Component{
    state = { 
        list:[],
    }
    componentDidMount(){
        // Toast.show('res.msg, 2000');
        this.news();
    }
    news(){
        var that = this;
        let {navigation} = this.props;
        var fromData = {};
        getnoticeIndex(fromData,res =>{
        // console.log(res)
            if(res.code == 1){
            // console.log(res.data)
                this.setState({
                    list:res.data
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
    render(){
        let {navigation} = this.props;
        return(
            <View style={common.bodyGray}>
                {/* 头部 */}
                <View style={[common.header]}>
                    <TouchableOpacity onPress={()=>{navigation.goBack();}} style={common.headerLeft}>
                    <Image source={require('../../images/return.png')}  style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>系统公告</Text></View>
                </View>
                
                <View style={common.main}>
                    {this.state.list.map((item, index) => {
                        return (
                            <TouchableOpacity onPress={()=>{navigation.navigate('newsdetail',{title:item.title,time:item.time,con:item.con})}} style={css.newsBlock}>
                                <View style={css.newsInfo}>
                                    <Text numberOfLines={2}>{item.title}</Text>
                                    <Text style={css.newsTime}>{item.time}</Text>
                                </View>
                                <Image style={common.more} source={require("../../img/more.png")} />
                            </TouchableOpacity>
                        );
                    })}
                    {/* <TouchableOpacity onPress={()=>{navigation.navigate('newsdetail')}} style={css.newsBlock}>
                        <View style={css.newsInfo}>
                            <Text numberOfLines={2}>系统将于9月25号上线商城功能，系统将于9月25号上线商城功能，更多…更多…</Text>
                            <Text style={css.newsTime}>2020.04.19 13:00</Text>
                        </View>
                        <Image style={common.more} source={require("../../img/more.png")} />
                    </TouchableOpacity> */}
                </View>
            </View>
        )
    }
}
export default news;