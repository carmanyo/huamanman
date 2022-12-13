
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

import {getLogin,getmyOrder} from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient  from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;

import common from '../../css/common.js'
import css from '../../css/order.js'

class order extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            list:[],
            pageNum:1,
            type:1,
        }
    }
    componentDidMount(){
        // Toast.show('res.msg, 2000');
        this.state.type = this.props.route.params.type,
        this.getData();
    }
    getData(){ 
        var that = this;
        let {navigation} = this.props;
        var fromData = {};
        fromData['page'] = this.state.pageNum;
        fromData['type'] = this.state.type;
        getmyOrder(fromData,res =>{
        // console.log(res.data)
            if(res.code == 1){
                this.setState({
                    list:this.state.list.concat(res.data)
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

    _contentViewScroll(e){
        var that = this;
        var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
        if (offsetY + oriageScrollHeight >= contentSizeHeight){
        // console.log('上传滑动到底部事件')
        // console.log(that.state)
            that.setState({
                pageNum:that.state.pageNum+1,
            },that.getData())
        }
    }
    changeType(type){
        // Toast.show(type)
        this.state.type = type;
        this.state.pageNum = 1;
        this.state.list = [];
        this.setState({
            list:[],
            pageNum:1,
            type:Number(type)
        },this.getData())
    }

    // getNewsData(type){ 
    //     var that = this;
    //     let {navigation} = this.props;
    //     var fromData = {};
    //     fromData['page'] = this.state.pageNum;
    //     fromData['type'] = type;
    //     getmyOrder(fromData,res =>{
    //     // console.log(res.data)
    //         if(res.code == 1){
    //             this.setState({
    //                 list:this.state.list.concat(res.data)
    //             })
    //         }else if(res.code == -1){
    //             Toast.show(res.msg);
    //             setTimeout(function(){
    //                 navigation.navigate('login')
    //             },2000)
    //         }else{
    //             Toast.show(res.msg, 2000);
    //         }
    //     })
    // }
    render(){
        let {navigation} = this.props;
        return(
            <View style={[common.body,common.gradPage]}>
                {/* 头部 */}
                <View style={[common.header]}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('mine');}} style={common.headerLeft}>
                    <Image source={require('../../images/return.png')}  style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>我的订单</Text></View>
                </View>
                
                <ScrollView style={css.main}  onMomentumScrollEnd = {this._contentViewScroll.bind(this)}>
                    <View style={css.navCon}>
                        <TouchableOpacity onPress={this.changeType.bind(this,1)} style={this.state.type==1?[css.nav,css.navActive]:css.nav}><Text style={this.state.type==1?css.navActiveText:css.navText}>全部</Text></TouchableOpacity>
                        <TouchableOpacity onPress={this.changeType.bind(this,2)} style={this.state.type==2?[css.nav,css.navActive]:css.nav}><Text style={this.state.type==2?css.navActiveText:css.navText}>待发货</Text><View style={css.viewI}></View></TouchableOpacity>
                        <TouchableOpacity onPress={this.changeType.bind(this,3)} style={this.state.type==3?[css.nav,css.navActive]:css.nav}><Text style={this.state.type==3?css.navActiveText:css.navText}>待收货</Text><View style={css.viewI}></View></TouchableOpacity>
                        <TouchableOpacity onPress={this.changeType.bind(this,4)} style={this.state.type==4?[css.nav,css.navActive]:css.nav}><Text style={this.state.type==4?css.navActiveText:css.navText}>已完成</Text><View style={css.viewI}></View></TouchableOpacity>
                    </View>
                    {this.state.list.map((item, index) => {
                        return (
                            <TouchableOpacity onPress={()=>{navigation.navigate('ordertopay',{id:item.id});}} style={css.order} key={index}>
                                <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                    <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                        <Image source={require("../../image/logo.png")} style={{width:27,height:27,marginRight:10,borderRadius:width}}/>
                                        <Text>萤火虫</Text>
                                    </View>
                                    <Text style={{color:'#6046FF'}}>{item.statusName}</Text>
                                </View>
                                <View style={css.orderCon}>
                                    <Image style={css.goodsImg} source={{uri:item.img}}/>
                                    <View style={{width:width-150,maxWidth:width-150}}>
                                        <View style={css.goods_info}>
                                            <Text numberOfLines={2} style={{color:'#58575C'}}>{item.goods_name}</Text>
                                        </View>
                                        <View style={{display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
                                            <Text>￥{item.price}</Text>
                                            <Text>x{item.num}</Text>
                                        </View>
                                    </View>
                                </View>
                                <Text style={{textAlign:'right',color:'#AAAABB'}}>共{item.num}件宝贝 总价：<Text style={{color:'#000000'}}>￥{item.total_price}</Text></Text>

                                {
                                    item.status==15?
                                    <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',marginTop:15}}>
                                        <TouchableOpacity onPress={()=>{this.setState({ifbuy:1})}} style={[css.linearBtn,{width:100,height:31,}]}>
                                            <LinearGradient colors={['#4767FF', '#B657FF']} style={[common.linearBtn,{}]} start={{x: 0, y: 0}} end={{x: 1, y: 1}}><Text style={[common.linearBtnText,{lineHeight:31,textAlign:'center',color:'#fff'}]}>确认收货</Text></LinearGradient>
                                        </TouchableOpacity>
                                    </View>:null
                                }
                            </TouchableOpacity>
                        );
                    })}
                    
                </ScrollView>
            </View>
        )
    }
}
export default order;