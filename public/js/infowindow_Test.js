
function createInfoWindow(id,name,number,type){
		loaded = false;
		numbers = [];
		numbers[0]=number;
		var riderInfo = document.createElement('div');
		riderInfo.setAttribute('data-role','collapsible');
		riderInfo.setAttribute('id','riderInfo');
		riderInfo.setAttribute('width','100');
		riderInfo.innerHTML = "<h3>"+type+" Information</h3>Name: "+name+"<br>Number: "+number+"";
		
		var PushtoX = document.createElement('div');
		PushtoX.setAttribute('data-role','collapsible');
		PushtoX.setAttribute('id','PushtoX');
		PushtoX.setAttribute('width','100');
		PushtoX.innerHTML = "<h3>Pushto X</h3><img src = \"../img/camera.png\" width=\"50px\" height = \"50px\" onclick=\"OpenCamera('page2','camera')\"/>";

		var PTTDiv = document.createElement('div');
		PTTDiv.setAttribute('data-role','collapsible');
		PTTDiv.setAttribute('id','PTT');
		
		var pttiframe = document.createElement('iframe');
		pttiframe.setAttribute('name','ptt');
		pttiframe.setAttribute('id','pttiframe');
		pttiframe.setAttribute('width','auto');
		pttiframe.setAttribute('height','320');
		pttiframe.setAttribute('scrolling','no');
		pttiframe.setAttribute('border-radius','25px');
		
		
		
		/*var PTTButton = document.createElement('input');
		PTTButton.setAttribute('type','button');
		PTTButton.setAttribute('value','PTT');
		PTTButton.setAttribute('onclick','loadPTTApp()');*/
		
		
		//var pttiframe = document.createElement('iframe');
		//pttiframe.setAttribute('id','pttiframe');
		//var pttiframe=document.getElementById('pttiframe');
		pttiframe.setAttribute('onload','loadPTTApp()');
			
		//PTT.innerHTML = "<h3>PTT</h3><img src = \"../img/PTT.png\" />";
		if(driverFlag == false)
			//pttiframe.setAttribute('src','https://45.33.29.206/PTTWidget?orig='+riderMDN);
			//pttiframe.setAttribute('src','https://45.33.29.206/PTTWidget?orig='+riderMDN+'&term='+number);
			pttiframe.setAttribute('src','https://45.33.27.177/PTTWidget');
//			PTT.innerHTML ="<iframe onload =\"loadPTTApp()\" name = \"ptt\" src=\""&term="+number+"\" style=\"width:100%;height:100%;margin:0 auto;background:#ffffff\"></iframe>";
		else
			//pttiframe.setAttribute('src','https://45.33.29.206/PTTWidget?orig='+driverMDN);
			//pttiframe.setAttribute('src','https://45.33.29.206/PTTWidget?orig='+driverMDN+'&term='+number);
			pttiframe.setAttribute('src','https://45.33.27.177/PTTWidget');
			//PTT.innerHTML ="<iframe onload =\"loadPTTApp()\" name = \"ptt\" src=\"https://45.33.29.206/PTTWidget?orig="+driverMDN+"&term="+number+"\" style=\"width:100%;height:100%;margin:0 auto;background:#ffffff\"></iframe>";
		
		//PTTDiv.appendChild(pttiframe.innerHTML);
		
		var button_Close = document.createElement('button');
		button_Close.innerHTML = "Close"; 
		button_Close.setAttribute('id','close_btn');
		button_Close.setAttribute('style','color: red; position:absolute; right:0; bottom:0');
		button_Close.setAttribute('onClick','hide_Popup()');
		


		var infowindow = document.createElement('div');
		infowindow.setAttribute('id','infowindow');
		infowindow.setAttribute('data-role','collapsible-set');		
		infowindow.setAttribute('data-theme','a');
		infowindow.setAttribute('data-content-theme','b');
		infowindow.setAttribute('style','position:absolute;');
		
		infowindow.appendChild(riderInfo);
		infowindow.appendChild(PushtoX);
		infowindow.appendChild(PTTDiv);
		
		//infowindow.appendChild(PTTButton);
		
		var content = document.createElement('div');
		content.setAttribute('data-role','content');
		content.setAttribute("style","background-image: url('../images/layer.png'); border-radius: 25px");
		
		content.appendChild(pttiframe);
		content.appendChild(infowindow);
		infowindow.appendChild(button_Close);
		
		var info = document.getElementById(id);
		info.setAttribute("style","position:absolute;width: 340px; height: 580px;z-index:9999;");
		//document.getElementById('popup').style.visibility = "visible";
		//while (info.firstChild) {
			//var tmp = info.firstChild;
			//console.log(tmp.getAttribute("id"));
			//if(tmp.getAttribute("id")=='pttiframe'){
				//continue;
			//}
			//info.removeChild(info.firstChild);
		//}
		info.appendChild(content);
		
	}
