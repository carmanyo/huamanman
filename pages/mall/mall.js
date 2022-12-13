
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

import {getLogin,getgoodsIndex} from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient  from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;

import common from '../../css/common.js'
import css from '../../css/mall.js'

class mall extends React.Component{
    
    constructor(props){
        super(props);
        this.state = { 
            list:[],
            pageNum:1,
            keyword:9999,
        }
    }
    componentDidMount(){
        // Toast.show('res.msg, 2000');
        this.getData();
    }
    search(){ 
        this.setState({
            list:[],
            pageNum:1
        })
        var that = this;
        let {navigation} = this.props;
        var fromData = {};
        fromData['page'] = this.state.pageNum;
        fromData['keyword'] = this.state.keyword;
        if(this.state.keyword==''){
            fromData['keyword'] = 9999
        }
        getgoodsIndex(fromData,res =>{
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
    
    getData(){ 
        var that = this;
        let {navigation} = this.props;
        var fromData = {};
        fromData['page'] = this.state.pageNum;
        fromData['keyword'] = this.state.keyword;
        getgoodsIndex(fromData,res =>{
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
    render(){
        let {navigation} = this.props;
        return(
            <View style={common.bodyGray}>
                {/* 头部 */}
                <View style={css.mallSearch}>
                    <LinearGradient colors={['#4767FF', '#B657FF']} style={css.searchCon} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
                     </LinearGradient>
                    <View style={css.topSearch}>
                        <TouchableOpacity onPress={()=>{navigation.goBack();}} style={common.headerLeft}>
                            <Image source={require('../../img/return-white.png')}  style={common.returnIcon} />
                        </TouchableOpacity >
                        <View style={css.searchWrap}>
                            <TextInput
                                style={[common.textInputStyle,{height:34,lineHeight:34,width:width-100,paddingLeft:10}]}
                                placeholder="无线耳机、洗衣液低至5折"
                                placeholderTextColor="#B3B3B3"
                                onChangeText={(text)=>this.setState({keyword:text})}
                            ></TextInput>
                            <TouchableOpacity onPress={this.search.bind(this)}><Image style={css.searchIcon} source={require("../../img/search.png")} /></TouchableOpacity>
                        </View>
                    </View>
                </View>
                
                 
                <View style={css.main}>
                    <ScrollView onMomentumScrollEnd = {this._contentViewScroll.bind(this)}>
                        <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap',paddingBottom:60}}>
                        {this.state.list.map((item, index) => {
                            return (
                                    <TouchableOpacity onPress={()=>{navigation.navigate('goodsdetails',{id:item.id,img:item.img})}} style={css.goodsBlock} key={index}> 
                                        {/* <Image style={css.indexNewsImage} source={{uri:this.state.newsList.image}}/>     */}
                                        <Image style={css.goodsImg} source={{uri:item.img}} />
                                        <Text style={css.goodsTitle} numberOfLines={2}>{item.name}</Text>
                                        <View style={css.priceWrap}>
                                            <View style={css.price}><Text style={css.smallPrice}>￥</Text><Text style={css.priceStrong}>{item.price}</Text></View>
                                            <Text style={css.sale}>已售{item.sales}</Text>
                                        </View>
                                    </TouchableOpacity>
                            );
                        })}
                        </View>
                        
                        {/* <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap',paddingBottom:60}}>
                            <TouchableOpacity onPress={()=>{navigation.navigate('goodsdetails')}} style={css.goodsBlock}>
                                <Image style={css.goodsImg} source={require('../../img/goods.png')} />
                                <Text style={css.goodsTitle} numberOfLines={2}>item.nameitem.nameitem.nameitem.nameitem.nameitem.nameitem.name</Text>
                                <View style={css.priceWrap}>
                                    <View style={css.price}><Text style={css.smallPrice}>￥</Text><Text style={css.priceStrong}>item.price</Text></View>
                                    <Text style={css.sale}>已售item.sales</Text>
                                </View>
                            </TouchableOpacity>
                        </View> */}
                    </ScrollView>
                </View>
            </View>
        )
    }
}
export default mall;