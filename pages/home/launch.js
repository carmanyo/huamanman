import React,{Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native'
import App from '../../App';
import ToastExample from './ToastExample';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
// import SplashScreen from 'react-native-splash-screen';
class Launch extends Component{
    constructor(props){
        super(props);
        this.state={
            data: [],
            imgArr:[],


            banner:[],
            newsList:[],
            total:0,
        }

    }
    componentDidMount()
    {   
        
        let that=this;
        let {navigation} = this.props;
        // SplashScreen.hide();
        // ToastExample.showsp();
        // navigation.navigate('home', { name: 'home' });
        // navigation.navigate('home', { name: 'home' });
        // setTimeout(()=>{
        //     // SplashScreen.hide();
        //     ToastExample.showsp();
        //     navigation.navigate('home', { name: 'home' });
        // },100)
        // ToastExample.showsp();
        // console.log('ToastExample-------------------')
        // console.log(ToastExample)
        
        // // navigation.navigate('home', { name: 'home' });
        // setTimeout(() => {
        //     SplashScreen.hide();
        //     // navigation.navigate('home', { name: 'home' });
        // },1000);
        // setTimeout(()=>{
        //     navigation.navigate('home', { name: 'home' });
        // },2000)
        // ToastExample.showsp();
    }
    
    render()
    {
        return(

            <View style={{width:width,height:height,display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:"#fff"}}>
                {/* <Image style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height}} source={require('../../images/qi.png')} /> */}

                <Image style={ styles.loadingImage } source={require('../../img/lo.gif')} style={{width: 100, height: 100}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({


})

export default Launch
