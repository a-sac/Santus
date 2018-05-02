webpackJsonp([2],{

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LockScreenPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tabs_tabs__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic2_pincode_input__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_fingerprint_aio__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_crypto_js__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_crypto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(78);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the LockScreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LockScreenPage = /** @class */ (function () {
    function LockScreenPage(navCtrl, navParams, pincodeCtrl, storage, alertCtrl, faio) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.pincodeCtrl = pincodeCtrl;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.faio = faio;
        this.id = false;
        this.storage.get('faio').then(function (fid) {
            if (fid !== undefined) {
                console.log("FAIO IS SET");
                console.log(fid);
                _this.id = fid;
            }
            else {
                console.log("SET FAIO FALSE");
                _this.storage.set('faio', false);
            }
        })
            .catch(function (error) { return console.log(error); });
    }
    LockScreenPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // Try to get password stored
        this.storage.get('password_encrypt').then(function (pdw) {
            if (pdw) {
                console.log("Encrypted passwordk: " + pdw);
            }
            else {
                _this.presentAlert('PIN', "Para começar a usar a aplicação precisa de configurar um PIN de 6 digitos.", true);
            }
        })
            .catch(function (error) { return console.log(error); });
    };
    LockScreenPage.prototype.openPinCode = function (register) {
        var _this = this;
        var pinCode = this.pincodeCtrl.create({
            title: 'Insira o seu PIN',
            passSize: 6,
            hideForgotPassword: true,
            hideCancelButton: register,
            enableBackdropDismiss: !register //Se estiver a registar tem que configurar
        });
        pinCode.present();
        pinCode.onDidDismiss(function (code, status) {
            // If user enter a password and the fase if confirm
            // do a login
            if (status === 'done' && !register) {
                _this.login(code);
            }
            else if (status === 'done' && register) {
                _this.code = code;
                // Confirm if pincodes match
                _this.confirmCode();
            }
        });
    };
    LockScreenPage.prototype.confirmCode = function () {
        var _this = this;
        var pinCode = this.pincodeCtrl.create({
            title: 'Confirme o seu PIN',
            passSize: 6,
            hideForgotPassword: true,
            hideCancelButton: true,
            enableBackdropDismiss: false
        });
        pinCode.present();
        pinCode.onDidDismiss(function (code, status) {
            if (status === 'done') {
                if (_this.code == code) {
                    // if match send a message and do a registration of pin code
                    _this.presentAlert("PIN configurado!", "Pode mudar o PIN mais tarde nas Definições.", false);
                    _this.register(code);
                }
                else {
                    _this.presentAlert("Erro!", "Os PINs inseridos não são iguais. Tente novamente.", false);
                    _this.openPinCode(true);
                }
            }
        });
    };
    LockScreenPage.prototype.startTouchID = function () {
        var _this = this;
        this.faio.show({
            clientId: 'FingerPrintLockScreen',
            clientSecret: 'lasd08aah@981',
            disableBackup: true,
            localizedFallbackTitle: 'Insira o Pin',
            localizedReason: 'Autentique-se' //Only for iOS
        })
            .then(function (result) {
            // If the TouchID is correct
            _this.storage.get('password_encrypt').then(function (pwd) {
                var stored_pincode = String(pwd);
                console.log("Stored password: " + stored_pincode);
                // Go to home page
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__tabs_tabs__["a" /* TabsPage */], {
                    storage: _this.storage
                });
            });
        })
            .catch(function (error) { return console.log(error); });
    };
    LockScreenPage.prototype.presentAlert = function (title, message, register) {
        var _this = this;
        var botoes;
        if (register) {
            botoes = [
                {
                    text: 'OK',
                    handler: function () {
                        _this.openPinCode(true);
                    }
                }
            ];
        }
        else {
            botoes = ["OK"];
        }
        var alert = this.alertCtrl.create({
            enableBackdropDismiss: false,
            title: title,
            subTitle: message,
            buttons: botoes
        });
        alert.present();
    };
    //Encryption
    LockScreenPage.prototype.register = function (pincode) {
        var hash = String(__WEBPACK_IMPORTED_MODULE_5_crypto_js___default.a.SHA256(pincode));
        this.storage.set('password_encrypt', hash);
        this.storage.set('history', []);
        this.storage.set('first', true);
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__tabs_tabs__["a" /* TabsPage */], {
            storage: this.storage
        });
    };
    LockScreenPage.prototype.login = function (pincode) {
        var _this = this;
        // store passwords 
        var entered_pincode = String(__WEBPACK_IMPORTED_MODULE_5_crypto_js___default.a.SHA256(pincode));
        // get password stored on local storage
        this.storage.get('password_encrypt').then(function (pwd) {
            var stored_pincode = String(pwd);
            console.log("Stored password: " + stored_pincode);
            // if match go to home page
            if (entered_pincode == stored_pincode) {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__tabs_tabs__["a" /* TabsPage */], {
                    storage: _this.storage
                });
            }
            else {
                _this.presentAlert("Erro", "PIN errado", false);
            }
        })
            .catch(function (error) { return console.log(error); });
    };
    LockScreenPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-lock-screen',template:/*ion-inline-start:"/Volumes/MacintoshHD/tdosilva/Projects/Ionic/Gattus/src/pages/lock-screen/lock-screen.html"*/'<ion-header>\n  <ion-navbar color="favorite">\n    <ion-title text-center>\n      Agente de Autoridade\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <!--<h4 text-center>Insira o seu PIN</h4> -->\n  <div class="pin-container">\n    <button ion-button icon-only full (click)="openPinCode(false)" style="background-color:rgb(55, 130, 214);">\n      <ion-icon name="lock"></ion-icon>\n    </button>\n    <button ion-button icon-only full *ngIf="id" (click)="startTouchID()" style="background-color: rgb(55, 130, 214);">\n      <ion-icon name="finger-print"></ion-icon>\n    </button>\n  </div>  \n</ion-content>'/*ion-inline-end:"/Volumes/MacintoshHD/tdosilva/Projects/Ionic/Gattus/src/pages/lock-screen/lock-screen.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic2_pincode_input__["a" /* PincodeController */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_fingerprint_aio__["a" /* FingerprintAIO */]])
    ], LockScreenPage);
    return LockScreenPage;
}());

//# sourceMappingURL=lock-screen.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QrResultPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_services_home_service__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the QrResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var QrResultPage = /** @class */ (function () {
    function QrResultPage(navCtrl, navParams, alertCtrl, loadingCtrl, sanitizer, homeService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.sanitizer = sanitizer;
        this.homeService = homeService;
        this.show1 = true;
        this.show2 = false;
        this.tfront = true;
        this.tback = false;
        this.contents = navParams.get('contents');
        this.loading = this.loadingCtrl.create({
            content: 'Por favor espere...'
        });
    }
    QrResultPage.prototype.ionViewCanEnter = function () {
        var _this = this;
        Promise.resolve(this.contents).then(JSON.parse).then(function (res) {
            _this.json = res;
            _this.store(res);
        });
    };
    QrResultPage.prototype.store = function (json) {
        var _this = this;
        if (json[0].maior21 !== undefined) {
            this.navParams.get('storage').get('history').then(function (val) {
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1;
                var yyyy = today.getFullYear();
                var todays;
                todays = dd + '/' + mm + '/' + yyyy;
                var stuff = "Maior do que 21 anos";
                val.unshift({ hdr: stuff, bool: json[0].maior21, date: todays });
                _this.navParams.get('storage').set('history', val);
            });
        }
        else if (json[0].maior18 !== undefined) {
            this.navParams.get('storage').get('history').then(function (val) {
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1;
                var yyyy = today.getFullYear();
                var todays;
                todays = dd + '/' + mm + '/' + yyyy;
                var stuff = "Maior do que 18 anos";
                val.unshift({ hdr: stuff, bool: json[0].maior18, date: todays });
                _this.navParams.get('storage').set('history', val);
            });
        }
        else if (json[0].site !== undefined) {
            this.getPosts(json[0].site, json[0].token);
        }
        else {
            this.popup();
        }
    };
    QrResultPage.prototype.popup = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            enableBackdropDismiss: false,
            title: 'Erro',
            subTitle: "Conteúdo não é uma carta.",
            buttons: [{
                    text: 'Ok',
                    handler: function () {
                        _this.navCtrl.pop();
                    }
                }]
        });
        alert.present();
    };
    QrResultPage.prototype.getPosts = function (url, token) {
        var _this = this;
        this.loading.present();
        this.homeService.getPosts(url, token).subscribe(function (response) {
            _this.item = response;
            _this.getPhoto();
            _this.getAss();
            _this.loading.dismiss();
            _this.navParams.get('storage').get('history').then(function (val) {
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1;
                var yyyy = today.getFullYear();
                var todays;
                todays = dd + '/' + mm + '/' + yyyy;
                var stuff = "Carta de condução";
                var content = response.name + " " + response.surname;
                val.unshift({ hdr: stuff, cnt: content, date: todays });
                _this.navParams.get('storage').set('history', val);
            });
        });
    };
    QrResultPage.prototype.getPhoto = function () {
        this.photo = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + this.item.photo);
    };
    QrResultPage.prototype.getAss = function () {
        this.ass = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + this.item.ass);
    };
    QrResultPage.prototype.toggleB1 = function () {
        this.show1 = true;
        this.show2 = false;
    };
    QrResultPage.prototype.toggleB2 = function () {
        this.show1 = false;
        this.show2 = true;
    };
    QrResultPage.prototype.toggleTB = function () {
        this.tfront = false;
        this.tback = true;
    };
    QrResultPage.prototype.toggleTF = function () {
        this.tback = false;
        this.tfront = true;
    };
    QrResultPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-qr-result',template:/*ion-inline-start:"/Volumes/MacintoshHD/tdosilva/Projects/Ionic/Gattus/src/pages/qr-result/qr-result.html"*/'<ion-header>\n\n  <ion-navbar color="favorite">\n    <ion-title>Resultado</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-card *ngIf="json[0].maior21 !== undefined">\n    <ion-card-header>Maior de 21 anos?</ion-card-header>\n    <ion-card-content *ngIf="json[0].maior21" class="positivo">\n      SIM\n    </ion-card-content>\n    <ion-card-content *ngIf="!json[0].maior21" class="negativo">\n      NÃO\n    </ion-card-content>\n  </ion-card>\n  <ion-card *ngIf="json[0].maior18 !== undefined">\n    <ion-card-header>Maior de 18 anos?</ion-card-header>\n    <ion-card-content *ngIf="json[0].maior18" class="positivo">\n      SIM\n    </ion-card-content>\n    <ion-card-content *ngIf="!json[0].maior18" class="negativo">\n      NÃO\n    </ion-card-content>\n  </ion-card>\n  <div *ngIf="json[0].site">\n    <button (click)="toggleB1()" ion-button block style="background-color: #ffffff; color: #000000">Mostrar Vista Moderna</button>\n    <button (click)="toggleB2()" ion-button block style="background-color: #ffffff; color: #000000">Mostrar Carta Tradicional</button>\n    <div class="card" *ngIf="show1 && item">\n          <ion-thumbnail *ngIf="item.ass">\n              <img class="imagem" [src]="photo">\n          </ion-thumbnail>\n          <div class="container">\n          <p>\n            <b>1.</b> {{item.surname}}\n          </p>\n          <p>\n            <b>2.</b> {{item.name}}\n          </p>\n          <p>\n            <b>3.</b> {{item.birthday}} {{item.birthSite}}\n          </p>\n          <p>\n            <b>4a.</b> {{item.emissionDate}} <b>4b.</b> {{item.emissionEntity}}\n          </p>\n          <p>\n            <b>4c.</b> {{item.valideDate}} <b>4d.</b> {{item.numberOfControll}}\n          </p>\n          <p>\n            <b>5.</b> {{item.licenseNumber}}\n          </p>\n          <p>\n            <b>7.</b> \n            <ion-thumbnail *ngIf="item.ass">\n                <img class="imagem" [src]="ass">\n            </ion-thumbnail>\n          </p>\n          <ion-list *ngFor="let car of item.types; let in = index">\n            <p>\n              <ion-icon name="car"></ion-icon>\n              <b>classe:</b>  {{item.types[in][\'name\']}}  \n              <b>s:</b> {{item.types[in][\'firstDate\']}} \n              <b>f:</b> {{item.types[in][\'validUntil\']}} \n            </p>\n          </ion-list>\n        </div>\n      </div>\n      <div (click)="toggleTB()" class="row" *ngIf="show2 && item && tfront">\n        <div class="column">\n          <ion-thumbnail *ngIf="item.photo">\n            <img class="imagem3" [src]="photo">\n          </ion-thumbnail>\n        </div>\n        <div class="column">\n          <p>\n            <b>1.</b> {{item.surname}}\n          </p>\n          <p>\n            <b>2.</b> {{item.name}}\n          </p>\n          <p>\n            <b>3.</b> {{item.birthday}} {{birthSite}}\n          </p>\n          <p>\n            <b>4a.</b> {{item.emissionDate}} <b>4b.</b> {{item.emissionEntity}}\n          </p>\n          <p>\n            <b>4c.</b> {{item.valideDate}} <b>4d.</b> {{item.numberOfControll}}\n          </p>\n          <p>\n            <b>5.</b> {{item.licenseNumber}}\n          </p>\n          <p>\n            <b>7.</b> \n            <ion-thumbnail *ngIf="item.ass">\n              <img class="imagem2" [src]="ass">\n            </ion-thumbnail>\n          </p>\n        </div>\n      </div>\n      <div (click)="toggleTF()" class="row2" *ngIf="show2 && item && tback">\n        <div class="back">\n          <table>\n              <tr>\n                <th>9.</th>\n                <th>10.</th>\n                <th>11.</th>\n                <th>12.</th>\n              </tr>\n              <tr *ngFor="let car of item.types; let in = index">\n                <td>{{item.types[in][\'name\']}} </td>\n                <td><ion-icon name="car"></ion-icon></td>\n                <td>{{item.types[in][\'firstDate\']}} </td>\n                <td>{{item.types[in][\'validUntil\']}} </td>\n              </tr> \n          </table>\n        </div>\n      </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Volumes/MacintoshHD/tdosilva/Projects/Ionic/Gattus/src/pages/qr-result/qr-result.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_0__app_services_home_service__["a" /* HomeService */]])
    ], QrResultPage);
    return QrResultPage;
}());

//# sourceMappingURL=qr-result.js.map

/***/ }),

/***/ 173:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 173;

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HistoryPage = /** @class */ (function () {
    function HistoryPage(navParams, navCtrl) {
        this.navParams = navParams;
        this.navCtrl = navCtrl;
    }
    HistoryPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.navParams.get('storage').get('history').then(function (val) {
            _this.history = val;
        });
    };
    HistoryPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.navParams.get('storage').get('history').then(function (val) {
            _this.history = val;
        });
    };
    HistoryPage.prototype.ngOnInit = function () {
        var _this = this;
        this.navParams.get('storage').get('history').then(function (val) {
            _this.history = val;
        });
    };
    HistoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'history',template:/*ion-inline-start:"/Volumes/MacintoshHD/tdosilva/Projects/Ionic/Gattus/src/pages/history/history.html"*/'<ion-header>\n    <ion-navbar color="favorite">\n      <ion-title text-center>\n          Histórico\n      </ion-title>\n    </ion-navbar>\n</ion-header>\n  \n<ion-content padding>\n    <div *ngIf="history !== undefined">\n      <div *ngFor="let item of history">\n          <ion-card>\n            <ion-note item-end>\n              {{item.date}}\n            </ion-note>\n            <ion-card-header>\n              {{item.hdr}}\n            </ion-card-header>\n            <div *ngIf="item.bool !== undefined">\n              <ion-card-content *ngIf="item.bool" class="positivo">\n                SIM\n              </ion-card-content>\n              <ion-card-content *ngIf="!item.bool" class="negativo">\n                NÃO\n              </ion-card-content>\n            </div>\n            <ion-card-content *ngIf="item.cnt">\n              {{item.cnt}}\n            </ion-card-content>\n          </ion-card>\n      </div>\n    </div>\n</ion-content>\n  '/*ion-inline-end:"/Volumes/MacintoshHD/tdosilva/Projects/Ionic/Gattus/src/pages/history/history.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]])
    ], HistoryPage);
    return HistoryPage;
}());

//# sourceMappingURL=history.js.map

/***/ }),

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/lock-screen/lock-screen.module": [
		724,
		1
	],
	"../pages/qr-result/qr-result.module": [
		725,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 218;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__history_history__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_settings__ = __webpack_require__(319);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TabsPage = /** @class */ (function () {
    function TabsPage(navParams) {
        this.navParams = navParams;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_0__history_history__["a" /* HistoryPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_4__settings_settings__["a" /* SettingsPage */];
        this.tabParams = {
            storage: this.navParams.get('storage')
        };
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-tabs',template:/*ion-inline-start:"/Volumes/MacintoshHD/tdosilva/Projects/Ionic/Gattus/src/pages/tabs/tabs.html"*/'<ion-tabs color="favorite">\n\n  <ion-tab [root]="tab1Root" [rootParams]="tabParams" tabTitle="Início" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" [rootParams]="tabParams" tabTitle="Histórico" tabIcon="paper"></ion-tab>\n  <ion-tab [root]="tab3Root" [rootParams]="tabParams" tabTitle="Definições" tabIcon="construct"></ion-tab>\n\n</ion-tabs>\n'/*ion-inline-end:"/Volumes/MacintoshHD/tdosilva/Projects/Ionic/Gattus/src/pages/tabs/tabs.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_storage__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__qr_result_qr_result__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, navParams, alertCtrl, barcodeScanner, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.barcodeScanner = barcodeScanner;
        this.storage = storage;
        this.storage = navParams.get('storage');
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('first').then(function (bool) {
            if (bool) {
                console.log("First time");
                console.log(bool);
                _this.faio();
            }
            else {
                console.log("NOT First time");
            }
        });
    };
    HomePage.prototype.popup = function () {
        var alert = this.alertCtrl.create({
            title: 'Erro',
            subTitle: "Conteúdo não é uma carta.",
            buttons: ['Ok']
        });
        alert.present();
    };
    HomePage.prototype.faio = function () {
        var _this = this;
        this.storage.set('first', false);
        var alert = this.alertCtrl.create({
            title: 'Touch ID',
            message: 'Deseja ativar o Touch ID?',
            buttons: [
                {
                    text: 'Não',
                    role: 'cancel',
                    handler: function () {
                        console.log('Não clicked');
                    }
                },
                {
                    text: 'Sim',
                    handler: function () {
                        console.log('Sim clicked');
                        _this.storage.set('faio', true);
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage.prototype.scan = function () {
        var _this = this;
        this.barcodeScanner.scan().then(function (barcodeData) {
            _this.data = barcodeData.text;
            _this.openItem(barcodeData.text);
        }, function (err) {
            _this.popup();
        });
    };
    HomePage.prototype.openItem = function (text) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__qr_result_qr_result__["a" /* QrResultPage */], {
            contents: text,
            storage: this.storage
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Volumes/MacintoshHD/tdosilva/Projects/Ionic/Gattus/src/pages/home/home.html"*/'<ion-header>\n\n  <ion-navbar color="favorite">\n    <ion-title text-center>\n      QR\n    </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <div class="pin-container">\n    <button ion-button large icon-start (click)="scan()">\n        <ion-icon name="camera"></ion-icon>\n        Scan QR\n    </button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Volumes/MacintoshHD/tdosilva/Projects/Ionic/Gattus/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__["a" /* BarcodeScanner */], __WEBPACK_IMPORTED_MODULE_0__ionic_storage__["b" /* Storage */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomeService = /** @class */ (function () {
    function HomeService(http) {
        this.http = http;
    }
    HomeService.prototype.getPosts = function (url, token) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(url, options)
            .map(function (res) { return res.json(); });
    };
    HomeService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], HomeService);
    return HomeService;
}());

//# sourceMappingURL=home.service.js.map

/***/ }),

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic2_pincode_input__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_crypto_js__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_crypto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(78);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SettingsPage = /** @class */ (function () {
    function SettingsPage(navCtrl, navParams, pincodeCtrl, storage, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.pincodeCtrl = pincodeCtrl;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.storage = navParams.get('storage');
        console.log("Settings");
    }
    SettingsPage.prototype.ionViewCanEnter = function () {
        var _this = this;
        this.storage.get('password_encrypt').then(function (pwd) {
            _this.pincode = String(pwd);
        });
        this.storage.get('faio').then(function (result) {
            if (result !== undefined) {
                _this.faio = result;
            }
        });
    };
    SettingsPage.prototype.toggleFaio = function () {
        this.storage.set('faio', this.faio);
        this.presentAlert("Touch ID", "Nova configuração de Touch ID efetuada. Reinicie a aplicação para concluir.");
    };
    SettingsPage.prototype.resetPassword = function () {
        this.openPinCode(false);
    };
    SettingsPage.prototype.cleanReset = function () {
        this.storage.remove('password_encrypt');
        this.storage.remove('history');
        this.storage.set('faio', false);
        this.presentAlert("Feito", "Todos os seus dados foram removidos. Reinicie a aplicação para terminar.");
    };
    SettingsPage.prototype.cleanHistory = function () {
        var _this = this;
        this.storage.remove('history').then(function (val) {
            _this.storage.set('history', []);
            _this.presentAlert("Feito", "O seu histórico foi removido.");
        });
    };
    SettingsPage.prototype.openPinCode = function (register) {
        var _this = this;
        var title = "Insira o seu PIN";
        if (register)
            title = "Insira o seu novo PIN";
        var pinCode = this.pincodeCtrl.create({
            title: title,
            passSize: 6,
            hideForgotPassword: true,
            hideCancelButton: false,
            enableBackdropDismiss: true
        });
        pinCode.present();
        pinCode.onDidDismiss(function (code, status) {
            // If user enter a password and the fase if confirm
            // do a login
            if (status === 'done' && !register) {
                _this.login(code);
            }
            else if (status === 'done' && register) {
                _this.newPincode = code;
                // Confirm if pincodes match
                _this.confirmCode();
            }
        });
    };
    SettingsPage.prototype.login = function (pincode) {
        var _this = this;
        var entered_pincode = String(__WEBPACK_IMPORTED_MODULE_3_crypto_js___default.a.SHA256(pincode));
        this.storage.get('password_encrypt').then(function (pwd) {
            var stored_pincode = String(pwd);
            console.log("Stored password: " + stored_pincode);
            if (entered_pincode == stored_pincode) {
                _this.presentAlert("Novo PIN", "Configure o seu novo PIN");
                _this.openPinCode(true);
            }
            else {
                _this.presentAlert("Erro", "PIN errado");
            }
        })
            .catch(function (error) { return console.log(error); });
    };
    SettingsPage.prototype.confirmCode = function () {
        var _this = this;
        var pinCode = this.pincodeCtrl.create({
            title: 'Confirme o seu novo PIN',
            passSize: 6,
            hideForgotPassword: true,
            hideCancelButton: false,
            enableBackdropDismiss: true
        });
        pinCode.present();
        pinCode.onDidDismiss(function (code, status) {
            if (status === 'done') {
                if (_this.newPincode == code) {
                    // if match send a message and do a registration of pin code
                    _this.presentAlert("PIN", "Novo PIN configurado!");
                    _this.register();
                }
                else {
                    _this.presentAlert("Erro!", "Os PINs inseridos não são iguais. Tente novamente.");
                    _this.openPinCode(true);
                }
            }
        });
    };
    SettingsPage.prototype.resetAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: "Apagar dados",
            subTitle: "Tem a certeza que quer apagar os dados? Esta ação não pode ser desfeita.",
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel'
                },
                {
                    text: 'Apagar',
                    handler: function () {
                        _this.cleanReset();
                    }
                }
            ]
        });
        alert.present();
    };
    SettingsPage.prototype.presentAlert = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ["OK"]
        });
        alert.present();
    };
    SettingsPage.prototype.register = function () {
        var _this = this;
        var hash = String(__WEBPACK_IMPORTED_MODULE_3_crypto_js___default.a.SHA256(this.newPincode));
        this.storage.remove('password_encrypt').then(function (done) {
            console.log("Nova password");
            _this.storage.set('password_encrypt', hash);
            console.log(hash);
        });
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"/Volumes/MacintoshHD/tdosilva/Projects/Ionic/Gattus/src/pages/settings/settings.html"*/'<ion-header>\n  <ion-navbar color="favorite">\n    <ion-title text-center>\n      Definições\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n    <ion-list-header>\n      Segurança e Privacidade\n    </ion-list-header>\n    <button ion-item (click)="resetPassword()">\n      <ion-icon name="lock" item-start></ion-icon>\n      Alterar o PIN\n    </button>\n    <ion-item>\n        <ion-label>Touch ID</ion-label>\n        <ion-icon name="finger-print" item-start></ion-icon>\n        <ion-toggle [(ngModel)]="faio" (ionChange)="toggleFaio()"></ion-toggle>\n    </ion-item>\n    <ion-list-header>\n      Dados pessoais\n    </ion-list-header>\n    <button ion-item block outline color="danger" (click)="cleanHistory()">\n        Apagar histórico\n    </button>\n    <button ion-item block outline color="danger" (click)="resetAlert()">\n        Apagar todos os dados\n    </button>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Volumes/MacintoshHD/tdosilva/Projects/Ionic/Gattus/src/pages/settings/settings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic2_pincode_input__["a" /* PincodeController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SplashPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(160);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SplashPage = /** @class */ (function () {
    function SplashPage(viewCtrl, splashScreen) {
        this.viewCtrl = viewCtrl;
        this.splashScreen = splashScreen;
    }
    SplashPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.splashScreen.hide();
        setTimeout(function () {
            _this.viewCtrl.dismiss();
        }, 4000);
    };
    SplashPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-splash',template:/*ion-inline-start:"/Volumes/MacintoshHD/tdosilva/Projects/Ionic/Gattus/src/pages/splash/splash.html"*/'<ion-content>\n  <table>\n      <tr><img src="assets/imgs/imt.png"></tr>\n      <tr><img src="assets/imgs/incm.png"></tr>\n      <tr><img src="assets/imgs/uminho.png"></tr>\n      <tr><img src="assets/imgs/unu-egov.png"></tr>\n  </table>\n</ion-content>\n'/*ion-inline-end:"/Volumes/MacintoshHD/tdosilva/Projects/Ionic/Gattus/src/pages/splash/splash.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], SplashPage);
    return SplashPage;
}());

//# sourceMappingURL=splash.js.map

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(371);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_history_history__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_splash_splash__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_settings_settings__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_qr_result_qr_result__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_lock_screen_lock_screen__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_platform_browser_animations__ = __webpack_require__(720);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_storage__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_http__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_common_http__ = __webpack_require__(722);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__app_component__ = __webpack_require__(723);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_ionic2_pincode_input__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_fingerprint_aio__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_barcode_scanner__ = __webpack_require__(317);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_8__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_16__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_history_history__["a" /* HistoryPage */],
                __WEBPACK_IMPORTED_MODULE_1__pages_splash_splash__["a" /* SplashPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_lock_screen_lock_screen__["a" /* LockScreenPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_3__pages_qr_result_qr_result__["a" /* QrResultPage */],
                __WEBPACK_IMPORTED_MODULE_2__pages_settings_settings__["a" /* SettingsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_12__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_17_ionic2_pincode_input__["b" /* PincodeInputModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_common_http__["a" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_14__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_9_ionic_angular__["h" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_16__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/lock-screen/lock-screen.module#LockScreenPageModule', name: 'LockScreenPage', segment: 'lock-screen', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/qr-result/qr-result.module#QrResultPageModule', name: 'QrResultPage', segment: 'qr-result', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_13__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_9_ionic_angular__["f" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_16__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_history_history__["a" /* HistoryPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_lock_screen_lock_screen__["a" /* LockScreenPage */],
                __WEBPACK_IMPORTED_MODULE_1__pages_splash_splash__["a" /* SplashPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_3__pages_qr_result_qr_result__["a" /* QrResultPage */],
                __WEBPACK_IMPORTED_MODULE_2__pages_settings_settings__["a" /* SettingsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_fingerprint_aio__["a" /* FingerprintAIO */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
                { provide: __WEBPACK_IMPORTED_MODULE_8__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_9_ionic_angular__["g" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 723:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_home_service__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_splash_splash__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_lock_screen_lock_screen__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(364);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, modalCtrl) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_3__pages_lock_screen_lock_screen__["a" /* LockScreenPage */];
        platform.ready().then(function () {
            statusBar.styleDefault();
            var splash = modalCtrl.create(__WEBPACK_IMPORTED_MODULE_1__pages_splash_splash__["a" /* SplashPage */]);
            splash.present();
            //splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Volumes/MacintoshHD/tdosilva/Projects/Ionic/Gattus/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Volumes/MacintoshHD/tdosilva/Projects/Ionic/Gattus/src/app/app.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_0__services_home_service__["a" /* HomeService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["k" /* ModalController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[366]);
//# sourceMappingURL=main.js.map