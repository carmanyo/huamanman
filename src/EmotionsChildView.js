/**
 * Desc: EmotionsChildView
 *
 * Created by WangGanxin on 2018/1/31
 * Email: mail@wangganxin.me
 */

import React, {Component,PureComponent} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';

import PropTypes from 'prop-types';
import {EMOTIONS_DATA} from './DataSource';
import { TouchableOpacity } from 'react-native-gesture-handler';

let {width} = Dimensions.get('window');
let itemWidth = width / 7;

export default class EmotionsChildView extends PureComponent {

  constructor(props){
    super(props);

  }

    _rednerItem=(item) => {
      return <TouchableWithoutFeedback onPress={() => this.props.onPress(item.item.value)}>
        <View key={item.item.key} style={styles.itemStyle}>
          <Image style={styles.emojiStyle} source={EMOTIONS_DATA[item.item.value]}/>
        </View>
      </TouchableWithoutFeedback>;
    }

    render(){
      return (
        <View>
          <ScrollView>
            <FlatList
            style={[styles.wrapper,this.props.style]}
            horizontal={false}
            numColumns={7}
            refreshing={false}
            scrollEnabled={false}
            initialNumToRender={21}
            data={this.props.dataSource}
            renderItem={this._rednerItem}/>
          </ScrollView>
          <TouchableWithoutFeedback onPress={() => this.props.onPress('/{del')}>
            <View style={[styles.itemStyle,{position:'absolute',bottom:0,right:60}]}>
              <Image style={styles.deleteStyle}  source={require('./emotions/ic_emoji_del.png')}/>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.props.onSubmit()}>
            <View style={styles.sendBtn}>
              <Text style={{color:'#fff',lineHeight:25,textAlign:'center'}}>发送</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        
      );
    }

}

EmotionsChildView.propTypes = {

  dataSource: PropTypes.array.isRequired,
  onPress:PropTypes.func,
  onSubmit:PropTypes.func
};

EmotionsChildView.defaultProps = {
  dataSource:[],
};

const styles = StyleSheet.create({
  sendBtn:{
    backgroundColor:'#0088FF',
    position:'absolute',
    bottom:13,
    right:0,
    width:50,
    height:25,
    borderTopLeftRadius:3,
    borderBottomLeftRadius:3
  },
  wrapper: {
    width:'100%',
  },

  itemStyle: {
    width:itemWidth,
    height:50,
    justifyContent:'center',
    alignItems:'center',
  },

  emojiStyle:{
    width:35,
    height:35,
  },

  deleteStyle:{
    width:35,
    height:24,
  }
});
