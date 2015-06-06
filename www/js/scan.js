///////////////////////////////////////////////////
// function: searchProduct
//   action: searches data base for a barcode using upc.php
//   inputs: action,codeUPC
//   output: product information in JSON format
//   author: Alireza
///////////////////////////////////////////////////

//function searchProduct(barcode){
function searchProduct(){  //for lab coding

    //barcode="070177265700";//for lab coding
    barcode="068100011661";  //for lab coding
    
    
    $.ajax({
        	type: 'GET',
           	url: 'http://50.63.186.48/mobile/upc.php',
           	data:{ 
           		action: "search", 
           		upc: barcode, 
           		},
           	cache: false,
           	datatype: 'json',

           	success: function(output){
            	var prods=JSON.parse(output);
				if (prods[0].desc_en){
            		var item= "<li class=\"table-view-cell media\">" +   //"<ul class=\"table-view\">" +
                        '<a class="navigate-right">' +
                            "<img class=\"media-object pull-left\" src=\"http://50.63.186.48/images_upc/" + prods[0].path_image + "\"" +
                                "<div class=\"media-body\">" +
                                    prods[0].desc_en +
                                    "<p> " + prods[0].form_en  + " </p>" +
                                    "<p> " + prods[0].brand_en + " </p>" +
                                    "<p> " + scanDate($.now()) + " </p>" +
                                "</div>" +
                        "</a>" +
                    "</li>" ;
           			$("#scanedItem").html(item);
            		// Repetion check
            		if (!checkItemRepetion(prods[0].code_image)){
            			addToLocalHistory(output);
            			//addToLocalHistory(prods[0]);
            		}else{
						//alert("This item is already exists in history list.");
					};
            		similarProducts(prods[0].code_image,"similarItems");  //Alicommon.js


            	}else{
            		alert("Product not found.");
            	}
           	},  
           error: function (data) {
        		alert("ERROR  " + data.desc_en);
           	}
           });
        event.preventDefault();
};


//update localstorage history
function addToLocalHistory(newProductJSON){
	var newProduct= JSON.parse(newProductJSON);
	newProduct[0].tStamp= $.now();
    if (localStorage.getItem('history')){ 	
        var existingProduct = JSON.parse(localStorage.getItem('history'));      	
    	var newProductList=newProduct.concat(existingProduct);
    		localStorage.setItem('history', JSON.stringify(newProductList));
	    }
	else   {
			localStorage.setItem('history', JSON.stringify(newProduct));
		}
};














// prevent repetition in history list
function checkItemRepetion(imageCode) {
    if (localStorage.getItem('history')){  // if there is nothing there will be NULL = false
    var localData = JSON.parse(localStorage.getItem('history'));
	var exists= false;
	$.each(localData, function(key, value) {
		  if(localData[key].code_image == imageCode) {
		  	//alert("This item exists in history.");
			exists= true;
		  }    
	   });
}
return exists;
}





/////////////////////////////////////////////////
// function: barcodeScan
//   action: starts barcode scanner plugin
//  returns: barcode 
/////////////////////////////////////////////////
function barcodeScan(){
	//alert("barcode scan");
	cordova.plugins.barcodeScanner.scan(
      function (result) {

                //return result.text;  //for lab coding
                searchProduct(result.text);
                return;
      }, 
      function (error) {
          alert("Scanning failed: " + error);
          return 0;
      }
   );
};

//ReferenceError: Can't find variable: cordova







function getProduct(){
	barcode = barcodeScan();
    if (barcode != 0){
    	$.ajax({
        	type: 'GET',
           	url: 'http://50.63.186.48/mobile/upc.php',
           	data:{ 
           		action: "search", 
           		upc: barcode 
           		},
           	cache: false,
           	datatype: 'json',
           	success: function(output)
           	{
            	var prods=JSON.parse(output);
				if (prods[0].desc_en){
            		var item= "<li class=\"table-view-cell media\">" +   //"<ul class=\"table-view\">" +
                        //"<a class=\"navigate-right\"><button class=\"btn\">+</button>" +
                        "<a class=\"navigate-right\">" +
                            "<img class=\"media-object pull-left\" src=\"http://50.63.186.48/images_upc/" + prods[0].path_image + "\"" +
                                "<div class=\"media-body\">" +
                                    prods[0].desc_en +
                                    "<p>" + prods[0].form_en + "</p>" +
                                    "<p>" + prods[0].brand_en + "</p>" +
                                "</div>" +
                        "</a>" +
                    "</li>" ;
           			$("#scanedItem").html(item);
            		addToLocalHistory(prods[0]);

            	}
           	},  
           error: function (data) {
        		alert("ERROR");
           	}
        });
    }
};

















