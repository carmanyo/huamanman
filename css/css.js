


import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet
} from 'react-native';
// import { color } from 'react-native-reanimated';
const window = Dimensions.get('window');
const width = Dimensions.get('window').width;


var css = StyleSheet.create({
    // 通用
    portrait24:{
        width:24,
        height:24,
        borderRadius:window.width,
    },
    portrait38:{
        width:38,
        height:38,
        borderRadius:window.width,
    },
    portrait46:{
        width:46,
        height:46,
        borderRadius:window.width,
    },
    portrait54:{
        width:54,
        height:54,
        borderRadius:window.width,
    },
    dateIcon:{
        width:17,
        height:17,
        marginLeft:90,
    },
    moreIcon:{
        width:15,
        height:15,
        resizeMode:'stretch',
    },
    settingMoreIcon:{
        width:10,
        height:10,
        resizeMode:'stretch',
    },
    viewPlaceholder10:{
        backgroundColor:'#EDEDED',
        height:10,
    },
    genderIcon:{
        width:14,
        height:14,
        marginLeft:6,
    },
    InputItem:{
        display:'flex',
        flexDirection: 'row',
        alignItems:'center',
        backgroundColor:'#fff',
        paddingVertical:10,
        paddingHorizontal:20,
    },
    InputLabel:{
        marginRight:27,
    },
    deleteIconWrap:{
        display:'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'flex-end',
        marginRight:26,
    },
    deleteIcon:{
        width:15,
        height:15,
    },
    getCodeBtn:{
        width:68,
        borderWidth:1,
        borderColor:'#0088FF',
        borderRadius:12,
    },
    getCodeBtnText:{
        color:'#0088FF',
        fontSize:12,
        lineHeight:24,
        textAlign:'center',
    },


   /* 点击右上角+的弹窗 */
    addModal:{
        position: 'absolute',
        top: 32,
        right: 4,
        zIndex: 999999,
        fontSize:14,
        width:114,
        height:137,
    },
    modalUl:{
        width:114,
        height:137,
        maxWidth:114,
        display:'flex',
        flexDirection: 'column',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:10,
    },
    modalLi:{
        width:114,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:0.5,
        borderBottomColor:'#707070',
        paddingVertical:10,
    },
    addImg:{
        width: 17, 
        height: 17,
        resizeMode:'stretch',
        marginRight:5,
    },



    // 用户列表
    userList:{
        backgroundColor:'#fff',
        marginTop:18,
        paddingLeft:20,
    },
    userLi:{
        // marginHorizontal:25,
        marginVertical:5,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"space-between",
        width:window.width-120,
        // maxWidth:window.width-120,
    },
    userMessage:{
        width:window.width-130,
    },
    userName:{
        fontSize:14,
        color:'#000000',
        marginBottom:4,
    },
    userContent:{
        fontSize:11,
        color:'#AEAEAE',
    },
    time:{
        color:'#AEAEAE',
        fontSize:11,
        marginTop:-20,
    },
    portraitWrap:{
        position:'relative'
    },
    userBadge:{
        position:'absolute',
        top:-2,
        right:5,
        width:15,
        height:15,
        backgroundColor:'#FF0000',
        textAlign:'center',
        color:'#fff',
        fontSize:10,
        borderRadius:window.width,
    },
    userDot:{
        position:'absolute',
        top:0,
        right:8,
        width:10,
        height:10,
        backgroundColor:'#FF0000',
        borderRadius:window.width,
    },
    groupHead:{
        width: 44, 
        height: 44,
        resizeMode:'stretch',
        marginLeft:25,
        marginRight:10,
        borderRadius:window.width,
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-between',
        overflow:'hidden',
    },
    groupHeadImg:{
        width:20,
        height:20,
        marginBottom:4,
    },
    


    // 添加朋友
    addFriendLi:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:10,
        paddingLeft:20,
        paddingRight:15,
    },
    addFriendLeft:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    addFriendIcon:{
        width:31,
        height:31,
        resizeMode:'stretch',
        marginRight:12,
    },
    addFriendTextWrap:{

    },
    addFriendText1:{
        fontSize:14,
        color:'#000000',
    },
    addFriendText2:{
        fontSize:10,
        color:'#AEAEAE',
        marginTop:2,
    },


    // 我的
    mineTop:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:15,
        paddingVertical:32,
        backgroundColor:'#fff'
    },
    mineLeft:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    minePortrait:{
        width:54,
        height:54,
        borderRadius:window.width,
        marginRight:10,
    },
    mineUserInfo:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    mineUserName:{
        fontSize:18,
    },
    mineId:{
        fontSize:18,
    },
    mineQr:{
        width:25,
        height:25,
    },
    mineList:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:20,
        paddingVertical:15,
        backgroundColor:'#fff'
    },
    mineListLeft:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    mineListRight:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    mineListRightText:{
        fontSize:14,
        marginRight:22,
    },
    mineListIcon:{
        width:27,
        height:27,
        marginRight:13,
    },
    mineListText:{
        fontSize:14,
    },



    // 收藏
    collectList:{
        paddingHorizontal:15,
        backgroundColor:'#fff',
    },
    collectImg:{
        width:70,
        height:53,
        marginBottom:2,
    },
    collectListText:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    collectListName:{
        color:'#AEAEAE',
        fontSize:11,
        marginRight:8,
    },
    collectListTime:{
        color:'#AEAEAE',
        fontSize:11,
    },



    // 添加朋友信息展示
    addFriendInfoTopWrap:{
        paddingVertical:13,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingLeft:20,
        paddingRight:14,
        backgroundColor:'#fff',
    },
    addFriendInfoTop:{
        // paddingVertical:13,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        // paddingLeft:20,
        backgroundColor:'#fff'
    },
    addFriendInfoName:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    addFriendInfoNameText:{
        fontSize:14,
    },
    addFriendInfoId:{
        fontSize:11,
        color:'#AEAEAE',
    },
    addFriendInfoAddress:{
        fontSize:11,
        color:'#AEAEAE',
    },


    // 授权
    authorizationList:{
        paddingTop:15,
        paddingBottom:10,
        paddingLeft:25,
        paddingRight:18,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    authorizationLeft:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    authorizationPortrait:{
        width:38,
        height:38,
        borderRadius:window.width,
        marginRight:10,
    },
    authorizationName:{
        fontSize:14,
    },
    authorizationPhone:{
        fontSize:11,
        color:'#AEAEAE',
    },
    authorizationId:{
        fontSize:11,
        color:'#AEAEAE',
    },
    authorizationRight:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-end',
    },
    authorizationTime:{
        fontSize:11,
        color:'#AEAEAE',
        marginBottom:17,
    },
    authorizationBtn:{
        backgroundColor:'#0088FF',
        width:50,
        borderRadius:1,
    },
    authorizationBtnText:{
        textAlign:'center',
        color:'#fff',
        fontSize:11,
        lineHeight:21,
    },


    authList:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:20,
        paddingVertical:10,
        backgroundColor:'#fff'
    },
    authPicWrap:{
        display:'flex',
        flexWrap:'wrap',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:20,
        backgroundColor:'#fff',
        paddingBottom:30,
    },
    authPic:{
        width:151,
        height:112,
        marginTop:12,
    },






    // 登录
    loginBody:{
        backgroundColor:'#FBFBFB',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        paddingHorizontal:15,
    },
    notLogText:{
        fontSize:16,
        marginBottom:30,
        marginTop:17,
    },
    loginInputItem:{
        width:window.width-30,
        borderBottomWidth:1,
        borderBottomColor:'#E9E9E9',
        borderStyle:'solid',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:6,
        marginTop:10,
    },
    loginInputLabel:{
        marginRight:90,
    },
    loginInput:{
        
    },
    defaultHead:{
        width:100,
        height:100,
        marginTop:80,
    },
    forgetPwdText:{
        marginTop:12,
    },
    noAccount:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        marginTop:227,
        paddingBottom:50,
    },


    // 登录失败
    exclamationImg:{
        width:117,
        height:117,
        marginTop:80,
        marginBottom:28,
    },



    // 注册
    regTitle:{
        color:'#0088FF',
        fontSize:40,
        marginBottom:80,
        marginTop:20,
    },
    regInputItem:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        overflow:'hidden',
    },
    regLabel:{
        marginRight:30,
    },
    inputWrap:{
        borderBottomWidth:1,
        borderBottomColor:'#E9E9E9',
        borderStyle:'solid',
        width:window.width-105,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    activeInputWrap:{
        borderBottomWidth:1,
        borderBottomColor:'#D3E9FC',
        borderStyle:'solid',
        width:window.width-105,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },


    // 服务
    serviceTop:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:10,
        paddingLeft:30,
        paddingRight:36,
        borderBottomWidth:1,
        borderBottomColor:'#ECECEC',
    },
    serviceTopLeft:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    serviceClockImg:{
        width:24,
        height:24,
    },
    serviceText:{
        color:'#0088FF',
        marginLeft:5,
    },
    serviceAddImg:{
        width:24,
        height:24,
    },


    serviceListItem:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingLeft:34,
        paddingRight:37,
        paddingTop:15,
        paddingBottom:20,
    },
    serviceListText:{
        marginLeft:6,
    },
    serviceDot:{
        width:4,
        height:4,
    },
    serviceListTitle:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    serviceListLeftTimeWrap:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        marginLeft:10,
        marginTop:6,
    },
    serviceListClock:{
        width:12,
        height:12,
    },
    serviceListLeftTime:{
        marginLeft:2,
        color:'#AEAEAE',
        fontSize:11,
    },
    serviceListRightTime:{
        fontSize:12,
        marginBottom:13,
    },
    serviceDesc:{
        borderWidth:1,
        borderColor:'#FF0000',
        width:40,
        lineHeight:20,
        textAlign:'center',
        fontSize:12,
        color:'#FF0000',
    },
    serviceListRight:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    serviceListRightTimeWrap:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-end',
    },

    // 服务-编辑
    chooseTime:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:20,
    },
    onlyText:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    serviceEditRemind:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:23,
    },
    dateChoose:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    serviceEditTitle:{
        fontSize:17,
        color:'#0088FF',
        marginBottom:23,
    },



    // 重置密码
    resetPwdInputItem:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:20,
        backgroundColor:'#fff',
    },
    resetPwdLabel:{
        width:window.width/4
    },
    resetPwdInput:{
        width:window.width/2-10
    },



    // 遮罩层
    popup:{
        position:'absolute',
        top:0,
        left:0,
        width:window.width,
        height:window.height,
        zIndex:9,
        display:'flex',
        flexDirection:'row',
        alignItems:"center",
        justifyContent:'center',
    },
    mask:{
        position:'absolute',
        top:0,
        left:0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        width:window.width,
        height:window.height,
    },
    editSucceedModal:{
        width:window.width-60,
        backgroundColor:'#fff',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        marginTop:-100,
        paddingBottom:30,
    },
    editSucceedImg:{
        width:147,
        height:136,
        marginTop:23,
        marginBottom:28,
    },
    editSucceedH2:{
        fontSize:24,
        marginBottom:13,
    },

    // 面对面建群
    groupBuildingInputWrap:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        marginTop:18,
    },
    searchInput:{
        borderWidth:1,
        borderColor:'#AEAEAE',
        backgroundColor:'#fff',
        width:30,
        height:30,
        marginRight:30,
        lineHeight:30,
        color:'#0088FF',
        paddingVertical:0,
        textAlign:'center',
        fontSize:16,
    },




    // 我的名片
    myNameCard:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:'#fff',
        width:window.width-40,
        marginTop:50,
        borderRadius:10,
    },




    // 个人信息-更多-位置
    myLocation:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#fff',
        paddingLeft:20,
        paddingVertical:10,
        marginTop:5,
        marginBottom:9,
    },
    locationImg:{
        width:18,
        height:23,
    },
    hotCityWrap:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        flexWrap:'wrap',
        paddingHorizontal:20,
        marginTop:5,
    },
    hotCityText:{
        width:102,
        minWidth:102,
        lineHeight:32,
        textAlign:'center',
        backgroundColor:'#fff',
        borderRadius:5,
        marginBottom:8,
    },


    // 通讯录
    bookFunc:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'#fff',
        paddingLeft:22,
        paddingRight:26,
        paddingVertical:8,
    },
    bookFuncTitle:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    bookFuncImg:{
        width:24,
        height:24,
        marginRight:8,
        borderRadius:window.width,
    },
    bookMessage:{
        color:'#fff',
        backgroundColor:'#FF0000',
        fontSize:11,
        borderRadius:11,
        lineHeight:22,
        width:56,
        textAlign:'center',
    },
    downImg:{
        width:15,
        height:8,
    },
    recentContact:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'#fff',
        paddingHorizontal:20,
        paddingVertical:10,
        marginTop:10,
    },
    grayAddText:{
        color:'#AEAEAE',
        fontSize:11,
    },
    blueAddText:{
        color:'#0088FF',
        fontSize:11,
    },
    recommendtoFriendsBtn:{
        borderWidth:1,
        borderColor:'#000000',
        width:87,
        borderRadius:12,
    },
    recommendtoFriendsBtnText:{
        lineHeight:24,
        textAlign:'center',
    },
    bookSettingTile:{
        paddingLeft:24,
        lineHeight:32,
    },
    bookSettingInput:{
        backgroundColor:'#fff',
        paddingLeft:24,
    },
    chooseGroup:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingLeft:22,
        paddingRight:18,
        paddingVertical:12,
        backgroundColor:'#fff',
    },
    selectIcon:{
        width:18,
        height:18,
    },


    // 新朋友
    bookPrtrait:{
        width:38,
        height:38,
        borderRadius:window.width,
        marginRight:10,
    },
    addBtn:{
        color:'#fff',
        backgroundColor:'#FF0000',
        borderRadius:11,
        lineHeight:22,
        width:56,
        textAlign:'center',
    },
    addedBtn:{
        color:'#AEAEAE',
        lineHeight:22,
        width:56,
        textAlign:'center',
    },

    // 聊天
    chatIcon:{
        width:21,
        height:21,
        marginRight:17,
    },
    chatInput:{
        borderBottomWidth:1,
        borderColor:'rgba(0,0,0,0.1)',
        width:238,
        padding:0,
        marginRight:17,
        margin:0,
    },
    touchToSpeake:{
        borderBottomWidth:1,
        borderColor:'rgba(0,0,0,0.1)',
        width:238,
        marginRight:17,
        height:29,
    },
    logsTime:{
        textAlign:'center',
        color:'#AEAEAE',
        fontSize:11,
        marginTop:15,
    },
    othersLogs:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:18,
        marginTop:15,
    },
    othersLogsText:{
        backgroundColor:'#fff',
        fontSize:15,
        // paddingVertical:5,
        // paddingBottom:5,
        // paddingHorizontal:7,
        borderTopRightRadius:10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        marginLeft:12,
        maxWidth:252,
        // lineHeight:22,
    },
    mineLogsText:{
        backgroundColor:'#0088FF',
        fontSize:15,
        // paddingVertical:5,
        // paddingBottom:5,
        // paddingHorizontal:7,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        marginRight:12,
        color:'#fff',
        maxWidth:252,
        // lineHeight:22,
    },
    mineLogs:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        paddingRight:18,
        marginTop:15,
    },

    // 操作---转发/复制/收藏/删除
    chatOpt:{
        position:'absolute',
        width:211,
        top:20,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:9,
        zIndex:99
    },
    chatOptBg:{
        position:'absolute',
        width:211,
        height:35,
    },
    chatOptText:{
        color:'#fff'
    },
    chatOptTextLine:{
        height:20,
        borderWidth:0.3,
        borderStyle:'dashed',
        borderColor:'#fff',
        backgroundColor:'#fff',
        borderRadius:0.1,
    },

    // 收藏成功弹窗
    chatCollectModal:{
        position:'absolute',
        width:150,
        height:150,
        top:window.height/2,
        left:window.width/2,
        marginLeft:-75,
        marginTop:-100,
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-end',
    },
    chatCollect:{
        position:'absolute',
        width:150,
        height:150,
    },
    chatCollectModalText:{
        fontSize:17,
        textAlign:'center',
        marginBottom:18,
        color:'#fff',
    },

    // 加入聊天弹窗
    joinVoice:{
        position:'absolute',
        top:40,
        left:0,
        width:window.width,
        height:40,
        backgroundColor:'#fff',
        // zIndex:-91,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        //该属性只支持>=android 5.0
        elevation:1.5,
        shadowColor:"#000",
        shadowOffset:{width:0,height:0},
        shadowOpacity: 1,
        shadowRadius: 1.5,
    },
    joinVoiceIcon:{
        width:10,
        height:14,
        marginRight:6,
    },
    joinVoiceBtn:{
        position:'absolute',
        top:9,
        right:17,
        width:50,
        backgroundColor:'#0088FF'
    },
    joinVoiceBtnText:{
        color:'#fff',
        fontSize:11,
        textAlign:'center',
        lineHeight:21,
    },
    
    //  聊天功能列表
    chatFuncWrap:{
        borderTopWidth:1,
        borderColor:'rgba(0,0,0,0.1)',
        marginTop:17,
        paddingHorizontal:27,
        paddingBottom:17,
        height:200,
    },
    chatFuncCon:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
    },
    chatFuncBlock:{
        width:50,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        marginTop:17,
    },
    chatFuncImg:{
        width:50,
        height:50,
        marginBottom:1,
    },
    chatFuncText:{
        color:'#999999',
        fontSize:12
    },

    // 聊天设置
    chatSettingTop:{
        paddingVertical:20,
        paddingLeft:20,
        backgroundColor:'#fff',
        display:'flex',
        flexWrap:'wrap', 
        flexDirection:'row',
        alignItems:'flex-start',
    },
    chatSettingUser:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
    },
    chatSettingFunc:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:20,
        paddingLeft:18,
        paddingRight:5,
        backgroundColor:'#fff'
    },
    groupChatSettingFunc:{
        paddingVertical:10,
    },
    settingCheckMore:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width:window.width,
        backgroundColor:'#fff',
        paddingBottom:10,
    },


    // 修改群昵称弹窗
    editGroupName:{
        backgroundColor:'#fff',
        width:250, 
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        paddingTop:10,
        marginTop:-100,
    },
    settingBtnWrap:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        marginTop:20,
    },
    editBtn:{
        width:125,
        height:32,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center'
    },

    // 清除聊天记录弹窗
    clearChatLogs:{
        position:'absolute',
        bottom:0,
        width:window.width,
        backgroundColor:'#fff',
        borderTopLeftRadius:6,
        borderTopRightRadius:6,
    },
    clearChatLogsText:{
        paddingTop:24,
        paddingBottom:16,
        textAlign:'center',
    },


    // 实名认证弹窗
    alertModal:{
        backgroundColor:'#fff',
        width:183,
    },
    alertModalTitle:{
        paddingVertical:10,
        textAlign:'center',
    },



    // 实名认证
    realNameWrap:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-between',
    },
    realNameBlock:{
        position:'relative',
        width:160,
        height:131,
        marginTop:15,
    },
    realNameBg:{
        position:'absolute',
        top:0,
        left:0,
        width:160,
        height:131,
    },
    realNameBlockText:{
        textAlign:'center',
        color:'#2A2931',
        fontSize:12,
        marginTop:79,
    },


    // 音频
    mainVoice:{
        minHeight:window.height,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    voicePortrait:{
        width:88,
        height:88,
        borderRadius:window.width,
    },
    voiceUser:{
        color:'#fff',
        fontSize:16,
        marginTop:4,
    },
    voiceDesc:{
        color:'#fff',
        marginTop:20,
    },
    voiceHangup:{
        width:60,
        height:60,
    },
    cancelText:{
        fontSize:11,
        marginTop:2,
        textAlign:'center',
        color:'#fff',
    },

    // 群聊音频
    voiceUserWrap:{
        width:window.width-100,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:6,
    },
    voiceUserBlock:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
    },



    // 显示选择的数据弹窗
    chooseUserTitle:{
        fontSize:16,
        paddingLeft:11,
        paddingVertical:10,
    },
    chooseUserWrap:{
        paddingLeft:11,
        display:'flex',
        flexWrap:'wrap',
        flexDirection:'row',
    },
    chooseUserWrapBlock:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        marginRight:18,
    },
    chooseUserWrapText:{
        color:'#AEAEAE',
        fontSize:10,
    },
    chooseGroupBlock:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:10,
        paddingLeft:22,
        paddingRight:30,
    },



    // 录音弹窗
    recordWrap:{
        position:'absolute',
        top:0,
        left:0,
        zIndex:999999,
        width:window.width,
        height:window.height-60,
        backgroundColor:'rgba(0,0,0,0.85)',
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-end',
        alignItems:'center',
        elevation:2,
    },
    recordSmallImgWrap:{
        display:'flex',
        flexDirection:'row',
    },
    recordWrapBigImg:{
        width:139,
        height:139,
    },
    recordWrapSmallImg:{
        width:48,
        height:48,
        marginTop:64,
        marginBottom:44,
    },


    // 通讯录-管理员
    card:{
        backgroundColor:'#fff',
        borderRadius:10,
        paddingTop:12,
        paddingRight:17,
        paddingBottom:21,
        paddingLeft:13,
        marginTop:10,
    },
    cardTitle:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    cardImg:{
        width:22,
        height:22,
    },
    cardInfo:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        marginTop:23,
    },



    // 萤火
    banner:{
        width:window.width,
        height:275,
    },
    funcWrap:{
        flex:1,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 10,
        paddingBottom:0,
        marginTop: -25,
        backgroundColor: '#fff',
        position: 'relative',
        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 2,
        elevation: 4,
    },
    funcBlock:{
        minWidth: 80,
        flex:1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 60,
        color: '#58575C',
        position: 'relative',
    },
    indexicon:{
        width:24,
        height:24,
        marginBottom:10,
    },
    indexiconText:{
        fontSize:13,
        color:'#58575C',
        position:'relative',
    },
    floatNum:{
        display: 'flex',
        position: 'absolute',
        minWidth: 19,
        lineHeight: 19,
        color: '#fff',
        backgroundColor: '#FB4677',
        fontSize: 10,
        textAlign: 'center',
        borderRadius: 50,
        top: -5,
        // left: width/2,
        left:width/9,
        marginLeft: 7,
    },
    indexTitle:{
        fontSize:17,
        fontWeight:'bold',
        marginTop:20,
        marginLeft:20,
    },
    indexNews:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginLeft:20,
        marginRight:20,
        paddingTop:15,
        paddingBottom:15,
    },
    indexNewsLeft:{
        width:window.width/2,
    },
    indexNewsTitle:{
        // fontSize
    },
    indexNewsTime:{
        color:'#C2C2C2',
        fontSize:12,
        marginTop:13,
    },
    indexNewsImage:{
        width:100,
        height:70,
        borderRadius:4,
    },

    // 文字滚动
    scrollNotice:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:15,
        paddingRight:15,
    },
    indexNewsIcon:{
        width:20,
        height:20,
    },


});

module.exports = css;