
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
import { getInviteRule } from '../../network/authapi.js'
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
        // fromData['notice_id'] = this.props.route.params.notice_id;
        getInviteRule(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                this.setState({
                    detail: res.data.setting.invite_rule
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
        // // console.log(str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; }))
        var newStr = str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; });

        // var html = `<!DOCTYPE html>
        // <html>
        //     <body><div style="background-color: pink">`+newStr+`</div></body>
        // </html>`
        // console.log(html)
        // return html;
        return `${newStr}`;
    }

    render() {
        let { navigation } = this.props;
        let { item } = this.props;
        let detail = this.state.detail;
        let html = `<p style="text-align: center;"><a href="http://jsdf.co">&hearts; nice job!</a></p>`
        return (
            <View style={common.body}>
                {/* 头部 */}
                <View style={[common.header]}>
                    <TouchableOpacity onPress={() => { navigation.goBack(); }} style={common.headerLeft}>
                        <Image source={require('../../image/return.png')} style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>{detail.name}</Text></View>
                </View>
                {
                    this.state.detail != '' ?
                        <ScrollView style={[css.main, { marginTop: 0, padding: 15 }]}>
                            {/* <Text style={{ fontSize: 16, textAlign: 'center' }}>{detail.name}</Text> */}
                            <View style={{marginTop:30}}>
                                <HTMLView
                                    stylesheet={style}
                                    value={this.escape2Html(detail.value)}
                                    // value={html}
                                />
                                <Text style={{ textAlign: 'right', color: '#C0C0C0', marginTop: 20, }}>{detail.update_time}</Text>
                            </View>
                        </ScrollView> : null
                }


            </View>
        )
    }
}
const style = StyleSheet.create({
    p: {
        padding: 0,
        margin: 0,
        // lineHeight:10,
        // backgroundColor:'pink',
        marginTop: -25,
    }
});
export default infodetails;