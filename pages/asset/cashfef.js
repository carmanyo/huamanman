
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

import {getfefCash,getConfig,getNoTokenPhoneCode,getPhoneCode,getassetIndex} from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient  from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;

import common from '../../css/common.js'
import css from '../../css/cashfef.js'
import Code from '../auth/code';

class cashfef extends React.Component{
    constructor(props) {
        super(props);
        // this.getcode = this.getcode.bind(this);
        // this.submit = this.submit.bind(this);
        this.state = {
            mydata:[], 
            config:[], 
            address:'',
            num:'',
            code:'',
            pay_pwd:'',
            ifClick:true
        };
    }
    // state = { 
    //     mydata:[], 
    //     config:[], 
    //     address:'',
    //     num:'',
    //     code:'',
    //     pay_pwd:''
    // }
    componentDidMount(){
        this.config();
        this.getassetIndex()
    }
    config(){
        var that = this;
        let {navigation} = this.props;
        var fromData = {};
        getConfig(fromData,res =>{
        // console.log(res)
            if(res.code == 1){
                this.setState({
                    config:res.data.fef_config
                })
            }else{
                // Toast.show(res.msg, 2000);
            }
        })
    }
    getcode(){
        var that = this;
        let {navigation} = this.props;
        var fromData = {};
        fromData['type'] = 3;
        getPhoneCode(fromData,res =>{
        // console.log(res)
            if(res.code == 1){
                Toast.show(res.msg);
                that.child._beginCountDown();
            }else{
                Toast.show(res.msg);
            }
        })
    }

    submit(){
        // Toast.show('res.msg, 2000');
        var that = this;
        let {navigation} = this.props;
        var fromData = {};
        if(this.state.address==''){return Toast.show('请输入钱包地址')}
        if(this.state.num==''){return Toast.show('请输入提币数量')}
        if(this.state.code==''){return Toast.show('请再次输入验证码')}
        if(this.state.pay_pwd==''){return Toast.show('请输入交易密码')}
        fromData['code'] = this.state.code;
        fromData['address'] = this.state.address;
        fromData['num'] = this.state.num;
        fromData['pay_pwd'] = this.state.pay_pwd;

        if(this.state.ifClick==false){
            // Toast.show('处理中，请稍等');
            return;
        }
        that.setState({
            ifClick:false
        })


        getfefCash(fromData,res =>{
        // console.log(res)
            if(res.code == 1){
                that.setState({
                    ifClick:true
                })
                Toast.show(res.msg, 2000);
                navigation.navigate('asset');
            }else if(res.code==1){
                that.setState({
                    ifClick:true
                })
                Toast.show(res.msg, 2000);
                // setTimeout(function(){
                //     navigation.navigate('realname')
                // },2000)
            }else{
                that.setState({
                    ifClick:true
                })
                Toast.show(res.msg, 2000);
            }
        })
    }
    getassetIndex(){
        var that = this;
        let {navigation} = this.props;
        var fromData = {};
        getassetIndex(fromData,res =>{
        // console.log('资产页面'+JSON.stringify(res.data))
            if(res.code == 1){
                this.setState({
                    mydata:res.data
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
                    <Image source={require('../../images/return.png')}  style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>FEF提现</Text></View>
                </View>
                
                <View style={css.main}>
                    <ScrollView>
                    <View style={css.usable}><Text>可用FEF</Text><Text>{this.state.mydata.fef_price}</Text></View>
                    <Text style={css.label}>钱包地址</Text>
                    <View style={css.inputItem}>
                        <TextInput type="text" value={this.state.address} onChangeText={(text)=>{this.setState({address:text})}} placeholder="请输入您的钱包地址"/>
                    </View>
                    <Text style={css.label}>提现数量</Text>
                    <View style={css.inputItem}>
                        <TextInput type="number" value={this.state.num} onChangeText={(text)=>{this.setState({num:text})}} placeholder="请输入提现数量"/>
                    </View>
                    <Text style={css.label}>验证码</Text>
                    <View style={css.inputItem}>
                        <TextInput type="number" value={this.state.code} onChangeText={(text)=>{this.setState({code:text})}} placeholder="请输入短信验证码" style="width: 50%;"/>
                        {/* <Code ref="child" onRef={this.onRef} MakeMoney={this.getcode}/> */}
                        <Code ref="child" onRef={(ref)=>{ this.child = ref}} MakeMoney={this.getcode.bind(this)}/>
                    </View>
                    <Text style={css.label}>交易密码</Text>
                    <View style={css.inputItem}>
                        <TextInput  secureTextEntry={true} value={this.state.pay_pwd} onChangeText={(text)=>{this.setState({pay_pwd:text})}} placeholder="请输入交易密码"/>
                    </View>
                     
                    <View style={css.service}><Text>手续费</Text><View style={css.serviceNum}><Text>0.0000</Text><Text>FEF</Text></View></View>
                  
                    <View style={css.tips}>
                        <Text style={{color:'#D857FF'}}>*温馨提示：</Text>
                        <Text>1、提现通道：TRC20</Text>
                        <Text>2、提现金额：{this.state.config.fef_tx_double} 的倍数</Text>
                        <Text>3、提现数量最低为 {this.state.config.fef_tx_min} 个</Text>
                        <Text>4、每提现一笔需扣除{this.state.config.fef_tx_charge} %手续费</Text>
                        <Text>5、请在提交前，认真核对提币地址</Text>
                    </View>
                    </ScrollView>
                </View>
                
                {/* <TouchableOpacity onPress={()=>{this.submit;}} style={[css.linearBtn,{marginLeft:15,width:width-30}]}> */}
                <TouchableOpacity onPress={this.submit.bind(this)} style={[css.linearBtn,{marginTop:58,marginLeft:15,width:width-30,position:'absolute',bottom:30,display:this.state.address==''||this.state.num==''||this.state.code==''||this.state.pay_pwd==''||this.state.ifClick==false?'flex':'none'}]}>
                    <LinearGradient colors={['#ccc', '#ccc']} style={[common.linearBtn,{display:this.state.address==''||this.state.num==''||this.state.code==''||this.state.pay_pwd==''||this.state.ifClick==false?'flex':'none'}]} start={{x: 0, y: 0}} end={{x: 1, y: 1}}><Text style={common.linearBtnText}>提现</Text></LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.submit.bind(this)} style={[css.linearBtn,{marginLeft:15,width:width-30,display:this.state.address!=''&&this.state.num!=''&&this.state.code!=''&&this.state.pay_pwd!=''&&this.state.ifClick==true?'flex':'none'}]}>
                    <LinearGradient colors={['#4767FF', '#B657FF']} style={[common.linearBtn,{display:this.state.address!=''&&this.state.num!=''&&this.state.code!=''&&this.state.pay_pwd!=''&&this.state.ifClick==true?'flex':'none'}]} start={{x: 0, y: 0}} end={{x: 1, y: 1}}><Text style={common.linearBtnText}>提现</Text></LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }
}
export default cashfef;