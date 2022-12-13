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

import {getcashRecord, getUserDetail} from '../../network/authapi.js';
const Toast = Overlay.Toast;

import LinearGradient from 'react-native-linear-gradient';
const width = Dimensions.get('window').width;

import common from '../../css/common.js';
import css from '../../css/integral.js';

class cashrecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      userCoin: {},
      userInfo: {},
    };
  }
  componentDidMount() {
    this.getUserDetails();
  }
  getUserDetails() {
    var that = this;
    let {navigation} = this.props;
    var fromData = {};
    getUserDetail(fromData, res => {
      // console.log(res)
      if (res.code == 1) {
        this.setState({
          user: res.data.user,
          userCoin: res.data.userCoin,
          userInfo: res.data.userInfo,
        });
      }
    });
  }

  _contentViewScroll(e) {
    var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
    var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
    var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
    if (offsetY + oriageScrollHeight >= contentSizeHeight) {
      // Console.log('上传滑动到底部事件')
      // this.setState({
      //     pageNum: this.state.pageNum + 1,
      // }, this.getData())

      this.setState(
        {
          pageNum: this.state.pageNum + 1,
        },
        () => {
          this.getData();
        },
      );
    }
  }
  render() {
    let {navigation} = this.props;
    return (
      <View style={common.body}>
        {/* 头部 */}
        <View style={[common.header]}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={common.headerLeft}>
            <Image
              source={require('../../image/return.png')}
              style={common.returnIcon}
            />
          </TouchableOpacity>
          <View style={common.headerTitle}>
            <Text style={common.headerTitleText}>余额</Text>
          </View>
        </View>

        <View style={[common.main]}>
          {this.state.user ? (
            <ScrollView
              style={{display: 'flex', flexDirection: 'column'}}
              onMomentumScrollEnd={this._contentViewScroll.bind(this)}
              contentContainerStyle={{alignItems: 'center'}}>
              <Image
                source={require('../../image/balance.png')}
                style={css.jifen}
              />
              <Text style={css.can}>当前可用余额</Text>
              <Text style={css.strong}>{this.state.userCoin.money}</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('cash');
                }}
                style={[
                  css.linearBtn,
                  {marginTop: 58, marginLeft: 15, width: 202, marginLeft: 0},
                ]}>
                <LinearGradient
                  colors={['#F6BF0A', '#F3A316']}
                  style={common.linearBtn}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}>
                  <Text style={common.linearBtnText}>提现</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('detail');
                }}>
                <Text style={css.detail}>查看余额明细</Text>
              </TouchableOpacity>
            </ScrollView>
          ) : null}
        </View>
      </View>
    );
  }
}
export default cashrecord;
