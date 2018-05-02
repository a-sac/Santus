import { HomeService } from './services/home.service';
import { SplashPage } from './../pages/splash/splash';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LockScreenPage } from './../pages/lock-screen/lock-screen';
import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';


@Component({
  templateUrl: 'app.html',
  providers: [HomeService]
})
export class MyApp {
  rootPage:any= LockScreenPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, modalCtrl: ModalController) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      let splash = modalCtrl.create(SplashPage);
      splash.present();
      //splashScreen.hide();
    });
  }
}

