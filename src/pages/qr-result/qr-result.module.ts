import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrResultPage } from './qr-result';

@NgModule({
  declarations: [
    QrResultPage,
  ],
  imports: [
    IonicPageModule.forChild(QrResultPage),
  ],
})
export class QrResultPageModule {}
