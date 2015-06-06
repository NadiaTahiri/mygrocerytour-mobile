/*
 * Copyright (c) 2013, 9279-5749 Québec inc and/or its affiliates. All rights reserved.
 * Etienne Lord, Alix Boc
 * PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

//////////////////////////////////////////////////
//   
// This is the main list of functions for index.html
// Item are put in the index.html <div index_listItem >
// the product are keep in the mygrocerytour_products localStorage

//////////////////////////////////////////////////
//   VARIABLES

var index_products=[];    //--Main application products array
var current_product=[];   //--Current selected product for more information
var render_edit=false;
var refresh_done=false;

//////////////////////////////////////////////////
//   function: addProductToList
//     action: add a current product to our list of product
//    param:  scan_product (result of the scan)
//            to_add_product(product that the user want to add to his list)
//             favorite: true or false
// Author: Etienne Lord

function addProductToList(scan_product, to_add_product, favorite) {
	// TO DO: handle no product
	// TO DO: handle duplicate for similar	
	getProductList();
	var next_index=index_products.length;
	console.log("adding "+to_add_product.w);
	//--CASE 1. Do we have the product?	
	//console.log(scan_product[0].code_image);
	var result = $.grep(index_products, function(ens){ return  ens[0][0].code_image == scan_product[0].code_image; });
	if (result.length>0) {
		console.log("Found "+scan_product[0].code_image);		
		//--Get position
		for (var key in result) {
			var index=index_products.indexOf(result[key]);
			if (index>-1) {
				//--Replace
				index_products[index]=[];
				index_products[index][0]=scan_product;
				index_products[index][1]=to_add_product;		
				index_products[index][2]={"time":getTimeStamp(),"favorite":favorite};		
			}
		}		
	} else {
		index_products[next_index]=[];
		index_products[next_index][0]=scan_product;
		index_products[next_index][1]=to_add_product;		
		index_products[next_index][2]={"time":getTimeStamp(),"favorite":favorite};		
	}
	//console.log(index_products);
	//--Update object
	setObject("mygrocerytour_products",index_products);
	//renderProductList();
	return true;
}

///////////////////////////////////////////////////
// Debug function to create a fake product list
// Author: Etienne Lord
function createDebugList() {
	//--Get a list of scanned items
	getProductList();
	if (index_products.length==0) {
		var scanned_item=["060000801007","058807388135","065633073821","737628046508","083820123609"];
		for (var key in scanned_item) {
			var to_add=searchDebugProduct(scanned_item[key]);		
		}
	}		
}

function searchDebugProduct(barcode){   
	$.ajax({
        	type: 'GET',
           	url: 'http://50.63.186.48/mobile/upc.php',
           	data:{ 
           		action: "search", 
           		upc: barcode 
           		},
           	cache: false,
           	datatype: 'json',
           	success: function(output){
            	var prods=JSON.parse(output);
				//console.log(prods);
				var hit=[];
				if (prods[0].code_image!=-1) {
					var simProdJSON = call_elasticsearch_similar_products(prods[0].desc_en,prods[0].brand_en,prods[0].form_en, prods[0].id_categorie, 1);									
					if (simProdJSON.hits.total>0&&simProdJSON.hits.max_score>10) {
						//console.log(barcode+" "+simProdJSON.hits.total);
						simProdJSON.hits.hits[0]._source['score']=simProdJSON.hits.hits[0]._score;
						//console.log(simProdJSON.hits.hits[0]._source);
						hit=simProdJSON.hits.hits[0]._source;
						var tmp=[];
						tmp[0]=prods[0];
						tmp[1]=hit;	
						tmp[2]={"time":getTimeStamp(),"favorite":false};	
						addProductToList(prods, hit, false);	
						return tmp;	
					} else if (simProdJSON.hits.total>0) {
						var tmp=[];
						tmp[0]=prods[0];
						tmp[1]=hit;	
						tmp[2]={"time":getTimeStamp(),"favorite":false};	
						addProductToList(prods, [], false);	
						return tmp;	
					}
					//similarProducts(prods[0].code_image,"similarItems");
								
					
				}
				
			}	
           });
	return [];		
};

function edit() {
	render_edit=!render_edit;
	if (render_edit) {
		//$("#index_EditButton").css("background-color","rgb(255,255,255);");
		
		$("#index_EditButton").html("<n>Done</b>");
	} else {
		//$("#index_EditButton").css("background-color","rgb(250,229,7);");
		
		$("#index_EditButton").html("Edit");
	}
	refresh_done=false;
	renderProductList();

}

//////////////////////////////////////////////////
//   function: refresh
//     action: ask to server for a new list of similar product
//    param:  
// Author: Etienne Lord
function refresh() {
	getProductList();
	var next_index=index_products.length;
	//--render the scanned product here...
	var html="<ul class='table-view'>";
		html+="<li id='info_tab' class='table-view-cell table-view-divider'>Refreshing grocery list...</li>";					
			for (var key in index_products) {
				var pt=index_products[key][0][0];				
				html+="<li id='info_tab"+key+"' class='table-view-cell' style='' >"+pt.brand_en.toUpperCase()+"&nbsp;"+pt.desc_en +"&nbsp;<span style='position:fixed;padding-left: 10px;'></span></li>";								
			}
		
	html+="</ul>";		
	$("#index_NoItemList").hide();		
	$("#index_ItemList").html(html);
	$("#index_ItemList").show();
	
	for (var i=0; i<index_products.length;i++) {
		var pt=index_products[i];
		// if (isDefine(pt[1].xe)) {
			// //--CASE 1. SELECTED PRODUCT
				// console.log(pt[1]);
				// var simProdJSON = call_elasticsearch_similar_products(pt[1].xe,pt[1].we,pt[1].qe, pt[1].c, 1);	
				// //console.log(simProdJSON);
				// if (simProdJSON.hits.total>0&&simProdJSON.hits.max_score>10) {
				// //console.log(barcode+" "+simProdJSON.hits.total);
					// simProdJSON.hits.hits[0]._source['score']=simProdJSON.hits.hits[0]._score;
					// //console.log(simProdJSON.hits.hits[0]._source);
					// hit=simProdJSON.hits.hits[0]._source;
					// var tmp=[];
					// tmp[0]=pt[0];					
					// tmp[1]=hit;	
					// tmp[2]={"time":getTimeStamp(),"favorite":pt[2].favorite};	
						// console.log(hit);
					// addProductToList(tmp[0], tmp[1], tmp[2]);			
				// } 		
		// } else {
			// //--CASE 2. Scanned product
			console.log(pt[0][0]);
			var simProdJSON = call_elasticsearch_similar_products(pt[0][0].desc_en,pt[0][0].brand_en,pt[0][0].form_en, pt[0][0].id_categorie, 1);									
			if (simProdJSON.hits.total>0&&simProdJSON.hits.max_score>10) {
				//console.log(barcode+" "+simProdJSON.hits.total);
				simProdJSON.hits.hits[0]._source['score']=simProdJSON.hits.hits[0]._score;
				//console.log(simProdJSON.hits.hits[0]._source);
				var hit=simProdJSON.hits.hits[0]._source;
				var tmp=[];
				tmp[0]=pt[0];
				tmp[1]=hit;	
				tmp[2]={"time":getTimeStamp(),"favorite":pt[2].favorite};	
				console.log(hit.score);
				console.log(hit);
				addProductToList(tmp[0], tmp[1], tmp[2]);			
			} else {
				var tmp=[];
				tmp[0]=pt[0];
				tmp[1]=[];	
				tmp[2]={"time":getTimeStamp(),"favorite":pt[2].favorite};	
				addProductToList(tmp[0], tmp[1], tmp[2]);	
			}
		//}
	}
	refresh_done=true;
	//$("#index_refreshButton").html("Done");
	renderProductList();
}



//////////////////////////////////////////////////
//   function: removeProductFromList
//     action: Remove a current product to our list of product
//    param:  to_remove_product_id
// Author: Etienne Lord

function removeProductFromList(to_remove_product_id) {	
	getProductList();
	console.log(to_remove_product_id);
		//CASE 1. code produit
	to_remove_product_id=""+to_remove_product_id;
	if (to_remove_product_id.length>20) {
		var result = $.grep(index_products, function(ens){ return  ens[1].i == to_remove_product_id; });
		if (result.length>0) {
			var index=index_products.indexOf(result[0]);
			index_products.splice(index,1);
		}
	} else {
		//CASE 2. code upc
		var result = $.grep(index_products, function(ens){ return  ens[0][0].code_image == to_remove_product_id; });
		if (result.length>0) {
			var index=index_products.indexOf(result[0]);
			index_products.splice(index,1);
		}
	}
	
	setObject("mygrocerytour_products",index_products);
	renderProductList();
	return true;
}

function removeAllProductFromList() {	
	setObject("mygrocerytour_products",[]);
	renderProductList();
}
//////////////////////////////////////////////////
//   function: getProductList
//   action:get the current product to our list of product
//          from localStorage
// Author: Etienne Lord

function getProductList() {
	index_products=getObject("mygrocerytour_products");
	if (index_products==null) {
		index_products=[];
		setProductList();
	}
	
	var tmp={};
	//--Remove duplicate
	//console.log(index_products);
	// for (var key in index_products) {
		// //console.log(index_products[key][0][0]);
		// var p=index_products[key][0][0];		
		// if (!isDefine(tmp[p.code_image])) { 
			// //console.log("t");
			// tmp[p.code_image]=1;		
		// } else {
			// //console.log("t2");
			// tmp[p.code_image]++;
		// }
	// }
	//console.log(tmp);
	//--Remove duplicate
	// for (var i=index_products.length-1;i>-1;i--) {
		// var p=index_products[i][0][0];
		// if (p.code_image=="") {
			// index_products.splice(i,1);	
		// }		
		// if (!isDefine(tmp[p.code_image])) { 		
			// tmp[p.code_image]=1;		
		// } else {
			// index_products.splice(i,1);				
		// }
	// }
	//console.log(index_products);
	return index_products;
	//return true;
}

function setProductList() {
	setObject("mygrocerytour_products",index_products);
}

/////////////////////////////////////////////////
// Show / Hide list

function showhide(id) {
	if ($('#'+id).css('display') == 'none') {
		$('#'+id).show();
	} else {
		$('#'+id).hide();
	}
}

//////////////////////////////////////////////////
//   function: renderProductList
//   action: render to the index.html <div index_listItem >
//           the current list of objects.
//  Note: this need to be called from the function YYYY
// Author: Etienne Lord

function renderProductList() {
	//--We need the enseigne
	//--We need the user product
	var enseigne=getEnseigne();   //--From common.js
	var categorie=getCategorie(); //--From common.js
	var product=getProductList(); //--From this 
	var Franchise=getFranchise(); //--From profile.js
	console.log(Franchise);
	//--CASE 1. We don't have product
	if (!isDefine(product)||product.length==0) {
		$("#index_NoItemList").show();
		$("#index_ItemList").hide();
	} else {
	
	//--CASE 2. We have
		//--Create a tmp list with only the current product
		
		
		//--Add enseigne info to product
		for (var i=0;i<product.length;i++) {
			var pt=product[i][1];	
			if (isDefine(pt)) {
				//--categorie
					var cat=$.grep(categorie, function(p){ return  p.ci == pt.c});
					if (isDefine(cat)&&cat.length>0) {
						//console.log(cat);
						product[i][1].ci=pt.i;
						product[i][1].cne=cat[0].cne;
						product[i][1].cnf=cat[0].cnf;
					}
					var ens=$.grep(enseigne, function(p){ return  p.ei == pt.e});
					if (isDefine(ens)&&ens.length>0) {
						//console.log(cat);
						product[i][1].el="img/images/"+ens[0].el;
						product[i][1].en=ens[0].en;
						product[i][1].ep=ens[0].ep;
					}
				//--Sort by enseigne
			
				//--We have franchise distance?			
				if (isDefine(Franchise.franchise_distance)&&isDefine(Franchise.franchise_distance.v)) {
					var fr=$.grep(Franchise.franchise_distance.v, function(p){ return  p.ei == pt.e});			
					//--Take the first...
					if (isDefine(fr)&&fr.length>0) {
						product[i][1].a=fr[0].a; //-- Franchise adresse
						product[i][1].fi=fr[0].fi; //--Franchise id
						product[i][1].la=fr[0].la;
						product[i][1].lo=fr[0].lo;
						product[i][1].v=fr[0].v; //--Vol d'oiseau
					}				
				}			
			}								
			//var tmp=[];
			//result.sort(function(a,b) { return b.b-a.b;});
		}
		if (isDefine(Franchise.franchise_distance)&&isDefine(Franchise.franchise_distance.v)) {
			console.log("Sorting by franchise distance");
			product.sort(function(a,b) { return a[1].v-b[1].v;});
		} else {
			product.sort(function(a,b) { return a[1].e-b[1].e;});
		}
		
		//--Render the list
		
		var html="";
		if (render_edit&&!refresh_done) {			
			html+="<button id='index_refreshButton' onclick='refresh();' style='padding: 10px;' class='btn btn-positive btn-block'>Refresh weekly special <span class='glyphicon glyphicon-refresh'></span></button>";
		} else if (refresh_done) {
			html+="<button id='index_refreshButton' onclick='refresh();' style='padding: 10px;' class='btn btn-positive btn-block'>Special up to date <span class='glyphicon glyphicon-refresh'></span></button>";
		}
		html+="<ul class='table-view'>";
		var current_enseigne="";
		
		var li_id=0;
		var tmp_notfound=[];
		for (var i=0; i<product.length;i++) {
			var pt=product[i];
			//--Add new enseigne
			if (isDefine(pt[1].xe)) {
					if (pt[1].e!=current_enseigne) {
						current_enseigne=pt[1].e;
						//--Case 1 - We have distance
						if (isDefine(pt[1].a)) {
							html+="<li id='info_tab"+li_id+"' class='table-view-cell table-view-divider'><img src='"+pt[1].el+"'></img><button onclick=\"showhide('info_tab"+(li_id+1)+"');\" class='btn icon icon-bars' style='background: rgba(0, 0, 0, 0);border: none;color: rgb(128, 128, 128);'></button> "+round100(pt[1].v)+" km</li>";
							html+="<li id='info_tab"+(li_id+1)+"' style='padding:7px;background:rgb(220, 220, 220);display:none;'>";
							html+=pt[1].a;
							html+="</li>";			
						} else {
						//--Case 2 - No distance
							html+="<li id='info_tab"+li_id+"' class='table-view-cell table-view-divider'><img src='"+pt[1].el+"'></img></li>";						
						}
						li_id+=2;
					} 
					//--Add product
					if (render_edit) {					
						//html+="<li id='info_tab"+li_id+"' class='table-view-cell' style='' ><a class='navigate-right' onclick=\"setProductIndex('"+pt[1].i+"');\">"+pt[1].we.toUpperCase()+"&nbsp;"+truncate(pt[1].xe,15) + "&nbsp;<span style='position:fixed;padding-left: 10px;'><b>"+pt[1].s+" $</b></span></a></li>";
						html+="<li id='info_tab"+li_id+"' class='table-view-cell' style='' >"+pt[1].we.toUpperCase()+"&nbsp;"+truncate(pt[1].xe,15) + "&nbsp;<span style='position:fixed;padding-left: 10px;'><b>"+pt[1].s+" $</b></span><button class='btn btn-negative' onclick=\"removeProductFromList('"+pt[1].i+"');\"><span class='glyphicon glyphicon-trash'></span></button></li>";
					} else {
					    html+="<li id='info_tab"+li_id+"' class='table-view-cell' style='' ><a class='navigate-right' onclick=\"setProductIndex('"+pt[1].i+"');\">"+pt[1].we.toUpperCase()+"&nbsp;"+truncate(pt[1].xe,15) + "&nbsp;<span style='position:fixed;padding-left: 10px;'><b>"+pt[1].s+" $</b></span></a></li>";
						//html+="<li id='info_tab"+li_id+"' class='table-view-cell' style='' >"+pt[1].we.toUpperCase()+"&nbsp;"+truncate(pt[1].xe,15) + "&nbsp;<span style='position:fixed;padding-left: 10px;'><b>"+pt[1].s+" $</b></span><button class='btn btn-negative'><span class='glyphicon glyphicon-trash'></span>delete</button></li>";
					}
					li_id++;
			} else {
			//--This product was not found or is not associated
				tmp_notfound.push(product[i]);
			}
		}
		if (tmp_notfound.length>0) {
			html+="<li id='info_tab"+li_id+"' class='table-view-cell table-view-divider'>Not in special this week</li>";			
			li_id++;
			for (var key in tmp_notfound) {
				var pt=tmp_notfound[key][0][0];				
				if (render_edit) {		
				html+="<li id='info_tab"+li_id+"' class='table-view-cell' style='' >"+pt.brand_en.toUpperCase()+"&nbsp;"+pt.desc_en +"&nbsp;<span style='position:fixed;padding-left: 10px;'></span><button class='btn btn-negative' onclick=\"removeProductFromList('"+pt.code_image+"');\"><span class='glyphicon glyphicon-trash'></span></button></li>";				
				} else {
				html+="<li id='info_tab"+li_id+"' class='table-view-cell' style='' ><a class='navigate-right'>"+pt.brand_en.toUpperCase()+"&nbsp;"+pt.desc_en +"&nbsp;<span style='position:fixed;padding-left: 10px;'></span></a></li>";					
				}
				li_id++;
			}
		}
		
			html+="</ul>";	
			if (render_edit) {
			html+="<button onclick='removeAllProductFromList();' class='btn btn-outlined btn-block' style='padding: 10px;'>Remove all items <span class='glyphicon glyphicon-trash'></span></button>";
			}			
			$("#index_NoItemList").hide();		
			$("#index_ItemList").html(html);
			$("#index_ItemList").show();				
	}
		
	
	
}

function setProductIndex(product_id){		
		setObject('product_id', product_id);
		//--Find the object
		 var result=$.grep(index_products, function(ens){ return  ens[1].i == product_id });		
		 if (result.length>0) {			
			setObject("current_product",result[0][1]);
			console.log(getObject("current_product"));
			window.location="product.html";
		 } 
		 
		
};		


function scanDate(milisec){
var jNow = new Date(milisec);
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
var jNowString= "Scaned on " + jMonth + " " + jNow.getDay() + ", " + jNow.getFullYear() + "  at " +
				jNow.getHours()  + ":" + jNow.getMinutes() + ":" + jNow.getSeconds();
				
return jNowString; 
};





