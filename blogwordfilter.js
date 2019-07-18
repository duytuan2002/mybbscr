/*

*/
function parse(node){
	   if(node.childNodes.length>0){
		   var children = node.childNodes;
			 for(var i=0;i<children.length;i++){
				 (function(item){
					parse(item);
				 })(children[i]);
			 };
	   }
	  else{
		if(node.nodeType==3){
			  var newText = findAndReplace(node.nodeValue);
			  var temp = document.createElement('SPAN');
			  temp.innerHTML = newText;
			  node.parentNode.replaceChild(temp, node);
		}
	  }
	}
function findAndReplace(txt){
       if(!!txt){
		var reg_1 = /(\[img\])(.*?)(\[\/img\])/gi;		
		var reg_5 = /(\[youtube\])(.*?)(\[\/youtube\])/gi;
		var m1 = txt.match(reg_1);
			if(!!m1){
				txt = txt.replace(m1, urlToImg(m1));
			}
		var m5 = txt.match(reg_5);
			if(!!m5){
				txt = txt.replace(m5, urlToEmbed(m5));
			}
			return txt;
		}
		return '';
	}
function start(){
		var classes = ['entry-content', 'comment-content', 'owner-Body', 'comment-body','column-left-inner'];
		classes.forEach(function(cl){
			  var _elements = getElementsByClass(cl);
			  _elements.forEach(function(el){
				   parse(el);
			 });
		});
	}
	
	var  ytParser = window['ytParser'] = {
		start: start
	}
  })();

ytParser.start();
