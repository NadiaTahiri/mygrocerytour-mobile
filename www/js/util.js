/////////////////////////////////////////////////////////////////
		// GLOBAL VARIABLES
		var width=0;
		var height=0;
		
		try {
			var w_1 = window,d_1 = document,e_1 = d_1.documentElement,g_1 = d_1.getElementsByTagName('body')[0],width = w_1.innerWidth || e_1.clientWidth || g_1.clientWidth,	height = w_1.innerHeight|| e_1.clientHeight|| g_1.clientHeight;
		} catch(e) {console.log(e);}
		/////////////////////////////////////////////////////////////////
		// LOCAL STORAGE AND SAVE SESSION
		//
		function getLocalStorage(name,defaultValue){
   			if( localStorage.getItem(name) == null) {
				localStorage.setItem(name,defaultValue);
			}
			return localStorage.getItem(name);
   		}
   		
   		function setLocalStorage(name,value){
   			localStorage.setItem(name,value);
   		}
		
		function isSetObject(key) {
				var value = localStorage.getItem(key);
				return (value==null?false:true); 
		}
		
		
		function setObject(key, value) {
				//-- Sample Etienne
				// Get the data directory, creating it if it doesn't exist.
				// dataDir = fileSystem.root.getDirectory("data", {create: true});
				//file = dataDir.getFile(key, {create: true, exclusive: false});
				// file.createWriter(function(writer) {writer.seek(0);writer.write(JSON.stringify(value));},null);
				
				localStorage.setItem(key, JSON.stringify(value));
		}

		function getObject(key) {
			//--Sample Etienne
			//function win(file) {
					// var reader = new FileReader();
					// reader.onloadend = function(evt) {
						//return evt.target.result && JSON.parse(evt.target.result);
						// console.log(evt.target.result);
					// };
					// reader.readAsText(file);
				// };
				//dataDir = fileSystem.root.getDirectory("data", {create: true});	
				//file = dataDir.getFile(key);		
				//entry.file(win, fail);			
			
			var value = localStorage.getItem(key);		
			return value && JSON.parse(value);
		}
		
		function saveSession(cle,valeur){
			 $.ajax({
				type: "POST", 
				headers: { "cache-control": "no-cache" },
				url:  "saveSession.php", 
				data: ({cle: cle,valeur:valeur}),
				cache: false,
				dataType: "html",
				timeout:500			
			});  
		}
		
		///////////////////////////////////////////////////////
		/// Detect Mobile
		///http://stackoverflow.com/questions/11381673/javascript-solution-to-detect-mobile-browser
		window.mobilecheck = function() {
		var check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		return check; }
		
		///////////////////////////////////////////////////////
		/// Wrapper (Getter) for database
		
		function loadDB(name) {
			if (!isSetObject('taffy_'+name)) return false;
			getObject('taffy_'+name);
		}
		
		
		///////////////////////////////////////////////////////
		/// Time
		
		function getTimeStamp() {
			return new Date().getTime();
		}

		
	    ///////////////////////////////////////////////////////
	    /// Some numeric functions from :
	    /// http://stackoverflow.com/questions/3885817/how-to-check-if-a-number-is-float-or-integer
	   
	   function isDefine(value) {
			return !((undefined === value) || (null === value));
	   }
	   
	   function isNumber(value) {
			if ((undefined === value) || (null === value)) {
				return false;
			}
			if (typeof value == 'number') {
				return true;
			}
		return !isNaN(value - 0);
	   }
	   
		function isFloat (n) {
			return n===+n && n!==(n|0);
		}

		function isInteger (n) {
			return n===+n && n===(n|0);
		}
		
		function isArray(n) {
			return $.isArray(n);
		}
		
		function getDayOfSpecial() {
			var curr=new Date(); 
			var first = curr.getDate() - curr.getDay() +4; //--Lundi = +1
			var last = first + 6; //--Mercredi
			var firstday = new Date(curr.setDate(first));
			var lastday = new Date(curr.setDate(first+6));			
			return [firstday, lastday];
		}
		
		function table_transpose(array, total_ligne) {
			var tmp=[];
			var i=0;
			for (var o in array) {
				tmp[i % total_ligne].push(o);
				i++;
			}			
			return tmp;
		}
		
		
		//--FUNCTION (duplicate of jquery_and_style)
		function remove_accent(str) {
				var map={'À':'A','Á':'A','Â':'A','Ã':'A','Ä':'A','Å':'A','Æ':'AE','Ç':'C','È':'E','É':'E','Ê':'E','Ë':'E','Ì':'I','Í':'I','Î':'I','Ï':'I','Ð':'D','Ñ':'N','Ò':'O','Ó':'O','Ô':'O','Õ':'O','Ö':'O','Ø':'O','Ù':'U','Ú':'U','Û':'U','Ü':'U','Ý':'Y','ß':'s','à':'a','á':'a','â':'a','ã':'a','ä':'a','å':'a','æ':'ae','ç':'c','è':'e','é':'e','ê':'e','ë':'e','ì':'i','í':'i','î':'i','ï':'i','ñ':'n','ò':'o','ó':'o','ô':'o','õ':'o','ö':'o','ø':'o','ù':'u','ú':'u','û':'u','ü':'u','ý':'y','ÿ':'y','A':'A','a':'a','A':'A','a':'a','A':'A','a':'a','C':'C','c':'c','C':'C','c':'c','C':'C','c':'c','C':'C','c':'c','D':'D','d':'d','Ð':'D','d':'d','E':'E','e':'e','E':'E','e':'e','E':'E','e':'e','E':'E','e':'e','E':'E','e':'e','G':'G','g':'g','G':'G','g':'g','G':'G','g':'g','G':'G','g':'g','H':'H','h':'h','H':'H','h':'h','I':'I','i':'i','I':'I','i':'i','I':'I','i':'i','I':'I','i':'i','I':'I','i':'i','?':'IJ','?':'ij','J':'J','j':'j','K':'K','k':'k','L':'L','l':'l','L':'L','l':'l','L':'L','l':'l','?':'L','?':'l','L':'L','l':'l','N':'N','n':'n','N':'N','n':'n','N':'N','n':'n','?':'n','O':'O','o':'o','O':'O','o':'o','O':'O','o':'o','Œ':'OE','œ':'oe','R':'R','r':'r','R':'R','r':'r','R':'R','r':'r','S':'S','s':'s','S':'S','s':'s','S':'S','s':'s','Š':'S','š':'s','T':'T','t':'t','T':'T','t':'t','T':'T','t':'t','U':'U','u':'u','U':'U','u':'u','U':'U','u':'u','U':'U','u':'u','U':'U','u':'u','U':'U','u':'u','W':'W','w':'w','Y':'Y','y':'y','Ÿ':'Y','Z':'Z','z':'z','Z':'Z','z':'z','Ž':'Z','ž':'z','?':'s','ƒ':'f','O':'O','o':'o','U':'U','u':'u','A':'A','a':'a','I':'I','i':'i','O':'O','o':'o','U':'U','u':'u','U':'U','u':'u','U':'U','u':'u','U':'U','u':'u','U':'U','u':'u','?':'A','?':'a','?':'AE','?':'ae','?':'O','?':'o'};
				var res='';
				for (var i=0;i<str.length;i++){c=str.charAt(i);res+=map[c]||c;}
				
					//--Remove the code postal
				res=res.substring(0,res.length-6);		
				return res;
			}
			
		//--FUNCTION (Use by GoogleMap)	
		function oc(a)
			{
			  var o = {};
			  for(var i=0;i<a.length;i++)
			  {
				o[a[i]]='';
			  }
			  return o;
			}	
		
		//////////////////////////////////////////////////////////
		/// Console	
			
		//--Disable console (Etienne Lord - production)
		// var console = {}; 
		 // console.log = function(){};
		 // console.error = function(){};
		 // console.dir = function(){};
		 // console.debug = function(){};
		 // console.warn = function(){};
		 // console.info = function(){};
		
		
		//////////////////////////////////////////////////
		/// IE 
		/// http://stackoverflow.com/questions/2790001/fixing-javascript-array-functions-in-internet-explorer-indexof-foreach-etc
		// Add ECMA262-5 method binding if not supported natively
		//
		if (!('bind' in Function.prototype)) {
			Function.prototype.bind= function(owner) {
				var that= this;
				if (arguments.length<=1) {
					return function() {
						return that.apply(owner, arguments);
					};
				} else {
					var args= Array.prototype.slice.call(arguments, 1);
					return function() {
						return that.apply(owner, arguments.length===0? args : args.concat(Array.prototype.slice.call(arguments)));
					};
				}
			};
		}
		//--JSON
		if ( ! window.JSON ){
		  if ( ! $.toJSON ){
			throw 'This environment does not support the native JSON object.'
			  + 'Please install the jQuery JSON plugin and we will use that.'
			  ;
		  }
		  window.JSON = {};
		  window.JSON.stringfy = $.toJSON;
		  window.JSON.parse    = $.secureEvalJSON;
		}

		// Add ECMA262-5 string trim if not supported natively
		//
		if (!('trim' in String.prototype)) {
			String.prototype.trim= function() {
				return this.replace(/^\s+/, '').replace(/\s+$/, '');
			};
		}

		// Add ECMA262-5 Array methods if not supported natively
		//
		if (!('indexOf' in Array.prototype)) {
			Array.prototype.indexOf= function(find, i /*opt*/) {
				if (i===undefined) i= 0;
				if (i<0) i+= this.length;
				if (i<0) i= 0;
				for (var n= this.length; i<n; i++)
					if (i in this && this[i]===find)
						return i;
				return -1;
			};
		}
		if (!('lastIndexOf' in Array.prototype)) {
			Array.prototype.lastIndexOf= function(find, i /*opt*/) {
				if (i===undefined) i= this.length-1;
				if (i<0) i+= this.length;
				if (i>this.length-1) i= this.length-1;
				for (i++; i-->0;) /* i++ because from-argument is sadly inclusive */
					if (i in this && this[i]===find)
						return i;
				return -1;
			};
		}
		if (!('forEach' in Array.prototype)) {
			Array.prototype.forEach= function(action, that /*opt*/) {
				for (var i= 0, n= this.length; i<n; i++)
					if (i in this)
						action.call(that, this[i], i, this);
			};
		}
		if (!('map' in Array.prototype)) {
			Array.prototype.map= function(mapper, that /*opt*/) {
				var other= new Array(this.length);
				for (var i= 0, n= this.length; i<n; i++)
					if (i in this)
						other[i]= mapper.call(that, this[i], i, this);
				return other;
			};
		}
		if (!('filter' in Array.prototype)) {
			Array.prototype.filter= function(filter, that /*opt*/) {
				var other= [], v;
				for (var i=0, n= this.length; i<n; i++)
					if (i in this && filter.call(that, v= this[i], i, this))
						other.push(v);
				return other;
			};
		}
		if (!('every' in Array.prototype)) {
			Array.prototype.every= function(tester, that /*opt*/) {
				for (var i= 0, n= this.length; i<n; i++)
					if (i in this && !tester.call(that, this[i], i, this))
						return false;
				return true;
			};
		}
		if (!('some' in Array.prototype)) {
			Array.prototype.some= function(tester, that /*opt*/) {
				for (var i= 0, n= this.length; i<n; i++)
					if (i in this && tester.call(that, this[i], i, this))
						return true;
				return false;
			};
		}
	
		//--Code from http://stackoverflow.com/questions/227950/programatic-accent-reduction-in-javascript-aka-text-normalization-or-unaccentin
		
		var defaultDiacriticsRemovalMap = [
				{'base':'A', 'letters':/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g},
				{'base':'AA','letters':/[\uA732]/g},
				{'base':'AE','letters':/[\u00C6\u01FC\u01E2]/g},
				{'base':'AO','letters':/[\uA734]/g},
				{'base':'AU','letters':/[\uA736]/g},
				{'base':'AV','letters':/[\uA738\uA73A]/g},
				{'base':'AY','letters':/[\uA73C]/g},
				{'base':'B', 'letters':/[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g},
				{'base':'C', 'letters':/[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g},
				{'base':'D', 'letters':/[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g},
				{'base':'DZ','letters':/[\u01F1\u01C4]/g},
				{'base':'Dz','letters':/[\u01F2\u01C5]/g},
				{'base':'E', 'letters':/[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g},
				{'base':'F', 'letters':/[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g},
				{'base':'G', 'letters':/[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g},
				{'base':'H', 'letters':/[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g},
				{'base':'I', 'letters':/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g},
				{'base':'J', 'letters':/[\u004A\u24BF\uFF2A\u0134\u0248]/g},
				{'base':'K', 'letters':/[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g},
				{'base':'L', 'letters':/[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g},
				{'base':'LJ','letters':/[\u01C7]/g},
				{'base':'Lj','letters':/[\u01C8]/g},
				{'base':'M', 'letters':/[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g},
				{'base':'N', 'letters':/[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g},
				{'base':'NJ','letters':/[\u01CA]/g},
				{'base':'Nj','letters':/[\u01CB]/g},
				{'base':'O', 'letters':/[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g},
				{'base':'OI','letters':/[\u01A2]/g},
				{'base':'OO','letters':/[\uA74E]/g},
				{'base':'OU','letters':/[\u0222]/g},
				{'base':'P', 'letters':/[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g},
				{'base':'Q', 'letters':/[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g},
				{'base':'R', 'letters':/[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g},
				{'base':'S', 'letters':/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g},
				{'base':'T', 'letters':/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g},
				{'base':'TZ','letters':/[\uA728]/g},
				{'base':'U', 'letters':/[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g},
				{'base':'V', 'letters':/[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g},
				{'base':'VY','letters':/[\uA760]/g},
				{'base':'W', 'letters':/[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g},
				{'base':'X', 'letters':/[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g},
				{'base':'Y', 'letters':/[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g},
				{'base':'Z', 'letters':/[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g},
				{'base':'a', 'letters':/[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g},
				{'base':'aa','letters':/[\uA733]/g},
				{'base':'ae','letters':/[\u00E6\u01FD\u01E3]/g},
				{'base':'ao','letters':/[\uA735]/g},
				{'base':'au','letters':/[\uA737]/g},
				{'base':'av','letters':/[\uA739\uA73B]/g},
				{'base':'ay','letters':/[\uA73D]/g},
				{'base':'b', 'letters':/[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g},
				{'base':'c', 'letters':/[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g},
				{'base':'d', 'letters':/[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g},
				{'base':'dz','letters':/[\u01F3\u01C6]/g},
				{'base':'e', 'letters':/[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g},
				{'base':'f', 'letters':/[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g},
				{'base':'g', 'letters':/[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g},
				{'base':'h', 'letters':/[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g},
				{'base':'hv','letters':/[\u0195]/g},
				{'base':'i', 'letters':/[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g},
				{'base':'j', 'letters':/[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g},
				{'base':'k', 'letters':/[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g},
				{'base':'l', 'letters':/[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g},
				{'base':'lj','letters':/[\u01C9]/g},
				{'base':'m', 'letters':/[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g},
				{'base':'n', 'letters':/[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g},
				{'base':'nj','letters':/[\u01CC]/g},
				{'base':'o', 'letters':/[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g},
				{'base':'oi','letters':/[\u01A3]/g},
				{'base':'ou','letters':/[\u0223]/g},
				{'base':'oo','letters':/[\uA74F]/g},
				{'base':'p','letters':/[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g},
				{'base':'q','letters':/[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g},
				{'base':'r','letters':/[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g},
				{'base':'s','letters':/[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g},
				{'base':'t','letters':/[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g},
				{'base':'tz','letters':/[\uA729]/g},
				{'base':'u','letters':/[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g},
				{'base':'v','letters':/[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g},
				{'base':'vy','letters':/[\uA761]/g},
				{'base':'w','letters':/[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g},
				{'base':'x','letters':/[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g},
				{'base':'y','letters':/[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g},
				{'base':'z','letters':/[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g}
				];

				function removeDiacritics (str) {
					var changes= defaultDiacriticsRemovalMap;	
					for(var i=0; i<changes.length; i++) {
						str = str.replace(changes[i].letters, changes[i].base);
					}
					return str;
				}
				
				function getPos(el) {
					
					for (var lx=0, ly=0;
						 el != null;
						 lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
					return {x: lx,y: ly};
				}
				
				
				function equalHeight(group) {
				  tallest = 165;
				  group.each(function() {
					thisHeight = $(this).height();
					if(thisHeight > tallest) {
					  tallest = thisHeight;
					}
				  });				  
				  group.height(tallest);
				}
				
				//--Find size of hash
				Array_size = function(obj) {
					var size = 0;					
					for (var key in obj) {
						if (obj.hasOwnProperty(key)) size++;
					}
					return size;
				};
				
				// Returns a random integer between min and max
				// Using Math.round() will give you a non-uniform distribution!
				// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
				function getRandomInt(min, max) {
				  return Math.floor(Math.random() * (max - min + 1) + min);
				}
				
				////////////////////////////////////////////////
				/// DISTANCE FUNCTION

				function distance(lat1, lng1, lat2, lng2)
				  {
					  pi80 = 3.1416/ 180;
					  lat1 *= pi80;
					  lng1 *= pi80;
					  lat2 *= pi80;
					  lng2 *= pi80;
					  r = 6372.797; // mean radius of Earth in km
					  dlat = lat2 - lat1;
					  dlng = lng2 - lng1;
					  a = Math.sin(dlat / 2) * Math.sin(dlat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlng / 2) * Math.sin(dlng / 2);
					  c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
					  c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
					  km = r * c;
					  return km;
				  }
					
				///////////////////////////////////////////////////
				///	DISPLAY PUB
				function displayPub	(view_position) {										
					if(view_position == 2)
						$('#ads2').html(pub_local);
					else if (view_position == 0){
						 //var scope=  angular.element($(this)).scope();
						 //console.log("scope=" + scope);
						 $('#ads_haut').html(pub_local_haut);
						//  angular.element($(this)).scope().$apply();
						//$('#adsh2').html(pub_local_haut[1]);
						//$('#adsh3').html(pub_local_haut[2]);
					}
				}
				
		
				/**
				 * Usage truncate(text, length, "...");
				 *
				 * var myText = "This is an example.";
				 *
				 * {{myText|Truncate}}
				 * {{myText|Truncate:5}}
				 * {{myText|Truncate:25:" ->"}}
				 * Output
				 * "This is..."
				 * "Th..."
				 * "This is an e ->"
				 *
				 */
				function truncate(text, length, end) {
					if (isNaN(length)) length = 10;
					if (end === undefined) end = "...";
					if (text.length <= length || text.length - end.length <= length) {
						return text;
					}
					else {
						return String(text).substring(0, length-end.length) + end;
					}

				}
		
		
				function round100(nu) {			
						return Math.round(nu*100)/100;									
					};
				
				// function browser() {					
					// var browser = {};
					// browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
					// browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
					// browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
					// browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
					// return browser;
				// }

				//To show calling function console.log(arguments.callee.caller.toString());
				
				//condition && (answer if true) || (answer if false)
				//ng-class="{admin:'enabled', moderator:'disabled', '':'hidden'}[user.role]"
				//ng-class="{selected: $index==selectedIndex}"