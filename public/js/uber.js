	var bearer_Token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOlsicHJvZmlsZSIsImhpc3RvcnlfbGl0ZSIsImhpc3RvcnkiLCJyZXF1ZXN0Il0sInN1YiI6IjkwMDU4YjM1LWJkN2MtNGNiMy1iN2RiLWIzMTQzZThkNWNiNCIsImlzcyI6InViZXItdXMxIiwianRpIjoiZDNmYTQxZTUtZmJjNS00ZmYzLTgxOWYtZmJkYmE0MzA4ODM4IiwiZXhwIjoxNDUzNDk0MzIwLCJpYXQiOjE0NTA5MDIzMjAsInVhY3QiOiJsQVZkNmlqY0Y2UnM1RUdCOUV6UEpDNGI0ejRiazAiLCJuYmYiOjE0NTA5MDIyMzAsImF1ZCI6IjVJZEtVRWZqVG9XUklReDN2OTNOUFpoYjljRmNBMEdrIn0.Qk6zQkBvzR40LMUc3xZ92w6Jmkode21xY-04jE5gnvtPzXXpm5FdBMcvCidtuRXt63lTNExmQt0pd3_h-94E8JE3J9O_lQUUwsRb9y9scQKcyo-3YUohPKSL7xn8WJRYu78_PXSifcijZOHVXN-04LwieCZRHK0EUP4UQOqHDKo3YWvgp771tQvyN8fBhxz9hW0m6LtG0rUHFiPrdGNVnrLyjGfIF_TxpPiC123ILI4haCMfZkSv78NB_bhYqPi9atemMHw_oez7bvaKKridK0-PSJRu9NWTmPMIaHVmlbEy1RojfFj9VwdVB-fBRA9TaqAmCDq4zO3bbU0Kp82flw';
	var User_no, User_pic, User_name, User_uuid, User_loc; 
	var from_Lat="", from_Long="", to_Lat="", to_Long=""; 
	var prod_List = new Array(); 
	var driver_details; 
	var selected_model, selected_desc, selected_capacity, selected_prod_id; 
	var product_Image={}; 
	var map, source_place;
	var selected_req_id; 
	var Ntf_req_Status_from_driver = {}; 
	var driversLocation;
	var pass_Details= {};
	var maker_List= {};
	var driverMDN;
	var FromdriverMDN;
	var riderMDN; 	
	var driverName;
	var driverLat;
	var driverLng;
	var info_Open_FLAG=0; 

	function loadRiderDriverDetails()
	{
		if((window.location.pathname.match(/\/rider\/(\d+)$/)!=undefined) && (window.location.pathname.match(/\/rider\/(\d+)$/)!=null))
		{
			riderMDN = Number(window.location.pathname.match(/\/rider\/(\d+)$/)[1]);
		}
		else if((window.location.pathname.match(/\/driver\/(\d+)$/)!=undefined) && (window.location.pathname.match(/\/driver\/(\d+)$/)!=null))
		{
			driverMDN = Number(window.location.pathname.match(/\/driver\/(\d+)$/)[1]);	
		}
		console.log("RIDER MDN PASSED IS:"+riderMDN);
		console.log("DRIVER MDN PASSED IS:"+driverMDN);
	}

	function receive_CallBacks(data)
	{
		console.log('RECEIVED MSG  :' + JSON.stringify(data));
		if((data.type=='openinfowindow') && (info_Open_FLAG==0)){
			//alert(info_Open_FLAG);
			var pttiframe = document.getElementById('pttiframe');
					//pttiframe.setAttribute('id','pttiframe');
						//var pttiframe=document.getElementById('pttiframe');
						
						pttiframe.setAttribute('src','https://45.33.29.206/PTTWidget');
						pttiframe.setAttribute('onload','loadPTTApp()');
						//$('#myModal').modal('show');
						$('#infoButton').click();
						info_Open_FLAG=1; 
			//createInfoWindow('page2',driverName,FromdriverMDN,'Driver');
		
		}
		if(data.module=='uber')
		{
			if(data.type=='accepted')
			{
				to = [];
				to.push(data.fromMDN);
				FromdriverMDN = data.fromMDN;
				document.getElementById('driverNum').innerHTML = 'Number: '+data.fromMDN;
				driverLat = data.msg.split('$')[2];
				driverLng = data.msg.split('$')[3];
				Ntf_req_Status_from_driver[data.msg.split('$')[1]]=data.msg.split('$')[2];
				pole_status(data.msg.split('$')[1]);
			}
			else if(data.type=='RequestDriverInfo')
			{
				pass_Details[data.msg.split('$')[0]] = {location : data.msg.split('$')[1], name: data.msg.split('$')[2], number: data.fromMDN, req_id:data.msg.split('$')[4]}; 
				set_user_location(data.msg.split('$')[0], data.msg.split('$')[1], data.msg.split('$')[2]);
			}
	
		}	
		if(data.module=='uber' && data.type=='sorry')
		{
			//document.getElementById(selected_model).src = product_Image[selected_model]; 
			alert(data.msg);
			document.getElementById('reqRide').setAttribute("onclick","loadDesc(this.id)");
		}
		else{
			
			
			
		
		}
	}
	function pushtoXCallback(data)
	{
			console.log(' RECEIVED MSG	:' + JSON.stringify(data));
			displayContents(data.type,data.msg);

	}

	
	//registerCallback(pushtoXCallback, 'pushtoX'); 
	get_User_details();


	function deselect(e) {
		$('.pop').slideFadeToggle(function() {
			e.removeClass('selected');
		});    
	}
		
	$(function() {
		$('#ride_Btn').on('click', function() {
			if($(this).hasClass('selected')) {
			deselect($(this));               
			} else {
			$(this).addClass('selected');
			$('.pop').slideFadeToggle();
			}
			return false;
	});
		
	$('.close').on('click', function() {
			deselect($('#ride_Btn '));
			return false;
		});
	});
		
	$.fn.slideFadeToggle = function(easing, callback) {
		return this.animate({ opacity: 'toggle', height: 'toggle' }, 'fast', easing, callback);
	};

	//**********************************
		
	function deselect(e) {
		$('.pop1').slideFadeToggle(function() {
			e.removeClass('selected');
		});    
	}
		
	$(function() {
		$('#driver_sel_Btn').on('click', function() {
			if($(this).hasClass('selected')) {
			deselect($(this));               
			} else {
			$(this).addClass('selected');
			$('.pop1').slideFadeToggle();
			}
			return false;
		});
		
		$('.close').on('click', function() {
			deselect($('#driver_sel_Btn'));
			return false;
		});
	});
		
	$.fn.slideFadeToggle = function(easing, callback) {
		return this.animate({ opacity: 'toggle', height: 'toggle' }, 'fast', easing, callback);
	};

	//**********************************

	function get_User_details()
	{		
		$.ajax({
			type 	: 'GET',
			url	: 'https://sandbox-api.uber.com/v1/me',
			headers: 
			{
				Authorization: "Bearer " + bearer_Token
			},
			
			success: function(result)
			{
				console.log('UUID	:' + result.uuid);	
				//console.log('PICTURE 	:' + result.picture);	
				console.log('FIRST Name	:' + result.first_name);	
				console.log('LAST NAME	:' + result.last_name);
				console.log('E-MAIL	:' + result.email);	
		
				User_no 	= result.uuid.replace(/[^0-9]/g, '').substring(0,10);
				User_name 	= result.first_name + ' ' + result.last_name; 
				User_uuid 	= result.uuid; 
		
				console.log('PHONE		:'	+ User_no);
				if(riderMDN!=undefined)
				{	
					makeConnectionAndRegister(receive_CallBacks, 'uber',riderMDN,result.first_name + ' ' + result.last_name,'rider');
					//makeConnection(receive_CallBacks, 'uber'); 
					registerCallback(pushtoXCallback, 'pushtoX');
					//registerClient(riderMDN,result.first_name + ' ' + result.last_name);
				}else if(driverMDN!=undefined)
				{
					makeConnectionAndRegister(receive_CallBacks, 'uber',driverMDN,result.first_name + ' ' + result.last_name,'driver');
					//makeConnection(receive_CallBacks, 'uber'); 
					registerCallback(pushtoXCallback, 'pushtoX');
					//registerClient(driverMDN,result.first_name + ' ' + result.last_name,'driver');	
				}
			}
		})

	}
	
	function getProducts() 
	{

		//document.getElementById('destInput').style.display = "none";

		var userLatLng = new google.maps.LatLng(from_Lat, from_Long);
		var bounds = new google.maps.LatLngBounds();
		bounds.extend(userLatLng);
		map.fitBounds(bounds);
		map.setZoom(17);
		$.ajax({
			url: "https://sandbox-api.uber.com/v1/products?latitude=" + from_Lat + "&" + "longitude=" + from_Long,
			headers: {
				Authorization: "Bearer " + bearer_Token
			},
			success: function(result) 
			{
					console.log(result);	
					for(i=0; i< result.products.length ; i++)
					{
						//images.push(result.products[i].image);
						//console.log(result.products[i]);	
						//document.getElementById('uberProducts').getElementsByTagName(result.products[i].display_name).src = result.products[i].image;
						//var idImg = "#" + result.products[i].display_name;
						//$(idImg).attr("src", result.products[i].image);
						//Need to check
						//document.getElementById(result.products[i].display_name).className = "bright"; 
						product_Image[result.products[i].display_name] = result.products[i].image; 
		
						prod_List[result.products[i].display_name] =  result.products[i]; 
						//console.log(prod_List[result.products[i].display_name]); 
					}
			}
		});
	}

	function loadDesc(selectedProd)
	{
	//if (confirm('Confirm '+ prod_List[selectedProd].display_name + '?')) 
	{
		//Need to check
		/*User_loc = document.getElementById('pac-input-1').value; 
		console.log("LOC	: "+ User_loc);*/

		
		
		document.getElementById("driver_name").innerHTML = "Driver	:";
		document.getElementById("ride").innerHTML = "Ride	:"	;
		document.getElementById("driver_no").innerHTML = "Number	:";
		document.getElementById("driver_img").src = "";	
		document.getElementById('reqRide').removeAttribute("onclick");

		/*selected_model = prod_List[selectedProd].display_name;  
		selected_desc = prod_List[selectedProd].description; 
		selected_capacity = prod_List[selectedProd].capacity; 
		selected_prod_id = prod_List[selectedProd].product_id; 

		var desc_Str = "<br />" + "MODEL 	: " + selected_model + "<br />" + "DESCRIPTION 	: " + selected_desc + "<br />" + "CAPACITY 	: " + selected_capacity + "<br />" + "PRODUCT_ID 	: " + selected_prod_id ; 

		console.log(desc_Str);*/

		$.ajax({
			type: "POST",
			contentType: 'application/json',
			url: "https://sandbox-api.uber.com/v1/requests",
			data: JSON.stringify({"start_latitude" : (from_Lat), "start_longitude" : (from_Long) , "end_latitude" : (to_Lat) , "end_longitude" : (to_Long) , "product_id" : selected_prod_id}),
			headers: { 	
				Authorization: "Bearer " + bearer_Token
			},
			success: function(result) {
				console.log(result);
				selected_req_id =  result.request_id;
				
				request_Status(result, result.request_id);
				
			}
		});
	} 
	//else 
	{
		//alert(prod_List[selectedProd].display_name + ' Cancelled');
	}
	}

	/*function wait_for_driver(id)
	{
		if(id=='accept')
		{
			console.log('Driver Accepted');
			$.ajax({	 
				type: "PUT",						
				contentType: 'application/json',						
				url: "https://sandbox-api.uber.com/v1/sandbox/requests/"+ selected_req_id,
				headers: { 	
					Authorization: "Bearer " + bearer_Token
				},
				data: JSON.stringify({"status" : "accepted"}),
				success: function(result) 
				{
					console.log('Request update sent...');	
					pole_status(selected_req_id);
				}
			});
	
		}
	
		if(id=='cancel')
		{
		
		}
	}*/

	function wait_for_driver(id)
	{
		if(id=='accept')
		{
		 	//$('#accept').disable(true);
		 	//$("#driver_name").prop('disabled', true);
		 	$("#driver_name").html("Accepted");
		 	console.log('Driver Accepted');
		 	setStatus('InRide');
		 	$.ajax({	 
				type: "PUT",	
				contentType: 'application/json',						
				url: "https://sandbox-api.uber.com/v1/sandbox/requests/"+ pass_Details[selected_pass_uuid].req_id,
				headers: { 	
						Authorization: "Bearer " + bearer_Token
				},
				data: JSON.stringify({"status" : "accepted"}),
				success: function(result) 
				{
					console.log('Request update sent...');	
					var to=[];
					to.push(selected_pass_No);
					sendMessage('uber', 'Check_Req_id_status'+'$'+ pass_Details[selected_pass_uuid].req_id + '$'+'accepted', 'accepted', to);
				}
			});
				
		}
		if(id=='cancel')
		{
				
		}
	}



	function request_Status(req_status, req_id)
	{

		console.log('Request status : '+ req_status.status);
		req_status.status="processing"; 
		if(req_status.status=='processing')
		{
			Ntf_req_Status_from_driver[req_id] = "processing"; 
			//document.getElementById(selected_model).src="images/uber_processing.gif";
			document.getElementById("cta").style.backgroundImage = 'url(images/uber_processing.gif)';
			document.getElementById("cta").innerHTML = 'REQUESTING';	
			//alert(' Waiting for Driver '); 
			
			//4698038689
			var to=[]; 
			to.push('4698038689');
			sendMessage('uber', User_uuid+'$'+from_Lat+'$'+User_name+'$'+User_no+'$'+req_id+'$'+from_Long, 'RequestDriverInfo', to);
			
			//pole_status_Req(req_id);
			
			return;
		}

		if(req_status.status=='accepted')
		{
			document.getElementById(selected_model).src = product_Image[selected_model]; 
			console.log(req_status); 
			console.log('Driver Accepted == Name : ' + req_status.driver.name + " Number : " + req_status.driver.phone_number + " Location : " + req_status.location); 

			$('#ride_Btn').removeAttr('disabled');
			document.getElementById("driver_img_src").src = req_status.driver.picture_url;
			$('#ride_Btn').css('background-color', 'black');
			document.getElementById("driver_name").innerHTML = document.getElementById("driver_name").innerHTML + "	" + req_status.driver.name;
			document.getElementById("ride").innerHTML = document.getElementById("ride").innerHTML + "	" + selected_model;		
			document.getElementById("driver_no").innerHTML = document.getElementById("driver_no").innerHTML + "	" + req_status.driver.phone_number;


			driversLocation = new google.maps.LatLng(req_status.location.latitude, req_status.location.longitude);
		
			// Do whatever you want with userLatLng.
			var marker = new google.maps.Marker({
				position: driversLocation,
				title: 'Driver Location',
				map: map,
				icon: 'images/'+selected_model+'_small.png'
			});
    
			marker.setMap(map);
			return;
		}
	}
	function pole_status_Req(req_id)
	{
		if(Ntf_req_Status_from_driver[req_id]!="accepted")
			pole_status_Req(req_id);
		else	
		{
			Ntf_req_Status_from_driver[req_id]="accepted";
			pole_status(req_id);
		}
	}


	function pole_status(req_id)
	{		

		$.ajax({
			type: "GET",
			contentType: 'application/json',
			url: "https://sandbox-api.uber.com/v1/requests/"+ req_id,
			headers: { 	
				Authorization: "Bearer " + bearer_Token
			},
					
			success: function(result) 
			{
				
				console.log(' Request status : ' + result);
				if(result.status=='accepted')
				{
						//document.getElementById(selected_model).src = product_Image[selected_model];
						console.log('Driver Accepted == Name : ' + result.driver.name + " Number : " + result.driver.phone_number + " Location : " + result.location); 
						//to = [];
						//to.push(result.driver.phone_number);
						//$('#ride_Btn').removeAttr('disabled');
			//document.getElementById("driver_img_src").src = result.driver.picture_url;
			//$('#ride_Btn').css('background-color', 'black');
						//document.getElementById("driver_name").innerHTML = document.getElementById("driver_name").innerHTML + "	" + result.driver.name; 
						//document.getElementById("driver_no").innerHTML = document.getElementById("driver_no").innerHTML + "	" + result.driver.phone_number;
						//document.getElementById("ride").innerHTML = document.getElementById("ride").innerHTML + "	" + selected_model;	
						
						 var userLatLng = new google.maps.LatLng(driverLat, driverLng);
		 // Do whatever you want with userLatLng.
						var marker = new google.maps.Marker({
							position: userLatLng,
							title: 'Driver Location',
							map: map,
							icon: '../images/uberX_small.png'
						});
						
						
						//Added Info WIndow
						google.maps.event.addListener(marker,'click', function() {
						sendMessage('uber','','openinfowindow',[])
						//var infowindow = new google.maps.InfoWindow({			
						//});
						//createInfoWindow('info');
						driverName = result.driver.name;
						var pttiframe = document.getElementById('pttiframe');
					//pttiframe.setAttribute('id','pttiframe');
						//var pttiframe=document.getElementById('pttiframe');
						
						pttiframe.setAttribute('src','https://45.33.29.206/PTTWidget');
						pttiframe.setAttribute('onload','loadPTTApp()');
						//$('#myModal').modal('show');
						 if(info_Open_FLAG==0)
                                                        {
								//alert(info_Open_FLAG);
                                                                $('#infoButton').click();
                                                                info_Open_FLAG=1;
                                                        }
						//createInfoWindow('page2',result.driver.name,FromdriverMDN,'Driver');
						
						//infowindow.setContent(document.getElementById('popup').innerHTML);
						///infowindow.open(map,marker);
			
					});
					
						marker.setMap(map);
						markers.push(marker);
						document.getElementById('set-pickup-wrap').style.visibility = "hidden";
						//delete map.controls[google.maps.ControlPosition.LEFT_CENTER];
						map.controls[google.maps.ControlPosition.LEFT_CENTER].clear();
						
					
						var bounds_afterAcc = new google.maps.LatLngBounds();

						    for (var i=0; i<markers.length; i++) {
							if(markers[i].getVisible()) {
							    bounds_afterAcc.extend( markers[i].getPosition() );
							}
						    }

						    map.fitBounds(bounds_afterAcc);

						    //map.setZoom(9);
						
						//map.controls[google.maps.ControlPosition.LEFT_CENTER].splice(,1);
						//return;
				}
				else
				{
					//Need to check with Mourya why this function is required.
					pole_status(req_id); 
				}				
			}
		});

	}
	function getUrlVars() 
	{
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		return vars;
	}
        function setStatus(status){
                sendMessage('uber',status,'UpdateStatus',to);
        }
	function showDestDiv(){
		//var elements = getElementsByClass("div", "searchcontrol");
		//if (elements.length > 0) 
		{
    			// just change the first, as you did in your post
    			//elements[0].parentNode.insertBefore(document.getElementById("destInput"), elements[0].nextSibling);
			document.getElementById('destInput').style.display = "block";
		}
	}

function getElementsByClass(tagType, className) {
    var elems = document.getElementsByTagName(tagType);
    var returns = [];
    for (var i in elems) {
        if ((' ' + elems[i].className + ' ').indexOf(' ' + className + ' ') > -1) {
            returns.push(elems[i]);
        }
    }
    return returns;
}

	function changeStyle(productType)
	{
		document.getElementById('eta').innerHTML = "<div class=\"tracer\" ></div><strong>5</strong> min";
		document.getElementsByClassName('slider')[0].style.transform='translate(12px, 0px)';
		document.getElementById('sliderImg').src = "../img/mono-uberx.png";
		addProductClass(productType);
	 	//add logic to make the class unavialable.	
		//loadDesc(this.id);
	}
	function changeStyle1(productType)
	{
		document.getElementById('eta').innerHTML = "<div class=\"tracer\" ></div><strong>7</strong> min";
		document.getElementsByClassName('slider')[0].style.transform='translate(84px, 0px)';
		document.getElementById('sliderImg').src = "../img/mono-uberxl2.png";
		addProductClass(productType);
	 	//add logic to make the class unavialable.
		//loadDesc(this.id);
	}
	function changeStyle2(productType)
	{
		document.getElementById('eta').innerHTML = "<div class=\"tracer\" ></div><strong>6</strong> min";
		document.getElementsByClassName('slider')[0].style.transform='translate(156px, 0px)';
		document.getElementById('sliderImg').src = "../img/mono-uberselect.png";
		addProductClass(productType);
		//loadDesc(this.id);
	}
	function changeStyle3(productType)
	{
		document.getElementById('eta').innerHTML = "<div class=\"tracer\" ></div><strong>10</strong> min";
		document.getElementsByClassName('slider')[0].style.transform='translate(228px, 0px)';
		document.getElementById('sliderImg').src = "../img/mono-black.png";
		addProductClass(productType);
		//loadDesc(this.id);
	}
	function changeStyle4(productType)
	{
		document.getElementById('eta').innerHTML = "<div class=\"tracer\" ></div><strong>8</strong> min";
		document.getElementsByClassName('slider')[0].style.transform='translate(300px, 0px)';
		document.getElementById('sliderImg').src = "../img/mono-suv.png";
		addProductClass(productType);
		//loadDesc(this.id);
	}
	
	function addProductClass(productType)
	{
		
		if(prod_List[productType]==null || prod_List[productType]==undefined)
		{
			document.getElementById('eta').innerHTML  = "<div class=\"tracer\" ></div>";;
			document.getElementById('cta').innerHTML = "No "+productType+" Available";
			document.getElementById('sliderImg').className='unavailable';
		}
		else
		{	
			document.getElementById('cta').innerHTML = "REQUEST "+productType;
			document.getElementById('sliderImg').className='';	
		}	
	}
