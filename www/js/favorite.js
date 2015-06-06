/*  replaced with chargeRecords
function chargeFavorite(){
    var localData = JSON.parse(localStorage.getItem('favorite'));
    if (localData){  // if there is nothing there will be NULL = false
		//alert ("It is found");
		var item="";
		$.each(localData,function(key, value){
            item = item + "<li class=\"table-view-cell media\">" +   //"<ul class=\"table-view\">" +
                        "<a class=\"navigate-right\"><button  id=\"" + localData[key].code_image + "\" name=\"delFav\" class=\"btn\">-</button>" +
                            "<img class=\"media-object pull-left\" src=\"http://50.63.186.48/images_upc/" + localData[key].path_image + "\"" +
                                "<div class=\"media-body\">" +
                                    localData[key].desc_en +
                                    "<p>" + localData[key].form_en + "</p>" +
                                    "<p>" + localData[key].brand_en + "</p>" +
                                "</div>" +
                        "</a>" +
                    "</li>" ;
    	//	alert(localData[key].desc_en);
    	//	alert(localData[key].form_en);
    	});
    	           
    	$("#favoriteItems").html(item);
    }
}; */



////////////////////////////////////
// delete one row from json string using an image code
// parameter: image code
// return: nothing
// Author: Alireza Goodarzi
////////////////////////////////////
function deleteFromFavorite(imageCode){
	if (confirm('It will delete this item from the list.')){
		var jsonString="";
		var subJSON;
		var localData = JSON.parse(window.localStorage.getItem('favorite'));
		$.each(localData,function(key, value){
			if(localData[key].code_image != imageCode) {
				subJSON = makeJsonString(localData[key]);
				jsonString=jsonString + subJSON.substring(1, subJSON.length -1)  + ',';
			  }
		}); 	
		jsonString='[' + jsonString.substring(0, jsonString.length -1) + ']';
		localStorage.setItem('favorite', jsonString);
		chargeRecords("favorite","favoriteItems");
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
	return jsonString;
}



document.addEventListener('click', function(e) {
    var elementName=e.target.name;
    if (elementName == "delFav"){
    	deleteFromFavorite(e.target.id);
    }
});