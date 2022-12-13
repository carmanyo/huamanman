/**
 * Desc: 表情选择view
 *
 * Created by WangGanxin on 2018/1/31
 * Email: mail@wangganxin.me
 */

import React, {Component,PureComponent} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import PropTypes from 'prop-types';
// import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';
import ViewPager from '@react-native-community/viewpager';


import EmotionsChildView from './EmotionsChildView';
import {EMOTIONS_DATA} from './DataSource';

export default class EmotionsView extends PureComponent {

  constructor(props){
    super(props);

    this.state = ({

    });
  }

  _objToStrMap(obj) {
    let strMap = new Map();
    for (let key of Object.keys(obj)) {
      strMap.set(key, obj[key]);
    }
    return strMap;
  }

  _renderDotIndicator() {
    // return <PagerDotIndicator pageCount={5} dotStyle={styles.dotStyle} selectedDotStyle={styles.selectedDotStyle}/>;
  }

  // componentDidMount(){
  //   this._renderPagerView()
  // }
  _renderPagerView(){
    let viewItems = [];
    let dataMaps = this._objToStrMap(EMOTIONS_DATA);
    let dataKeys = [];

    //抽取代表符
    let index = 0;
    for (let data of dataMaps.keys()) {
      dataKeys.push({
        key:index,
        value:data,
      });
      index++;
    }

    //分页
    let page0 = dataKeys.slice(0,100);
    viewItems.push(<View key={0}><EmotionsChildView key={0} dataSource={page0} onPress={(code) => this.props.onSelected(code)} onSubmit={() => this.props.onSubmit()}/></View>);
    return viewItems;
  }

  render() {
    return (
      <View
        style={styles.wrapper}
        indicator={this._renderDotIndicator()}>
        { this._renderPagerView() }
      </View>
    );
  }

}

EmotionsView.propTypes = {
  onSelected:PropTypes.func,
  onSubmit:PropTypes.func
};

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },

  wrapper: {
    width:'100%',
    height:175,
    paddingTop:10,
    backgroundColor:'white'
  },

  dotStyle:{
    backgroundColor:'#f5f5f5',
  },

  selectedDotStyle:{
    backgroundColor:'#BBBBBB',
  },

});
