
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
const window = Dimensions.get('window');


import Code from '../auth/code';


import {getLogin} from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient  from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;

import common from '../../css/common.js'
import css from '../../css/css.js'



class forgetPwd extends React.Component{
    constructor(props){
        super(props)
    }
    state={
        phone:'',
        validate:'',
        code:'',
        pwd:'',
        repwd:'',

        ifShowModal:false,
    }
    _confirm=()=>{
        this.setState({
            ifShowModal:true,
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
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>忘记密码</Text></View>
                </View>

                <View style={common.main}>
                    <View style={css.viewPlaceholder10}></View>

                    <View style={css.resetPwdInputItem}>
                        <Text style={css.resetPwdLabel}>手机号</Text>
                        <TextInput
                         style={css.resetPwdInput}
                        onChangeText={(phone) => this.setState({phone})}
                        value={this.state.phone}
                        placeholder='请输入手机号'
                        placeholderTextColor='#999999'
                        maxLength={30}
                        />
                    </View>
                    <View style={css.resetPwdInputItem}>
                        <Text style={css.resetPwdLabel}>验证码</Text>
                        <TextInput
                         style={css.resetPwdInput}
                        onChangeText={(code) => this.setState({code})}
                        value={this.state.code}
                        placeholder='请输入验证码'
                        placeholderTextColor='#999999'
                        maxLength={30}
                        />
                        <Code/>
                    </View>
                    <View style={css.resetPwdInputItem}>
                        <Text style={css.resetPwdLabel}>新密码</Text>
                        <TextInput
                         style={css.resetPwdInput}
                        onChangeText={(pwd) => this.setState({pwd})}
                        value={this.state.pwd}
                        placeholder='请输入新密码'
                        placeholderTextColor='#999999'
                        maxLength={30}
                        secureTextEntry={true}
                        />
                    </View>
                    <View style={css.resetPwdInputItem}>
                        <Text style={css.resetPwdLabel}>确认密码</Text>
                        <TextInput
                         style={css.resetPwdInput}
                        onChangeText={(repwd) => this.setState({repwd})}
                        value={this.state.repwd}
                        placeholder='请确认新密码'
                        placeholderTextColor='#999999'
                        maxLength={30}
                        secureTextEntry={true}
                        />
                    </View>

                    <View style={css.viewPlaceholder10}></View>
                    <TouchableOpacity onPress={this._confirm} style={common.whiteFillBtn}>
                        <Text style={common.whiteFillBtnText}>确认</Text>
                    </TouchableOpacity>
                </View>


                {/* 修改成功弹窗 */}
                {
                    this.state.ifShowModal?(
                        <View style={css.popup}>
                            <View style={css.mask}></View>
                            <View style={css.editSucceedModal}>
                                <Image source={require('../../images/editSucceed.png')} style={css.editSucceedImg}/>
                                <Text style={css.editSucceedH2}>修改成功</Text>
                                <Text>您的密码已经修改成功，请重新登录</Text>
                                <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={[common.blueFillBtn,{width:window.width-90,marginTop:60}]}>
                                    <Text style={common.blueFillBtnText}>重新登录</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ):null
                }
            </View>
        )
    }


    
}
export default forgetPwd;