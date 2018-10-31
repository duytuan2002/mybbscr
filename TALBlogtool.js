/* --image and video for Blogger---
*Support Insert Image and clip to blogger post and comment with clause:
[img]link picture[/img]
[youtube]link youtube[/youtube]

*Version 1.1
*Install: Create new widget html, and copy code below to it: 
<script type="text/javascript" src="http://backlink.thiamlau.com/js/TALBlogtool.js"></script>
*Author:
 -hvn|http://ndaidong.blogspot.com/
 -hothiethoa || http://hothiethoa.thiamlau.com
Site: http://thiamlau.com

*/
;(function(){
	var _template = '<iframe width="580" height="435" src="http://www.youtube.com/embed/{VIDEO_ID}" frameborder="0" allowfullscreen></iframe>';
	var _tempImgH ='<img style="max-width:590px;" src="';
	var _tempImgF ='" alt ="could not load image" />';
	var getElementsByClass = function (className, tag, elm){
		if(document.getElementsByClassName){
		  var getElementsByClassName = function (className, tag, elm){
			elm = elm || document;
			var elements = elm.getElementsByClassName(className),
				nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)){
					returnElements.push(current);
				}
			}
			return returnElements;
		  };
		}
		else if (document.evaluate) {
		  var getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
			try	{
				elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
			}
			catch (e) {
				elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
			}
			while ((node = elements.iterateNext())) {
				returnElements.push(node);
			}
			return returnElements;
		  };
		}
		else {
		  var getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
			for(var k=0, kl=classes.length; k<kl; k+=1){
				classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
			}
			for(var l=0, ll=elements.length; l<ll; l+=1){
				current = elements[l];
				match = false;
				for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
					match = classesToCheck[m].test(current.className);
					if (!match) {
						break;
					}
				}
				if (match) {
					returnElements.push(current);
				}
			}
			return returnElements;
		  };
		}
		return getElementsByClassName(className, tag, elm);
	}
	//Replace Imamage
	function urlToImg(url){
		url = url + "";
		url = url.replace(/\[img\]/gi,_tempImgH);
		url = url.replace(/\[\/img\]/gi,_tempImgF);
		return url;
	}	
	//Replace Url Youtube
	function urlToEmbed(url){
	   var video_id = '', str = _template;
		var reg = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
		url=url + "";
		var url1 = url.substr(9,url.length-19);	
		var match = url1.match(reg);
		if (!!match&&!!match[7]){
			video_id = match[7];
		}
	  return !!video_id?str.replace('{VIDEO_ID}', video_id):url1;
	}

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
