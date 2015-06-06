
function showSelectedSimilarProduct(){
		var similarProd = getObject('current_product');	
		var selectedProduct = getObject('product_id');
		var enseigne= getObject('enseigne');		
		console.log(similarProd);
		var result = $.grep(enseigne, function(ens){ 
			return  ens.ei == similarProd.e;
		});
		
		var item=""; //--Rendering item		
		jprod_image   = '<center><img src="http://mygrocerytour.com/images/correspondence.php?id_produit=' + selectedProduct + '"></center>';
		
		jbrand        = upperTemp(similarProd.w) + "   ";
		jdesc         = '<h style="color:black; font-weight:bold;">' + similarProd.x + '  </h>'; 	
		jquantite     = similarProd.q + "   ";		
		jmagasin      = result[0].en;
		jmagasin_logo = '<img src="http://www.mygrocerytour.ca/images/' + result[0].el + '">';
		jprix         = '<h style="color:black; font-weight:bold;">  $' + similarProd.s + ' </h>'; 
		jdiscount     = '<h style="color:red; "> (' + similarProd.b + '%)</h>';
		jP1='<p>' + jmagasin_logo + '</p>';
		jP2='<p>' +jbrand +"&nbsp;"+ jdesc  + '</p>';
		jP3='<p>' + jquantite + jprix + jdiscount + '<p>' 
            item = item + "<li  class=\"table-view-cell media\">" +   //"<ul class=\"table-view\">" +
                            "<a id=\"" + similarProd.i + "\" name=\"infProd\" class=\"navigate-right\">" + //event listener
                                "<div class=\"media-body\">" +
                           			
                           			jprod_image + jP1 + jP2 + jP3;
                           
                                "</div>" +
                        "</a>" +
                    "</li>" ;
        $("#item").html(item);
};




