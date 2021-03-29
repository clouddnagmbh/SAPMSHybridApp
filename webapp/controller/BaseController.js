sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/format/DateFormat",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function (Controller, History, DateFormat, MessageBox, MessageToast, JSONModel) {
	"use strict";

	return Controller.extend("at.clouddna.sappress.HybridApp.controller.BaseController", {

		hideBusyIndicator: function () {
			sap.ui.core.BusyIndicator.hide();
		},

		showBusyIndicator: function (iDuration, iDelay) {
			sap.ui.core.BusyIndicator.show(iDelay);

			if (iDuration && iDuration > 0) {
				if (this._sTimeoutId) {
					jQuery.sap.clearDelayedCall(this._sTimeoutId);
					this._sTimeoutId = null;
				}

				this._sTimeoutId = jQuery.sap.delayedCall(iDuration, this, function () {
					this.hideBusyIndicator();
				});
			}
		},

		getRouter: function () {
			return this.getOwnerComponent().getRouter();
		},

		getContentDensityClass: function () {
			if (!this._sContentDensityClass) {
				if (!sap.ui.Device.support.touch) {
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}

			return "sapUiSizeCompact";
		},

		setContentDensity: function () {
			this.getView().addStyleClass(this.getContentDensityClass());
		},

		onNavBack: function () {
			var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				var bReplace = true;
				this.getRouter().navTo("Main", {}, bReplace);
			}

		},

		getLocalizedText: function (sName, aArgs) {
			return this._getResourceBundle().getText(sName, aArgs);
		},

		_getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		getModel: function (sName) {
			return this.getOwnerComponent().getModel(sName);
		}

	});
});