sap.ui.define(
	[
		"sap/ui/core/UIComponent",
		"sap/ui/Device",
		"sap/ui/demo/db/model/models",
		"sap/m/Text",
		"sap/ui/model/json/JSONModel",
		"sap/ui/core/mvc/XMLView",
		"sap/ui/model/BindingMode",
		"sap/ui/model/resource/ResourceModel"
	],
	function(
		UIComponent,
		Device,
		models,
		Text,
		JSONModel,
		XMLView,
		BindingMode,
		ResourceModel
	) {
		"use strict";

		return UIComponent.extend("sap.ui.demo.db.Component", {
			metadata: {
				manifest: "json"
			},

			/**
			 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
			 * @public
			 * @override
			 */
			init: function() {
				// call the base component's init function
				UIComponent.prototype.init.apply(this, arguments);

				// enable routing
				this.getRouter().initialize();

				// set the device model
				this.setModel(models.createDeviceModel(), "device");

				//data binding olmadan ekrana text yazdiriyorum
				// new Text({ text: "Hi, my name is Harry Hawk" }).placeAt("content");

				var oProductModel = new JSONModel();
				oProductModel.loadData("./model/Products.json");
				sap.ui.getCore().setModel(oProductModel, "products");

				// Create a JSON model from an object literal
				var oModel = new JSONModel({
					firstName: "Harry",
					lastName: "Hawk",
					enabled: true,
					panelHeaderText: "Data Binding Basics",
					address: {
						street: "Dietmar-Hopp-Allee 16",
						city: "Walldorf",
						zip: "69190",
						country: "Germany"
					},
					salesToDate: 12345.6789,
					priceThreshold: 20,
					currencyCode: "EUR"
				});

				//bu satir ile tek yonlu bind olayını sagliyorum sadece model den ui tarafina verilerin akmasini sagliyorum verilerin degismesiyle mesala burada enabled butonunu pasif yaptigimizda ttwo way binding te ki gibi pasif olma durumu olmayacak sürekli enabled olayi true da kalmis olacak
				// oModel.setDefaultBindingMode(BindingMode.OneWay);

				// Assign the model object to the SAPUI5 core
				sap.ui.getCore().setModel(oModel);

				// Create a resource bundle for language specific texts
				var oResourceModel = new ResourceModel({
					bundleName: "sap.ui.demo.db.i18n.i18n"
				});

				// Assign the model object to the SAPUI5 core using the name "i18n"
				sap.ui.getCore().setModel(oResourceModel, "i18n");

				// Display the XML view called "App"
				// new XMLView({
				// 	viewName: "sap.ui.demo.db.view.App"
				// }).placeAt("content");

				// App adlı uygulama görünümünü goruntuleme,XML gorunumu oView adli nesne olarak oluşturulur
				var oView = new XMLView({
					viewName: "sap.ui.demo.db.view.App"
				}).placeAt("content");

				// Görünümü mesaj yoneticisiyle kaydediyoruz,oView goruntuleme nesnesi messageManager e kaydedilir
				sap.ui
					.getCore()
					.getMessageManager()
					.registerObject(oView, true);

				// Görünümü DOM ekleme,Kaydedildikten sonra XML gorunumu daha once oldugu gibi DOM e eklenir
				oView.placeAt("content");
			}
		});
	}
);
