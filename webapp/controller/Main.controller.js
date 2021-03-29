sap.ui.define([
	"at/clouddna/sappress/HybridApp/controller/BaseController",
	"sap/ui/core/Fragment"
], function (Controller, Fragment) {
	"use strict";

	return Controller.extend("at.clouddna.sappress.HybridApp.controller.Main", {

		onInit: function () {
			this.setContentDensity();
		},

		onCreateCategory: function () {
			var oView = this.getView();
			var oContext = this.getModel().createEntry("/ProductCategory");
			/* v4
			var oList = this.byId("prodCatList");
			var oBinding = oList.getBinding("items");
			var oContext = oBinding.create({
				"parentCategory_ID": null,
				"title": null,
				"description": null
			});
			*/
			if (!this.byId("createCategory")) {
				Fragment.load({
					id: oView.getId(),
					name: "at.clouddna.sappress.HybridApp.view.fragment.CreateCategory",
					controller: this
				}).then(function (oDialog) {
					jQuery.sap.syncStyleClass(oView.getController().getContentDensityClass(), oView, oDialog);
					oView.addDependent(oDialog);
					//v4 oDialog.setBindingContext(oContext);
					oDialog.bindElement(oContext.getPath());
					oDialog.open();
				}.bind(this));
			} else {
				//v4 this.byId("createCategory").setBindingContext(oContext);
				this.byId("createCategory").bindElement(oContext.getPath());
				this.byId("createCategory").open();
			}
		},

		onSaveCat: function () {
			this.byId("createCategory").close();
			//v4 this.getView().getModel().submitBatch("prodCat");
			this.getModel().submitChanges();
		},

		onCancelCat: function () {
			this.byId("createCategory").close();
			//this.byId("prodCatList").getBinding("items").resetChanges();
			this.getModel().resetChanges();
		},

		onCategoryPressed: function (oEvent) {
			this.getRouter().navTo("CategoryDetail", {
				path: oEvent.getSource().getBindingContextPath().split("/")[1]
			});
		}

	});

});