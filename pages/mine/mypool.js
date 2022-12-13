
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
import ModalDropdown from 'react-native-modal-dropdown';
import Password from 'react-native-password-pay';
import {getlockLog,getcancel,getpurchase} from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient  from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import common from '../../css/common.js'
import css from '../../css/mypool'

class mypool extends React.Component{
    state = {
        tab:2,
        ifbuy:0,
        payType:2,
        showPwd:0,
        list:[],
        id:'',
        num:'',
        futoupwd:'',
        areaIndex:1,
    }

    componentDidMount(){
        // Toast.show('res.msg, 2000');
        this.init();
    }
    init(){
        this.getData();
    }
    getData(){
        var that = this;
        let {navigation} = this.props;
        var fromData = {};
        getlockLog(fromData,res =>{
        // console.log(res.data)
            if(res.code == 1){
                this.setState({
                    list:res.data,
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
    _selectType = (index,value) => {
    // console.log(index + '--' + value)
        this.setState({
            areaIndex: index
        })
    }
    submit(){
        var that = this;
    // console.log(this.state.myvalidate)
    // console.log(this.state.validate)
        let {navigation} = this.props;
        var fromData = {};
        fromData['id'] = Number(this.state.id);
        fromData['num'] = Number(this.state.num);
        fromData['payment'] = Number(this.state.pwd);

        if(this.type==0){
            fromData['paytype'] = 1;
        }else{
            fromData['paytype'] = Number(this.state.payType);
        }
    // console.log(fromData)
        // return;
        getlock(fromData,res =>{
            if(res.code == 1){
                Toast.show(res.msg);
                this.setState({
                    showPwd:0,
                    num:'',
                })
            }else{
                Toast.show(res.msg);
            }
        })
    }

    // 复投
    confirm(){
        if(this.state.num==''){return Toast.show('请输入购买数量')}
        if(this.state.futoupwd==''){return Toast.show('请输入交易密码')}

        var that = this;
        let {navigation} = this.props;
        var fromData = {};
        fromData['id'] = Number(this.state.id);
        fromData['payment'] = Number(this.state.futoupwd);
        fromData['num'] = Number(this.state.num);
        fromData['numOperation'] = Number(this.state.areaIndex)+1;
        if(this.type==0){
            fromData['paytype'] = 1;
        }else{
            fromData['paytype'] = Number(this.state.payType);
        }
    // console.log(this.state.areaIndex)
    // console.log(fromData)
        // return;
        getpurchase(fromData,res =>{
        // console.log(res)
            if(res.code == 1){
                Toast.show(res.msg);
                this.setState({
                    ifbuy:0,
                })
            }else{
                Toast.show(res.msg);
            }
        })
    }

    // 赎回
    shuhui(){
        var that = this;
        let {navigation} = this.props;
        var fromData = {};
        fromData['id'] = Number(this.state.id);
        fromData['payment'] = Number(this.state.pwd);
    // console.log(fromData)
        // return;
        getcancel(fromData,res =>{
        // console.log(res)
            if(res.code == 1){
                Toast.show(res.msg);
                this.setState({
                    showPwd:0,
                })
                this.getData();
            }else{
                Toast.show(res.msg);
            }
        })
    }
    render(){
        let {navigation} = this.props;
        var type = ['增加','减少','不增加'];

        // 支付方式
        let payType1 = this.state.payType==1?<Image style={common.tick} source={require("../../img/radio-s.png")} />:<Image style={common.tick} source={require("../../img/radio.png")} />;
        let payType2 = this.state.payType==2?<Image style={common.tick} source={require("../../img/radio-s.png")} />:<Image style={common.tick} source={require("../../img/radio.png")} />;

        {/* 复投弹窗 */}
        let ifbuy = this.state.ifbuy == 1?<View style={{position:'absolute',width:width,height:height,top:0}}>
            <TouchableOpacity onPress={()=>{this.setState({ifbuy:0})}} style={common.mask}></TouchableOpacity>
            <View style={common.askModal}>
                <View style={common.selectWrap}>
                    <ModalDropdown defaultValue={'增加'} options={type}
                        style={[common.dropdown,{width:width-150}]}
                        dropdownStyle={[common.dropdown,{height:32*type.length+30,width:width-90,marginLeft:-10,marginTop:10,}]}
                        textStyle={{fontSize:14}}
                        dropdownTextStyle={{fontSize:14}}
                        onSelect={this._selectType}
                    ></ModalDropdown>
                    <Image style={common.selectIcon} source={require("../../img/select.png")} />
                </View>
                <TextInput type="number" style={[common.input,{}]} value={this.state.num} onChangeText={(text)=>{this.setState({num:text})}} placeholder="请输入购买数量" placeholder-style={common.placeholder}/>
                <TextInput type="password" style={common.input} value={this.state.futoupwd} onChangeText={(text)=>{this.setState({futoupwd:text})}} placeholder="请输入交易密码" placeholder-style={common.placeholder}/>
                {
                    this.state.tab==2?
                    <View style={common.pay}>
                        <Text style={{marginRight:15,}}>支付方式</Text>
                        <View style={common.radioCon}>
                            {/* <TouchableOpacity onPress={()=>{this.setState({payType:1})}} style={common.radioWrap}>
                                {payType1}
                                <Text>充值FT支付</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity onPress={()=>{this.setState({payType:2})}} style={[common.radioWrap,{}]}>
                                {payType2}
                                <Text>FT支付</Text>
                            </TouchableOpacity>
                        </View>
                    </View>:null
                }
                <View style={common.askOperation}>

                    <TouchableOpacity onPress={()=>{this.setState({ifbuy:0})}} type="default"><Text style={common.cancelBtn}>取消</Text></TouchableOpacity>
                    <TouchableOpacity onPress={this.confirm.bind(this)} type="default"><Text style={common.confirmBtn}>确认</Text></TouchableOpacity>
                </View>
            </View>
        </View>:null;
        // 是否显示支付弹窗
        let showPwd = this.state.showPwd==1?
            <View style={common.passwordCont}>
                <TouchableOpacity onPress={()=>{this.setState({showPwd:0})}} style={common.passwordMask}></TouchableOpacity>
                <View style={common.passwordWrap}>
                    <Text style={common.passwordText}>请输入交易密码</Text>
                    <Password maxLength={6}
                        onChange={(value)=> {
                        // console.log('输入的密码：',value)
                            if(value.length==6){
                                this.setState({
                                    // showPwd:0,
                                    pwd:value
                                },this.shuhui.bind(this))
                            }
                        }}
                    />
                </View>
            </View>:null;
        return(
            <View style={[common.bodyGray,{paddingBottom:10,minHeight:height}]}>
                {/* 头部 */}
                <View style={[common.header]}>
                    <TouchableOpacity onPress={()=>{navigation.goBack();}} style={common.headerLeft}>
                    <Image source={require('../../images/return.png')}  style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>我的矿池</Text></View>
                </View>

                <ScrollView style={[common.main,{paddingBottom:10,maxHeight:height-60}]}>
                    {this.state.list.map((item, index) => {
                        return (
                            <View style={css.recordBlock} key={index}>
                                <View style={css.recordTitle}><Text>{item.typeName}</Text><Text>{item.num}</Text></View>
                                <View style={css.recordTitle}><Text>状态：</Text><Text style="color: #4967FF;">{item.statusName}</Text></View>
                                <Text style={css.recordText}>挖矿时长：{item.days}</Text>
                                <Text style={css.recordText}>月收益：{item.rate}%</Text>
                                <Text style={css.recordText}>购买时间：{item.create_time}</Text>
                                <Text style={css.recordText}>到期时间：{item.end_time}</Text>
                                <Text style={item.cancel_time?css.recordText:common.hidden}>赎回时间：{item.cancel_time}</Text>
                                <View style={css.btnWrap}>
                                    <TouchableOpacity onPress={()=>{navigation.navigate('lockprofit',{id:item.id});}}>
                                        <LinearGradient colors={['#4767FF', '#B657FF']} style={css.linearBtn} start={{x: 0, y: 0}} end={{x: 1, y: 1}}><Text style={css.linearBtnText}>释放明细</Text></LinearGradient>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{this.setState({id:item.id,showPwd:1})}} style={item.status == 1 && item.type != 3?null:common.hidden}>
                                        <LinearGradient colors={['#4767FF', '#B657FF']} style={css.linearBtn} start={{x: 0, y: 0}} end={{x: 1, y: 1}}><Text style={css.linearBtnText}>赎回</Text></LinearGradient>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{this.setState({id:item.id,ifbuy:1})}} style={item.status == 1 && item.type == 1?null:common.hidden}>
                                        <LinearGradient colors={['#4767FF', '#B657FF']} style={css.linearBtn} start={{x: 0, y: 0}} end={{x: 1, y: 1}}><Text style={css.linearBtnText}>复投</Text></LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}
                    {/* <View style={css.recordBlock}>
                        <View style={css.recordTitle}><Text>item.typeName</Text><Text>item.num</Text></View>
                        <View style={css.recordTitle}><Text>状态：</Text><Text style="color: #4967FF;">item.statusName</Text></View>
                        <Text style={css.recordText}>挖矿时长：item.days</Text>
                        <Text style={css.recordText}>月收益：item.rate%</Text>
                        <Text style={css.recordText}>购买时间：item.create_time</Text>
                        <Text style={css.recordText}>到期时间：item.end_time</Text>
                        <Text style={css.recordText} v-show="item.cancel_time">赎回时间：item.cancel_time</Text>
                        <View style={css.btnWrap}>
                            <TouchableOpacity>
                                <LinearGradient colors={['#4767FF', '#B657FF']} style={css.linearBtn} start={{x: 0, y: 0}} end={{x: 1, y: 1}}><Text style={css.linearBtnText}>释放明细</Text></LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <LinearGradient colors={['#4767FF', '#B657FF']} style={css.linearBtn} start={{x: 0, y: 0}} end={{x: 1, y: 1}}><Text style={css.linearBtnText}>赎回</Text></LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <LinearGradient colors={['#4767FF', '#B657FF']} style={css.linearBtn} start={{x: 0, y: 0}} end={{x: 1, y: 1}}><Text style={css.linearBtnText}>复投</Text></LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View> */}
                </ScrollView>
                {showPwd}
                {ifbuy}
            </View>
        )
    }
}
export default mypool;
