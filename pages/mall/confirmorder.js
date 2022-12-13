
import React from 'react';
import {
//   AsyncStorage,
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

import {getLogin,getsubmitAjax} from '../../network/authapi.js'
const Toast = Overlay.Toast;
import Password from 'react-native-password-pay';

import LinearGradient  from 'react-native-linear-gradient'
// import { color } from 'react-native-reanimated';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import common from '../../css/common.js'
import css from '../../css/confirmorder.js'

class confirmorder extends React.Component{
    state = { 
        id:'',
        name:'',
        express_fee:'',
        num:'',
        price:'',
        remark:'',
        ifAddress:0,
        addressdata:{
            area:{}
        },
        payType:1,
        showPwd:0,
    }
    componentDidMount(){
        // id:this.props.route.params.id,
        // name:this.state.mydata.name,
        // express_fee:this.state.mydata.express_fee,
        // num:this.state.num,
        // price:this.state.mydata.price,
        this.setState({
            id:this.props.route.params.id,
            name:this.props.route.params.name,
            express_fee:this.props.route.params.express_fee,
            num:this.props.route.params.num,
            price:this.props.route.params.price,
            img:this.props.route.params.img,
        })
        let that = this;
        this.init();
    }
    init(){
        var that = this;
        AsyncStorage.getItem('addressdata', function (error, result) {
            if (error) {
            // console.log(error)
            }else{
            // console.log('addressdata---------')
            // console.log(result)
                if(result!=null){
                    that.setState({
                        ifAddress: 1,
                        addressdata: JSON.parse(result),
                    })
                }
            }
        })
    }
    toaddress(){
        let that = this;
        let {navigation} = this.props;
        navigation.navigate("address",{
            from:1,
            refresh: function () {
                that.init();
            }
        });
    }
    confirm(){
        if (this.state.num == '') { return Toast.show('请输入购买数量') }
        this.setState({ ifbuy: 0, showPwd: 1 })
    }
    submit() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        fromData['id'] = Number(this.state.id);
        fromData['num'] = Number(this.state.num);
        fromData['pay_pwd'] = Number(this.state.pwd);
        fromData['address_id'] = this.state.addressdata.id;
        fromData['remark'] = this.state.remark==''?'--':this.state.remark;
        fromData['pay_type'] = this.state.payType==1?5:10;

    // console.log(fromData)
        // return;
        getsubmitAjax(fromData, res => {
            if (res.code == 1) {
                Toast.show(res.msg);
                this.setState({ showPwd: 0 })
                navigation.navigate('order',{type:1})
            } else {
                Toast.show(res.msg);
            }
        })
    }
    render(){
        let {navigation} = this.props;
        // 支付方式 
        let payType1 = this.state.payType == 1 ? <Image style={common.tick} source={require("../../img/radio-s.png")} /> : <Image style={common.tick} source={require("../../img/radio.png")} />;
        let payType2 = this.state.payType == 2 ? <Image style={common.tick} source={require("../../img/radio-s.png")} /> : <Image style={common.tick} source={require("../../img/radio.png")} />;
        {/* 复投弹窗 */ }
        let ifbuy = this.state.ifbuy == 1 ? <View style={{ position: 'absolute', width: width, height: height, top: 0 }}>
            <TouchableOpacity onPress={() => { this.setState({ ifbuy: 0 }) }} style={common.mask}></TouchableOpacity>
            <View style={common.askModal}>
                    <View style={common.pay}>
                        <Text style={{ marginRight: 15, }}>支付方式</Text>
                        <View style={common.radioCon}>
                            <TouchableOpacity onPress={() => { this.setState({ payType: 1 }) }} style={common.radioWrap}>
                                {payType1}
                                <Text>充值余额支付</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.setState({ payType: 2 }) }} style={[common.radioWrap,{marginTop:10,}]}>
                                {payType2}
                                <Text>收益余额支付</Text>
                            </TouchableOpacity>
                        </View>
                    </View> 
                <View style={common.askOperation}>

                    <TouchableOpacity onPress={() => { this.setState({ ifbuy: 0 }) }} type="default"><Text style={common.cancelBtn}>取消</Text></TouchableOpacity>
                    <TouchableOpacity onPress={this.confirm.bind(this)} type="default"><Text style={common.confirmBtn}>确认</Text></TouchableOpacity>
                </View>
            </View>
        </View> : null;
        // 是否显示支付弹窗
        let showPwd = this.state.showPwd == 1 ?
        <View style={common.passwordCont}>
            <TouchableOpacity onPress={() => { this.setState({ showPwd: 0 }) }} style={common.passwordMask}></TouchableOpacity>
            <View style={common.passwordWrap}>
                <Text style={common.passwordText}>请输入交易密码</Text>
                <Password maxLength={6}
                    onChange={(value) => {
                    // console.log('输入的密码：', value)
                        if (value.length == 6) {
                            this.setState({
                                // showPwd:0,
                                pwd: value
                            }, this.submit.bind(this))
                        }
                    }}
                />
            </View>
        </View> : null;
        return(
            <View style={common.bodyGray}>
                {/* 头部 */}
                <View style={[common.header,common.noShadowColor,{backgroundColor:'transparent'}]}>
                    <TouchableOpacity onPress={()=>{navigation.goBack();}} style={common.headerLeft}>
                    <Image source={require('../../img/return-white.png')}  style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={[common.headerTitleText,{color:'#fff',fontSize:16,}]}>确认订单</Text></View>
                </View>

                <LinearGradient colors={['#4767FF', '#B657FF']} style={{width:width,height: 150,borderBottomRightRadius:30,borderBottomLeftRadius:30,}} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
                </LinearGradient>
                
                <View style={css.topBg}></View>
                <View style={css.main}>
                {
                    this.state.ifAddress == 1 ? 
                    <TouchableOpacity onPress={this.toaddress.bind(this)} style={css.address}>
                        <View style={css.addressTitle}><Image style={css.addressIcon} source={require("../../img/address.png")} /><Text style={{color:'#000'}}>{this.state.addressdata.area}</Text></View>
                        <View style={css.addressInfo}><Text>{this.state.addressdata.detail}</Text><Image source={require("../../img/more-2.png")} style={common.more} /></View>
                        <View style={css.addressContract}><Text>{this.state.addressdata.name}</Text><Text style={css.addressMobile}>{this.state.addressdata.mobile}</Text></View>
                    </TouchableOpacity> : 
                    <TouchableOpacity onPress={this.toaddress.bind(this)} style={css.address}>
                        <View style={css.addressTitle}><Image style={css.addressIcon} source={require("../../img/address.png")} /><Text style={{color:'#58575C'}}>请选择地址</Text></View>
                        <Image source={require("../../img/more-2.png")} style={common.more} />
                    </TouchableOpacity> 
                }
                    
                    
                    <View style={css.orderInfo}>
                        <View style={css.goodsWrap}>
                                    {/* <Image style={css.banner} source={{uri:item.image}}/> */}
                            <Image style={{width:100,height:100}} source={{uri:this.state.img}} />
                            <View style={css.goodsInfo}>
                                <Text style={[css.goodsTitle,{}]}>{this.state.name}</Text>
                                <View style={css.priceWrap}>
                                    <Text style={css.price}>￥{this.state.price}</Text>
                                    <Text>x{this.state.num}</Text>
                                </View>
                            </View>
                        </View>
                        
                        <View style={css.inputWrap}>
                            <Text style={css.inputLabel}>物流运费</Text>
                            <Text style={css.inputSpan}>￥{this.state.express_fee}</Text>
                        </View>
                        <View style={css.inputWrap}>
                            <Text style={css.inputLabel}>订单备注</Text>
                            <TextInput type="text" placeholder="选填，给商家留言最多100字" maxlength="5"
                                onChangeText={(text)=>{this.setState({remark:text})}}
                            />
                        </View>
                        <View style={[common.FCR,{justifyContent:'flex-end',paddingBottom:20,marginRight:20}]}><Text style={[css.totalWrap,{color:'#AAAABB'}]}>共{this.state.num}件，</Text><Text style={css.total}>小计：￥{this.state.num*this.state.price}</Text></View>
                    </View>
                </View>
                
                <View style={[css.footer]}>
                    <View style={css.footerTotal}>
                        <Text>合计：</Text>
                        <Text style={css.footerTotalPrice}>￥{this.state.num*this.state.price}</Text>
                    </View>
                    {/* <TouchableOpacity onPress={()=>{navigation.goBack();}} type="default" style={css.linearBtn}>立即付款</TouchableOpacity> */}
                    <TouchableOpacity onPress={()=>{
                    // console.log(this.state.addressdata.id)
                        if(this.state.addressdata.id==undefined){
                            Toast.show('请选择地址');
                            return;
                        }
                        this.setState({ifbuy:1})
                        }} style={[css.linearBtn,{width:146,marginBottom:10,}]}>
                        <LinearGradient colors={['#4767FF', '#B657FF']} style={[common.linearBtn,{}]} start={{x: 0, y: 0}} end={{x: 1, y: 1}}><Text style={common.linearBtnText}>立即付款</Text></LinearGradient>
                    </TouchableOpacity>
                </View>
                
                {ifbuy}
                {showPwd}
            </View>
        )
    }
}
export default confirmorder;