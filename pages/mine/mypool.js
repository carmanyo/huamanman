
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

    // ??????
    confirm(){
        if(this.state.num==''){return Toast.show('?????????????????????')}
        if(this.state.futoupwd==''){return Toast.show('?????????????????????')}

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

    // ??????
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
        var type = ['??????','??????','?????????'];

        // ????????????
        let payType1 = this.state.payType==1?<Image style={common.tick} source={require("../../img/radio-s.png")} />:<Image style={common.tick} source={require("../../img/radio.png")} />;
        let payType2 = this.state.payType==2?<Image style={common.tick} source={require("../../img/radio-s.png")} />:<Image style={common.tick} source={require("../../img/radio.png")} />;

        {/* ???????????? */}
        let ifbuy = this.state.ifbuy == 1?<View style={{position:'absolute',width:width,height:height,top:0}}>
            <TouchableOpacity onPress={()=>{this.setState({ifbuy:0})}} style={common.mask}></TouchableOpacity>
            <View style={common.askModal}>
                <View style={common.selectWrap}>
                    <ModalDropdown defaultValue={'??????'} options={type}
                        style={[common.dropdown,{width:width-150}]}
                        dropdownStyle={[common.dropdown,{height:32*type.length+30,width:width-90,marginLeft:-10,marginTop:10,}]}
                        textStyle={{fontSize:14}}
                        dropdownTextStyle={{fontSize:14}}
                        onSelect={this._selectType}
                    ></ModalDropdown>
                    <Image style={common.selectIcon} source={require("../../img/select.png")} />
                </View>
                <TextInput type="number" style={[common.input,{}]} value={this.state.num} onChangeText={(text)=>{this.setState({num:text})}} placeholder="?????????????????????" placeholder-style={common.placeholder}/>
                <TextInput type="password" style={common.input} value={this.state.futoupwd} onChangeText={(text)=>{this.setState({futoupwd:text})}} placeholder="?????????????????????" placeholder-style={common.placeholder}/>
                {
                    this.state.tab==2?
                    <View style={common.pay}>
                        <Text style={{marginRight:15,}}>????????????</Text>
                        <View style={common.radioCon}>
                            {/* <TouchableOpacity onPress={()=>{this.setState({payType:1})}} style={common.radioWrap}>
                                {payType1}
                                <Text>??????FT??????</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity onPress={()=>{this.setState({payType:2})}} style={[common.radioWrap,{}]}>
                                {payType2}
                                <Text>FT??????</Text>
                            </TouchableOpacity>
                        </View>
                    </View>:null
                }
                <View style={common.askOperation}>

                    <TouchableOpacity onPress={()=>{this.setState({ifbuy:0})}} type="default"><Text style={common.cancelBtn}>??????</Text></TouchableOpacity>
                    <TouchableOpacity onPress={this.confirm.bind(this)} type="default"><Text style={common.confirmBtn}>??????</Text></TouchableOpacity>
                </View>
            </View>
        </View>:null;
        // ????????????????????????
        let showPwd = this.state.showPwd==1?
            <View style={common.passwordCont}>
                <TouchableOpacity onPress={()=>{this.setState({showPwd:0})}} style={common.passwordMask}></TouchableOpacity>
                <View style={common.passwordWrap}>
                    <Text style={common.passwordText}>?????????????????????</Text>
                    <Password maxLength={6}
                        onChange={(value)=> {
                        // console.log('??????????????????',value)
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
                {/* ?????? */}
                <View style={[common.header]}>
                    <TouchableOpacity onPress={()=>{navigation.goBack();}} style={common.headerLeft}>
                    <Image source={require('../../images/return.png')}  style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>????????????</Text></View>
                </View>

                <ScrollView style={[common.main,{paddingBottom:10,maxHeight:height-60}]}>
                    {this.state.list.map((item, index) => {
                        return (
                            <View style={css.recordBlock} key={index}>
                                <View style={css.recordTitle}><Text>{item.typeName}</Text><Text>{item.num}</Text></View>
                                <View style={css.recordTitle}><Text>?????????</Text><Text style="color: #4967FF;">{item.statusName}</Text></View>
                                <Text style={css.recordText}>???????????????{item.days}</Text>
                                <Text style={css.recordText}>????????????{item.rate}%</Text>
                                <Text style={css.recordText}>???????????????{item.create_time}</Text>
                                <Text style={css.recordText}>???????????????{item.end_time}</Text>
                                <Text style={item.cancel_time?css.recordText:common.hidden}>???????????????{item.cancel_time}</Text>
                                <View style={css.btnWrap}>
                                    <TouchableOpacity onPress={()=>{navigation.navigate('lockprofit',{id:item.id});}}>
                                        <LinearGradient colors={['#4767FF', '#B657FF']} style={css.linearBtn} start={{x: 0, y: 0}} end={{x: 1, y: 1}}><Text style={css.linearBtnText}>????????????</Text></LinearGradient>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{this.setState({id:item.id,showPwd:1})}} style={item.status == 1 && item.type != 3?null:common.hidden}>
                                        <LinearGradient colors={['#4767FF', '#B657FF']} style={css.linearBtn} start={{x: 0, y: 0}} end={{x: 1, y: 1}}><Text style={css.linearBtnText}>??????</Text></LinearGradient>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{this.setState({id:item.id,ifbuy:1})}} style={item.status == 1 && item.type == 1?null:common.hidden}>
                                        <LinearGradient colors={['#4767FF', '#B657FF']} style={css.linearBtn} start={{x: 0, y: 0}} end={{x: 1, y: 1}}><Text style={css.linearBtnText}>??????</Text></LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}
                    {/* <View style={css.recordBlock}>
                        <View style={css.recordTitle}><Text>item.typeName</Text><Text>item.num</Text></View>
                        <View style={css.recordTitle}><Text>?????????</Text><Text style="color: #4967FF;">item.statusName</Text></View>
                        <Text style={css.recordText}>???????????????item.days</Text>
                        <Text style={css.recordText}>????????????item.rate%</Text>
                        <Text style={css.recordText}>???????????????item.create_time</Text>
                        <Text style={css.recordText}>???????????????item.end_time</Text>
                        <Text style={css.recordText} v-show="item.cancel_time">???????????????item.cancel_time</Text>
                        <View style={css.btnWrap}>
                            <TouchableOpacity>
                                <LinearGradient colors={['#4767FF', '#B657FF']} style={css.linearBtn} start={{x: 0, y: 0}} end={{x: 1, y: 1}}><Text style={css.linearBtnText}>????????????</Text></LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <LinearGradient colors={['#4767FF', '#B657FF']} style={css.linearBtn} start={{x: 0, y: 0}} end={{x: 1, y: 1}}><Text style={css.linearBtnText}>??????</Text></LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <LinearGradient colors={['#4767FF', '#B657FF']} style={css.linearBtn} start={{x: 0, y: 0}} end={{x: 1, y: 1}}><Text style={css.linearBtnText}>??????</Text></LinearGradient>
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
