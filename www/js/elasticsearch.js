//========================================================================================
//== Call ajax vers ElasticSearch qui retourne les produits similaires courants. Le 
//== tableau de résultats se trouve dans "result.hits.hits"
//== En cas d'erreur, "result" est vide.
//== auteur : Alix Boc
//== date : mai 2014
//== version : 0.2
//== 
//== ajout des parametres id_database (id) et id_categorie (c), 
//========================================================================================
function call_elasticsearch_similar_products (desc,brand,format,id_categorie,id_database, callback){
	var result = "";
	
	console.log(desc,brand,format,id_categorie,id_database);
	
	desc 	= encodeURI(desc);
	brand 	= encodeURI(brand);
	format 	= encodeURI(format);
	var query;
	
	var query_ = 	{
					"size" : 10,					
					"query" :{
						"bool" : {
							"must" : {
								"fuzzy_like_this" : {
									"fields" : ["x","xe"],
									"like_text" : desc
								},
								"boost" : 2.0
							},
							"should" : {
								"term" : { 
									"c" : id_categorie
								},
								"boost" : 2.0
							},
							"must" : {
								"term" : { 
									"id" : id_database
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
									"like_text" : brand,
									"boost" : 2.0
								}
							}
						}
						
					}
				};
				
		if(id_categorie == 24){
			query = 	{
					"size" : 10,					
					"query" :{
						"bool" : {
							"must" : [
								{
									"fuzzy_like_this" : {
										"fields" : ["x","xe"],
										"like_text" : desc,
										"boost":2.0
									}
								},
								{
									"term" : { 
										"id" : id_database
									}
								}
							]
							,
							"should" : [
								{
									"fuzzy_like_this" : {
										"fields" : ["q","qe"],
										"like_text" : format
									}
								},
								{
									"fuzzy_like_this" : {
										"fields" : ["w","we"],
										"like_text" : brand,
										"boost":2.0
									}
								}
								
							]
						}
						
					}
				};
			}
			else{
				query = 	{
					"size" : 10,					
					"query" :{
						"bool" : {
							"must" : [
								{
									"fuzzy_like_this" : {
										"fields" : ["x","xe"],
										"like_text" : desc,
										"boost":2.0
									}
								},
								{
									"term" : { 
										"id" : id_database
									}
								},
								{
									"term" : { 
										"c" : id_categorie
									}
								}
							]
							,
							"should" : [
								{
									"fuzzy_like_this" : {
										"fields" : ["q","qe"],
										"like_text" : format
									}
								},
								{
									"fuzzy_like_this" : {
										"fields" : ["w","we"],
										"like_text" : brand,
										"boost":2.0
									}
								}
								
							]
						}
						
					}
				};
			}
	$.ajaxSetup({async: false});
	$.get("http://www.trex.uqam.ca/es/_search?source=" + JSON.stringify(query)).success(function(data){
		//console.log(data); 
		//result = data;
		//alert("here");
		callback(data);
		//result=JSON.parse('[{"took":37,"timed_out":false,"_shards":{"total":5,"successful":5,"failed":0},"hits":{"total":959,"max_score":10.257487,"hits":[{"_index":"vps","_type":"product","_id":"1401963162671344809_02_1841","_score":10.257487,"_source":{"w":"Aylmer","r":"2.13","d":"1402459200000","x":"Betteraves rosebud","we":"Aylmer","id":"1","qe":"398 ml ($0.37/100ML)","i":"1401963162671344809_02_1841","e":"2","ze":"398 ml ($0.37/100ML)","s":"1.49","c":"24","b":"30","q":"398 ml (0,37 $/100ML)","xe":"Beets (rosebud)","z":"398 ml (0,37 $/100ML)","score":10.257487}}]}}]');
		//console.log(result);
		
	}).error(function(data){
		callback();
	});
	
		return result;
	
}