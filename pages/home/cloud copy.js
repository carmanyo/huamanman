
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

import {getyunDetail} from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient  from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;

import common from '../../css/common.js'
import css from '../../css/css.js'

class cloud extends React.Component{
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
        getyunDetail(fromData,res =>{
        // console.log(res.data)
            if(res.code == 1){
                this.setState({
                    mydata:res.data.yun_detail
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
        return(
            <View style={common.body}>
                {/* 头部 */}
                <View style={[common.header]}>
                    <TouchableOpacity onPress={()=>{navigation.goBack();}} style={common.headerLeft}>
                    <Image source={require('../../images/return.png')}  style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>云矿场</Text></View>
                </View>

                <View style={[common.main,{padding:15,}]}>
                        <HTMLView
                            value={this.state.mydata.con}
                        />
                </View>
            </View>
        )
    }
}
export default cloud;
