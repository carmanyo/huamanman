
import React from 'react';
import {
    Clipboard,
    // AsyncStorage,
    Platform,
    Linking,
    NativeModules,
    NativeEventEmitter,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView,
    Image,
    PanResponder,
    ImageBackground,
    Alert,
    Dimensions,
    Overlay,
    Animated,
    Easing,
    InteractionManager,
    Button,
    FlatList,
    PermissionsAndroid,
    RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
const Toast = Overlay.Toast;
// import { getLogin } from '../../network/authapi.js'
// const Toast = Overlay.Toast;

// import LinearGradient from 'react-native-linear-gradient'
// const width = Dimensions.get('window').width;
// const height = Dimensions.get('window').height;

// import common from '../../css/common.js'
// import css from '../../css/orderIndex.js'
// import ca from '../../css/orderWaitPay.js'
import Barcode from 'react-native-smart-barcode'
import common from '../../css/common.js'
import css from '../../css/index.js'
import {getScanCode } from '../../network/authapi.js'
// import RNRestart from 'react-native-restart';

class page extends React.Component {
    render() {
        let { navigation } = this.props;
        // let time = this.state.time;
        // console.log(this.state.viewAppear)
        return (
            // <View style={{flex: 1, backgroundColor: 'black',}}>
            //     {this.state.viewAppear ?<Barcode style={{flex: 1, }} ref={ component => this._barCode = component } onBarCodeRead={this._onBarCodeRead}/>:null}
            //     {/* <Barcode style={{flex: 1, }} onBarCodeRead={this._onBarCodeRead}/> */}
            // </View> 

            <View style={[common.body,{backgroundColor:'black'}]}>
                {/* 头部 */}
                <View style={[common.header]}>
                    <TouchableOpacity onPress={() => { navigation.goBack(); }} style={common.headerLeft}>
                        <Image source={require('../../image/return.png')} style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={common.headerTitle}><Text style={common.headerTitleText}>扫码{this.state.viewAppear}</Text></View>
                </View>
                {/* <Barcode style={{ flex: 1, }} ref={component => this._barCode = component} onBarCodeRead={this._onBarCodeRead} /> */}
                {this.state.viewAppear ? <Barcode style={{ flex: 1, }} ref={component => this._barCode = component} onBarCodeRead={this._onBarCodeRead} /> : null}
            </View>
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            viewAppear: false,
            _barCode:null,
        }
        // this.componentWillUnmount = this.componentWillUnmount.bind(this)
    }
    componentWillUnmount() {
        // this._listeners && this._listeners.forEach(listener => listener.remove());
        // this.setState = ()=>false;
        // this.stop();
    }

    // stop() {
    //     clearInterval(this.interval);
    // }
    async componentDidMount() {
        let { navigation } = this.props;
        var that = this;
        // Toast.show('到了扫码页面')

        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                'title': '相机权限',
                'message': '请在设备设置中启用摄像头权限'
            }
        )
        // console.log(granted)
        // console.log(PermissionsAndroid.RESULTS.GRANTED)
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // Toast.show("You can use the camera")
            that.setState({ viewAppear: true })
        } else {
            this.requestCameraPermission2()
            // console.log("Camera permission denied")
            Toast.show('请在设备设置中启用摄像头权限')
            setTimeout(() => {
                navigation.goBack();
            }, 1000);
        }


        // this.interval = setInterval(() => {
        //     var time = this.getDateData(this.state.date);
        //     if (time) {
        //         this.setState({ time });
        //     } else {
        //         this.stop();
        //     }
        // }, 1000);

        // let viewAppearCallBack = (event) => {
        //     this.setTimeout(() => {
        //         this.setState({
        //             viewAppear: true,
        //         })
        //     }, 255)

        // }
        // setTimeout(() => {
        //     this.setState({
        //         viewAppear: true,
        //     })
        // }, 255);
        // console.log(this.props.navigation)
        // this.setState({
        //     viewAppear: true,
        // })
        // this._listeners = [
        //     this.props.navigation.addListener('didfocus', viewAppearCallBack)
        // ]
        // RNRestart.Restart();
    }
    requestCameraPermission2() {
        var that = this;
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: '权限',
                message: '启用摄像头权限',
            },
        ).then((res) => {
            that.setState({
                camera: res
            })
            // console.log(res);
        });
    }

    showScan() {
        // Toast.show('showScan')
        // this.setState({
        //     viewAppear: true
        // }, console.log(this.state.viewAppear))
    }

    _onBarCodeRead = (e) => {
        // console.log(e)
        // console.log(`e.nativeEvent.data.type = ${e.nativeEvent.data.type}, e.nativeEvent.data.code = ${e.nativeEvent.data.code}`)
        // this._stopScan()
        // Alert.alert(e.nativeEvent.data.type, e.nativeEvent.data.code, [
        //     { text: 'OK', onPress: () => this._startScan() },
        // ])
        let { navigation } = this.props;
        var fromData = {};
        fromData['order_no'] = e.nativeEvent.data.code;
        getScanCode(fromData, res => {
        // console.log(res)
            Toast.show(res.msg)
            setTimeout(() => {
                navigation.goBack();
            }, 1000);
            // that.setState({
            //     viewAppear: 0
            // })
            // setTimeout(() => {
            //     that.setState({
            //         viewAppear:i
            //     })
            // }, 1000);
        })
    }

    _startScan = (e) => {
        this._barCode.startScan()
    }

    _stopScan = (e) => {
        this._barCode.stopScan()
    }


}
export default page;