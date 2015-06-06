/* use high programming standards!! */

function debug(){
var i = 0, //i is standing for int
    oJson = {}, //o is standing for object
    sKey; //s is standing for string
while ((sKey = window.localStorage.key(i))) {
    oJson[sKey] = window.localStorage.getItem(sKey);
    i++;
};
var item="";

$.each(oJson,function(key, value){
	item= item + "<p>" + key + "    "  + oJson[key] + "</p>";
	});
$("#vars").html(item);

console.log(oJson);
}