import { Storage } from '@ionic/storage';
import { QrResultPage } from './../qr-result/qr-result';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public data: string

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private barcodeScanner: BarcodeScanner, public storage: Storage) {
    this.storage = navParams.get('storage');
  }

  ionViewDidLoad() {
    this.storage.get('first').then(bool => {
      if(bool) {
        console.log("First time")
        console.log(bool);
        this.faio();
      } else {
        console.log("NOT First time")
      }
    })
  }

  popup() {
    let alert = this.alertCtrl.create({
      title: 'Erro',
      subTitle: "Conteúdo não é uma carta.",
      buttons: ['Ok']
    });
    alert.present();
  }

  faio() {
    this.storage.set('first', false);
    let alert = this.alertCtrl.create({
      title: 'Touch ID',
      message: 'Deseja ativar o Touch ID?',
      buttons:[
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            console.log('Não clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            console.log('Sim clicked');
            this.storage.set('faio', true);
          }
        }
      ]
    })
    alert.present()
  }

  scan() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.data = barcodeData.text;
      this.openItem(barcodeData.text);
    }, (err) => {
      this.popup()
    })
  }

  openItem(text: String) {
    this.navCtrl.push(QrResultPage, {
      contents: text,
      storage: this.storage
    });
  }
}
