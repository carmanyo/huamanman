
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
const height = Dimensions.get('window').height;

import common from '../../css/common.js'
import css from '../../css/css.js'
import Video from 'react-native-video';

class cloud extends React.Component{
    state = {
        mydata:[],
        current:1,
        // sources:require('../../img/video.mp4'),
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
    // next(){

    // }
    render(){
        let {navigation} = this.props;
        return(
            <View style={common.body}>
                {/* 头部 */}
                <View style={[common.header]}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('home');}} style={common.headerLeft}>
                    <Image source={require('../../images/return.png')}  style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>交易操作流程</Text></View>
                    {/* {
                        this.state.current==2?
                        <TouchableOpacity onPress={()=>{this.setState({current:1,sources:require('../../img/video.mp4')})}} style={common.headerRight}><Text style={common.headerRightText}>上一个</Text></TouchableOpacity>
                        :
                        <TouchableOpacity onPress={()=>{this.setState({current:2,sources:require('../../img/video2.mp4')})}} style={common.headerRight}><Text style={common.headerRightText}>下一个</Text></TouchableOpacity>
                    } */}
                </View>

                <ScrollView style={[common.main,{padding:0,margin:0,width:width,height:height,marginTop:-80}]}>

                        {/* <Image style={css.indexNewsImage} source={{uri:'../../img/video.mp4'}}/> */}
                        {/* <HTMLView
                            value={this.state.mydata.con}
                        /> */}

                        <Video
                                ref='video'
                                // source={{uri:'../../img/video.mp4'}} //url或本地文件
                                source={this.state.sources}
                                volume={5} //放大声音倍数
                                paused={false}  //是否暂停
                                rate={this.state.rate}  //0/1,0暂停,1正常
                                muted={false}  //静音
                                resizeMode='contain' //视频适应方式
                                repeat={true} //是否重复播放
                                controls={true} //显示控制按钮

                                onLoadStart={this.onLoadStart}
                                onLoad={this.onLoad}
                                    // 参数:currentPosition 	当前播放时间
                                        // duration	视频总时间
                                onProgress={this.onProgress}  //视频播放每隔250毫秒触发,并携带当前已播放时间
                                    // 参数:currentTime  当前播放时间
                                        // playableDuration 	视频总时间
                                onEnd={this.onEnd}
                                onError={this.onError}
                                style={{width:width,height:height}}
                                // style={styles.video}
                            />
                </ScrollView>
            </View>
        )
    }
}
export default cloud;
