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


import {getLogin} from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient  from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;

import common from '../../css/common.js'
import css from '../../css/css.js'


// 验证码
export default class Code extends React.Component{
    constructor(props) {
        super(props);
    }
    state = {
        begin:0,
        timeLeft:60,
        timeLeftString:'获取验证码',
    };
    countdownfn(timeLeft, callback, begin) {
        if (timeLeft > 0) {
            this.state.begin = 1;

            let that = this;
            let interval = setInterval(function () {
                if (that.state.timeLeft < 1) {
                    clearInterval(interval);
                    callback(that)
                } else {
                    let totalTime = that.state.timeLeft;
                    that.setState({
                        timeLeft: totalTime - 1,
                        timeLeftString: totalTime - 1+' S'
                    })
                }
            }, 1000)
        }
    }

    _beginCountDown() {
        if (this.state.begin === 1){
            return;
        }
        let time = this.state.timeLeft;
        let afterEnd = this._afterEnd;
        let begin = this.state.begin;
        this.countdownfn(time, afterEnd, begin)
    }

    _afterEnd(that) {
        that.setState({
            begin : 0,
            timeLeft : 60,
            timeLeftString:'重新获取'
        })
    }

    componentDidMount() {
        this.props.onRef(this)
    }
    StudyMakeMoney=()=>{ // 学习挣钱，调用父组件方法
        this.props.MakeMoney();
    }
    onShow(){
    // console.log('子组件的方法被父组件调用')
    }

    render() {
        return  (
            // <TouchableOpacity onPress={this._beginCountDown.bind(this)}>
            <TouchableOpacity onPress={this.StudyMakeMoney}>
                <Text style={[common.getCode,{width:80,minWidth:80,textAlign:'center',marginLeft:-10}]}>{this.state.timeLeftString}</Text>
            </TouchableOpacity>
        )
    }
}