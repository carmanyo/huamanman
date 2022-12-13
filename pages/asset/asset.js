
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

import {getassetIndex} from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient  from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;

import common from '../../css/common.js'
import css from '../../css/asset.js'
import ToastExample from '../home/ToastExample';

class asset extends React.Component{
    state = { 
        mydata:[],
    } 
    componentDidMount(){
        // Toast.show('res.msg, 2000');
        this.getassetIndex();
        
        ToastExample.showin('Awesome', ToastExample.SHORT);
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
            <View style={common.bodyGray}>
                <ScrollView 
                    // showsVerticalScrollIndicator={false}
                    // onScrollEndDrag={(e)=>this.exportOnScrollEndDrag(e)}
                    // onMomentumScrollEnd={(e)=>this.exportonMomentumScrollEnd(e)}
                    // ref = {(ref)=>{this.outsideScroll = ref}}
                >
                <View style={css.main}>
                    <LinearGradient colors={['#4767FF', '#B657FF']}  style={[css.topbg,{height:200}]} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
                        <View style={css.data}>
                            <Text style={css.dataStonrg}>可用FEF</Text>
                            <Text style={css.dataTitle}>{this.state.mydata.fef_price} </Text>
                            {/* <Text style={css.dataP}>≈ 2 CNY</Text> */}
                        </View>
                    </LinearGradient>
 
                    
                    
                    {/* <View style={css.funcWrap}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('recharge')}} style={css.funcBlock}><Image style={css.funcWrapImage} source={require("../../img/asset-1.png")} /><Text style={css.funcWrapText}>充值</Text></TouchableOpacity><View style={css.assetLine}></View>
                        <TouchableOpacity onPress={()=>{navigation.navigate('choosecash')}} style={css.funcBlock}><Image style={css.funcWrapImage} source={require("../../img/asset-2.png")} /><Text style={css.funcWrapText}>提现</Text></TouchableOpacity><View style={css.assetLine}></View>
                        <TouchableOpacity onPress={()=>{navigation.navigate('chooseexchange')}} style={css.funcBlock}><Image style={css.funcWrapImage} source={require("../../img/asset-3.png")} /><Text style={css.funcWrapText}>兑换</Text></TouchableOpacity>
                    </View> */}
                    
                    {/* <View style={css.content}>
                        <Text style={css.contentTitle}>我的币种</Text>
                        <View style={css.block}>
                            <View style={css.blockLeft}><Image style={css.assetIcon} source={require("../../img/asset-5.png")} /><Text>FEF</Text></View>
                            <Text style={css.blockNum}>{this.state.mydata.fef_price}</Text>
                        </View>
                        <View style={css.block}>
                            <View style={css.blockLeft}><Image style={css.assetIcon} source={require("../../img/asset-5.png")} /><Text>质押FEF</Text></View>
                            <Text style={css.blockNum}>{this.state.mydata.fef_lock}</Text>
                        </View>
                        <View style={css.block}>
                            <View style={css.blockLeft}><Image style={css.assetIcon} source={require("../../img/asset-5.png")} /><Text>释放FT</Text></View>
                            <Text style={css.blockNum}>{this.state.mydata.sf}</Text>
                        </View>
                        <View style={css.block}>
                            <View style={css.blockLeft}><Image style={css.assetIcon} source={require("../../img/asset-5.png")} /><Text>可用FT</Text></View>
                            <Text style={css.blockNum}>{this.state.mydata.send_ft}</Text>
                        </View>
                        <View style={css.block}>
                            <View style={css.blockLeft}><Image style={css.assetIcon} source={require("../../img/asset-5.png")} /><Text>质押FT</Text></View>
                            <Text style={css.blockNum}>{this.state.mydata.ft_lock}</Text>
                        </View>
                        <Text style={css.contentTitle}>其他资产</Text>
                        <View style={css.block}>
                            <View style={css.blockLeft}><Image style={css.assetIcon} source={require("../../img/asset-7.png")} /><Text>赠送冻结FT</Text>
                            </View>
                            <View style={common.FCR}><Text style={css.blockNum}>{this.state.mydata.give_total}</Text>
                            </View>
                        </View>
                        <View style={css.block}>
                            <View style={css.blockLeft}><Image style={css.assetIcon} source={require("../../img/asset-8.png")} /><Text>储备冻结FT</Text></View>
                            <View style={common.FCR}><Text style={css.blockNum}>{this.state.mydata.old_user_dong}</Text>
                            </View>
                        </View>
                    </View> */}
                </View>
                </ScrollView>
                
                {/* 底部导航 */}
                {/* <View style={{height:50}}></View> */}
                <View style={common.navBar}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('home')}} style={common.navBarBlock}>
                        <Image style={common.navBarIcon} source={require('../../img/index.png')}/>
                        <Text style={[common.navBarText]}>首页</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{navigation.navigate('asset')}} style={common.navBarBlock}>
                        <Image style={common.navBarIcon} source={require('../../img/asset-s.png')}/>
                        <Text style={[common.navBarText,{color:'#7B70FB'}]}>资产</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{navigation.navigate('pool')}} style={common.navBarBlock}>
                        <Image style={common.navBarIcon} source={require('../../img/pool.png')}/>
                        <Text style={[common.navBarText]}>矿池</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{navigation.navigate('mine')}} style={common.navBarBlock}>
                        <Image style={common.navBarIcon} source={require('../../img/mine.png')}/>
                        <Text style={[common.navBarText]}>我的</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default asset;