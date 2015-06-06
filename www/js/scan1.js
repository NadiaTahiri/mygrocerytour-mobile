///////////////////////////////////////////////////
// SearchBarCode
// searches data base for a barcode using upc.php
// Inpouts: action,codeUPC
//  Output: product information in JSON format
//  Author: Alireza
///////////////////////////////////////////////////

$(document).on("click", "#scanButton", function(){
    var barcode=$.trim($('#barcode1').val());
    $.ajax(
           {
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
                        "<a class=\"navigate-right\"><button class=\"btn\">+</button>" +
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
            		// Repetion check
            		//if (!checkItemRepetion(prods[0].code_image)){
            		//	addToLocalHistory(prods[0]);
				//}else{
						//addToLocalHistory(prods[0]);
						//alert("This item is already exists in history list.");
				//	};
            	}else{
            		//alert("Product not found.");
            	}
           	
           	
           	alert(localStorage.getItem('history'));
           	
           	},  
           error: function (data) {
        		alert("ERROR");
           	}
           });
});


//update localstorage history
function addToLocalHistory(newProduct){

	//	var newProduct = JSON.parse(newProductJSON);
    newProduct["tStamp"]="hgfh";
	console.log(newProduct);
	
	
	if (localStorage.getItem('history')){
		var existingProduct = JSON.parse(localStorage.getItem('history'));     
		console.log(existingProduct);
	}
	else{	
		var existingProduct();
	}
	
	//--Remove if found
	
	var result = $.grep(existingProduct, function(p){ return  p.code_image == newProduct.code_image;});											
	//--Remove existing product										
	
	if (result.length>0) {
		for (var i=0; i<result.length;i++) {
			existingProduct.splice(existingProduct.indexOf(result[i]),1);
		}	
	}	
	//--Add to top 
	existingProduct.unshift(newProduct);
	console.log(existingProduct);	
 	localStorage.setItem('history', JSON.stringify(existingProduct));   	
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








$(document).on("click", "#historyButton", function(){ 
	location.href="history.html";
	});	
	
	
$(document).on("click", "#favoriteButton", function(){ 
	location.href="favorite.html";
	});	






$(document).on("click", "#barcodeIcon", function(){ 
	cordova.plugins.barcodeScanner.scan(
      function (result) {
        /*  alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);  */
                $("#barcode1").val(result.text);
                
                getProduct(result.text);
                
      }, 
      function (error) {
          //alert("Scanning failed: " + error);
      }
   );
});

//ReferenceError: Can't find variable: cordova


function getProduct(barcode){
    $.ajax(
           {
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
                        "<a class=\"navigate-right\"><button class=\"btn\">+</button>" +
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
};
