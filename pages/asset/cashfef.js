
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
        if(this.state.address==''){return Toast.show('?????????????????????')}
        if(this.state.num==''){return Toast.show('?????????????????????')}
        if(this.state.code==''){return Toast.show('????????????????????????')}
        if(this.state.pay_pwd==''){return Toast.show('?????????????????????')}
        fromData['code'] = this.state.code;
        fromData['address'] = this.state.address;
        fromData['num'] = this.state.num;
        fromData['pay_pwd'] = this.state.pay_pwd;

        if(this.state.ifClick==false){
            // Toast.show('?????????????????????');
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
        // console.log('????????????'+JSON.stringify(res.data))
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
                {/* ?????? */}
                <View style={[common.header]}>
                    <TouchableOpacity onPress={()=>{navigation.goBack();}} style={common.headerLeft}>
                    <Image source={require('../../images/return.png')}  style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>FEF??????</Text></View>
                </View>
                
                <View style={css.main}>
                    <ScrollView>
                    <View style={css.usable}><Text>??????FEF</Text><Text>{this.state.mydata.fef_price}</Text></View>
                    <Text style={css.label}>????????????</Text>
                    <View style={css.inputItem}>
                        <TextInput type="text" value={this.state.address} onChangeText={(text)=>{this.setState({address:text})}} placeholder="???????????????????????????"/>
                    </View>
                    <Text style={css.label}>????????????</Text>
                    <View style={css.inputItem}>
                        <TextInput type="number" value={this.state.num} onChangeText={(text)=>{this.setState({num:text})}} placeholder="?????????????????????"/>
                    </View>
                    <Text style={css.label}>?????????</Text>
                    <View style={css.inputItem}>
                        <TextInput type="number" value={this.state.code} onChangeText={(text)=>{this.setState({code:text})}} placeholder="????????????????????????" style="width: 50%;"/>
                        {/* <Code ref="child" onRef={this.onRef} MakeMoney={this.getcode}/> */}
                        <Code ref="child" onRef={(ref)=>{ this.child = ref}} MakeMoney={this.getcode.bind(this)}/>
                    </View>
                    <Text style={css.label}>????????????</Text>
                    <View style={css.inputItem}>
                        <TextInput  secureTextEntry={true} value={this.state.pay_pwd} onChangeText={(text)=>{this.setState({pay_pwd:text})}} placeholder="?????????????????????"/>
                    </View>
                     
                    <View style={css.service}><Text>?????????</Text><View style={css.serviceNum}><Text>0.0000</Text><Text>FEF</Text></View></View>
                  
                    <View style={css.tips}>
                        <Text style={{color:'#D857FF'}}>*???????????????</Text>
                        <Text>1??????????????????TRC20</Text>
                        <Text>2??????????????????{this.state.config.fef_tx_double} ?????????</Text>
                        <Text>3???????????????????????? {this.state.config.fef_tx_min} ???</Text>
                        <Text>4???????????????????????????{this.state.config.fef_tx_charge} %?????????</Text>
                        <Text>5?????????????????????????????????????????????</Text>
                    </View>
                    </ScrollView>
                </View>
                
                {/* <TouchableOpacity onPress={()=>{this.submit;}} style={[css.linearBtn,{marginLeft:15,width:width-30}]}> */}
                <TouchableOpacity onPress={this.submit.bind(this)} style={[css.linearBtn,{marginTop:58,marginLeft:15,width:width-30,position:'absolute',bottom:30,display:this.state.address==''||this.state.num==''||this.state.code==''||this.state.pay_pwd==''||this.state.ifClick==false?'flex':'none'}]}>
                    <LinearGradient colors={['#ccc', '#ccc']} style={[common.linearBtn,{display:this.state.address==''||this.state.num==''||this.state.code==''||this.state.pay_pwd==''||this.state.ifClick==false?'flex':'none'}]} start={{x: 0, y: 0}} end={{x: 1, y: 1}}><Text style={common.linearBtnText}>??????</Text></LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.submit.bind(this)} style={[css.linearBtn,{marginLeft:15,width:width-30,display:this.state.address!=''&&this.state.num!=''&&this.state.code!=''&&this.state.pay_pwd!=''&&this.state.ifClick==true?'flex':'none'}]}>
                    <LinearGradient colors={['#4767FF', '#B657FF']} style={[common.linearBtn,{display:this.state.address!=''&&this.state.num!=''&&this.state.code!=''&&this.state.pay_pwd!=''&&this.state.ifClick==true?'flex':'none'}]} start={{x: 0, y: 0}} end={{x: 1, y: 1}}><Text style={common.linearBtnText}>??????</Text></LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }
}
export default cashfef;