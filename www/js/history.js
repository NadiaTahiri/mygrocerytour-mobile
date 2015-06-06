
function addFavoriteItem(imageCode){
    if (!checkItemRepetitionFav(imageCode)){
    	var newFavorite;
    	var existingHistory = JSON.parse(localStorage.getItem('history'));
		$.each(existingHistory,function(key, value){
			if(existingHistory[key].code_image == imageCode){	
				newFavorite= makeJsonString(existingHistory[key]);
			};
		});
		addToLocalFavorite(newFavorite);
	}else{
		alert("This item already exists in favorites list.");
	};
};





//update localstorage history
function addToLocalFavorite(newFavorite){
	var newProduct = JSON.parse(newFavorite);
    if (localStorage.getItem('favorite')){ 	
    	var existingProducts = JSON.parse(localStorage.getItem('favorite'));      	
    	var newProductList=existingProducts.concat(newProduct);
    		localStorage.setItem('favorite', JSON.stringify(newProductList));
	    }
	else   {
			localStorage.setItem('favorite', JSON.stringify(newProduct));

		}
	     	
};


// prevent repetition in history list
function checkItemRepetitionFav(imageCode) {
	if(localStorage.getItem('favorite')){
    	var localData = JSON.parse(localStorage.getItem('favorite'));
		 // if there is nothing there will be NULL = false
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






function removeItem(barcode) {
    var localData = JSON.parse(localStorage.getItem('history'));
    if (localData){  // if there is nothing there will be NULL = false
	   $.each(localData, function(key, value) {
		  if(result[property] == value) {
			  //Remove from array
			  array.splice(index, 1);
		  }    
	   });
}
}

function showHistory(){
    var localData = JSON.parse(localStorage.getItem('history'));
    if (localData){  // if there is nothing there will be NULL = false
		$.each(function(key, value){
    		alert(key);
    		alert(value);
    	});
    }
}


////////////////////////////////////
// make json string using an array
// parameter: array refrence
// return: json string
// Author: Alireza Goodarzi
////////////////////////////////////
function makeJsonString(arrJSON){
	var jsonString='[{';
	$.each(arrJSON,function(key, value){
		jsonString = jsonString + '"' + key + '":"' + arrJSON[key] + '",';
	});
	jsonString = jsonString.substring(0, jsonString.length -1) + '}]';
	console.log(jsonString);
	return jsonString;
}


////////////////////////////////////
// delete one row from json string using an image code
// parameter: image code
// return: nothing
// Author: Alireza Goodarzi
////////////////////////////////////
function deleteFromHistory(imageCode){
	if (confirm('It will delete this item from the list.')){
		var jsonString="";
		var subJSON;
		var localData = JSON.parse(localStorage.getItem('history'));
		$.each(localData,function(key, value){
			if(localData[key].code_image != imageCode) {
				subJSON = makeJsonString(localData[key]);
				jsonString=jsonString + subJSON.substring(1, subJSON.length -1)  + ',';
			  }
		}); 	
		jsonString='[' + jsonString.substring(0, jsonString.length -1) + ']';
		localStorage.setItem('history', jsonString);
		chargeHistory();
	}
}









function setSimilar0(imageCode){
	localStorage.setItem('imageCode', imageCode);
	location.href="similar.html";
};












