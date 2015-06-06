/*!
 * ================================================
 * footer.js
 * footer bottuns of the pages.
 * by Alireza.
 *
 * =====================================================
 */

function pageFooter(){

var jFooter='<a class="tab-item active" href="#">\n ' +
				'<span id="favoriteButton" class="icon icon-bars"><\/span>\n  ' +
				'<span class="tab-label">Favorates<\/span>\n  ' +
			'<\/a>\n  ' +
			'<a class="tab-item" href="#">\n     ' +
				'<span id="historyButton" class="icon icon-refresh"><\/span>\n  ' +  
				'<span class="tab-label">History<\/span>\n  ' +
			'<\/a>\n  ' +
			'<a  class="tab-item" href="#">\n      ' +
				'<span id="scanButton" class="icon icon-star-filled" onclick="barcodeScan()" ><\/span>\n   ' +     
				'<span  class="tab-label" onclick="searchProduct("068400036128")" >Scan<\/span>  \n  ' +
			'<\/a>\n  ' +
			'<a class="tab-item" href="#">\n    ' +
				'<span id="locationButton" class="icon icon-search"><\/span>\n  ' +  
				'<span class="tab-label">Localisation<\/span>\n  ' +
			'<\/a>\n  ' +
			'<a class="tab-item" href="#">\n    ' +
				'<span class="icon icon-gear"><\/span>\n    ' +
				'<span class="tab-label">Settings<\/span>\n  ' +
			'<\/a>\n';
			//console.log(jFooter);
$("#footer").html(jFooter);
}


$(document).on("click", "#historyButton", function(){ 
	location.href="history.html";
	});	
	
	
$(document).on("click", "#favoriteButton", function(){ 
	location.href="favorite.html";
	});	


$(document).on("click", "#locationButton", function(){ 
	location.href="debug.html";
	});	

//$(document).on("click", "#scanButton", function(){ 
//	location.href="scan.html";
//	});	