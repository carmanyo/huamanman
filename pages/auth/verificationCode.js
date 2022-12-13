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
  Dimensions
} from 'react-native';


import commonstyles from '../../css/common.js'
import css from '../../css/css.js'

import PropTypes from 'prop-types'; 
import Modes from './config';
import verificationStyle from '../../css/verificationCode.js';
import Asc from './create';
const vcStyle = StyleSheet.create(verificationStyle); 
// 图形验证码
export default class VerificationCode extends React.Component{
  //default props
  static defaultProps = {
      containerStyle: vcStyle.container, //容器样式
      textStyle: vcStyle.textStyle, //验证码文本样式
      codeLength: 4, //验证码长度
      mode: Modes[0], //模式默认字母，支持letter,number两种
      init: () => {},
      isColor: true, //是否开启验证码随机字体颜色
      isBgColor: true, //是否开启容器背景随机颜色
      time: 200, //ms //响应时间内多次点击无效
      onClick: () => {} //点击事件
  }; 
  constructor(props) {
      super(props);
      let timeLeft = this.props.timeLeft > 0 ? this.props.timeLeft : 5;
      let timeLeftString = '获取验证码';
      this.state = {
          ifUpdate:this.props.ifUpdate,
          code:this.getCode()
      }
      this.props.callBack(this.getCode());
  }
  shouldComponentUpdate() {
      var ifUpdate = this.state.ifUpdate
      if(ifUpdate===1){
          this.setState({ifUpdate:0})
          return true;
      }else{
          return false;
      }
  }
 
  // 图形验证码
  //get code value
  getValue = () =>{
      this.state.code
  };

  //refresh code
  refresh = () => {
  this.setState({ifUpdate:1})
  if (!this.timer) {
      this.timer = setTimeout(() => {
      const code =  this.getCode();
      this.colors = this.getColors();
      this.setState({
          code
      },() => {
          this.timer = null;
          this.props.onClick
          && this.props.onClick({
          componentName: 'VerificationCode',
          value: code
          })
          this.props.callBack(code);
      })
      }, this.props.time)
  } 
  }

  getColors = () => Asc.createContainerStyle(this.props.isBgColor);

  componentWillMount() {
      this.timer = null;
      this.colors = this.getColors();
  }

  //get code value
  getCode = () => {
      const { mode, codeLength } = this.props; 
      return Asc.randomCode(mode, codeLength);
  }

  componentDidMount() {
  this.props.init && this.props.init(this);
  }
  render() { 
      let code = this.state.code
      return  (
          <TouchableOpacity onPress={this.refresh} activeOpacity={1}>
              <View style={this.props.containerStyle}>
              {
                  code
                  && code.length
                  && code
                  .map((v, k) => <Text key={k} 
                      style={[
                      this.props.textStyle,
                      {...Asc.createTextStyle(this.props.isColor)
                      }]}>{v}</Text>)
                  }
              </View>
          </TouchableOpacity>
      )
  }
}