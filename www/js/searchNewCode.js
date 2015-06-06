





function addLocalStorage(){
    $.ajax({   
           url: 'http://50.63.186.48/upc.php',
           data: { action: "search", upc: "062884520012" },
           //data: { action: "search", upc: barcode },
           type: 'GET',
           datatype: 'json',
           success: function(output)
	           {
     	      	var localData = JSON.stringify(output);
	         	localStorage.setItem('history', localData);
    	       }
           });

}


function historyValidator(){
    var result=true;
    //var localData = JSON.parse(localStorage.getItem('history'));
    if (!localStorage.getItem('history')) {  // if there is nothing there will be NULL = false
    	result = false;
    	}
    return result;
};


function coderepository(){
    $.ajax({
          url: 'http://your-app.com/api/news/12',
          dataType: 'JSON',
          success: function(data, status) {
          $.each(data, function(key, value){
                 //handle the data
                 });
          var localData = JSON.stringify(data);
          localStorage.setItem('newsArticle12', localData);
          },
          error: function() {
          //handle the error
          }
           

    
    
    //access the data
    //var localData = JSON.parse(localStorage.getItem('newsArticle12');

    //$.each(function(key, value){
            //handle the data
    //       }
           });


};