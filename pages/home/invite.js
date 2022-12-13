
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
import { getConfig,getUserDetail,getInvitePoster } from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient from 'react-native-linear-gradient'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import common from '../../css/common.js'
import css from '../../css/invite.js'

class invite extends React.Component {
    render() {
        let { navigation } = this.props;
        return (
            <View style={[common.body, { padding: 0 }]}>
                <Image source={{uri:this.state.bg}} style={[css.inviteFont, { position: 'absolute', width: width, height: height, top: 0, left: 0 }]} />
                <ScrollView style={{ minHeight: height }}>
                    <View style={[common.header, { backgroundColor: 'transparent' }]}>
                        <TouchableOpacity onPress={() => { navigation.goBack(); }} style={[common.headerLeft]}>
                            <Image source={require('../../image/return2.png')} style={common.returnIcon} />
                        </TouchableOpacity >
                        <View style={common.headerTitle}><Text style={common.headerTitleTextW}>邀请好友</Text></View>
                    </View>

                    <View style={css.main}>
                        <View style={css.content}>
                            <View style={css.codeImg}>
                                <Image style={{width:80,height:80}} source={{uri:this.state.inviteData.qrcode}}/>
                            </View>
                            <Text style={css.url}>扫描二维码或将邀请码推荐给他人</Text>
                            <TouchableOpacity onPress={this.copy.bind(this)} style={[css.linearBtn]}>
                                <LinearGradient colors={['#F2E2C2', '#F1E2BB']} style={common.linearBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={[common.linearBtnText,{color:'#333',lineHeight:30,fontSize:12,}]}>点击复制邀请链接</Text></LinearGradient>
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
            bg:'',
        }
        // this.componentWillUnmount = this.componentWillUnmount.bind(this)
    }
    componentDidMount() {
        this.getInvitePosters();
        this.getUserDetails();
        this.getConfigs();
    }

    getConfigs() {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        getConfig(fromData, res => {
        // console.log('res--------')
        // console.log(res)
            if (res.code == 1) {
                this.setState({
                    bg:res.data.setting.bg_image.value,
                })
            }
        })
    }

    // 隐藏号码
    hidePhone(phone){
        var str = phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
        return str;
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
