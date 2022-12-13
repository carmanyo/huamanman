package com.firefly.app;

import android.app.Activity;
import com.tencent.mm.opensdk.modelbiz.WXLaunchMiniProgram;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;

import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * author：hm
 * 回调
 */
import com.facebook.react.bridge.Arguments;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
//
import com.zj.zjsdk.ad.ZjAdError;
import com.zj.zjsdk.ad.ZjRewardVideoAd;
import com.zj.zjsdk.ad.ZjRewardVideoAdListener;

import com.zj.zjsdk.ad.ZjInterstitialAd;
import com.zj.zjsdk.ad.ZjInterstitialAdListener;

import com.zj.zjsdk.ad.ZjSplashAd;
import com.zj.zjsdk.ad.ZjSplashAdListener;

import java.util.HashMap;
import java.util.Map;

/**
 * author：hm
 * date： 2021/7/1
 */
public class ToastModule extends ReactContextBaseJavaModule {
    public static ReactApplicationContext reactContext;
    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    @NonNull
    @Override
    public String getName() {
        return "ToastExample";
    }

    public ToastModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }


    // 跳转小程序
    @ReactMethod
    public void showMiniPragrams(String appid, String mini_id){
        IWXAPI api = WXAPIFactory.createWXAPI(reactContext,"wx2ccc906eef4f1e94");
        WXLaunchMiniProgram.Req req = new WXLaunchMiniProgram.Req();
        req.userName = "gh_d3d4036d66f8"; // 填小程序原始id
        req.miniprogramType = WXLaunchMiniProgram.Req.MINIPTOGRAM_TYPE_RELEASE;// 可选打开 开发版，体验版和正式版
        api.sendReq(req);
    }
    
    // private void showMiniPragrams(Activity activity, String appid, String mini_id){
    //     IWXAPI api = WXAPIFactory.createWXAPI(activity, appid);
    //     WXLaunchMiniProgram.Req req = new WXLaunchMiniProgram.Req();
    //     req.userName = mini_id; // 填小程序原始id
    //     req.miniprogramType = WXLaunchMiniProgram.Req.MINIPTOGRAM_TYPE_RELEASE;// 可选打开 开发版，体验版和正式版
    //     api.sendReq(req);
    // }

    

    /**
     * author：hm
     * 看广告
     */
   ZjRewardVideoAd ad;
    @ReactMethod
    public void showre(String message, int duration) {
        Log.d("test", "ToastModule.showre");

        // 正式
       ad = new ZjRewardVideoAd(getCurrentActivity(), "J7836589550", new ZjRewardVideoAdListener() {
    //    ad = new ZjRewardVideoAd(getCurrentActivity(), "J5574990126", new ZjRewardVideoAdListener() {


    //    ad = new ZjRewardVideoAd(getCurrentActivity(), "J5574990126", new ZjRewardVideoAdListener() {
           @Override
           public void onZjAdTradeId(String s, String s1, boolean b) {
               WritableMap params = Arguments.createMap();
               params.putString("event", "onZjAdTradeId");
               params.putString("trade_id", s);
               params.putString("trade_key", s1);
               params.putBoolean("is_verity", b);
               sendEvent(params);
           }

           @Override
           public void onZjAdLoaded(String s) {
               WritableMap params = Arguments.createMap();
               params.putString("event", "onZjAdLoaded");
               sendEvent(params);
           }

           @Override
           public void onZjAdVideoCached() {
               WritableMap params = Arguments.createMap();
               params.putString("event", "onZjAdVideoCached");
               sendEvent(params);
               ad.showAD();
           }

           @Override
           public void onZjAdShow() {
               WritableMap params = Arguments.createMap();
               params.putString("event", "onZjAdShow");
               sendEvent(params);
           }

           @Override
           public void onZjAdShowError(ZjAdError zjAdError) {

           }

           @Override
           public void onZjAdClick() {
               WritableMap params = Arguments.createMap();
               params.putString("event", "onZjAdClick");
               sendEvent(params);
           }

           @Override
           public void onZjAdVideoComplete() {
               WritableMap params = Arguments.createMap();
               params.putString("event", "onZjAdVideoComplete");
               sendEvent(params);
           }

           @Override
           public void onZjAdExpose() {

           }

           @Override
           public void onZjAdReward(String s) {

           }

           @Override
           public void onZjAdClose() {
               WritableMap params = Arguments.createMap();
               params.putString("event", "onZjAdClose");
               sendEvent(params);
           }

           @Override
           public void onZjAdError(ZjAdError zjAdError) {

           }
       });
       ad.loadAd();
    }

    private void sendEvent(WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("ZjRewardVideoCallback", params);
    }

    /**
     * author：hm
     * 插屏广告
     */
   ZjInterstitialAd interstitialAd;
    @ReactMethod
    public void showin(String message, int duration) {
        Log.e("ToastModule", "ToastModule.showin");
        Activity currentActivity = getCurrentActivity();
        currentActivity.runOnUiThread(()->{
            // interstitialAd = new ZjInterstitialAd(currentActivity, "J5451530706", new ZjInterstitialAdListener() {
                //    正式
            interstitialAd = new ZjInterstitialAd(currentActivity, "J6184566187", new ZjInterstitialAdListener() {
            //    interstitialAd = new ZjInterstitialAd(getCurrentActivity(), "J6184566187", new ZjInterstitialAdListener() {
                @Override
                public void onZjAdLoaded() {
                    Log.e("ToastModule", "ToastModule.onZjAdLoaded");
                    interstitialAd.showAd();
                }

                @Override
                public void onZjAdShow() {
                    Log.e("ToastModule", "ToastModule.onZjAdShow");
                }

                @Override
                public void onZjAdClicked() {
                    Log.e("ToastModule", "ToastModule.onZjAdClicked");
                }

                @Override
                public void onZjAdClosed() {
                    Log.e("ToastModule", "ToastModule.onZjAdClosed");
                }

                @Override
                public void onZjAdError(ZjAdError error) {
                    Log.e("ToastModule", "ToastModule.onZjAdError...code=" + error.getErrorCode() + ", msg=" + error.getErrorMsg());
                }
            });
            interstitialAd.loadAd();
       
        });
    }

    /**
     * author：hm
     * 开屏广告
     */
    @ReactMethod
    public void showsp() {
        Log.d("test", "ToastModule.showsp");
//        Intent intent = new Intent(reactContext, SplashActivity.class);
//        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//
//        // intent.putExtra("zj_adId", "J4992730720");
//        // 正式
//        intent.putExtra("zj_adId", "J3674433076");
//        reactContext.startActivity(intent);

    }
    // ZjSplashAd splashAd;
    // @ReactMethod
    // public void showsp(String message, int duration){
    //     Log.e("ToastModule", "ToastModule.showsp");
    //     splashAd = new ZjSplashAd(getCurrentActivity(), "zjad_1071824220679301", new ZjSplashAdListener() {
    //         // @Override
    //         // protected void onPause() {
    //         // }

    //         // @Override
    //         // protected void onResume() {
    //         // }

    //         // @Override
    //         // public void onZjAdLoaded() {
    //         // }

    //         // @Override
    //         // public void onZjAdLoadTimeOut() {

    //         // }

    //         // @Override
    //         // public void onZjAdShow() {
    //         // }

    //         // @Override
    //         // public void onZjAdClicked() {
    //         // }

    //         // @Override
    //         // public void onZjAdTickOver() {
    //         // }

    //         // @Override
    //         // public void onZjAdDismissed() {

    //         // }


    //         // @Override
    //         // public void onZjAdError(ZjAdError error) {
    //         // }
    //         // private void jump(){
    //         // }

    //         // @Override
    //         // public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
    //         // }

    //     });
    //     splashAd.loadAd();
    // }


}
