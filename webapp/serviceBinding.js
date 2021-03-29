function initModel() {
	var sUrl = "/MobileServicesBackend/v2/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}