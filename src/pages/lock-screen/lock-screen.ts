import { TabsPage } from './../tabs/tabs';
import { PincodeController } from 'ionic2-pincode-input';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FingerprintAIO } from "@ionic-native/fingerprint-aio";

import CryptoJS from 'crypto-js';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the LockScreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lock-screen',
  templateUrl: 'lock-screen.html',
})
export class LockScreenPage {

  code: string
  id: boolean

  constructor(public navCtrl: NavController, public navParams: NavParams, public pincodeCtrl: PincodeController, public storage: Storage, private alertCtrl: AlertController, private faio: FingerprintAIO) {
    this.id = false;
    this.storage.get('faio').then(fid => {
      if (fid !== undefined) {
        this.id = fid;
      } else {
        this.storage.set('faio', false);
      }
    })
    .catch((error: any) => console.log(error))
  }

  ionViewDidLoad() {
    // Try to get password stored
    this.storage.get('password_encrypt').then(pdw => {
      if(!pdw) {
        this.presentAlert('PIN', "Para começar a usar a aplicação precisa de configurar um PIN de 6 digitos.", true)
      }
    })
    .catch((error: any) => console.log(error))
    this.storage.get('faio').then (faio =>{
      if (faio) {
        setTimeout(() => {
          this.startTouchID();
        }, 4000);
      }
    })
  }

  openPinCode(register: boolean): any {
    let pinCode = this.pincodeCtrl.create({
      title: 'Insira o seu PIN',
      passSize: 6,
      hideForgotPassword: true,
      hideCancelButton: register,
      enableBackdropDismiss: !register  //Se estiver a registar tem que configurar
    });

    pinCode.present();

    pinCode.onDidDismiss((code, status) => {
      // If user enter a password and the fase if confirm
      // do a login
      if (status === 'done' && !register) {
        this.login(code);
      }
      // Make a registration to user
      else if (status === 'done' && register) {
        this.code = code;
        // Confirm if pincodes match
        this.confirmCode();
      }
    })
  }

  confirmCode(): any {
    let pinCode = this.pincodeCtrl.create({
      title: 'Confirme o seu PIN',
      passSize: 6,
      hideForgotPassword: true,
      hideCancelButton:true,
      enableBackdropDismiss: false
    });
    pinCode.present();
    pinCode.onDidDismiss((code, status) => {
      if (status === 'done') {
        if (this.code == code) {
          // if match send a message and do a registration of pin code
          this.presentAlert("PIN configurado!", "Pode mudar o PIN mais tarde nas Definições.", false);
          this.register(code);
        }
        else {
          this.presentAlert("Erro!", "Os PINs inseridos não são iguais. Tente novamente.", false);
          this.openPinCode(true);
        }
      }
    })
  }

  startTouchID() {
    this.faio.show({
      clientId: 'FingerPrintLockScreen',
      clientSecret: 'lasd08aah@981',   //Only necessary for Android
      disableBackup:true,              //Only for Android(optional)
      localizedFallbackTitle: 'Insira o Pin',      //Only for iOS
      localizedReason: 'Autentique-se' //Only for iOS
    })
    .then((result: any) => {
      // If the TouchID is correct
      this.storage.get('password_encrypt').then(pwd => {
        let stored_pincode = String(pwd)
        console.log("Stored password: " + stored_pincode)
  
        // Go to home page
        this.navCtrl.setRoot(TabsPage, {
            storage: this.storage
          });
        }
      )
    })
    .catch((error: any) => console.log(error))
  }

  presentAlert(title: string, message: string, register: boolean) {
    var botoes;
    if (register) {
      botoes = [
        {
          text: 'OK',
          handler: () => {
            this.openPinCode(true);
          }
        }
      ]
    } else {
      botoes = ["OK"]
    }
    
    let alert = this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: title,
      subTitle: message,
      buttons: botoes
    });
    alert.present();
  }
  
  //Encryption
  register(pincode) {
    let hash = String(CryptoJS.SHA256(pincode))
    this.storage.set('password_encrypt', hash);
    this.storage.set('history', []);
    this.storage.set('first',true);
    this.navCtrl.setRoot(TabsPage, {
      storage: this.storage
    });
  }

  login(pincode) {
    // store passwords 
    let entered_pincode = String(CryptoJS.SHA256(pincode))
    // get password stored on local storage
    this.storage.get('password_encrypt').then(pwd => {
      let stored_pincode = String(pwd)
      console.log("Stored password: " + stored_pincode)

      // if match go to home page
      if (entered_pincode == stored_pincode) {
        this.navCtrl.setRoot(TabsPage, {
          storage: this.storage
        });
      }
      else {
        this.presentAlert("Erro", "PIN errado", false)
      }
    })
    .catch((error: any) => console.log(error));
  }
}