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

import {getcashRecord} from '../../network/authapi.js';
const Toast = Overlay.Toast;

import LinearGradient from 'react-native-linear-gradient';
const width = Dimensions.get('window').width;

import common from '../../css/common.js';
import css from '../../css/exchangerecord.js';

class cashrecord extends React.Component {
  state = {
    list: [],
    pageNum: 1,
  };
  componentDidMount() {
    // Toast.show('res.msg, 2000');
    this.getData();
  }
  getData() {
    var that = this;
    let {navigation} = this.props;
    var fromData = {};
    fromData.page = this.state.pageNum;
    fromData.type = 2;
    getcashRecord(fromData, res => {
      // console.log(res.data)
      if (res.code == 1) {
        this.setState({
          list: this.state.list.concat(res.data),
        });
      } else if (res.code == -1) {
        Toast.show(res.msg);
        setTimeout(function () {
          navigation.navigate('login');
        }, 2000);
      } else {
        Toast.show(res.msg, 2000);
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
            <Text style={common.headerTitleText}>兑换记录</Text>
          </View>
        </View>

        <View style={[common.main, {marginTop: 0}]}>
          {/* <View style={[css.navWrap]}>
                        <Text style={[css.nav,css.navActive]}>USDT</Text>
                        <Text style={css.nav}>FEF</Text>
                    </View> */}
          <ScrollView
            style={common.ScrollViewHasHeader}
            onMomentumScrollEnd={this._contentViewScroll.bind(this)}>
            {this.state.list.length == 0 ? (
              <View style={[common.empty, {marginLeft: -15}]}>
                <Image
                  style={common.emptyIcon}
                  source={require('../../image/empty.png')}
                />
                <Text style={common.emptyH1}>暂无记录</Text>
              </View>
            ) : null}
            {this.state.list.map((item, index) => {
              return (
                <View style={css.recordBlock}>
                  <View style={css.typeName}>
                    <Text>FEF</Text>
                    <Text>-{item.total_money}</Text>
                  </View>
                  <View style={css.typeName}>
                    <Text>实际到账:</Text>
                    <Text>{item.money}</Text>
                  </View>
                  <View style={css.typeName}>
                    <Text>手续费:</Text>
                    <Text>{item.charge}</Text>
                  </View>
                  <View style={item.status == 5 ? css.typeName : common.hidden}>
                    <Text>状态：</Text>
                    <Text style={css.yellow}>审核中</Text>
                  </View>
                  <View
                    style={item.status == 10 ? css.typeName : common.hidden}>
                    <Text>状态：</Text>
                    <Text style={css.green}>提现成功</Text>
                  </View>
                  <View
                    style={item.status == 15 ? css.typeName : common.hidden}>
                    <Text>状态：</Text>
                    <Text style={css.red}>提现驳回</Text>
                  </View>
                  <View style={css.typeName}>
                    <Text>时间：</Text>
                    <Text>{item.addtime}</Text>
                  </View>
                  <View style={css.typeName}>
                    <Text>地址：</Text>
                    <Text>{item.info}</Text>
                  </View>
                  {/* <View style={css.typeName}><Text>备注：</Text><Text>{item.remark}</Text></View> */}
                  {item.remark !== '' || item.remark != null ? (
                    <View style={css.typeName}>
                      <Text>原因：</Text>
                      <Text>{item.remark}</Text>
                    </View>
                  ) : null}
                </View>
              );
            })}

            <View style={css.recordBlock}>
              <View style={common.alignItemsB}>
                <View style={common.alignItemsCenter}>
                  <Text style={[common.green, {marginRight: 10}]}>兑换</Text>
                  <Text>至余额</Text>
                </View>
                <Text>￥10000.00</Text>
              </View>
              <Text style={css.time}>2022/09/22 14:40:24</Text>
            </View>
            <View style={css.recordBlock}>
              <View style={common.alignItemsB}>
                <View style={common.alignItemsCenter}>
                  <Text style={[common.green, {marginRight: 10}]}>兑换</Text>
                  <Text>至余额</Text>
                </View>
                <Text>￥10000.00</Text>
              </View>
              <Text style={css.time}>2022/09/22 14:40:24</Text>
            </View>
          </ScrollView>

          {/* <View style={css.recordBlock}>
                        <View style={css.typeName}><Text>FEF</Text><Text>-item.total_money</Text></View>
                        <View style={css.typeName}><Text>实际到账:</Text><Text>item.money</Text></View>
                        <View style={css.typeName}><Text>手续费:</Text><Text>item.charge</Text></View>
                        <View style={css.typeName}><Text v-show="item.status==5">状态：</Text><Text style={css.yellow}>审核中</Text></View>
                        <View style={css.typeName}><Text v-show="item.status==10">状态：</Text><Text style={css.green}>提现成功</Text></View>
                        <View style={css.typeName}><Text v-show="item.status==15">状态：</Text><Text style={css.red}>提现驳回</Text></View>
                        <View style={css.typeName}><Text>时间：</Text><Text>`+da[i].addtime+`</Text></View>
                        <View style={css.typeName}><Text>地址：</Text><Text>`+da[i].info+`</Text></View>
                        <View style={css.typeName}><Text>备注：</Text><Text>`+da[i].remark+`</Text></View>
                    </View> */}
        </View>
      </View>
    );
  }
}
export default cashrecord;
