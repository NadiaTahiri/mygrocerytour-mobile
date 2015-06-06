
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
function chargeRecords000(localField,idRecordsPlace){
	alert("here");

    if(localStorage.getItem(localField)){ // if there is nothing there will be NULL = false
//    	if (localField == "history"){
//    		var jbutton="+";
//    		var jname="addFav";
//    	}else{
//    	    var jbutton="-";
//    		var jname="delFav";
//		}
    	var localData = JSON.parse(localStorage.getItem(localField));
//		console.log(localData);
		var item="";
		var jtemp="Go To Favorits";
		$.each(localData,function(key, value){
            item = item + "<li  class=\"table-view-cell media\">" +   //"<ul class=\"table-view\">" +
                            "<a id=\"" + localData[key].code_image + "Z\" name=\"simProd\" class=\"navigate-right\">" +  //<button  id=\"" + localData[key].code_image + "\" name=\"" + jname + "\" class=\"btn\">" + jbutton + "</button>" +
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
			desc 	    = localHistory[key].desc_en;
			brand 	    = localHistory[key].brand_en;
			format      = localHistory[key].form_en;
			id_categorie = localHistory[key].id_categorie;
			id_database = 1;
			
			call_elasticsearch_similar_products(desc,brand,format,id_categorie,id_database, function(simProdJSON){
			   
			   setObject("product",simProdJSON);
			   chargeSimilar(simProdJSON,listHolderID); 
			 });

			//simProdJSON=JSON.parse('{"took":37,"timed_out":false,"_shards":{"total":5,"successful":5,"failed":0},"hits":{"total":959,"max_score":10.257487,"hits":[{"_index":"vps","_type":"product","_id":"1401963162671344809_02_1841","_score":10.257487,"_source":{"w":"Aylmer","r":"2.13","d":"1402459200000","x":"Betteraves rosebud","we":"Aylmer","id":"1","qe":"398 ml ($0.37/100ML)","i":"1401963162671344809_02_1841","e":"6","ze":"398 ml ($0.37/100ML)","s":"1.49","c":"24","b":"30","q":"398 ml (0,37 $/100ML)","xe":"Beets (rosebud)","z":"398 ml (0,37 $/100ML)","score":10.257487}}]}}');
			
			
		}
	}); 	
	
	
	// add the product above of similar Items 
	//getFromLocal(imageCode,'favorite');
	
	
}







function chargeSimilar(simProdJSON,listHolderID){
	var enseigne;

	enseigne= JSON.parse(localStorage.getItem('enseigne'));
	//console.log(enseigne);
	var item="";
		$.each(simProdJSON.hits.hits,function(key, value){
		var result = $.grep(enseigne, function(ens){ 
			return  ens.ei == simProdJSON.hits.hits[key]._source.e;
		});
		jdesc         = '<h style="color:black; font-weight:bold;">' + subTemp(simProdJSON.hits.hits[key]._source.x) + '  </h>'; 
		jbrand        = upperTemp(simProdJSON.hits.hits[key]._source.w) + "   ";
		jquantite     = simProdJSON.hits.hits[key]._source.q + "   ";
		jmagasin      = result[0].en;
		jmagasin_logo = '<img src="http://www.mygrocerytour.ca/images/' + result[0].el + '">';
		jprix         = '<h style="color:black; font-weight:bold;">  $' + simProdJSON.hits.hits[key]._source.s + ' </h>'; 
		jdiscount     = '<h style="color:red; "> (' + simProdJSON.hits.hits[key]._source.b + '%)</h>';

		jP1='<p>' + jmagasin_logo + '</p>';
		jP2='<p>' + jdesc  + jbrand + '</p>';
		jP3='<p>' + jquantite + jprix + jdiscount + '<p>' 
            item = item + "<li  class=\"table-view-cell media\">" +   //"<ul class=\"table-view\">" +
                            "<a id=\"" + simProdJSON.hits.hits[key]._source.i + "\" name=\"infProd\" class=\"navigate-right\" onclick=\"setProduct('"+simProdJSON.hits.hits[key]._source.i+"')\" >" + //event listener
                                "<div class=\"media-body\">" +
                           			
                           			jP1 + jP2 + jP3;
                           
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
	if (!localStorage.getItem('enseigne')){
		fetchJSONFile('http://www.mygrocerytour.ca/enseigne.json', function(data){
			var data1=JSON.stringify(data);
			localStorage.setItem('enseigne', data1);
		// do something with your data
		console.log(data1);
		});
	}
};
	
	
	
	
	
	
	
	

///////////////////////
//Event listener

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
    //if (elementName == "infProd"){
    		//e.stopPropagation();
    //	var product_id=e.target.id; 
    //	setProduct(product_id);
    //}




});


function setProduct(product_id){
		console.log(product_id);
		setObject('product_id', product_id);
		var similarList=getObject("product");
		
		//console.log(selectedProduct);
			var result = $.grep(similarList.hits.hits, function(ens){ 
				//return  (""+ens._id) == (""+selectedProduct);
				return  ens._id == product_id;
			});		
		//console.log(result);
		if (result.length>0) {			
			setObject("current_product",result[0]._source);						
			window.location="product.html";
		}		
};

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


function subTemp(jStr){
	if (jStr.length> 25){
		return jStr.substr(0,25) + "...";
		}
}

function upperTemp(jStr){
	return jStr.toUpperCase();
}



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
/*    	if (localField == "history"){
    		var jbutton="+Fav";
    		var jname="addFav";
    	}else{
    	    var jbutton="-";
    		var jname="delFav";
		}  */

    	var localData = JSON.parse(localStorage.getItem(localField));
		console.log(localData);
		var item="";
		var jtemp="Go To Favorits";
		$.each(localData,function(key, value){
            item = item + "<li  class=\"table-view-cell media\">" +   //"<ul class=\"table-view\">" +
                            "<a id=\"" + localData[key].code_image + "Z\" name=\"simProd\" class=\"navigate-right\">" + //<button  id=\"" + localData[key].code_image + "\" name=\"" + jname + "\" class=\"btn\">" + jbutton + "</button>" +
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






/*
$(document).on("click", "#historyButton", function(){ 
	location.href="history.html";
	});	
	
	
$(document).on("click", "#favoriteButton", function(){ 
	location.href="favorite.html";
	});	

$(document).on("click", "#listButton", function(){ 
	location.href="list.html";
	});	
	
	
$(document).on("click", "#locationButton", function(){ 
	location.href="debug1.html";
	});	

$(document).on("click", "#scanButton", function(){ 
	location.href="scan.html";
	});	*/

	
	
	
	
    //<button  id=\"" + simProdJSON.hits.hits[key]._source.i + "\" name=\"addFav\" class=\"btn\">?</button>" 