
import React from 'react';
import {
  Clipboard,
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

import {getcontract} from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient  from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;

import common from '../../css/common.js'
import css from '../../css/contact.js'

class contact extends React.Component{
    state = {
        mydata:[],
    }
    componentDidMount(){
        this.init();
    }
    init(){
        this.getData();
    }
    getData(){
        var that = this;
        let {navigation} = this.props;
        var fromData = {};
        getcontract(fromData,res =>{
        // console.log(res.data)
            if(res.code == 1){
                this.setState({
                    mydata:res.data
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
    async copy(){
        Clipboard.setString(this.state.mydata.contract_url);
        let  str = await Clipboard.getString();
    // console.log(str)//我是文本
        Toast.show('复制成功')
    }
    render(){
        let {navigation} = this.props;
    // console.log(this.state.mydata)
        return(
            <View style={common.body}>
                {/* 头部 */}
                <View style={[common.header]}>
                    <TouchableOpacity onPress={()=>{navigation.goBack();}} style={common.headerLeft}>
                    <Image source={require('../../images/return.png')}  style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>联系客服</Text></View>
                </View>

                <View style={css.main}>
                    {/* <Text style={{width: 90%;margin: 0.3rem auto;wordBreak: breakAll;textAlign: center;}}>点击网址复制 */}
                    <Text>点击网址复制</Text>
                    <TouchableOpacity onPress={this.copy.bind(this)}><Text style={{color: '#0476FE',}}>{this.state.mydata.contract_url}</Text></TouchableOpacity >
                    <Text>下载APP，然后添加客服</Text>
                    {/* <Image style={css.contact} source={require("../../img/contact.jpg")} /> */}
                    <Image style={css.banner} source={{uri:this.state.mydata.contract_img}}/>
                </View>
            </View>
        )
    }
}
export default contact;
