
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
import HTMLView from 'react-native-htmlview'

import {getLogin} from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient  from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;

import common from '../../css/common.js'
import css from '../../css/css.js'

class newsdetail extends React.Component{
    state = { 
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
                </View>
                
                <ScrollView  style={[css.main,{marginTop:40,padding:15}]}>
                    {/* <Text>啄木鸟把树木搞得千疮百孔，它们到底是好鸟还是坏鸟？</Text>
                    <View style={css.time}>
                        <Image source={require("../../image/logo.png")} />2020.03.12 21:33:43
                    </View>
                    <Text>啄木鸟把树木搞的千疮百孔，它们到底是好鸟还是坏鸟？</Text>
                    <Text>我们很小的时候都认识到了啄木鸟这位“森林医生”，它能帮助树木拜托害虫的侵扰，拯救树木于危难之中。</Text>
                    <Text>一直我们认为它们是实打实的好鸟，但自从我们看到了这样的画面</Text> */}
                    <Text style={{fontSize:16,}}>{this.props.route.params.title}</Text>
                    <View style={[css.time,{marginTop:20,}]}>
                        {/* <Image source={require("../../image/logo.png")} style={{width:20,height:20}}/> */}
                        <HTMLView 
                            value={this.props.route.params.con}
                        />
                        <Text style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',textAglin:'right',width:width}}>{this.props.route.params.time}</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
export default newsdetail;