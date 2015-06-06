/*
 * Copyright (c) 2013, 9279-5749 Québec inc and/or its affiliates. All rights reserved.
 * Etienne Lord, Alix Boc
 * PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

	////////////////////////////////////////
	// VARIABLES
	var current_profile={
						codePostal:"",
						franchise: [],
						loaded: false					
						 }; //--Current user profile
		
	////////////////////////////////////////
	// CONSTRUCTOR
 
	function init() {	
		if (isSetObject("current_profile")) {
			setObject("current_profile", current_profile);
		} else {
			current_profile.loaded=true;			
		}
	}
	//init(); //--Call the constructor
	
	////////////////////////////////////////
	// This return and store in the profile 
	// the franchise near the user
	// e.g. http://50.63.186.48/get_new_codepostal.php?adr=J3b6N7&nocallback
	function getFranchise(codePostal) {
			var start= new Date(); 
				console.log("loadFranchise ("+codePostal+")");
				console.log(JSON.stringify(current_profile));
				codePostal=filterPostalCode(codePostal);
				
				
				if (codePostal==current_profile.codePostal) {										
					return;
				}
				current_profile.codePostal=codePostal;	
						
				//url: 'http://50.63.186.48/get_new_codepostal.php?adr='+codePostal+'&nocallback',				
				$.ajax({									
							method: 'POST',									
							crossDomain: true,					
							data: {},
							headers: {'Content-Type': 'application/x-www-form-urlencoded'},									
							url: 'http://50.63.186.48/get_new_codepostal.php?adr='+codePostal+'&nocallback'
							}).success(function(d) {								 
								 var end =  new Date();  // log end timestamp
								 var diff = end - start;																							
								 console.log(d); 
								 console.log("Loading franchise end "+diff+" ms");
								 current_profile.franchise=d;								 
								 setObject("current_profile", current_profile);
							}).error(function(d){
								console.log(d);
							});		
	}
	
	function filterPostalCode(data) {							
			if (!isDefine(data)) return data;
			if (data.length<6) return data;
			data=data.toUpperCase();
			data=data.replace(' ','');			
			var str=data;
			if (str.length==6) {
				str=data.substring(0,3)+' '+data.substring(3,6);
			}		
			data=str;
			return data;
        };
	
	function getFranchise() {
		if (isSetObject("current_profile")) {
			current_profile=getObject("current_profile");
			return current_profile.franchise;
		} else {
			return [];
		}		
	}
	
	
	$(function(){
    	$("#button_locateme").click(function(event){
        	getFranchise($("#postalcode").val());
    	});
    });
	
	

	
	
