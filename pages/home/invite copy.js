
import React from 'react';
import {
    Clipboard,
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
// import QRCode from 'react-native-qrcode';
import { getUserDetail,getInvitePoster } from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient from 'react-native-linear-gradient'

// import QRCode from 'react-native-qrcode-svg';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import common from '../../css/common.js'
import css from '../../css/invite.js'

class invite extends React.Component {
    render() {
        let { navigation } = this.props;
        return (
            <View style={[common.body, { padding: 0 }]}>
                <Image source={require('../../image/invite-bg.png')} style={[css.inviteFont, { position: 'absolute', width: width, height: height, top: 0, left: 0 }]} />
                <ScrollView style={{ minHeight: height }}>
                    {/* <ImageBackground style={[css.topdata,{minHeight:height}]} source={require('../../img/invite-bg.png')}> */}
                    {/* 头部 */}
                    <View style={[common.header, { backgroundColor: 'transparent' }]}>
                        <TouchableOpacity onPress={() => { navigation.goBack(); }} style={[common.headerLeft]}>
                            <Image source={require('../../image/return2.png')} style={common.returnIcon} />
                        </TouchableOpacity >
                        <View style={common.headerTitle}><Text style={common.headerTitleTextW}>邀请好友</Text></View>
                    </View>

                    <View style={css.main}>
                        <Image source={require("../../image/invite-1.png")} style={css.inviteFont} />
                        <View style={css.content}>
                            <Image source={require("../../image/invite-2.png")} style={css.inviteLogo} />
                            <Text style={css.inviteTitle}>邀·请·好·友</Text>
                            <Text style={css.codeTitle}>邀请码</Text>
                            <Text style={css.code}>{this.state.user.mobile}</Text>
                            <View style={css.codeImg}>
                                <Image style={{width:140,height:140}} source={{uri:this.state.inviteData.qrcode}}/>
                                {/* <QRCode
                                    value={"这里就是二维码的内容"}//二维码内容
                                /> */}
                            </View>
                            <Text style={css.url}>扫描二维码或将邀请码推荐给他人</Text>
                            <TouchableOpacity onPress={this.copy.bind(this)} style={[css.linearBtn]}>
                                <LinearGradient colors={['#F3A316', '#F6BF0A']} style={common.linearBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={common.linearBtnText}>复制链接</Text></LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* </ImageBackground > */}
                </ScrollView>
            </View>
        )
    }
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://github.com/forrest23/ReactNativeComponents',
            config: [],
            link: '',
            user: {},
            userCoin: {},
            userInfo: {},
            inviteData:{},
        }
        // this.componentWillUnmount = this.componentWillUnmount.bind(this)
    }
    componentDidMount() {
        this.getInvitePosters();
        this.getUserDetails();
    }
    getInvitePosters() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getInvitePoster(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                this.setState({
                    inviteData: res.data,
                })
            }
        })
    }
    getUserDetails() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getUserDetail(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                this.setState({
                    user: res.data.user,
                    userCoin: res.data.userCoin,
                    userInfo: res.data.userInfo,
                })
            }
        })
    }
    async copy() {
        // Clipboard.setString(this.state.config.cz_address);
        Clipboard.setString(this.state.inviteData.url);
        let str = await Clipboard.getString();
    // console.log(str)//我是文本
        Toast.show('复制成功')
    }
}
export default invite;
