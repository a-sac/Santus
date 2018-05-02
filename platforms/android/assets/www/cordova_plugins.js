cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-fingerprint-aio.Fingerprint",
    "file": "plugins/cordova-plugin-fingerprint-aio/www/Fingerprint.js",
    "pluginId": "cordova-plugin-fingerprint-aio",
    "clobbers": [
      "Fingerprint"
    ]
  },
  {
    "id": "phonegap-plugin-barcodescanner.BarcodeScanner",
    "file": "plugins/phonegap-plugin-barcodescanner/www/barcodescanner.js",
    "pluginId": "phonegap-plugin-barcodescanner",
    "clobbers": [
      "cordova.plugins.barcodeScanner"
    ]
  },
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  },
  {
    "id": "cordova-plugin-splashscreen.SplashScreen",
    "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
    "pluginId": "cordova-plugin-splashscreen",
    "clobbers": [
      "navigator.splashscreen"
    ]
  },
  {
    "id": "cordova-plugin-ionic-keyboard.keyboard",
    "file": "plugins/cordova-plugin-ionic-keyboard/www/android/keyboard.js",
    "pluginId": "cordova-plugin-ionic-keyboard",
    "clobbers": [
      "window.Keyboard"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-add-swift-support": "1.7.2",
  "cordova-plugin-fingerprint-aio": "1.3.4",
  "phonegap-plugin-barcodescanner": "7.1.1",
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-device": "2.0.1",
  "cordova-plugin-splashscreen": "5.0.2",
  "cordova-plugin-ionic-webview": "1.2.0",
  "cordova-plugin-ionic-keyboard": "2.0.5"
};
// BOTTOM OF METADATA
});