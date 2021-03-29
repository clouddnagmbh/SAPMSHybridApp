sap.ui.define([
	"at/clouddna/sappress/HybridApp/controller/BaseController",
	"sap/m/MessageBox",
	"sap/ui/core/Fragment"
], function (Controller, MessageBox, Fragment) {
	"use strict";

	return Controller.extend("at.clouddna.sappress.HybridApp.controller.CategoryDetail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf at.clouddna.sappress.HybridApp.view.CategoryDetail
		 */
		onInit: function () {
			this.setContentDensity();
			this.getRouter().getRoute("CategoryDetail").attachPatternMatched(this.onPatternMatched, this);
		},

		onPatternMatched: function (oEvent) {
			this.sPath = "/" + oEvent.getParameters().arguments.path;
			this.getView().bindElement({
				path: this.sPath,
				parameters: {
					expand: 'products'
					//v4 ,$$updateGroupId: "cat"
				}
			});
			
			/*
			var _oList = this.getView().byId("prodList");

			var oFilter = new sap.ui.model.Filter({
				path: "category_ID",
				operator: sap.ui.model.FilterOperator.EQ,
				value1: this.sPath.split("(")[1].slice(0, -1)
			});

			var aFilters = [oFilter];

			_oList.getBinding("items").filter(aFilters);
			*/
		},

		onEditCategory: function () {
			var oView = this.getView();

			if (!this.byId("createCategory")) {
				Fragment.load({
					id: oView.getId(),
					name: "at.clouddna.sappress.HybridApp.view.fragment.CreateCategory",
					controller: this
				}).then(function (oDialog) {
					jQuery.sap.syncStyleClass(oView.getController().getContentDensityClass(), oView, oDialog);
					oView.addDependent(oDialog);
					oDialog.open();
				}.bind(this));
			} else {
				this.byId("createCategory").open();
			}
		},

		onSaveCat: function () {
			this.byId("createCategory").close();
			//v4 this.getModel().submitBatch("cat");
			this.getModel().submitChanges();
		},

		onCancelCat: function () {
			this.byId("createCategory").close();
			//v4 this.getModel().resetChanges("cat");
			this.getModel().resetChanges();
		},

		onDeleteCategory: function () {
			MessageBox.confirm(this.getLocalizedText("general.sureToDelete"), {
				emphasizedAction: sap.m.MessageBox.Action.YES,
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: function (oAction) {
					if (MessageBox.Action.YES === oAction) {
						this.getModel().remove(this.sPath, {
							success: function(){
								this.getModel().refresh();
								this.onNavBack();
							}.bind(this)
						});
						/* v4
						this.getView().getBindingContext().delete("$auto").then(function () {
							this.getModel().refresh();
							this.onNavBack();
						}.bind(this));
						*/
					}
				}.bind(this)
			});
		},

		onCreateProduct: function () {
			var oView = this.getView();
			var oContext = this.getModel().createEntry("/Product");
			this.getModel().setProperty(oContext.getPath() + "/category_ID", this.sPath.split("'")[1]);
			/* v4
			var oList = this.byId("prodList");
			var oBinding = oList.getBinding("items");
			var oContext = oBinding.create({
				"category_ID": this.sPath.split("(")[1].slice(0, -1),
				"name": null,
				"price": 0,
				"description": null,
				"currency_code": null
			});
			*/
			
			if (!this.byId("createProduct")) {
				Fragment.load({
					id: oView.getId(),
					name: "at.clouddna.sappress.HybridApp.view.fragment.CreateProduct",
					controller: this
				}).then(function (oDialog) {
					jQuery.sap.syncStyleClass(oView.getController().getContentDensityClass(), oView, oDialog);
					oView.addDependent(oDialog);
					//v4 oDialog.setBindingContext(oContext);
					oDialog.bindElement(oContext.getPath());
					oDialog.open();
				}.bind(this));
			} else {
				//v4 this.byId("createProduct").setBindingContext(oContext);
				this.byId("createProduct").bindElement(oContext.getPath());
				this.byId("createProduct").open();
			}
		},

		onSaveProd: function () {
			this.byId("createProduct").close();
			//v4 this.getView().getModel().submitBatch("prod");
			this.getModel().submitChanges();
		},

		onCancelProd: function () {
			this.byId("createProduct").close();
			//v4 this.byId("prodList").getBinding("items").resetChanges();
			this.getModel().resetChanges();
		},

		onDeleteProduct: function (oEvent) {
			var oContext = oEvent.getParameters().listItem.getBindingContext();
			MessageBox.confirm(this.getLocalizedText("general.sureToDelete"), {
				emphasizedAction: sap.m.MessageBox.Action.YES,
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: function (oAction) {
					if (MessageBox.Action.YES === oAction) {
						this.getModel().remove(oContext.getPath());
						/* v4
						oContext.delete("$auto").then(function () {
							this.getModel().refresh();
						}.bind(this));
						*/
					}
				}.bind(this)
			});
		}

	});

});