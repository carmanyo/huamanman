
import {NetWork_Post,NetWork_Post_NoToken,NetWork_Get} from './netUtils';

function getLogin(bodyData,callback){
    let netApi = 'login',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post_NoToken(netApi,bodyData,callback,reqError)
}
function getregister(bodyData,callback){
    let netApi = 'register',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getPhoneCode(bodyData,callback){
    let netApi = 'getPhoneCode',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getNoTokenPhoneCode(bodyData,callback){
    let netApi = 'getPhoneCode',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post_NoToken(netApi,bodyData,callback,reqError)
}
function getToken(bodyData,callback){
    let netApi = 'getToken',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getforget(bodyData,callback){
    let netApi = 'forget',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post_NoToken(netApi,bodyData,callback,reqError)
}
function getlogout(bodyData,callback){
    let netApi = 'logout',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getVersions(bodyData,callback){
    let netApi = 'getVersions',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getbanner(bodyData,callback){
    let netApi = 'banner',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getpoolTotal(bodyData,callback){
    let netApi = 'poolTotal',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getnews(bodyData,callback){
    let netApi = 'news',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getvideoNum(bodyData,callback){
    let netApi = 'videoNum',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getyunDetail(bodyData,callback){
    let netApi = 'yunDetail',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getassetIndex(bodyData,callback){
    let netApi = 'assetIndex',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getConfig(bodyData,callback){
    let netApi = 'getConfig',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getcash(bodyData,callback){
    let netApi = 'cash',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getfefCash(bodyData,callback){
    let netApi = 'fefCash',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getcashRecord(bodyData,callback){
    let netApi = 'cashRecord',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getExchangeConfig(bodyData,callback){
    let netApi = 'getExchangeConfig',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getexchangeRecord(bodyData,callback){
    let netApi = 'exchangeRecord',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getRechargeConfig(bodyData,callback){
    let netApi = 'getRechargeConfig',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getresubmitAjax(bodyData,callback){
    let netApi = 'resubmitAjax',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getsubmitAjax(bodyData,callback){
    let netApi = 'submitAjax',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getexchangesubmitAjax(bodyData,callback){
    let netApi = 'exchangesubmitAjax',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
} 
function getrechargeRecord(bodyData,callback){
    let netApi = 'rechargeRecord',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getlockIndex(bodyData,callback){
    let netApi = 'lockIndex',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getcurve(bodyData,callback){
    let netApi = 'curve',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getprice(bodyData,callback){
    let netApi = 'price',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getlock(bodyData,callback){
    let netApi = 'lock',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getpurchase(bodyData,callback){
    let netApi = 'purchase',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getcancel(bodyData,callback){
    let netApi = 'cancel',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getlockLog(bodyData,callback){
    let netApi = 'lockLog',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getlockProfit(bodyData,callback){
    let netApi = 'lockProfit',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getuserIndex(bodyData,callback){
    let netApi = 'userIndex',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getsetEdit(bodyData,callback){
    let netApi = 'setEdit',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getSetPayment(bodyData,callback){
    let netApi = 'setPayment',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getSetPassword(bodyData,callback){
    let netApi = 'setPassword',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getuserProfit(bodyData,callback){
    let netApi = 'userProfit',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getnoticeIndex(bodyData,callback){
    let netApi = 'noticeIndex',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getnoticepopup(bodyData,callback){
    let netApi = 'noticepopup',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getconsume(bodyData,callback){
    let netApi = 'consume',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getuserAdvert(bodyData,callback){
    let netApi = 'userAdvert',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getrealname(bodyData,callback){
    let netApi = 'realname',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getaddressIndex(bodyData,callback){
    let netApi = 'addressIndex',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getaddressEdit(bodyData,callback){
    let netApi = 'addressEdit',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getaddressAdd(bodyData,callback){
    let netApi = 'addressAdd',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getaddressDel(bodyData,callback){
    let netApi = 'addressDel',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getgoodsIndex(bodyData,callback){
    let netApi = 'goodsIndex',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getgoodsdetail(bodyData,callback){
    let netApi = 'goodsdetail',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getmyOrder(bodyData,callback){
    let netApi = 'myOrder',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getorderDetail(bodyData,callback){
    let netApi = 'orderDetail',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function gettakeDelivery(bodyData,callback){
    let netApi = 'takeDelivery',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getmyTeam(bodyData,callback){
    let netApi = 'myTeam',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getinvite(bodyData,callback){
    let netApi = 'invite',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getftRelease(bodyData,callback){
    let netApi = 'ftRelease',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
function getcontract(bodyData,callback){
    let netApi = 'contract',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getChartsData(bodyData, callback){
    let netApi = 'chartsData',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getCompleteAdv(bodyData, callback){
    let netApi = 'completeAdv',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getIndexNav(bodyData, callback){
    let netApi = 'indexNav',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}
 
function getGoodsList(bodyData, callback){
    let netApi = 'goodsList',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getCategory(bodyData, callback){
    let netApi = 'category',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getUserDetail(bodyData, callback){
    let netApi = 'userDetail',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getNoticeDetail(bodyData, callback){
    let netApi = 'noticeDetail',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getTeamLists(bodyData, callback){
    let netApi = 'teamLists',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getLogIndex(bodyData, callback){
    let netApi = 'logIndex',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getBuyNowGet(bodyData, callback){
    let netApi = 'buyNowGet',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Get(netApi,bodyData,callback,reqError)
}

function getBuyNowPost(bodyData, callback){
    let netApi = 'buyNowGet',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getOrderLists(bodyData, callback){
    let netApi = 'orderLists',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getOrderCancel(bodyData, callback){
    let netApi = 'orderCancel',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getUserOrderDetail(bodyData, callback){
    let netApi = 'userOrderDetail',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getSetDefault(bodyData, callback){
    let netApi = 'setDefault',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getLogout(bodyData, callback){
    let netApi = 'logout',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getCardIndex(bodyData, callback){
    let netApi = 'cardIndex',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getCardAdd(bodyData, callback){
    let netApi = 'cardAdd',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getCardDelete(bodyData, callback){
    let netApi = 'cardDelete',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getWalletCash(bodyData, callback){
    let netApi = 'walletCash',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getCashLists(bodyData, callback){
    let netApi = 'cashLists',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getWalletExchange(bodyData, callback){
    let netApi = 'walletExchange',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getExchangeLists(bodyData, callback){
    let netApi = 'exchangeLists',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getCashSetting(bodyData, callback){
    let netApi = 'cashSetting',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getExchangeSetting(bodyData, callback){
    let netApi = 'exchangeSetting',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getInvitePoster(bodyData, callback){
    let netApi = 'invitePoster',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getUserAgent(bodyData, callback){
    let netApi = 'userAgent',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getMerchantLists(bodyData, callback){
    let netApi = 'merchantLists',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getStatisticsLists(bodyData, callback){
    let netApi = 'statisticsLists',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getMerchantDetail(bodyData, callback){
    let netApi = 'merchantDetail',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getIndexGetPrice(bodyData, callback){
    let netApi = 'indexGetPrice',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getScanCode(bodyData, callback){
    let netApi = 'scanCode',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getRuleIndex(bodyData, callback){
    let netApi = 'ruleIndex',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getOrderReceipt(bodyData, callback){
    let netApi = 'orderReceipt',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getBuyRule(bodyData, callback){
    let netApi = 'buyRule',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getInviteRule(bodyData, callback){
    let netApi = 'inviteRule',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getProductPay(bodyData, callback){
    let netApi = 'productPay',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getPond(bodyData, callback){
    let netApi = 'pond',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getOrderOfflineCancel(bodyData, callback){
    let netApi = 'orderOfflineCancel',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}

function getStatisticsData(bodyData, callback){
    let netApi = 'statisticsData',reqError = {error:{success:'false',msg:'获取失败'}};
    NetWork_Post(netApi,bodyData,callback,reqError)
}


export{
    getStatisticsData,
    getOrderOfflineCancel,
    getPond,
    getProductPay,
    getInviteRule,
    getBuyRule,
    getOrderReceipt,
    getRuleIndex,
    getScanCode,
    getIndexGetPrice,
    getMerchantDetail,
    getStatisticsLists,
    getMerchantLists,
    getUserAgent,
    getInvitePoster,
    getExchangeSetting,
    getCashSetting,
    getExchangeLists,
    getWalletExchange,
    getCashLists,
    getWalletCash,
    getCardIndex,
    getCardAdd,
    getCardDelete,
    getSetPassword,
    getSetPayment,
    getLogout,
    getSetDefault,
    getUserOrderDetail,
    getOrderCancel,
    getOrderLists,
    getBuyNowPost,
    getBuyNowGet,
    getLogIndex,
    getTeamLists,
    getNoticeDetail,
    getUserDetail,
    getCategory,
    getGoodsList,
    getIndexNav,
    getCompleteAdv,
    getcontract,
    getftRelease,
    getinvite,
    getmyTeam,
    getLogin,
    getregister,
    getPhoneCode,
    getNoTokenPhoneCode,
    getToken,
    getforget,
    getlogout,
    getVersions,
    getbanner,
    getpoolTotal,
    getnews,
    getvideoNum,
    getyunDetail,
    getassetIndex,
    getConfig,
    getcash,
    getfefCash,
    getcashRecord,
    getExchangeConfig,
    getexchangeRecord,
    getRechargeConfig,
    getsubmitAjax,
    getresubmitAjax,
    getexchangesubmitAjax,
    getrechargeRecord,
    getlockIndex,
    getcurve,
    getprice,
    getlock,
    getpurchase,
    getcancel,
    getlockLog,
    getlockProfit,
    getuserIndex,
    getsetEdit,
    getuserProfit,
    getnoticeIndex,
    getnoticepopup,
    getconsume,
    getuserAdvert,
    getrealname,
    getaddressIndex,
    getaddressEdit,
    getaddressAdd,
    getaddressDel,
    getgoodsIndex,
    getgoodsdetail,
    getmyOrder,
    getorderDetail,
    gettakeDelivery,
    getChartsData
}