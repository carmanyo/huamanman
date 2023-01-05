
export const BASEURL = 'https://hmmshop888.com/index.php?s='
// export const BASEURL = 'http://test.btxun.cn/index.php?s=' 

var reqUrl = {
    login: '/api/login/login',
    getPhoneCode: '/api/verify_code/getCode',
    getToken: '/api/common/get_token',
    register: '/api/register/register',
    forget: '/api/login/forget',
    logout: '/api/login/logout',
    getVersions: '/api/app/getVersion',
    banner: '/api/banner/lists',
    poolTotal: '/api/index/pool_total',
    news: '/api/notice/lists',
    videoNum: '/api/index/video_num',
    yunDetail: '/api/index/yun_detail',
    assetIndex: '/api/asset/index',
    getConfig: '/api/config/setting',
    cash: '/api/wallet.cash/cash',
    fefCash: '/api/cash/fef_cash',
    cashRecord: '/api/wallet.cash/lists',
    getExchangeConfig: '/api/exchange/get_exchange_config',
    exchangesubmitAjax: '/api/exchange/submit_ajax',
    exchangeRecord: '/api/exchange/exchange_record',
    getRechargeConfig: '/api/recharge/get_recharge_config',
    resubmitAjax: '/api/recharge/submit_ajax',
    rechargeRecord: '/api/recharge/recharge_record',
    lockIndex: '/api/lock/index',
    curve: '/api/lock/curve',
    price: '/api/lock/price',
    lock: '/api/lock/lock',
    purchase: '/api/lock/purchase',
    cancel: '/api/lock/cancel',
    lockLog: '/api/lock/lock_log',
    lockProfit: '/api/lock/lock_profit',
    chartsData: '/api/lock/curve',
    userIndex: '/api/user/index',
    setEdit: '/api/setup/set_edit',
    userProfit: '/api/user/profit',
    noticeIndex: '/api/notice/index',
    noticepopup: '/api/notice/popup',
    consume: '/api/user/consume',
    userAdvert: '/api/user/advert',
    realname: '/api/user/realname',
    addressIndex: '/api/address/lists',
    addressEdit: '/api/address/edit',
    addressAdd: '/api/address/add',
    addressDel: '/api/address/delete',
    addressDefault: '/api/address/setDefault',
    goodsIndex: '/api/goods/index',
    goodsdetail: '/api/goods/detail',
    submitAjax: '/api/goods/submit_ajax',
    myOrder: '/api/order/my_order',
    orderDetail: '/api/order/order_detail',
    takeDelivery: '/api/order/take_delivery',
    myTeam: '/api/user/my_team',
    invite: '/api/user/invite',
    ftRelease: '/api/asset/ft_release',
    contract: '/api/user/contract',
    completeAdv: '/api/index/submit',


    indexNav: '/api/index/nav',
    goodsList: '/api/goods/lists',
    category: '/api/category/index',
    userDetail: '/api/user/detail',
    noticeDetail: '/api/notice/detail',
    teamLists: '/api/user.team/lists',
    logIndex: '/api/profit.log/index',
    buyNowGet: '/api/order/buyNow',
    orderLists: '/api/user.order/lists',
    orderCancel: '/api/user.order/cancel',
    userOrderDetail: '/api/user.order/detail',
    setDefault: '/api/address/setDefault',
    logout: '/api/login/logout',
    setPayment: '/api/user.setting/payment',
    setPassword: '/api/user.setting/password',

    cardIndex: '/api/user.bank_card/index',
    cardAdd: '/api/user.bank_card/add',
    cardDelete: '/api/user.bank_card/delete',

    walletCash: '/api/wallet.cash/cash',
    cashLists: '/api/wallet.cash/lists',
    walletExchange: '/api/wallet.exchange/exchange',
    exchangeLists: '/api/wallet.exchange/lists',
    cashSetting: '/api/wallet.cash/setting',
    exchangeSetting: '/api/wallet.exchange/setting',
    invitePoster: '/api/user.invite/poster',
    userAgent: '/api/user/agent',
    merchantLists: '/api/merchant/lists',
    statisticsLists: '/api/statistics/lists',
    merchantDetail: '/api/merchant/detail',
    indexGetPrice: '/api/index/getPrice',
    scanCode: '/api/merchant/scan_code_verify',
    ruleIndex: '/api/config/rule',
    orderReceipt: '/api/user.order/receipt',
    buyRule: '/api/config/buy_rule',
    inviteRule: '/api/config/invite_rule',

    productPay: '/api/user.order/pay',
    pond: '/api/config/pond',
    orderOfflineCancel: '/api/user.order/order_offline_cancel',
    statisticsData: '/api/statistics/data',

    merchantCategoryIndex: '/api/merchant.category/index',
    merchantListss: '/api/merchant/lists',
    merchantIndex: '/api/merchant/index',
    walletExchangeIntegral: '/api/wallet.exchange/integral',
    walletExchangeBalance: '/api/wallet.exchange/balance',
    tbList: '/api/dataoke.category/tb_list',
    dataokeGoodsIndex: '/api/dataoke.goods/index',
    dataokeGoodsDetail: '/api/dataoke.goods/detail',

}




var skRSAPublicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDQHlZQtO6UitW930yb42F72xG+24VRsMxGHSTJlsjIoPkVDHrqv+KkNNKQ2YdFG6pkRh/qZTsVWz7KrPTZ48arBGwSEZm0n0286sTZiyC9xHsq7xQ60OXzW+FIHfacUNOlYoWXyUa8uiHScBpeEGZ+xDKK+2B51b57Us1ZaQLXHwIDAQAB'
import {
    // AsyncStorage, 
    Overlay
} from 'react-native';

import JSEncrypt from 'encryptlong';
import buffer, { Buffer } from 'buffer';
import StorageUtil from './StorageUtil.js';
const Toast = Overlay.Toast;
import AsyncStorage from '@react-native-async-storage/async-storage'

export function NetWork_Post(net_api, bodyData, callback) {
    AsyncStorage.getItem('token').then((result) => {
        // Alert.alert(result); // bob
        // console.log('result----------')
        // console.log(result)
        bodyData['token'] = result == null ? '' : result;
        // console.log(result)
        const url = BASEURL + reqUrl[net_api]
        console.log(url)
        console.log(bodyData)
        // console.log(typeof (bodyData))
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json', 'Content-Type': 'application/json',
            },
            // body: JSON.stringify(JSON.stringify(bodyData)),

            body: JSON.stringify(bodyData),
        }).then((response) => response.json())
            .then((responseData) => {
                //成功回调的数据
                // console.log(url)
                console.log(responseData);
                callback(responseData);
            })
            .catch((responseData) => {
                // console.log(responseData);
                callback(responseData);
            }).done()
        // if (result) {
        //     bodyData['token'] = result;
        //     console.log(result)
        //     const url = BASEURL + reqUrl[net_api]
        //     console.log(url)
        //     console.log(bodyData)
        //     // console.log(typeof (bodyData))
        //     fetch(url, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //             'Accept': 'application/json', 'Content-Type': 'application/json',
        //         },
        //         // body: JSON.stringify(JSON.stringify(bodyData)),

        //         body: JSON.stringify(bodyData),
        //     }).then((response) => response.json())
        //         .then((responseData) => {
        //             //成功回调的数据
        //             console.log(url)
        //             // console.log(responseData);
        //             callback(responseData);
        //         })
        //         .catch((responseData) => {
        //             // console.log(responseData);
        //             callback(responseData);
        //         }).done()
        // }
    })

    // try {
    //     const token = AsyncStorage.getItem('token')
    //     console.log('token-------------66')
    //     console.log(token)
    //     // if(typeof(token) == 'object'){
    //     //     bodyData['token'] = '';
    //     // //   console.log(result)
    //     //   const url = BASEURL + reqUrl[net_api]
    //     //   console.log(url)
    //     //   console.log(bodyData)
    //     //   // console.log(typeof (bodyData))
    //     //   fetch(url, {
    //     //       method: 'POST',
    //     //       headers: {
    //     //           'Content-Type': 'multipart/form-data',
    //     //           'Accept': 'application/json', 'Content-Type': 'application/json',
    //     //       },
    //     //       // body: JSON.stringify(JSON.stringify(bodyData)),

    //     //       body: JSON.stringify(bodyData),
    //     //   }).then((response) => response.json())
    //     //       .then((responseData) => {
    //     //           //成功回调的数据
    //     //           console.log(url)
    //     //           // console.log(responseData);
    //     //           callback(responseData);
    //     //       })
    //     //       .catch((responseData) => {
    //     //           // console.log(responseData);
    //     //           callback(responseData);
    //     //       }).done()
    //     //     return;
    //     // }
    //     var result =  token != null ? token : null;
    //     console.log('result---------9')
    //     console.log(result)
    //   if (result !== null && result !='') {
    //         console.log('result---------111')
    //       bodyData['token'] = result;
    //       console.log(result)
    //       const url = BASEURL + reqUrl[net_api]
    //       console.log(url)
    //       console.log(bodyData)
    //       // console.log(typeof (bodyData))
    //       fetch(url, {
    //           method: 'POST',
    //           headers: {
    //               'Content-Type': 'multipart/form-data',
    //               'Accept': 'application/json', 'Content-Type': 'application/json',
    //           },
    //           // body: JSON.stringify(JSON.stringify(bodyData)),

    //           body: JSON.stringify(bodyData),
    //       }).then((response) => response.json())
    //           .then((responseData) => {
    //               //成功回调的数据
    //               console.log(url)
    //               // console.log(responseData);
    //               callback(responseData);
    //           })
    //           .catch((responseData) => {
    //               // console.log(responseData);
    //               callback(responseData);
    //           }).done()
    //   }
    //   } catch(e) {
    //       console.log('错误--------')
    //       console.log(e)

    //       bodyData['token'] = '';
    //       console.log(result)
    //       const url = BASEURL + reqUrl[net_api]
    //       console.log(url)
    //       console.log(bodyData)
    //       // console.log(typeof (bodyData))
    //       fetch(url, {
    //           method: 'POST',
    //           headers: {
    //               'Content-Type': 'multipart/form-data',
    //               'Accept': 'application/json', 'Content-Type': 'application/json',
    //           },
    //           // body: JSON.stringify(JSON.stringify(bodyData)),

    //           body: JSON.stringify(bodyData),
    //       }).then((response) => response.json())
    //           .then((responseData) => {
    //               //成功回调的数据
    //               console.log(url)
    //               // console.log(responseData);
    //               callback(responseData);
    //           })
    //           .catch((responseData) => {
    //               // console.log(responseData);
    //               callback(responseData);
    //           }).done()
    //     // error reading value
    //   }
    // try {
    //     const result = AsyncStorage.getItem('token')
    //     console.log('token-----------2')
    //     console.log(result)
    //     if (result !== null) {
    //         // value previously stored
    //         bodyData['token'] = result;
    //         console.log(result)
    //         const url = BASEURL + reqUrl[net_api]
    //         console.log(url)
    //         console.log(bodyData)
    //         // console.log(typeof (bodyData))
    //         fetch(url, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //                 'Accept': 'application/json', 'Content-Type': 'application/json',
    //             },
    //             // body: JSON.stringify(JSON.stringify(bodyData)),

    //             body: JSON.stringify(bodyData),
    //         }).then((response) => response.json())
    //             .then((responseData) => {
    //                 //成功回调的数据
    //                 console.log(url)
    //                 // console.log(responseData);
    //                 callback(responseData);
    //             })
    //             .catch((responseData) => {
    //                 // console.log(responseData);
    //                 callback(responseData);
    //             }).done()
    //     }
    // } catch (e) {
    //     // error reading value
    // }
    // AsyncStorage.getItem('token', function (error, result) {
    //     if (error) {
    //         console.log('error---------------')
    //     } else {
    //         bodyData['token'] = result;
    //         console.log(result)
    //         const url = BASEURL + reqUrl[net_api]
    //         console.log(url)
    //         console.log(bodyData)
    //         // console.log(typeof (bodyData))
    //         fetch(url, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //                 'Accept': 'application/json', 'Content-Type': 'application/json',
    //             },
    //             // body: JSON.stringify(JSON.stringify(bodyData)),

    //             body: JSON.stringify(bodyData),
    //         }).then((response) => response.json())
    //             .then((responseData) => {
    //                 //成功回调的数据
    //                 console.log(url)
    //                 // console.log(responseData);
    //                 callback(responseData);
    //             })
    //             .catch((responseData) => {
    //                 // console.log(responseData);
    //                 callback(responseData);
    //             }).done()
    //     }
    // })


}

export function NetWork_Post_NoToken(net_api, bodyData, callback) {
    // let encryptor = new JSEncrypt();
    // encryptor.setPublicKey(skRSAPublicKey);
    // var str = encryptor.encryptLong(JSON.stringify(bodyData));
    // var upDatas = new Buffer(str).toString('base64');
    const url = BASEURL + reqUrl[net_api]
    // bodyData['token'] = 'af272f3031a8f0b4c4c2c05fc23d0dc9';
    console.log(url)
    console.log(bodyData)
    // console.log(typeof (bodyData))
    // console.log('notoken----' + JSON.stringify(bodyData))
    // console.log(upDatas)
    fetch(url, {
        method: 'POST',
        headers: {
            // 'Accept':'application/json',
            // 'Content-Type':'application/x-www-form-urlencoded',
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json', 'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
    }).then((response) => response.json())
        .then((responseData) => {
            //成功回调的数据
            // console.log(responseData);
            callback(responseData);
        })
        .catch((responseData) => {
            // console.log(responseData);
            callback(responseData);
        }).done()
}


export function NetWork_Get(net_api, bodyData, callback) {
    AsyncStorage.getItem('token', function (error, result) {
        if (error) {
            console.log('error---------------')
        } else {
            // bodyData['token'] = result;
            console.log(bodyData)
            var str = '&goods_id=' + bodyData.goods_id;
            str += '&goods_num=' + bodyData.goods_num;
            str += '&goods_sku_id=' + bodyData.goods_sku_id;
            str += '&address_id=' + bodyData.address_id;
            str += '&pay_type=' + bodyData.pay_type;
            str += '&token=' + result;
            const url = BASEURL + reqUrl[net_api] + str
            console.log(url)
            // console.log(bodyData)
            // console.log(typeof (bodyData))

            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json', 'Content-Type': 'application/json',
                },
                // body: JSON.stringify(JSON.stringify(bodyData)),

                // body: JSON.stringify(bodyData),
            }).then((response) => response.json())
                .then((responseData) => {
                    //成功回调的数据
                    // console.log(responseData);
                    callback(responseData);
                })
                .catch((responseData) => {
                    // console.log(responseData);
                    callback(responseData);
                }).done()
        }
    })


}