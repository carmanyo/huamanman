
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
import { getNoticeDetail } from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;

import common from '../../css/common.js'
import css from '../../css/css.js'

class infodetails extends React.Component {
    state = {
        detail: ''
    }
    componentDidMount() {
        this.getData()
    }
    getData() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        fromData['notice_id'] = this.props.route.params.notice_id;
        getNoticeDetail(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                this.setState({
                    detail: res.data.detail
                })
            } else if (res.code == -1) {
                Toast.show(res.msg);
                setTimeout(function () {
                    navigation.navigate('login')
                }, 2000)
            } else {
                Toast.show(res.msg, 2000);
            }
        })
    }
    
    escape2Html(str) {
        var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
        return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; });
    }

    render() {
        let { navigation } = this.props;
        let { item } = this.props;
        let detail = this.state.detail;
        return (
            <View style={common.body}>
                {/* 头部 */}
                <View style={[common.header]}>
                    <TouchableOpacity onPress={() => { navigation.goBack(); }} style={common.headerLeft}>
                        <Image source={require('../../image/return.png')} style={common.returnIcon} />
                    </TouchableOpacity >
                </View>
                {
                    this.state.detail != '' ?
                        <ScrollView style={[css.main, { marginTop: 0, padding: 15 }]}>
                            <Text style={{ fontSize: 16, textAlign: 'center' }}>{detail.title}</Text>
                            <View style={[{ marginTop: 20, }]}>
                                <HTMLView
                                    value={this.escape2Html(detail.content)}
                                />
                                <Text style={{ textAlign: 'right', color: '#C0C0C0', marginTop: 20, }}>{detail.update_time}</Text>
                            </View>
                        </ScrollView> : null
                }


            </View>
        )
    }
}
export default infodetails;