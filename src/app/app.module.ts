import { HistoryPage } from './../pages/history/history';
import { SplashPage } from './../pages/splash/splash';
import { SettingsPage } from './../pages/settings/settings';
import { QrResultPage } from './../pages/qr-result/qr-result';
import { TabsPage } from './../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { LockScreenPage } from './../pages/lock-screen/lock-screen';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicStorageModule } from '@ionic/storage'
import { Http, HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MyApp } from './app.component';
import { PincodeInputModule } from  'ionic2-pincode-input';
import { FingerprintAIO } from "@ionic-native/fingerprint-aio";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HistoryPage,
    SplashPage,
    LockScreenPage,
    TabsPage,
    QrResultPage,
    SettingsPage
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    PincodeInputModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HistoryPage,
    LockScreenPage,
    SplashPage,
    TabsPage,
    QrResultPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FingerprintAIO,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
