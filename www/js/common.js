/*

$(document).on("click", "#barcodeIcon", function(){ 
	cordova.plugins.barcodeScanner.scan(
      function (result) {
          //alert("We got a barcode\n" +
            //    "Result: " + result.text + "\n" +
              //  "Format: " + result.format + "\n" +
                //"Cancelled: " + result.cancelled);
                
                $("#barcode1").val(result.text);
                
                getProduct(result.text);

      }, 
      function (error) {
          alert("Scanning failed: " + error);
      }
   );
});
*/




function scanDate(milisec){
var jNow = new Date(parseFloat(milisec));
var jMonth="";
        //alert(jNow);
switch(jNow.getMonth()){
        case 1:jMonth= "January";
            break;
        case 2:jMonth= "February";
            break;
        case 3:jMonth= "March";
            break;
        case 4:jMonth= "April";
            break;
        case 5:jMonth= "May";
            break;
        case 6:jMonth= "June"; 
            break;
        case 7:jMonth= "July";
            break;
        case 8:jMonth= "August";
            break;
        case 9:jMonth= "September";
            break;
        case 10:jMonth= "October";
            break;
        case 11:jMonth= "November";
            break;
        case 12:jMonth= "December";
            break;
        }
var jNowString= "Scanned " + jMonth + " " + jNow.getDay() + ", " + jNow.getFullYear() + " " +
				jNow.getHours()  + ":" + jNow.getMinutes() + ":" + jNow.getSeconds();
				
return jNowString; 
};



//////////////////////////////////////////////////
//   function: chargeRecords
//     action: make product list in html
// parameters: localField is localHistory record name, history or favorite
//             idRecordsPlace is id name of records container in html body
//    returns: nothing 
//
// Author: Alireza Goodarzi
/////////////////////////////////////////////////////
function chargeRecords(localField,idRecordsPlace){
    if(localStorage.getItem(localField)){ // if there is nothing there will be NULL = false
    	if (localField == "history"){
    		var jbutton="+";
    		var jname="addFav";
    	}else{
    	    var jbutton="-";
    		var jname="delFav";
		}
    	var localData = JSON.parse(localStorage.getItem(localField));
//		console.log(localData);
		var item="";
		var jtemp="Go To Favorits";
		$.each(localData,function(key, value){
            item = item + "<li  class=\"table-view-cell media\">" +   //"<ul class=\"table-view\">" +
                            "<a id=\"" + localData[key].code_image + "Z\" name=\"simProd\" class=\"navigate-right\"><button  id=\"" + localData[key].code_image + "\" name=\"" + jname + "\" class=\"btn\">" + jbutton + "</button>" +
                            "<img class=\"media-object pull-left\" src=\"http://50.63.186.48/images_upc/" + localData[key].path_image + "\"" +
                                "<div class=\"media-body\">" +
                                    localData[key].desc_en +
                                    "<p>" + localData[key].form_en + "</p>" +
                                    "<p>" + localData[key].brand_en + "</p>" +
                                    "<p>" + scanDate(localData[key].tStamp) + "</p>" +
                                "</div>" +
                        "</a>" +
                    "</li>" ;
    	//	alert(localData[key].desc_en);
    	//	alert(localData[key].form_en);
    	});
    	           
    	$("#" + idRecordsPlace).html(item);
    }
};
































////////////////////////////////////
// function: find similar products base on category using an image code
// parameter: image code
// return: similar product json
// Author: Alireza Goodarzi
////////////////////////////////////
function similarProducts(imageCode,listHolderID){  	
	
	//var imageCode=localStorage.getItem('imageCode');   // imageCode from history
	//alert(imageCode);
	var localHistory = JSON.parse(localStorage.getItem('history'));
	var simProdJSON;
	var desc;
	var brand;
	var format;
	var id_category;
	$.each(localHistory,function(key, value){
		if(localHistory[key].code_image == imageCode) {
			desc 	    = localHistory[key].decr_en;
			brand 	    = localHistory[key].brand_en;
			format      = localHistory[key].form_en;
			id_categorie = localHistory[key].id_categorie;
			simProdJSON = call_elasticsearch_similar_products(desc,brand,format,id_categorie);
		}
	}); 	
	
	
	// add the product above of similar Items 
	getFromLocal(imageCode,'favorite');
	
	chargeSimilar(simProdJSON,listHolderID);
}







function chargeSimilar(simProdJSON,listHolderID){


	var enseigne;
	//alert(simProdJSON);
	enseigne= JSON.parse(localStorage.getItem('enseigne'));

//	$.getJSON("json/enseigne.json", function(jenseigne) {
  //  	enseigne=jenseigne;
    //	alert(JSON.stringify(enseigne));
	//});
	var item="";
		$.each(simProdJSON.hits.hits,function(key, value){
		var result = $.grep(enseigne, function(ens){ 
			return  ens.ei == simProdJSON.hits.hits[key]._source.e;
		});
            item = item + "<li  class=\"table-view-cell media\">" +   //"<ul class=\"table-view\">" +
                            "<a id=\"" + simProdJSON.hits.hits[key]._source.i + "Z\" name=\"simProd\" class=\"navigate-right\"><button  id=\"" + simProdJSON.hits.hits[key]._source.i + "\" name=\"addFav\" class=\"btn\">?</button>" +
                            //"<img class=\"media-object pull-left\" src=\"http://50.63.186.48/images_upc/" + localData[key].path_image + "\"" +
                              //"<img class=\"media-object pull-left\" src=\"http://mygrocerytour.com/images/correspondence.php?id_produit=" + simProdJSON.hits.hits[key]._source.i + "\" height=\"100\"  width=\"100\" style=\"margin-right: 5px\"  >" +
                                "<div class=\"media-body\">" +
                                    simProdJSON.hits.hits[key]._source.w +
                                    "<p>Product: " + simProdJSON.hits.hits[key]._source.x + "</p>" +
                                    //"<p>" + result[0].en + "</p>" +
                                    "<p><img src=\"http://www.mygrocerytour.ca/images/" + result[0].el + "\"></p>" +
                                    "<p>" + simProdJSON.hits.hits[key]._source.q + "</p>" +
                                    "<h style=\"background-color:red; color:black;  font-weight:bold; \">Special price: $" + simProdJSON.hits.hits[key]._source.s + "</h>" + 
                                    "<h>   Discount: " + simProdJSON.hits.hits[key]._source.b + "%</h>" +
                                "</div>" +
                        "</a>" +
                    "</li>" ;
    	});
	$("#" + listHolderID).html(item);
	//$("#Items").html(item);  
};




function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send(); 
}








//////////////////////////////////////
//   function: getEnseigne
//     action: reads static enseigne.json and set localStorage
// parameters: nothing
//    returns: nothing
///////////////////////////////////////
function getEnseigne(){
	if (!isSetObject('enseigne')){
		fetchJSONFile('json/enseigne.json', function(data){						
			setObject('enseigne', data);
			//localStorage.setItem('enseigne', data1);
			return data;
		// do something with your data
		//console.log(data1);
		});
	} else {
		return getObject('enseigne');
	}
};
	
//////////////////////////////////////
//   function: getCategorie
//     action: reads static enseigne.json and set localStorage
// parameters: nothing
//    returns: nothing
///////////////////////////////////////
function getCategorie(){
	if (!isSetObject('categorie')){		
		fetchJSONFile('json/categorie.json', function(data){			
		setObject('categorie', data);		
		return data;
		//--return the object?	
			//var data1=JSON.stringify(data);
			//localStorage.setItem('categorie', data1);
		// do something with your data
		//console.log(data1);
		});
	} else {
		return getObject('categorie');
	}
};
		
	
	
	
	
	
	

//========================================================================================
//== Call ajax vers ElasticSearch qui retourne les produits similaires courants. Le 
//== tableau de résultats se trouve dans "result.hits.hits"
//== En cas d'erreur, "result" est vide.
//== auteur : Alix Boc
//== date : mai 2014
//== version : 0.1
//========================================================================================
function call_elasticsearch_similar_products (desc,brand,format,id_categorie){
	
	var result = "";
	desc 	= encodeURI(desc);
	brand 	= encodeURI(brand);
	format 	= encodeURI(format);
	var query = 	{
					"size" : 10,					
					"query" :{
						"bool" : {
							"must" : {
								"fuzzy_like_this" : {
									"fields" : ["x","xe"],
									"like_text" : desc
								}
							},
							"must" : {
								"term" : { 
									"c" : id_categorie
								}
							},
							"should" : {
								"fuzzy_like_this" : {
									"fields" : ["q","qe"],
									"like_text" : format
								}
							},
							"should" : {
								"fuzzy_like_this" : {
									"fields" : ["w","we"],
									"like_text" : brand
								}
							}
						}
						
					}
				};
	$.ajaxSetup({async: false});
	$.get("http://www.trex.uqam.ca/es/_search?source=" + JSON.stringify(query)).success(function(data){
		console.log(data); 
		result = data;
	}).error(function(data){
	});
	
	return result;
}

//========================================================================================
//== Call ajax vers ElasticSearch qui retourne le meilleur produits similaires courants. Le 
//== tableau de résultats se trouve dans "result.hits.hits"
//== En cas d'erreur, "result" est vide.
//== auteur : Alix Boc
//== date : mai 2014
//== version : 0.1
//========================================================================================
function call_best_elasticsearch_similar_products (desc,brand,format,id_categorie){
	
	var result = "";
	desc 	= encodeURI(desc);
	brand 	= encodeURI(brand);
	format 	= encodeURI(format);
	var query = 	{
					"size" : 1,					
					"query" :{
						"bool" : {
							"must" : {
								"fuzzy_like_this" : {
									"fields" : ["x","xe"],
									"like_text" : desc
								}
							},
							"must" : {
								"term" : { 
									"c" : id_categorie
								}
							},
							"should" : {
								"fuzzy_like_this" : {
									"fields" : ["q","qe"],
									"like_text" : format
								}
							},
							"should" : {
								"fuzzy_like_this" : {
									"fields" : ["w","we"],
									"like_text" : brand
								}
							}
						}
						
					}
				};
	$.ajaxSetup({async: false});
	$.get("http://www.trex.uqam.ca/es/_search?source=" + JSON.stringify(query)).success(function(data){
		console.log(data); 
		result = data;
	}).error(function(data){
	});
	
	return result;
}


document.addEventListener('click', function(e) {
    var elementName=e.target.name;
    if (elementName == "addFav"){
    	addFavoriteItem(e.target.id);
    	var jhid="#" + e.target.id;
    	$(jhid).hide();
    }
    if (elementName == "simProd"){
    	var imageCodeZ=e.target.id; 
    	var imageCode=imageCodeZ.substring(0, imageCodeZ.length-1);  // to have uniq id’s we added an Z to the id of this item, here he cut this Z to obtain the real code
    	setSimilar(imageCode);
    }
});


function setSimilar(imageCode){

	localStorage.setItem('imageCode', imageCode);
	location.href="similar.html";

};



//////////////////////////////////////////////
//   function: getFromLocal
//     action: get a product from localStorage history or favorites
// parameters: imagrcode, localStprage field name: history or favorite
//    returns: json object of the product
//////////////////////////////////////////////

function getFromLocal(imageCode,localData){  
	//alert(localData);
	var result = $.grep(JSON.parse(localStorage.getItem(localData)), function(ens){ 
		return  ens.code_image == imageCode;
		});
		console.log();
		item = "<li  class=\"table-view-cell media\">" +   //"<ul class=\"table-view\">" +
					"<a id=\"" + result[0].code_image + "Z\" name=\"simProd\" class=\"navigate-right\">" +
					"<img class=\"media-object pull-left\" src=\"http://50.63.186.48/images_upc/" + result[0].path_image + "\"" +
						"<div class=\"media-body\">" +
							result[0].desc_en +
							"<p>" + result[0].form_en + "</p>" +
							"<p>" + result[0].brand_en + "</p>" +
							"<p>" + scanDate(result[0].tStamp) + "</p>" +
						"</div>" +
					"</a>" +
			"</li>" ;
    	//	alert(localData[key].desc_en);
    	//	alert(localData[key].form_en);
    	 //        alert(item);  
    	$("#Items").html(item);

		
	};


