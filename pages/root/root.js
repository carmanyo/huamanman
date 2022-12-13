import React from 'react';
import {createBottomTabNavigator } from 'react-navigation-tabs';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Icon,
  } from 'react-native';

  
import homePage  from '../home/index';
import assetPage  from '../asset/asset';
// import poolPage  from '../pool/pool';
import minePage  from '../mine/mine';

const BottomTabNavigator = createBottomTabNavigator({
    Home:{
        screen:homePage,
        navigationOptions:{
            title:'首页',
            tabBarLable:'首页',
            tabBarIcon: ({ focused }) => {
                const source = focused ? require('../../img/index-s.png') : require('../../img/index.png');
                return <View>
                    {
                        <Image style={styles.tabBarIcon} source={source} />
                    }
                </View>
            },
        }
    },
    Asset:{
        screen:assetPage,
        navigationOptions:{
            title:'资产',
            tabBarLable:'资产',
            tabBarIcon: ({ focused }) => {
                const source = focused ? require('../../img/asset-s.png') : require('../../img/asset.png');
                let msg = 3
                let icon = !!focused
                return <View>
                    {
                        <Image style={styles.tabBarIcon} source={source} />
                    }
                </View>
            },
        }
    },
    // Pool:{
    //     screen:poolPage,
    //     navigationOptions:{
    //         title:'矿池',
    //         tabBarLable:'矿池',
    //         tabBarIcon: ({ focused }) => {
    //             const source = focused ? require('../../img/pool-s.png') : require('../../img/pool.png');
    //             return (<Image style={styles.tabBarIcon} source={source} />);
    //         },
    //     }
    // },
    Mine:{
        screen:minePage,
        navigationOptions:{
            title:'我的',
            tabBarLable:'我的',
            tabBarIcon: ({ focused }) => {
                const source = focused ? require('../../img/mine-s.png') : require('../../img/mine.png');
                return (<Image style={styles.tabBarIcon} source={source} />);
            },
        }
    }
},
{
    tabBarOptions: {
        //当前选中的tab bar的文本颜色和图标颜色
        activeTintColor: '#7B70FB',
        //当前未选中的tab bar的文本颜色和图标颜色
        inactiveTintColor: '#CFCEDB',
        //是否显示tab bar的图标，默认是false
        showIcon: true,
        //showLabel - 是否显示tab bar的文本，默认是true
        showLabel: true,
        //是否将文本转换为大小，默认是true
        upperCaseLabel: false,
        //material design中的波纹颜色(仅支持Android >= 5.0)
        pressColor: '#CFCEDB',
        //按下tab bar时的不透明度(仅支持iOS和Android < 5.0).
        pressOpacity: 0.8,
        //tab bar的样式
        style: {
            backgroundColor: '#fff',
            paddingBottom: 1,
            borderTopWidth: 0.2,
            paddingTop:1,
            borderTopColor: '#ccc',
        },
        //tab bar的文本样式
        labelStyle: {
            fontSize: 11,
            margin: 1
        },
        //tab 页指示符的样式 (tab页下面的一条线).
        indicatorStyle: {height: 0},
    },
    //tab bar的位置, 可选值： 'top' or 'bottom'
    tabBarPosition: 'bottom',
    //是否允许滑动切换tab页
    swipeEnabled: true,
    //是否在切换tab页时使用动画
    animationEnabled: false,
    //是否懒加载
    lazy: true,
    //返回按钮是否会导致tab切换到初始tab页？ 如果是，则设置为initialRoute，否则为none。 缺省为initialRoute。
    backBehavior: 'none',
    }
)

const styles = StyleSheet.create({
    tabBarIcon: {
        width: 24,
        height: 24
    }
})


export default BottomTabNavigator;