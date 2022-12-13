import React, { Component } from 'react';
 
import { createAppContainer } from 'react-navigation';
//创建导航路由
import { createStackNavigator } from 'react-navigation-stack'
//导入底部通栏
// import BottomNavigator from '../root/rootPage'
//导入各个页面
import HomePage from './homeScene'
 
 
 
 
//设置底部导航栏的路由导航
const AppStack = createStackNavigator(
    {
        //跳转底部导航页面
        // BottomNavigator: {
        //     screen: BottomNavigator,
        //     navigationOptions: {
        //         headerShown: false,
        //     }
        // },
        HomePage: { screen: HomePage },
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);
 
 
export default createAppContainer(AppStack);