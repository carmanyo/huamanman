
import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet
} from 'react-native';
const window = Dimensions.get('window');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


var common = StyleSheet.create({
    ScrollView: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        height: height,
        maxHeight: height,
        overflow: 'hidden',
        // marginTop:40,
    },
    ScrollViewB: {
        maxHeight: height / 10,
        // backgroundColor:'pink',
    },
    ScrollViewHasHeader: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        // marginTop:40,
        height: height + 40,
        maxHeight: height + 40,
        overflow: 'hidden',
        width: width,
        maxWidth: width,
        // backgroundColor:'pink'
    },
    ScrollViewHasHeaderAndBottom: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        // marginTop:40,
        height: height - 100,
        maxHeight: height - 100,
        overflow: 'hidden',
        width: width,
        maxWidth: width,
        // backgroundColor:'pink'
    },
    hasHeader: {
        marginTop: 30,
        height: height - 40,
    },
    maxWidthFull: {
        maxWidth: width - 30,
    },
    padBottom: {
        paddingBottom: 50,
        flex: 1,
    },
    navBar: {
        // flex:1,
        position: 'absolute',
        bottom: 0,
        width: width,
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: 'rgba(0,0,0,0.08)',
    },
    navBarBlock: {
        width: width / 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navBarIcon: {
        width: 22,
        height: 22,
        marginBottom: 4,
    },
    navBarText: {
        color: '#CFCEDB',
        fontSize: 12,
    },
    body: {
        padding: 0,
        margin: 0,
        position: 'relative',
        zIndex: 1,
        minHeight: window.height,
        backgroundColor: '#fff',
        paddingBottom: 40,
    },
    bodyGray: {
        padding: 0,
        margin: 0,
        position: 'relative',
        zIndex: 1,
        minHeight: window.height - 30,
        backgroundColor: '#F5F5F5',
        paddingBottom: 40,
        height: height,
    },
    bodyGrayHasS: {
        padding: 0,
        margin: 0,
        position: 'relative',
        zIndex: 1,
        minHeight: window.height - 30,
        backgroundColor: '#F5F5F5',
        height: height,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    bodyDark: {
        padding: 0,
        margin: 0,
        position: 'relative',
        zIndex: 1,
        minHeight: window.height - 30,
        backgroundColor: '#717171',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    bodyVoice: {
        padding: 0,
        margin: 0,
        position: 'relative',
        zIndex: 1,
        minHeight: window.height,
        backgroundColor: '#717171',
    },
    main: {
        marginTop: 40,
    },
    header: {
        // position: 'relative',
        // flex:1,
        // top: 0,
        // left: 0,
        width: window.width,
        height: 45,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        color: '#1F1F1F',
        // zIndex: 1,
        elevation: 1,  //  设置阴影角度，通过这个设置有无阴影（这个是最重要的，决定有没有阴影）
        shadowColor: 'black',  //  阴影颜色
        shadowOffset: { width: 10, height: 10 },  // 阴影偏移
        shadowOpacity: 1,  // 阴影不透明度
        shadowRadius: 10,  //  圆角
        // backgroundColor:'pink',
    },
    headerIn: {
        width: window.width,
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        color: '#1F1F1F',
        zIndex: 1,
        elevation: 1,  //  设置阴影角度，通过这个设置有无阴影（这个是最重要的，决定有没有阴影）
        shadowColor: 'black',  //  阴影颜色
        shadowOffset: { width: 10, height: 10 },  // 阴影偏移
        shadowOpacity: 1,  // 阴影不透明度
        shadowRadius: 10,  //  圆角
    },
    headerInT: {
        backgroundColor: 'transparent',
    },
    headerNoBorder: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: 45,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        color: '#1F1F1F',
    },
    noShadowColor: {
        elevation: 0,
    },
    headerTitle: {
    },
    headerTitleText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    headerTitleText2: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    headerTitleTextW: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    headerLeft: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        position: 'absolute',
        left: 0,
        top: -2,
        // backgroundColor:'pink',
        width:50,
        height:50,
    },
    headerLeftText: {
        fontSize: 16,
    },
    returnIcon: {
        width: 23,
        height: 23,
        // marginRight: 14,
        // marginTop: -3,
    },
    returnImage: {
        width: 23,
        height: 23,
        marginTop: 19,
        marginLeft: 18,
    },
    headerRight: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        right: 15,
        top: 12,
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: window.width,
    },
    chatFooter: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: window.width,
        paddingBottom: 10,
        paddingTop: 15,
    },
    chatFooterInput: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: window.width,
    },

    searchWrap: {
        backgroundColor: '#EDEDED',
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    searchForm: {
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 0,
        paddingHorizontal: 20,
        borderRadius: 50,
        height: 34,
    },
    searchInput: {
        padding: 0,
        lineHeight: 34,
    },


    AEAEAE: {
        color: '#AEAEAE',
    },
    FF0000: {
        color: '#FF0000'
    },


    // button
    whiteFillBtn: {
        fontSize: 16,
        textAlign: 'center',
        backgroundColor: '#fff'
    },
    whiteFillBtnText: {
        color: '#0088FF',
        lineHeight: 40,
        textAlign: 'center',
    },
    grayBorderBtn: {
        width: window.width - 30,
        borderWidth: 1,
        borderColor: '#AEAEAE',
        borderStyle: 'solid',
        borderRadius: 17,
    },
    grayBorderBtnText: {
        color: '#AEAEAE',
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 34,
    },
    blueFillBtn: {
        width: window.width - 30,
        borderWidth: 1,
        borderColor: '#0088FF',
        borderStyle: 'solid',
        borderRadius: 17,
        backgroundColor: '#0088FF',
    },
    blueFillBtnText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 34,
    },


    // radio
    myRadioWrap: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    myRadioText: {
        marginLeft: 6,
    },
    myRadio: {
        width: 12,
        height: 12,
        borderRadius: window.width,
        borderWidth: 1,
        borderColor: '#707070',
    },
    myRadioActive: {
        width: 12,
        height: 12,
        borderRadius: window.width,
        backgroundColor: '#0088FF',
    },


    // 萤火虫公共样式
    tick: {
        width: 42,
        height: 21,
        marginRight: 25,
    },
    more: {
        width: 8,
        height: 15,
    },
    mask: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
        backgroundColor: 'rgba(0,0,0,.4)',
        zIndex: 9,
    },
    maskCenter: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
        backgroundColor: 'rgba(0,0,0,.7)',
        zIndex: 9,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    askModal: {
        position: 'absolute',
        top: width / 1.5,
        zIndex: 99,
        backgroundColor: '#fff',
        width: width - 50,
        left: 25,
        borderRadius: 5,
        paddingTop: 25,
    },
    askTitle: {
        textAlign: 'center',
        fontSize: 15,
    },
    askOperation: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 50,
        borderTopWidth: 1,
        borderColor: '#F5F5F5',
    },
    selectIcon: {
        width: 20,
        height: 15,
    },
    cancelBtn: {
        width: (width - 50) / 2,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        color: '#999',
        fontSize: 15,
    },
    confirmBtn: {
        width: (width - 50) / 2,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        color: '#F4AC12',
        borderLeftWidth: 1,
        borderColor: '#F5F5F5',
        fontSize: 15,
    },

    // 下拉框
    dropdown: {
        fontSize: 26,
    },
    selectWrap: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 1,
        borderColor: '#4767FF',
        padding: 10,
        borderRadius: 5,
    },
    pay: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginLeft: 30,
    },
    radioWrap: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10
    },
    radioCon: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 0,
    },
    placeholder: {
        color: '#B3B3B3',
    },
    input: {
        marginLeft: 20,
    },
    getCode: {
        // backgroundColor: '#7B70FB',
        // borderRadius: 50,
        color: '#F3A316',
        // fontSize: 12,
        // minWidth: 68,
        // lineHeight: 25,
        // textAlign: 'center',
        // position:'absolute',
        right: 0,
        top: 0,
        // flex:1,
        // backgroundColor:'blue',
    },
    aaa: {

    },




    textInputStyle: {
        paddingVertical: 0,
    },
    linearBtn: {
        borderRadius: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    linearBtn2: {
        borderRadius: 6,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    linearBtnText: {
        color: '#fff',
        textAlign: 'center',
        lineHeight: 44,
        fontSize: 15,
    },
    borderBtn: {
        width: width,
        borderRadius: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#F3A316',
    },
    borderBtnText: {
        color: '#F3A316',
        textAlign: 'center',
        lineHeight: 44,
        fontSize: 15,
    },
    gray12: {
        color: '#8F96B3',
        fontSize: 12,
    },
    FCR: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    FBR: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    FLR: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    FCC: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    img12: {
        width: 12,
        height: 12,
        marginLeft: 5,
    },
    img70: {
        width: 70,
        height: 70,
        marginRight: 17,
        borderRadius: 100,
    },
    img19: {
        width: 19,
        height: 19,
        marginRight: 10,
    },
    img24: {
        width: 24,
        height: 24,
        marginRight: 10,
        borderRadius: 100,
    },

    // 支付密码弹窗
    passwordCont: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
        elevation: 2,
        overflow: 'hidden',
    },
    passwordMask: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
        backgroundColor: 'rgba(0,0,0,.7)',
    },
    passwordWrap: {
        width: 350,
        backgroundColor: '#fff',
        minHeight: 150,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        top: width / 4,
        left: width / 2,
        marginLeft: -175,
        borderRadius: 10,
    },
    passwordText: {
        fontSize: 16,
        marginBottom: 20,
    },
    hidden: {
        display: 'none',
    },
    btn: {
        width: width - 20,
        height: 50,
        backgroundColor: 'blue',
        margin: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        // position:'relative',
        // zIndex:2,
    },
    btnText: {
        color: '#fff',
    },
    modal: {
        width: width,
        height: height,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        position: 'absolute',
        zIndex: 9,
    },
    tradeMain: {
        backgroundColor: '#fff',
        width: width,
        padding: 24,
        paddingTop: 15,
        position: 'relative',
        zIndex: 9,
    },
    goodsInfos: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    goodsImage: {
        width: 110,
        height: 110,
        marginTop: -60,
        borderWidth: 4,
        borderColor: '#fff',
        marginRight: 10,
    },
    priceS: {
        color: '#F81E39',
    },
    priceB: {
        color: '#F81E39',
        fontSize: 24,
        marginTop: -6,
        marginLeft: 2,
    },
    modalStockNum: {
        color: '#777',
    },
    tipsText: {
        color: '#333333',
        marginBottom: 10,
        marginTop: 12,
        fontWeight: 'bold',
    },
    specValue: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e6e6e6',
        color: '#888',
        marginRight: 10,
        padding: 4,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 4,
    },
    specValueActive: {
        backgroundColor: '#F3A316',
        borderWidth: 1,
        borderColor: '#F3A316',
        color: '#fff',
        marginRight: 10,
        padding: 4,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 4,
    },
    linearBtnText: {
        lineHeight: 40,
        color: '#fff',
    },
    marginTop40: {
        marginTop: 40,
    },
    numImage: {
        width: 25,
        height: 25,
    },
    buyNum: {
        color: '#333333',
        marginTop: 12,
        fontWeight: 'bold',
    },
    numInput: {
        textAlign: 'center',
        color: '#000'
    },
    navRowBig:{
        fontSize:17,
        marginTop:20
    },
    // 横向导航
    navRowWrap: {
        // flex:1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#F5F5F5',
        // backgroundColor:'blue',
        position: 'relative',
    },
    navRowScrollView: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: 40,
        maxWidth: width,
        height: 40,
        maxHeight: 40,
        // backgroundColor:'pink'
    },
    navRowBlock: {
        marginLeft: 25,
        fontSize: 15,
        color: '#D4D4D4',
        paddingBottom: 2,
        borderBottomWidth: 2,
        borderColor: 'transparent',
        paddingTop: 10,
    },
    navRowBlock2: {
        marginLeft: 25,
        fontSize: 15,
        color: '#8C8E95',
        paddingBottom: 2,
        borderBottomWidth: 2,
        borderColor: 'transparent',
        paddingTop: 10,
    },
    navRowActive: {
        color: '#F3A316',
        borderColor: '#F3A316',
    },
    orderScrollView: {
        marginTop: height / 100,
    },
    empty: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: 121,
        width: width,
    },
    emptyIcon: {
        width: 68,
        height: 68,
    },
    emptyH1: {
        marginTop: 14,
        color: '#333333',
        fontSize: 15,
        fontWeight: 'bold',
    },
    emptyP: {
        color: '#D4D4D4',
        fontWeight: 'bold',
        marginTop: 4.5,
    },
    grayLine5: {
        width: width,
        height: 5,
        minHeight: 5,
        backgroundColor: '#F5F5F5',
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 25,
    },
    titleDot: {
        width: 6,
        height: 9,
        backgroundColor: '#F3A316',
        marginRight: 4,
    },
    titleText: {
        color: '#333333',
        fontSize: 15,
        fontWeight: 'bold',
    },
    footerBtn: {
        // flex:1,
        position: 'absolute',
        bottom: 0,
        // backgroundColor:'pink',
        width: width,
        borderTopWidth: 1,
        borderColor: '#F5F5F5',
        paddingTop: 10,
        paddingRight: 15,
        backgroundColor:'#fff',
    },
    copyIcon: {
        width: 17,
        height: 17,
        marginLeft: 10,
    },
    // 地址选择
    ScrollViewPicker: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        // justifyContent:'center',
        height: height / 2,
        maxHeight: height / 2,
        paddingTop: 100,
        // overflow: 'hidden',
        width: width,
        // flex:1,
        backgroundColor: 'yellow',
    },
    addressLi: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop:15,
        height: 50,
        // paddingBottom:15,
        backgroundColor: '#fff',
        width: width,
        borderWidth: 0,
        // minHeight:80,
    },
    putScrollView: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        width: width, 
        height: height / 2,
        // backgroundColor:'#fff',
        borderWidth: 0,
        flex: 1,
        // paddingBottom:40,
        // marginBottom:45,
        position: 'relative',
        zIndex: 10,
    },
    addressModal: {
        position: 'relative',
        zIndex: 10,
    },
    green: {
        color: '#199410',
    },
    tab: {
        marginTop: 60,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    tabText: {
        color: '#D4D4D4',
        fontWeight: 'bold',
        fontSize: 15,
    },
    tabTextActive: {
        color: '#F3A316',
        borderBottomWidth: 1,
        borderColor: '#F3A316',
        paddingBottom: 2,
    },
    // 支付方式弹窗
    payModal: {
        backgroundColor: '#fff',
        position: 'relative',
        width: width - 60,
        // marginTop:-100,
        paddingLeft: 22,
        paddingRight: 22,
        paddingTop: 20,
        paddingBottom: 43,
        borderRadius: 15,
    },
    closeWrap: {
        position: 'absolute',
        top: 16,
        right: 19,
        width: 30,
        height: 30,
        // backgroundColor:'pink',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    close: {
        width: 14,
        height: 14,
    },
    modalTittle: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold',
        color: '#111111',
    },
    need: {
        color: '#C0C0C0',
        textAlign: 'center',
        marginTop: 19,
        fontSize: 15,
    },
    money: {
        color: '#F83928',
        fontSize: 23,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 2,
        marginBottom: 30,
    },
    payLi: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 19,
        paddingBottom: 19,
        borderTopWidth: 1,
        borderColor: '#f5f5f5',
    },
    hasBottomBoder: {
        borderBottomWidth: 1,
        borderColor: '#f5f5f5',
    },
    payIcon: {
        width: 22,
        height: 22,
        marginRight: 5,
    },
    payStrong: {
        fontSize: 16,
        color: '#333333',
        fontWeight: 'bold',
    },
    paySpan: {
        color: '#A5A5A5',
        fontSize: 16,
    },
    payTick: {
        width: 20,
        height: 14,
    },
    eye: {
        width: 21,
        height: 21,
        zIndex: 9,
    },
    mineFun: {
        width:'33.3%',
    },
    aaa: {

    },
    aaa: {

    },
    aaa: {

    },
    aaa: {

    },
    aaa: {

    },
    aaa: {

    },
    aaa: {

    },
    btnWrap: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 20,
    },
    minGrayFillBtn: {
        width: 90,
        height: 35,
        borderWidth: 1,
        borderColor: '#A5A5A5',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: '#A5A5A5',
    },
    minGrayFillBtnText: {
        color: '#fff',
    },
    minYellowFillBtn: {
        width: 90,
        height: 35,
        borderWidth: 1,
        borderColor: '#F5BC0B',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: '#F5BC0B',
    },
    minYellowFillBtnText: {
        color: '#fff',
    },
    minGrayBtn: {
        width: 90,
        height: 35,
        borderWidth: 1,
        borderColor: '#A5A5A5',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    minGrayBtnText: {
        color: '#A5A5A5',
    },
    minYellowBtn: {
        width: 90,
        height: 35,
        borderWidth: 1,
        borderColor: '#F3A316',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    minYellowBtnText: {
        color: '#F3A316',
    },
    yellow: {
        color: '#F3A316'
    },
    gray: {
        color: '#A5A5A5'
    },
    red: {
        color: '#F83928'
    },
    whiteBg: {
        backgroundColor: '#fff'
    },
    alignItemsStart: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    alignItemsCenter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent:'center'
    },
    alignItemsEnd: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    alignItemsB: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    alignItemsS: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    alignItemsE: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    columnCenter: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    columnStart: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    columnEnd: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    flexWrap: {
        width: width - 40,
        marginLeft: -15,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    part4: {
        width: '20.1%',
        marginBottom: 10,
    } 
});

module.exports = common;