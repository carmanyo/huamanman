
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

import {getrealname} from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient  from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;

import common from '../../css/common.js'
import css from '../../css/realname.js'

class realname extends React.Component{
    state = { 
        name:'',
        id_num:''
    }
    submit(){
        var that = this;
        let {navigation} = this.props;
        var fromData = {};
        if(this.state.name==''){return Toast.show('请输入法人名称')}
        if(this.state.id_num==''){return Toast.show('请输入身份证号码')}
        fromData['name'] = this.state.name;
        fromData['id_num'] = this.state.id_num;
    // console.log(fromData)
        getrealname(fromData,res =>{
        // console.log(res)
            if(res.code == 1){
                Toast.show(res.msg);
            }else{
                Toast.show(res.msg);
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
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>实名认证</Text></View>
                </View>
                
                <View style={common.main}>
                    <View style={css.inputCon}>
                        <View style={[css.inputItem,{borderBottomWidth:1,borderColor:'#EDEDED'}]}>
                            <Text style={css.inputItemLabel}>法人名称</Text>
                            <TextInput
                                style={[common.textInputStyle]}
                                placeholder="请输入法人名称"
                                placeholderTextColor="#B3B3B3"
                                value={this.state.name} onChangeText={(text)=>{this.setState({name:text})}}
                            ></TextInput>
                        </View>
                        <View style={css.inputItem}>
                            <Text style={css.inputItemLabel}>身份证号码</Text>
                            <TextInput
                                style={[common.textInputStyle]}
                                placeholder="请输入身份证号码"
                                placeholderTextColor="#B3B3B3"
                                value={this.state.id_num} onChangeText={(text)=>{this.setState({id_num:text})}}
                            ></TextInput>
                        </View>
                    </View>
                    <TouchableOpacity onPress={this.submit.bind(this)} style={[css.linearBtn,{marginTop:58,marginLeft:15,width:width-30}]}>
                        <LinearGradient colors={['#4767FF', '#B657FF']} style={common.linearBtn} start={{x: 0, y: 0}} end={{x: 1, y: 1}}><Text style={common.linearBtnText}>确定</Text></LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default realname;