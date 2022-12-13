
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
const height = Dimensions.get('window').height;

import common from '../../css/common.js'
import css from '../../css/whitepaper.js'

class whitepaper extends React.Component{
    state = { 
    }
    render(){
        let {navigation} = this.props;
        return(
            <View style={common.body}>
                {/* 头部 */}
                <View style={[common.header]}>
                    <TouchableOpacity onPress={()=>{navigation.goBack();}} style={common.headerLeft}>
                    <Image source={require('../../images/return.png')}  style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>白皮书</Text></View>
                </View>
                <View style={css.main}>
                <ScrollView style={{minHeight:height}}>
                    {/* <Image style={css.paperImage} source={require("../../img/bai/0001.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0002.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0003.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0004.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0005.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0006.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0007.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0008.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0009.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0010.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0011.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0012.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0013.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0014.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0015.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0016.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0017.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0018.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0019.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0020.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0021.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0022.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0023.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0024.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0025.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0026.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0027.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0028.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0029.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0030.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0031.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0032.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0033.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0034.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0035.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0036.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0037.jpg")} />
                    <Image style={css.paperImage} source={require("../../img/bai/0038.jpg")} /> */}
                </ScrollView>
                </View>
            </View>
        )
    }
}
export default whitepaper;