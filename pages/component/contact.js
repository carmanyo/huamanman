
import React,{Component} from 'react';
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
  TouchableHighlight,
  ImageBackground,
  Dimensions,
  Switch,
  FlatList,
  PixelRatio,
} from 'react-native';
const window = Dimensions.get('window');
const {width} = Dimensions.get("window");

import * as Utils from "../../utils/Utils";
import Global from "../../utils/Global";
import ToastUtil from "../../utils/ToastUtil";

import {getLogin} from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient  from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;

import common from '../../css/common.js'
import css from '../../css/css.js'



export default class contact extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            //Global这里是全局变量
            loadingState: Global.loading,
            contactData: [
                {
                    "pinyin": "aaa",
                    "nick": "aaa",
                    "name": "aaa",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "bbb",
                    "nick": "bbb",
                    "name": "bbb",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "ccc",
                    "nick": "ccc",
                    "name": "ccc",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "asasds",
                    "nick": "asdsad",
                    "name": "asdsd",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "ffdsafd",
                    "nick": "ffdsafd",
                    "name": "ffdsafd",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "ffdsafd",
                    "nick": "ffdsafd",
                    "name": "ffdsafd",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "ffdsafd",
                    "nick": "ffdsafd",
                    "name": "ffdsafd",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "ffdsafd",
                    "nick": "ffdsafd",
                    "name": "ffdsafd",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "dsadsad",
                    "nick": "dsadsad",
                    "name": "dsadsad",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "zzssadsa",
                    "nick": "zzssadsa",
                    "name": "zzssadsa",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "zzssadsa",
                    "nick": "zzssadsa",
                    "name": "zzssadsa",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "affdfs",
                    "nick": "affdfs",
                    "name": "affdfs",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "rrr",
                    "nick": "rrr",
                    "name": "rrr",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "iii",
                    "nick": "iii",
                    "name": "iii",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "ggg",
                    "nick": "ggg",
                    "name": "ggg",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "kkk",
                    "nick": "kkk",
                    "name": "kkk",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "rrr",
                    "nick": "rrr",
                    "name": "rrr",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "iii",
                    "nick": "iii",
                    "name": "iii",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "ggg",
                    "nick": "ggg",
                    "name": "ggg",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "mmm",
                    "nick": "mmm",
                    "name": "mmm",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "aaasasdas",
                    "nick": "aaadsadsa",
                    "name": "aasaddsada",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "bbb",
                    "nick": "bbb",
                    "name": "bbb",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "ccc",
                    "nick": "ccc",
                    "name": "ccc",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "asasds",
                    "nick": "asdsad",
                    "name": "asdsd",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "ffdsafd",
                    "nick": "ffdsafd",
                    "name": "ffdsafd",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "ffdsafd",
                    "nick": "ffdsafd",
                    "name": "ffdsafd",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "ffdsafd",
                    "nick": "ffdsafd",
                    "name": "ffdsafd",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "ffdsafd",
                    "nick": "ffdsafd",
                    "name": "ffdsafd",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "dsadsad",
                    "nick": "dsadsad",
                    "name": "dsadsad",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "zzssadsa",
                    "nick": "zzssadsa",
                    "name": "zzssadsa",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "zzssadsa",
                    "nick": "zzssadsa",
                    "name": "zzssadsa",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "affdfs",
                    "nick": "affdfs",
                    "name": "affdfs",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "rrr",
                    "nick": "rrr",
                    "name": "rrr",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "iii",
                    "nick": "iii",
                    "name": "iii",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "ggg",
                    "nick": "ggg",
                    "name": "ggg",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "kkk",
                    "nick": "kkk",
                    "name": "kkk",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "rrr",
                    "nick": "rrr",
                    "name": "rrr",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "eee",
                    "nick": "eee",
                    "name": "eee",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "www",
                    "nick": "www",
                    "name": "www",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },{
                    "pinyin": "hhh",
                    "nick": "hhh",
                    "name": "hhh",
                    "avatar": 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1005382251,3596345746&fm=111&gp=0.jpg',
                },
            ],
        }
    }
    render(){
        var listData = [];
        var index = 0;
        var contacts = this.state.contactData;
        for (var i = 0; i < contacts.length; i++) {
            // var pinyin = PinyinUtil.getFullChars(contacts[i].name);
            var pinyin = contacts[i].pinyin.toUpperCase();
            var firstLetter = pinyin.substring(0, 1);
            if (firstLetter < 'A' || firstLetter > 'Z') {
                firstLetter = '#';
            }
            let icon = require('../../images/portrait.jpg');
            if (!Utils.isEmpty(contacts[i].avatar)) {
                icon = {uri: contacts[i].avatar};
            }
            listData.push({
                key: index++,
                icon: icon,
                title: contacts[i].name,
                nick: contacts[i].nick,
                pinyin: pinyin,
                firstLetter: firstLetter,
                sectionStart: false,
            })
        }
        // 按拼音排序
        listData.sort(function (a, b) {
            if (a.pinyin === undefined || b.pinyin === undefined) {
                return 1;
            }
            if (a.pinyin > b.pinyin) {
                return 1;
            }
            if (a.pinyin < b.pinyin) {
                return -1;
            }
            return 0;
        });
        // 根据首字母分区
        for (var i = 0; i < listData.length; i++) {
            var obj = listData[i];
            if (obj.pinyin === undefined) {
                continue;
            }
            if (i > 0 && i < listData.length) {
                var preObj = listData[i - 1];
                if (preObj.pinyin === undefined && obj.pinyin !== undefined) {
                    obj.sectionStart = true;
                } else if (preObj.pinyin !== undefined && obj.pinyin !== undefined && preObj.firstLetter !== obj.firstLetter) {
                    obj.sectionStart = true;
                }
            }

            // 把大写字母A显示出来
            var w = i;
            if(Number(w)==0&&obj.firstLetter==='A'){
                obj.sectionStart = true;
            }
        }
        this.listData = listData;
        return (
            <View style={styles.container}>
                <View style={styles.divider}/>
                <View style={styles.content}>
                    <FlatList
                        ref={'list'}
                        data={listData}
                        renderItem={this._renderItem}
                        getItemLayout={this._getItemLayout}
                    />
                    <SideBar onLetterSelectedListener={this.onSideBarSelected.bind(this)}/>
                </View>
                <View style={styles.divider}/>
            </View>
        );
    }

    onSideBarSelected(letter) {
        if (this.listData) {
            for (let i = 0; i < this.listData.length; i++) {
                let item = this.listData[i];
                if (item.firstLetter == letter && item.sectionStart) {
                    ToastUtil.showShort(letter);
                    this.refs.list.scrollToIndex({viewPosition: 0, index: i});
                    break;
                }
            }
        }
    }


    _renderItem = (item) => {
        // console.log(item.item.sectionStart)
        var section = [];
        if (item.item.sectionStart) {
            section.push(
            <Text key={"section" + item.item.key} style={listItemStyle.sectionView} ref={item.item.firstLetter}>{item.item.firstLetter}</Text>
            );
        }
        return (
            <View>
                {section}
                <TouchableHighlight underlayColor={Global.touchableHighlightColor} onPress={() => {
                    // this.onListItemClick(item)
                }}>
                    <View style={listItemStyle.container} key={item.item.key}>
                        <Image style={listItemStyle.image} source={item.item.icon}/>
                        <Text style={listItemStyle.itemText}>{item.item.title}</Text>
                        {/* <Text style={listItemStyle.subText}>{Utils.isEmpty(item.item.nick) ? "" : "(" + item.item.nick + ")"}</Text> */}
                    </View>
                </TouchableHighlight>
                <View style={{
                    width: width,
                    height: 1 / PixelRatio.get(),
                    backgroundColor: Global.dividerColor
                }}/>
            </View>
        );
    }


    _getItemLayout = (data, index) => {
        let len = data.sectionStart ? (58) : (48);
        let dividerHeight = 1 / PixelRatio.get();
        return {
            length: len,
            offset: (len + dividerHeight) * index,
            index
        };
    }

    
}



class SideBar extends Component {
    render() {
      var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      var letterViewArr = [];
      for (var i = 0; i < letters.length; i++) {
        letterViewArr.push(
          <TouchableOpacity
            key={i}
            onPress={this.onLetterSelectedListener.bind(this, letters[i])}>
            <Text style={{color: '#000000', fontSize: 12, paddingLeft: 3, paddingRight: 3}} key={"letter" + i}>
              {letters[i]}
            </Text>
          </TouchableOpacity>
        );
      }
      return (
        <View
          style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center',position:'absolute',right:19,height:window.height}}>
          {letterViewArr}
        </View>
      );
    }
  
    onLetterSelectedListener = (letter) => {
      this.props.onLetterSelectedListener && this.props.onLetterSelectedListener(letter);
    }
  }


  const listItemStyle = StyleSheet.create({
    container: {
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    image: {
        marginLeft: 24,
        marginRight: 8,
        marginTop: 10,
        marginBottom: 10,
        width: 24,
        height: 24,
        borderRadius:window.width,
    },
    itemText: {
        fontSize: 14,
        color: '#000000'
    },
    subText: {
        fontSize: 15,
        color: '#999999'
    },
    sectionView: {
        width: width,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        paddingLeft: 30,
        paddingRight: 10,
        paddingTop: 2,
        paddingBottom: 2,
        color: '#999999'
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    divider: {
        width: width,
        height: 1 / PixelRatio.get(),
        backgroundColor: '#D3D3D3'
    },
    content: {
        flex: 1,
        width: width,
        flexDirection: 'row',
        backgroundColor: Global.pageBackgroundColor
    },
    tabBarIcon: {
        width: 24,
        height: 24,
    },
    sBar: {
        width: width,
        height: StatusBar.currentHeight
    }
});