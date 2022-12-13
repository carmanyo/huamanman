
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

import {getnews} from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient  from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;

import common from '../../css/common.js'
import css from '../../css/infolist.js'

class infolist extends React.Component{
    state = { 
        list:[]
    }
    componentDidMount(){
        // Toast.show('res.msg, 2000');
        this.getData();
    }
    getData(){ 
        var that = this;
        let {navigation} = this.props;
        var fromData = {};
        getnews(fromData,res =>{
        // console.log(res)
            if(res.code == 1){
                this.setState({
                    list:res.data.list.data
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
            <View style={common.body}>
                {/* 头部 */}
                <View style={[common.header]}>
                    <TouchableOpacity onPress={()=>{navigation.goBack();}} style={common.headerLeft}>
                    <Image source={require('../../image/return.png')}  style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>消息中心</Text></View>
                </View>
                 
                <ScrollView style={css.main}>
                    {this.state.list&&this.state.list.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={()=>{navigation.navigate('infodetails',{title:item.title,time:item.time,con:item.con});}} style={css.timeBlock}>
                                <View style={css.timeLeft}>
                                    <Image source={require('../../img/timeline.png')}  style={css.timelineIcon} />
                                    <View style={css.line}></View>
                                </View>
                                <View style={css.timeRight}>
                                    <Text style={css.time}>{item.time}</Text>
                                    <Text style={css.title} numberOfLines={2}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

            </View>
        )
    }
}
export default infolist;