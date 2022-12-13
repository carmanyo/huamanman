/**
 * @format
 */
import React,{Component} from 'react';
// import  { Component } from 'react';
import 'rn-overlay';
import 'react-native-gesture-handler'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Launch from './pages/home/launch';

import home from './pages/home/index';
import category from './pages/category/index'
import orderIndex from './pages/order/index'
import asset from './pages/asset/asset';
// import pool from './pages/pool/pool';
import mine from './pages/mine/mine';
import login from './pages/auth/login';




                    // 首页
// 选择兑换类型
// import chooseexchange from './pages/home/chooseexchange'
// 云矿场
// import cloud from './pages/home/cloud'
// 兑换
// import exchange from './pages/home/exchange'
// 兑换记录
import exchangerecord from './pages/home/exchangerecord'
// 新闻快讯详情
import infodetails from './pages/home/infodetails'
// 新闻快讯
import infolist from './pages/home/infolist'
// 邀请好友
import invite from './pages/home/invite'
// 抽奖
// import lucky from './pages/home/lucky'
// 我的萤粉
// import myfan from './pages/home/myfan'
// 白皮书
// import whitepaper from './pages/home/whitepaper'
// 店铺
import shop from './pages/home/shop'
// 扫码
import scan from './pages/home/scan'

                    // 分类
// 搜索
import search from './pages/category/search'

                    // 订单
// 订单 待支付
import orderWaitPay from './pages/order/orderWaitPay'
// 订单 待发货
import orderDeliver from './pages/order/orderDeliver'
// 订单 待收货
import orderTake from './pages/order/orderTake'
// 订单 已完成
import orderFinished from './pages/order/orderFinished'
// 订单 确认
import orderConfirm from './pages/order/orderConfirm'
// 优惠券
import discounts from './pages/order/discounts'

                    // 商城
// 首页
import mall from './pages/mall/mall'
// 地址列表
import address from './pages/mall/address'
// 添加地址
import addressadd from './pages/mall/addressadd'
// 修改地址
import addressedit from './pages/mall/addressedit'
// 确认订单
// import confirmorder from './pages/mall/confirmorder'
// 商品详情
import goodsdetails from './pages/mall/goodsdetails'    



                    // 资产
// 提现FEF
// import cashfef from './pages/asset/cashfef'
// 提现记录
import cashrecord from './pages/asset/cashrecord'
// 提现USDT
// import cashusdt from './pages/asset/cashusdt'
// 选择提现币种
// import choosecash from './pages/asset/choosecash'
// 冻结明细
// import freezedetail from './pages/asset/freezedetail'
// 充值
import recharge from './pages/asset/recharge'
// 充值记录
import rechargerecord from './pages/asset/rechargerecord'
// 上传凭证
import uploadpayment from './pages/asset/uploadpayment'
// 兑换记录
import exchangeRecord from './pages/asset/exchangeRecord'
// 积分
import integral from './pages/asset/integral'
// 余额
import balance from './pages/asset/balance'
// 提现
import cash from './pages/asset/cash'
// 兑换
import exchange from './pages/asset/exchange'
// 资金明细
import detail from './pages/asset/detail'
// 积分明细
import integralDetail from './pages/asset/integralDetail'
// 积分兑换余额
import exchangeBalance from './pages/asset/exchangeBalance'
// 积分兑换余额记录
import exchangeBalanceRecord from './pages/asset/exchangeBalanceRecord'



                    // 我的
// 设置
import setting from './pages/mine/setting'
import service from './pages/mine/service'
// 广告记录
// import advertisingrecord from './pages/mine/advertisingrecord'
// 联系客服
// import contact from './pages/mine/contact'
// 消费明细
// import expensedetail from './pages/mine/expensedetail'
// 收益明细
// import gainrecord from './pages/mine/gainrecord'
// 用户指南
// import guide from './pages/mine/guide'
// 锁仓记录
// import lockprofit from './pages/mine/lockprofit'
// 我的矿池
// import mypool from './pages/mine/mypool'
// 系统公告
import news from './pages/mine/news'
// 公告详情
import newsdetail from './pages/mine/newsdetail'
// 全部订单
import order from './pages/mine/order'
// 支付页面
// import ordertopay from './pages/mine/ordertopay'
// 实名认证
// import realname from './pages/mine/realname'
// 设置登录密码
import setloginpwd from './pages/mine/setloginpwd'
// 设置支付密码
import setpaypwd from './pages/mine/setpaypwd'
// FT释放记录
// import ftRelease from './pages/mine/ftRelease'
// 银行卡
import card from './pages/mine/card'
// 银行卡 添加
import cardAdd from './pages/mine/cardAdd'
// 我的推广
import team from './pages/mine/team'
// 我的代理商
import myAgent from './pages/mine/myAgent'
// 数据统计
import dataAll from './pages/mine/dataAll'
// 销毁
import destroy from './pages/mine/destroy'
// 积分规则
import rule from './pages/mine/rule'
// 相关协议
import agreement from './pages/mine/agreement'
// 排行榜
import rank from './pages/mine/rank'



                    // 授权
// 注册
import register from './pages/auth/register'
// 忘记密码
import forgetpwd from './pages/auth/forgetpwd'




import {createStackNavigator} from "@react-navigation/stack"; 

// import { NavigationContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';

// console.log('!!!!!!!!!!!!!!!!!!!')
// console.log(appName)

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
class Power extends Component{

    render()
    {
        const Stack=new createStackNavigator()
        return(
            <NavigationContainer>
                <Stack.Navigator
                    // 原版 home
                    initialRouteName='home' 
                    // initialRouteName='exchangeBalance' 
                    // initialRouteName='cash' 
                    // initialRouteName='card' 
                    // initialRouteName='login' 
                    // initialRouteName='mine' 
                >
                    {/* <Stack.Screen name='launch' component={Launch} options={{headerShown:false}} /> */}
                    {/* <Stack.Screen name='App' component={App} options={{headerShown:false}} /> */}
                    <Stack.Screen name='home' component={home} options={{headerShown:false}} />
                    <Stack.Screen name='category' component={category} options={{headerShown:false}} />
                    <Stack.Screen name='orderIndex' component={orderIndex} options={{headerShown:false}} />
                    <Stack.Screen name='asset' component={asset} options={{headerShown:false}} />
                    {/* <Stack.Screen name='pool' component={pool} options={{headerShown:false}} /> */}
                    <Stack.Screen name='mine' component={mine} options={{headerShown:false}} />
                    <Stack.Screen name='login' component={login} options={{headerShown:false}} />

                    <Stack.Screen name='search' component={search} options={{headerShown:false}} />
                    <Stack.Screen name='orderWaitPay' component={orderWaitPay} options={{headerShown:false}} />
                    <Stack.Screen name='orderDeliver' component={orderDeliver} options={{headerShown:false}} />
                    <Stack.Screen name='orderTake' component={orderTake} options={{headerShown:false}} />
                    <Stack.Screen name='orderFinished' component={orderFinished} options={{headerShown:false}} />
                    <Stack.Screen name='orderConfirm' component={orderConfirm} options={{headerShown:false}} />
                    <Stack.Screen name='card' component={card} options={{headerShown:false}} />
                    <Stack.Screen name='cardAdd' component={cardAdd} options={{headerShown:false}} />
                    <Stack.Screen name='exchangeRecord' component={exchangeRecord} options={{headerShown:false}} />
                    <Stack.Screen name='integral' component={integral} options={{headerShown:false}} />
                    <Stack.Screen name='balance' component={balance} options={{headerShown:false}} />
                    <Stack.Screen name='cash' component={cash} options={{headerShown:false}} />
                    <Stack.Screen name='detail' component={detail} options={{headerShown:false}} />
                    <Stack.Screen name='team' component={team} options={{headerShown:false}} />
                    <Stack.Screen name='myAgent' component={myAgent} options={{headerShown:false}} />
                    <Stack.Screen name='discounts' component={discounts} options={{headerShown:false}} />
                    <Stack.Screen name='integralDetail' component={integralDetail} options={{headerShown:false}} />
                    <Stack.Screen name='exchangeBalance' component={exchangeBalance} options={{headerShown:false}} />
                    <Stack.Screen name='exchangeBalanceRecord' component={exchangeBalanceRecord} options={{headerShown:false}} />
                    <Stack.Screen name='dataAll' component={dataAll} options={{headerShown:false}} />
                    <Stack.Screen name='destroy' component={destroy} options={{headerShown:false}} />
                    <Stack.Screen name='shop' component={shop} options={{headerShown:false}} />
                    <Stack.Screen name='scan' component={scan} options={{headerShown:false}} />
                    <Stack.Screen name='rule' component={rule} options={{headerShown:false}} />
                    <Stack.Screen name='agreement' component={agreement} options={{headerShown:false}} />
                    <Stack.Screen name='rank' component={rank} options={{headerShown:false}} />



                    {/* <Stack.Screen name='exchange' component={exchange} options={{headerShown:false}} /> */}
                    
                    {/* <Stack.Screen name='chooseexchange' component={chooseexchange} options={{headerShown:false}} /> */}
                    {/* <Stack.Screen name='cloud' component={cloud} options={{headerShown:false}} /> */}
                    <Stack.Screen name='exchange' component={exchange} options={{headerShown:false}} />
                    <Stack.Screen name='exchangerecord' component={exchangerecord} options={{headerShown:false}} />
                    <Stack.Screen name='infodetails' component={infodetails} options={{headerShown:false}} />
                    <Stack.Screen name='infolist' component={infolist} options={{headerShown:false}} />
                    <Stack.Screen name='invite' component={invite} options={{headerShown:false}} />
                    {/* <Stack.Screen name='lucky' component={lucky} options={{headerShown:false}} /> */}
                    {/* <Stack.Screen name='myfan' component={myfan} options={{headerShown:false}} /> */}
                    {/* <Stack.Screen name='whitepaper' component={whitepaper} options={{headerShown:false}} /> */}
                    <Stack.Screen name='mall' component={mall} options={{headerShown:false}} />
                    <Stack.Screen name='address' component={address} options={{headerShown:false}} />
                    <Stack.Screen name='addressadd' component={addressadd} options={{headerShown:false}} />
                    <Stack.Screen name='addressedit' component={addressedit} options={{headerShown:false}} />
                    {/* <Stack.Screen name='confirmorder' component={confirmorder} options={{headerShown:false}} /> */}
                    <Stack.Screen name='goodsdetails' component={goodsdetails} options={{headerShown:false}} />
                    {/* <Stack.Screen name='cashfef' component={cashfef} options={{headerShown:false}} /> */}
                    <Stack.Screen name='cashrecord' component={cashrecord} options={{headerShown:false}} />
                    {/* <Stack.Screen name='cashusdt' component={cashusdt} options={{headerShown:false}} /> */}
                    {/* <Stack.Screen name='choosecash' component={choosecash} options={{headerShown:false}} /> */}
                    {/* <Stack.Screen name='freezedetail' component={freezedetail} options={{headerShown:false}} /> */}
                    <Stack.Screen name='recharge' component={recharge} options={{headerShown:false}} />
                    <Stack.Screen name='rechargerecord' component={rechargerecord} options={{headerShown:false}} />
                    <Stack.Screen name='uploadpayment' component={uploadpayment} options={{headerShown:false}} />
                    <Stack.Screen name='setting' component={setting} options={{headerShown:false}} />
                    <Stack.Screen name='service' component={service} options={{headerShown:false}} />
                    {/* <Stack.Screen name='advertisingrecord' component={advertisingrecord} options={{headerShown:false}} /> */}
                    {/* <Stack.Screen name='contact' component={contact} options={{headerShown:false}} /> */}
                    {/* <Stack.Screen name='expensedetail' component={expensedetail} options={{headerShown:false}} /> */}
                    {/* <Stack.Screen name='gainrecord' component={gainrecord} options={{headerShown:false}} /> */}
                    {/* <Stack.Screen name='guide' component={guide} options={{headerShown:false}} /> */}
                    {/* <Stack.Screen name='lockprofit' component={lockprofit} options={{headerShown:false}} /> */}
                    {/* <Stack.Screen name='mypool' component={mypool} options={{headerShown:false}} /> */}
                    <Stack.Screen name='news' component={news} options={{headerShown:false}} />
                    <Stack.Screen name='newsdetail' component={newsdetail} options={{headerShown:false}} />
                    <Stack.Screen name='order' component={order} options={{headerShown:false}} />
                    {/* <Stack.Screen name='ordertopay' component={ordertopay} options={{headerShown:false}} /> */}
                    {/* <Stack.Screen name='realname' component={realname} options={{headerShown:false}} /> */}
                    <Stack.Screen name='setloginpwd' component={setloginpwd} options={{headerShown:false}} />
                    <Stack.Screen name='setpaypwd' component={setpaypwd} options={{headerShown:false}} />
                    {/* <Stack.Screen name='ftRelease' component={ftRelease} options={{headerShown:false}} /> */}
                    <Stack.Screen name='register' component={register} options={{headerShown:false}} />
                    <Stack.Screen name='forgetpwd' component={forgetpwd} options={{headerShown:false}} />

                </Stack.Navigator>
            </NavigationContainer>                                                               
        )
    }

}
console.disableYellowBox = true;//关闭真机上的黄色警告
AppRegistry.registerComponent(appName, () => Power);
