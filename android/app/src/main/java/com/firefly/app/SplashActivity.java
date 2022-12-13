package com.firefly.app;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.KeyEvent;
import android.view.ViewGroup;

import androidx.appcompat.app.AppCompatActivity;

import com.zj.zjsdk.ad.ZjAdError;
import com.zj.zjsdk.ad.ZjSplashAd;
import com.zj.zjsdk.ad.ZjSplashAdListener;

public class SplashActivity extends AppCompatActivity implements ZjSplashAdListener {

   private ViewGroup container;
    Handler mHandler = new Handler();
   @Override
   protected void onCreate(Bundle savedInstanceState) {
       super.onCreate(savedInstanceState);

       setContentView(R.layout.activity_splash);
       container = this.findViewById(R.id.splash_container);

//       String zj_adId = getIntent().getStringExtra("zj_adId");
       String zj_adId = "J3674433076";
       mHandler.postDelayed(new Runnable() {
           @Override
           public void run() {
               showAd("J3674433076");
           }
       },1000);

   }

   private void showAd(String zj_adId) {
       Log.e("test", "SplashActivity.showAd.....posId = " + zj_adId);
       ZjSplashAd splashAd = new ZjSplashAd(this, this, zj_adId, 5);
       splashAd.fetchAndShowIn(container);
   }

   //ZjSplashAdListener
   @Override
   public void onZjAdLoaded() {

   }

   @Override
   public void onZjAdLoadTimeOut() {
       toMainActivity();
   }

   @Override
   public void onZjAdShow() {

   }

   @Override
   public void onZjAdClicked() {

   }

   @Override
   public void onZjAdTickOver() {
       toMainActivity();
   }

   @Override
   public void onZjAdDismissed() {
       toMainActivity();
   }

   @Override
   public void onZjAdError(ZjAdError error) {
       toMainActivity();
   }

   private void toMainActivity() {
       startActivity(new Intent(this,MainActivity.class));
       finish();
   }

   /**
    * 开屏页一定要禁止用户对返回按钮的控制，否则将可能导致用户手动退出了App而广告无法正常曝光和计费
    */
   @Override
   public boolean onKeyDown(int keyCode, KeyEvent event) {
       if (keyCode == KeyEvent.KEYCODE_BACK || keyCode == KeyEvent.KEYCODE_HOME)
           return true;
       return super.onKeyDown(keyCode, event);
   }
}