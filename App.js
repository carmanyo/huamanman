import React,{Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import BottomNavigator from './pages/root/root'

                    // 测试
// import TestingPage from './pages/testing'                

                    // 首页
// import appPage from './App';
// 启动页             
import LaunchPage from './pages/home/launch';
// 首页
import homePage from './pages/home/index'
// 选择兑换类型
// import chooseexchangePage from './pages/home/chooseexchange'
// 云矿场
// import cloudPage from './pages/home/cloud'
// 兑换
import exchangePage from './pages/home/exchange'
// 兑换记录
import exchangerecordPage from './pages/home/exchangerecord'
// 新闻快讯详情
import infodetailsPage from './pages/home/infodetails'
// 新闻快讯
import infolistPage from './pages/home/infolist'
// 邀请好友
import invitePage from './pages/home/invite'
// 抽奖
// import luckyPage from './pages/home/lucky'
// 我的萤粉
// import myfanPage from './pages/home/myfan'
// 白皮书
// import whitepaperPage from './pages/home/whitepaper'



                    // 分类
// 首页
import categoryIndexPage from './pages/category/index'

                    // 订单
// 首页
import orderIndexPage from './pages/order/index'


                    // 商城
// 首页
import mallPage from './pages/mall/mall'
// 地址列表
import addressPage from './pages/mall/address'
// 添加地址
import addressaddPage from './pages/mall/addressadd'
// 修改地址
import addresseditPage from './pages/mall/addressedit'
// 确认订单
// import confirmorderPage from './pages/mall/confirmorder'
// 商品详情
import goodsdetailsPage from './pages/mall/goodsdetails'    



                    // 资产
// 首页
import assetPage from './pages/asset/asset'
// 提现FEF
// import cashfefPage from './pages/asset/cashfef'
// 提现记录
import cashrecordPage from './pages/asset/cashrecord'
// 提现USDT
// import cashusdtPage from './pages/asset/cashusdt'
// 选择提现币种
// import choosecashPage from './pages/asset/choosecash'
// 冻结明细
// import freezedetailPage from './pages/asset/freezedetail'
// 充值
import rechargePage from './pages/asset/recharge'
// 充值记录
import rechargerecordPage from './pages/asset/rechargerecord'
// 上传凭证
import uploadpaymentPage from './pages/asset/uploadpayment'



                    // 我的
// 设置
import settingPage from './pages/mine/setting'
// 广告记录
// import AdvertisingRecordPage from './pages/mine/advertisingrecord'
// 联系客服
import contactPage from './pages/mine/contact'
// 消费明细
// import expensedetailPage from './pages/mine/expensedetail'
// 收益明细
// import gainrecordPage from './pages/mine/gainrecord'
// 用户指南
// import guidePage from './pages/mine/guide'
// 锁仓记录
// import lockprofitPage from './pages/mine/lockprofit'
// 我的矿池
// import mypoolPage from './pages/mine/mypool'
// 系统公告
import newsPage from './pages/mine/news'
// 公告详情
import newsdetailPage from './pages/mine/newsdetail'
// 全部订单
import orderPage from './pages/mine/order'
// 支付页面
// import ordertopayPage from './pages/mine/ordertopay'
// 实名认证
// import realnamePage from './pages/mine/realname'
// 设置登录密码
import setloginpwdPage from './pages/mine/setloginpwd'
// 设置支付密码
import setpaypwdPage from './pages/mine/setpaypwd'
// FT释放记录
// import ftReleasePage from './pages/mine/ftRelease'



                    // 授权
// 登录
import loginPage from './pages/auth/login'
// 注册
import registerPage from './pages/auth/register'
// 忘记密码
import forgetpwdPage from './pages/auth/forgetpwd'






const App = createStackNavigator(
  {
    BottomNavigator:{
      screen:BottomNavigator,
      navigationOptions:{
        headerShown:true
      }
    },

    // 测试
    // Testing:{screen:TestingPage},

                        // 首页
                        
    // 启动页
    // app:{screen:appPage},
    // 启动页
    launch:{screen:LaunchPage},
    // 首页
    home:{screen:homePage},
    // 选择兑换类型
    // chooseexchange:{screen:chooseexchangePage},
    // 云矿场
    // cloud:{screen:cloudPage},
    // 兑换
    exchange:{screen:exchangePage},
    // 兑换记录
    exchangerecord:{screen:exchangerecordPage},
    // 新闻快讯详情
    infodetails:{screen:infodetailsPage},
    // 新闻快讯
    infolist:{screen:infolistPage},
    // 邀请好友
    invite:{screen:invitePage},
    // 抽奖
    // lucky:{screen:luckyPage},
    // 我的萤粉
    // myfan:{screen:myfanPage},
    // 白皮书
    // whitepaper:{screen:whitepaperPage},

    
                        // 分类
    // 首页
    category:{screen:categoryIndexPage},

    
                        // 订单
    // 首页
    orderIndex:{screen:orderIndexPage},


                        // 商城
    // 首页
    mall:{screen:mallPage},
    // 地址列表
    address:{screen:addressPage},
    // 添加地址
    addressadd:{screen:addressaddPage},
    // 修改地址
    addressedit:{screen:addresseditPage},
    // 确认订单
    // confirmorder:{screen:confirmorderPage},
    // 商品详情
    goodsdetails:{screen:goodsdetailsPage},   



                        // 资产
    // 首页
    asset:{screen:assetPage},
    // 提现FEF
    // cashfef:{screen:cashfefPage},
    // 提现记录
    cashrecord:{screen:cashrecordPage},
    // 提现USDT
    // cashusdt:{screen:cashusdtPage},
    // 选择提现币种
    // choosecash:{screen:choosecashPage},
    // 冻结明细
    // freezedetail:{screen:freezedetailPage},
    // 充值
    recharge:{screen:rechargePage},
    // 充值记录
    rechargerecord:{screen:rechargerecordPage},
    // 上传凭证
    uploadpayment:{screen:uploadpaymentPage},



                        // 我的
    // 设置
    setting:{screen:settingPage},
    // 广告记录
    // advertisingrecord:{screen:AdvertisingRecordPage},
    // 联系客服
    contact:{screen:contactPage},
    // 消费明细
    // expensedetail:{screen:expensedetailPage},
    // 收益明细
    // gainrecord:{screen:gainrecordPage},
    // 用户指南
    // guide:{screen:guidePage},
    // 锁仓记录
    // lockprofit:{screen:lockprofitPage},
    // 我的矿池
    // mypool:{screen:mypoolPage},
    // 系统公告
    news:{screen:newsPage},
    // 公告详情
    newsdetail:{screen:newsdetailPage},
    // 全部订单
    Logorderin:{screen:orderPage},
    // 支付页面
    // ordertopay:{screen:ordertopayPage},
    // 实名认证
    // realname:{screen:realnamePage},
    // 设置登录密码
    setloginpwd:{screen:setloginpwdPage},
    // 设置支付密码
    setpaypwd:{screen:setpaypwdPage},
    // FT释放记录
    // ftRelease:{screen:ftReleasePage},



                        // 授权
    // 登录
    login:{screen:loginPage},
    // 注册
    register:{screen:registerPage},
    // 忘记密码
    forgetpwd:{screen:forgetpwdPage},

    
  },
  {
    mode:'modal',
    headerMode:'true',
  }
)
export default createAppContainer(App);