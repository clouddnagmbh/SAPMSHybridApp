/*  Logon configuration used by packaged apps (N.B. We do not include the fioriclient 
 *  plugin to packaged apps but just borrow some of its configuration format.)
 *	The {{}} placeholder values, if any, will be populated before the first build. 
 *	The "appName" and "appVersion" will be updated with the input values in the build wizard.
 *	Do not change the "appID", "fioriURL" and "auth" values to avoid inconsistent 
 *	app settings.
 */
var fiori_client_appConfig = {
	"appName": "HybridApp",
	"appVersion": "1.5",
	"appID": "com.sap.webide.x69174598f45c4c26a0ae3cc3512bd20d",
	"fioriURL": "https://mobile-w19vmq3tw2.eu2.hana.ondemand.com:443",
	"communicatorId": "REST"
};