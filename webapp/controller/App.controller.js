sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"sap/m/library",
		"sap/ui/core/Locale",
		"sap/ui/core/LocaleData",
		"sap/ui/model/type/Currency",
		"sap/m/ObjectAttribute"
	],
	function(
		Controller,
		mobileLibrary,
		Locale,
		LocaleData,
		Currency,
		ObjectAttribute
	) {
		"use strict";

		return Controller.extend("sap.ui.demo.db.controller.App", {
			formatMail: function(sFirstName, sLastName) {
				//i18n kaynak kodlarımı oBundle içerisine atiyorum
				var oBundle = this.getView()
					.getModel("i18n")
					.getResourceBundle();

				return mobileLibrary.URLHelper.normalizeEmail(
					//app view da formatter : .formatMail olarak belirleyip parts içerisinde path leri firstName ve lastName olarak belirlediğim ve burada sirasiyla yazmis oldugum sFirstName ve sLastName bu parametrelere karsilik gelir two way binding ile ne yazarsam sonucta oradaki degerle mail olarak ilertilecektir
					sFirstName + sLastName + "@hotmail.com",
					//mailSubject i18n de var ve Hi {0} yaziyor burada [bu şekilde sFirstName] yazarak ilgili parametreye bu gelsin diyorum
					oBundle.getText("mailSubject", [sFirstName]),
					oBundle.getText("mailBody")
				);
			},
			formatStockValue: function(fUnitPrice, iStockLevel, sCurrCode) {
				// var sBrowserLocale = sap.ui.getCore().getConfiguration().getLanguage();
				// var oLocale = new Locale(sBrowserLocale);
				// var oLocaleData = new LocaleData(oLocale);
				// var oCurrency = new Currency(oLocaleData.mData.currencyFormat);
				// return oCurrency.formatValue([fUnitPrice * iStockLevel, sCurrCode],"string");
				return fUnitPrice * iStockLevel + " " + sCurrCode;
			},
			// formatColorValueFormatter: function(fUnitPrice, ipriceThreshold) {
			// 	if (fUnitPrice > ipriceThreshold) {
			// 		return "Success"
			// 	}
			// 	else {
			// 		return "Error"

			// 	}
			// },
			onItemSelected: function(oEvent) {
				var oSelectedItem = oEvent.getSource(),
					oContext = oSelectedItem.getBindingContext("products");
				// var sPath = oContext.getPath();
				// var oProductDetailPanel = this.byId("productDetailsPanel");
				// oProductDetailPanel.bindElement({ path: sPath, model: "products" });

				var oObject = oContext.getObject();
				sap.ui
					.getCore()
					.getModel("products")
					.setProperty("/product", oObject);

				//oObject içerisinde böyle birşey var
				// ProductID: 5
				// ProductName: "Chef Anton's Gumbo Mix"
				// SupplierID: 2
				// CategoryID: 2
				// QuantityPerUnit: "36 boxes"
				// UnitPrice: "21.3500"
				// UnitsInStock: 0
				// UnitsOnOrder: 0
				// ReorderLevel: 0
				// Discontinued: true

				//yeni bir property tanımladim products modelimin ana dizinin de Products gibi ana başlık artık ve ben buna seçtiğim satırdaki kaynağa erişip bind edildiği ilgili data nin neresi olduguna getbindingContext ile erişebiliyorum sonrasinda bir object değişkeni içerisine bu ilgili satirdaki bilgileri object olarak tutuyorum ve bunlari setProperty olarak yeni bir ana başlık altında tanımlıyorum, buna parametre olarak bu ilgili object nesnesiini veriyorum

				// son durumda böyle bir şey oluşturmuşş olduk

				//product :{

				//ilgili satir a bastigimda bu veriler degisecek
				// ProductID: 5
				// ProductName: "Chef Anton's Gumbo Mix"
				// SupplierID: 2
				// CategoryID: 2
				// QuantityPerUnit: "36 boxes"
				// UnitPrice: "21.3500"
				// UnitsInStock: 0
				// UnitsOnOrder: 0
				// ReorderLevel: 0
				// Discontinued: true
				//}
			},
			productListFactory: function(sId, oContextt) {
				//olusturdugum bu parametreler tek bir kez olusturmak icin satiri yaptım
				var oUIControl;
				this.oText = new Text("testText", {
					text: "Hello World",
					tooltip: "This is an example tooltip",
					width: "100px"
				});

				// Decide based on the data which dependant to clone
				if (
					oContextt.getProperty("UnitsInStock") === 0 &&
					oContextt.getProperty("Discontinued")
				) {
					// stok 0 ve satisa kapali durumu true ise

					//satişa kapali diyoruz
					//fragment taki view i id üzerinden klon luyorum
					oUIControl = this.byId("productSimple").clone(sId);
				} else {
					// The item is available, so we will create an ObjectListItem
					oUIControl = this.byId("productExtended").clone(sId);

					// The item is temporarily out of stock, so we will add a status

					//objectlistitem a yeni bir attribuete tanimliyoruz stok sıfıran fazla discontinued false ise stoklarda bulunmuyor diyoruz
					if (oContextt.getProperty("UnitsInStock") < 1) {
						oUIControl.addAttribute(
							new ObjectAttribute({
								text: {
									path: "i18n>outOfStock"
								}
							})
						);
					}
				}

				return oUIControl;
			}
		});
	}
);
