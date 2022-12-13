
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
import ImagePicker from "react-native-image-crop-picker"

import {getRechargeConfig,getToken,getresubmitAjax} from '../../network/authapi.js'
const Toast = Overlay.Toast;
var qiniu = require('react-native-qiniu');

import LinearGradient  from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import common from '../../css/common.js'
import css from '../../css/uploadpayment.js'

// import {launchCamera,launchImageLibrary} from 'react-native-image-picker';
const options = {
    imageCount: 1, // 最大选择图片数目，默认6
    isCamera: false, // 是否允许用户在内部拍照，默认true
    isCrop: false, // 是否允许裁剪，默认false
    showCropCircle: true, // 是否显示圆形裁剪区域，默认false
    showCropFrame: true, // 是否显示裁剪区域，默认true
    showCropGrid: true, // 是否隐藏裁剪区域网格，默认false
    quality: 100, // 压缩质量
  };

class forgetpwd extends React.Component{
    constructor(props) {
        super();
        this.state = {
            num:0,
            config:[],
            avatarSource: null, 
            qiniutoken:'',
            picKey:'',
            loading:0,
            ifClick:true
        };
    }
    fileSize = (str) => {
        if(str.indexOf("=") > 0){
            let indexOf = str.indexOf("=")
            str = str.substring(0, indexOf)
        }
        return parseInt(str.length-(str.length/8) *2)
    }
    handleChoosePhoto = () => {
        var that = this;
        // Toast.show('dsfsdf')
        // launchImageLibrary({ noData: true }, (response) => {
        //   console.log(response);
        //   if (response) {
        //     // setPhoto(response);
        //     let source = { uri: response.uri };
        // // console.log(source)
        //     this.setState({
        //         avatarSource:response.uri
        //     })
        //     this.upload(response.uri)
        //     this.handleUploadPhoto(response);
        //     // console.log('~~~~~~~~~')
        //     // console.log(this.state.avatarSource)
        //   }
        // });
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            multiple: true,
            includeBase64: true
        })
        .then(images => {
            let image = images[0]

            let base64 = 
            //`data:${image.mime};base64,`+
            image.data
        // console.log("images:", this.state.qiniutoken);
        // console.log("fileSize:", this.fileSize(base64));
            Toast.show('上传中，请稍等')
            // Toast.show('注：图片压缩上传，耐心等待，显示后再确认')




            fetch(`http://up-as0.qiniup.com/putb64/${this.fileSize(base64)}`, {
                method: "POST",
                
                headers: {
                    'Content-Type': 'application/octet-stream',
                    'Authorization': `UpToken ${this.state.qiniutoken}`,
                },
                
                body: base64
            })
            .then(response => response.json())
            .then(data => {
                Toast.show('上传成功')
            // console.log('data--:', data)
                that.setState({
                    picKey:data.key,
                    avatarSource:image.path
                })
            })
            .catch(e => {
            // console.log("error:", e)
                // Toast.show(e)
                Toast.show('网络请求失败或图片大小错误，请重试或换一张')
            })

            // that.setState({
            //     avatarSource:image.path
            // })
        })
      };

      handleUploadPhoto = (photo) => {
        fetch(`https://up-as0.qiniup.com/`, {
          method: 'POST',
          body: this.createFormData(photo, { userId: '123'}),
        })
          .then((response) => response.json())
          .then((response) => {
        // console.log('response', response);
          })
          .catch((error) => {
        // console.log('error', error);
          });
      }
     createFormData = (photo, body = {}) => {
        const data = new FormData();
      
        data.append('photo', {
          name: photo.fileName,
          type: photo.type,
          uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
          token:this.state.qiniutoken,
        });
      
        Object.keys(body).forEach((key) => {
          data.append(key, body[key]);
        });
    // console.log('ssss~~~')
    // console.log(data)
        return data;
      }
      

      
    // upload(uri) {//传入一个图片选择地址
    //     qiniu.Rpc.uploadFile(uri,this.state.qiniutoken, {
    //         key:'asdf',
    //         type:'application/octet-stream',
    //         name:undefined,
    //         }
    //     ,function (resp) {
    // // console.log(resp);
    //     });
    // }

    
   
    componentDidMount(){
        this.config();
        this.token();
    // console.log('Toast----------')
    // console.log(Toast)
    }
    config(){
        var that = this;
        let {navigation} = this.props;
        var fromData = {};
        getRechargeConfig(fromData,res =>{
        // console.log('充值配置'+JSON.stringify(res))
            if(res.code == 1){
                this.setState({
                    config:res.data
                })
            }else{
                // Toast.show(res.msg, 2000);
            }
        })
    }
    token(){
        var that = this;
        let {navigation} = this.props;
        var fromData = {};
        getToken(fromData,res =>{
        // console.log('七牛token'+JSON.stringify(res))
            if(res.code == 1){
                this.setState({
                    qiniutoken:res.data.token
                })
            }else{
                // Toast.show(res.msg, 2000);
            }
        })
    }
    submit(){
        var that = this;
        if(this.state.picKey==''){
            // Toast.show('请上传打款凭证');
            Toast.show('凭证未上传或正在上传中');
            return;
        }
        if(this.state.ifClick==false){
            Toast.show('处理中，请稍等');
            return;
        }
        this.setState({
            ifClick:false
        })
        let {navigation} = this.props;
        var fromData = {};
    // console.log('aaaaaa~~~~~~~~~~')
    // console.log(this.state.picKey)
        fromData['pic'] = `http://qny.firefly888.com/${this.state.picKey}`;
        fromData['number'] = Number(this.props.route.params.num);

    // console.log(fromData)
        // return;
        getresubmitAjax(fromData,res =>{
            if(res.code == 1){
                Toast.show(res.msg);
                this.setState({
                    avatarSource:null,
                    picKey:'',
                    ifClick:true
                })
                navigation.navigate('asset');
            }else{
                Toast.show(res.msg);
                this.setState({
                    ifClick:true
                })
            }
        })
    }
    async copy(){
        Clipboard.setString(this.state.config.cz_address);
        let  str = await Clipboard.getString();
    // console.log(str)//我是文本
        Toast.show('复制成功')
    }
    render(){
        let {navigation} = this.props;
        // console.log('55555-'+JSON.stringify(this.props.navigation))
        // console.log(this.props.navigation.state.params.num)
        return(
            <View style={common.bodyGray}>
                {/* 头部 */}
                <View style={[common.header,{backgroundColor:'transparent'}]}>
                    <TouchableOpacity onPress={()=>{navigation.goBack();}} style={common.headerLeft}>
                    <Image source={require('../../img/return-white.png')}  style={common.returnIcon} />
                    </TouchableOpacity >
                    <View style={[common.headerTitle]}><Text style={[common.headerTitleText,{color:'#fff'}]}>上传打款凭证</Text></View>
                </View>

                <LinearGradient colors={['#4767FF', '#B657FF']} style={{width:width,height: 150,borderBottomRightRadius:30,borderBottomLeftRadius:30,}} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
                    
                </LinearGradient>
                <View style={[css.main]}>
                    <ScrollView>
                    <View style={css.need}>
                        <Text style={{color:'#fff'}}>需向下方账户转入</Text>
                        <Text style={{color:'#fff'}}>{this.props.route.params.num} FEF</Text>
                    </View>
                     
                    <View style={[css.content,{height:height*2}]}>
                        <Text style={css.scanTitle}>扫二维码，转入FEF</Text>
                        <View style={css.qrBg}>
                            {/* <Image source={require("../../img/shoukuan.png")} style={css.shoukuan}/> */}
                            <Image style={{width:150,height:150}} source={{uri:this.state.config.cz_pic}}/>
                        </View>
                        <Text style={css.url}>{this.state.config.cz_address}</Text>
                        <TouchableOpacity onPress={this.copy.bind(this)} style={css.copyBtn}><Text style={{color:'#494D5C',fontSize:12,lineHeight:27,}}>复制</Text></TouchableOpacity>
                        
                        <TouchableOpacity style={css.upload} onPress={() => this.handleChoosePhoto()}>
                        {/* <TouchableOpacity style={css.upload}  onPress={this.choosePic.bind(this)}> */}
                            {/* <Image source={this.state.avatarSource} style={this.state.avatarSource!=null?css.uploadImg:common.hidden} /> */}
                            <Image source={{uri:this.state.avatarSource}} style={this.state.avatarSource!=null?css.uploadImg:common.hidden} />
                            <Image source={require("../../img/camera.png")} style={this.state.avatarSource!=null?common.hidden:css.camera}></Image>
                            {/* <Image source={require("../../img/loading.gif")} style={this.state.avatarSource!=null?common.hidden:css.camera}></Image> */}
                            <View style={this.state.avatarSource!=null?common.hidden:null}><Text style={{color:'#C3C3C3'}}>点击上传打款凭证</Text></View>
                        </TouchableOpacity>

                        <View style={{width:500,display:'flex',flexDirection:'column',alignItems:'center',position:'relative',zIndex:-1}}>
                            <Text style={{marginTop:30,}}>温馨提示：请上传如下图，带有哈希值得打款凭证。</Text>
                            <Text style={{marginTop:30,}}>注：图片压缩上传，耐心等待，显示后再确认。</Text>
                            {/* <Image source={require("../../img/tipsimg.jpg")} style={{width:width/1.2,marginTop:-height-50}} resizeMode='contain'></Image> */}
                        </View>
                    </View>
                    </ScrollView>
                </View>
                <TouchableOpacity onPress={this.submit.bind(this)} style={[css.linearBtn,{marginTop:58,marginLeft:15,width:width-30,position:'absolute',bottom:30,display:this.state.picKey==''||this.state.ifClick==false?'flex':'none'}]}>
                    <LinearGradient colors={['#ccc', '#ccc']} style={[common.linearBtn,{display:this.state.picKey==''||this.state.ifClick==false?'flex':'none'}]} start={{x: 0, y: 0}} end={{x: 1, y: 1}}><Text style={common.linearBtnText}>确认提交</Text></LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.submit.bind(this)} style={[css.linearBtn,{marginTop:58,marginLeft:15,width:width-30,position:'absolute',bottom:30,display:this.state.picKey!=''&&this.state.ifClick==true?'flex':'none'}]}>
                    <LinearGradient colors={['#4767FF', '#B657FF']} style={[common.linearBtn,{display:this.state.picKey!=''&&this.state.ifClick==true?'flex':'none'}]} start={{x: 0, y: 0}} end={{x: 1, y: 1}}><Text style={common.linearBtnText}>确认提交</Text></LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }
}
export default forgetpwd;