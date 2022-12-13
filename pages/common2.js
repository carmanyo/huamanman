
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

import { getLogin } from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import common from '../../css/common.js'
import css from '../../css/css.js'

class page extends React.Component {
    state = {
    }
    render() {
        let { navigation } = this.props;
        return (
            <View style={common.body}>
                <ScrollView style={[common.ScrollView,{backgroundColor:'pink'}]} showsVerticalScrollIndicator={false}>
                    {/* 头部 */}
                    <View style={[common.header]}>
                        <TouchableOpacity onPress={() => { navigation.goBack(); }} style={common.headerLeft}>
                            <Image source={require('../../image/return.png')} style={common.returnIcon} />
                        </TouchableOpacity >
                        <View style={common.headerTitle}><Text style={common.headerTitleText}>订单详情</Text></View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
export default page;