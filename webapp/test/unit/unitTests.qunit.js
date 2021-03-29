/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"at/clouddna/sappress/HybridApp/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});