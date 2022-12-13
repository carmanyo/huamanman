package com.firefly.app;

import com.facebook.react.ReactActivity;
import android.content.res.Configuration;

import android.os.Bundle;
//import org.devio.rn.splashscreen.SplashScreen;

// 扫码
import com.reactnativecomponent.barcode.RCTCapturePackage;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "app";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    // SplashScreen.show(this);
  }
}
