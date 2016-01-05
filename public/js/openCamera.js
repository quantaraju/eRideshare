 var count =0;
  var cameras = [];
  var audios = [];
  var isRear = true;
  var index =0;
function showImage(id,type,data){
		
		//Delete the existing element if it is there
		var pop = document.getElementById('cameraPopup');
		if(pop!=null){
			//Delete the element
			pop.parentNode.removeChild(pop);		
		}

		
		//var uiblocka = document.createElement('div');
		//uiblocka.setAttribute('class','ui-block-a');
		
		
		var uiblockb = document.createElement('div');
		uiblockb.setAttribute('class','ui-block-b');		
		var capture = document.createElement('img');
		capture.setAttribute('id','capture');
		capture.setAttribute('src','../img/capture.png');
		capture.setAttribute('border','4');
		capture.setAttribute('width','70px');
		capture.setAttribute('height','70px');
		uiblockb.appendChild(capture);
		
		var uiblockc = document.createElement('div');
		uiblockc.setAttribute('class','ui-block-c');		
		var record = document.createElement('img');
		record.setAttribute('id','record');
		record.setAttribute('src','../img/videocapture.png');
		record.setAttribute('width','70px');
		record.setAttribute('height','70px');
		uiblockc.appendChild(record);		
		
		var uiblockd = document.createElement('div');
		uiblockd.setAttribute('class','ui-block-d');
		
		var uigridc = document.createElement('div');
		uigridc.setAttribute('class','ui-grid-c');
		//uigridc.appendChild(uiblocka);
		uigridc.appendChild(uiblockb);
		uigridc.appendChild(uiblockc);
		uigridc.appendChild(uiblockd);
		
		
		var videodiv = document.createElement('div');
		videodiv.setAttribute('id','videodiv');
		videodiv.setAttribute('style','margin-top: 50px; width: 100%; height: 191; position: relative; background-color: #fbfbfb; border: 5px solid #ffffff;');
		videodiv.setAttribute('data-controltype','image');
		
		var videoElement = document.createElement('img');
		videoElement.setAttribute('src',data);
		videoElement.setAttribute('height','400');
		videoElement.setAttribute('width','340');
		videoElement.setAttribute('id','video');
		videoElement.setAttribute('style','vertical-align: middle;');

		videodiv.appendChild(videoElement);

		var closeImage = document.createElement('button');
		//closeImage.setAttribute('alt','image');
		//closeImage.setAttribute('src','../img/close.png');
		closeImage.innerHTML = "Close Media";
		closeImage.color = "white";
		closeImage.setAttribute('onclick','closeCamera()');
		closeImage.setAttribute('style','background-color: #5F9CC5; height:50px; width:310px; position: absolute; margin-left: 17px; margin-top: 470px; border-radius: 25px;');
		
		//closediv.appendChild(closeImage);
		
		
		var cameraPopup = document.createElement('div');
		cameraPopup.setAttribute('data-role','content');
		cameraPopup.setAttribute('style','padding:10px;position:absolute;z-index: 999999');
		cameraPopup.setAttribute('id','cameraPopup');
		
		//cameraPopup.appendChild(closediv);
		cameraPopup.appendChild(closeImage);
		cameraPopup.appendChild(videodiv);
		//cameraPopup.appendChild(uigridc);
		
		var camera = document.getElementById(id);
		camera.appendChild(cameraPopup);
		
	
	//var div = document.getElementById('videodiv');
	
	
	//Webcam.attach(div);

}
function showVideo(id,type,data){
		
		//Delete the existing element if it is there
		var pop = document.getElementById('cameraPopup');
		if(pop!=null){
			//Delete the element
			pop.parentNode.removeChild(pop);		
		}

		
		//var uiblocka = document.createElement('div');
		//uiblocka.setAttribute('class','ui-block-a');
		
		
		
		var uiblockb = document.createElement('div');
		uiblockb.setAttribute('class','ui-block-a');		
		var capture = document.createElement('img');
		capture.setAttribute('id','capture');
		capture.setAttribute('src','../img/capture.png');
		capture.setAttribute('width','70px');
		capture.setAttribute('height','70px');
		uiblockb.appendChild(capture);
		
		var uiblockc = document.createElement('div');
		uiblockc.setAttribute('class','ui-block-b');		
		var record = document.createElement('img');
		record.setAttribute('id','record');
		record.setAttribute('src','../img/videocapture.png');
		record.setAttribute('width','70px');
		record.setAttribute('height','70px');
		uiblockc.appendChild(record);		
		
		var uiblockd = document.createElement('div');
		uiblockd.setAttribute('class','ui-block-c');
		
		var uigridc = document.createElement('div');
		uigridc.setAttribute('class','ui-grid-c');
		//uigridc.appendChild(uiblocka);
		uigridc.appendChild(uiblockb);
		uigridc.appendChild(uiblockc);
		uigridc.appendChild(uiblockd);
		
		var videoElement = document.createElement('video');
                videoElement.setAttribute('src',data);
                videoElement.setAttribute('controls','controls');
                videoElement.setAttribute('autoplay','autoplay');
		        videoElement.setAttribute('height','400');
                videoElement.setAttribute('width','340');
                videoElement.setAttribute('id','video');
                videoElement.setAttribute('style','vertical-align: middle;');

                var videodiv = document.createElement('div');
                videodiv.setAttribute('id','videodiv');
                videodiv.setAttribute('style','margin-top: 50px; width: 100%; height: 191; position: relative; background-color: #fbfbfb; border: 5px solid #ffffff;');
                videodiv.setAttribute('data-controltype','image');
		
		videodiv.appendChild(videoElement);

		
		var closeImage = document.createElement('button');
		closeImage.innerHTML = "Close Media";
		closeImage.color = "white";
		closeImage.setAttribute('onclick','closeCamera()');
		closeImage.setAttribute('style','background-color: #5F9CC5; height:50px; width:310px; position: absolute; margin-left: 17px; margin-top: 470px; border-radius: 25px;');
		
		
		
		var cameraPopup = document.createElement('div');
		cameraPopup.setAttribute('data-role','content');
		cameraPopup.setAttribute('style','padding:10px;position:absolute;z-index: 99999;');
		cameraPopup.setAttribute('id','cameraPopup');
		
		cameraPopup.appendChild(closeImage);
		cameraPopup.appendChild(videodiv);
		//cameraPopup.appendChild(uigridc);
		
		var camera = document.getElementById(id);
		camera.appendChild(cameraPopup);
		
	
	//var div = document.getElementById('videodiv');
	
	
	//Webcam.attach(div);

}
function OpenCamera(id,type){

		//Delete the existing element if it is there
		var pop = document.getElementById('cameraPopup');
		if(pop!=null){
			//Delete the element
			pop.parentNode.removeChild(pop);		
		}
		
		//var uiblocka = document.createElement('div');
		//uiblocka.setAttribute('class','ui-block-a');
		var swap = document.createElement('img');
		swap.setAttribute('id','swap');
		swap.setAttribute('src','../img/swap.png');
		swap.setAttribute('width','70px');
		swap.setAttribute('height','70px');
		//uiblocka.appendChild(swap);
		
		var uiblockb = document.createElement('div');
		uiblockb.setAttribute('class','ui-block-a');		
		var capture = document.createElement('img');
		capture.setAttribute('id','capture');
		capture.setAttribute('src','../img/capture.png');
		capture.setAttribute('width','70px');
		capture.setAttribute('height','70px');
		uiblockb.appendChild(capture);
		
		var uiblockc = document.createElement('div');
		uiblockc.setAttribute('class','ui-block-b');		
		var record = document.createElement('img');
		record.setAttribute('id','record');
		record.setAttribute('src','../img/videocapture.png');
		record.setAttribute('width','70px');
		record.setAttribute('height','70px');
		uiblockc.appendChild(record);		
		
		var uiblockd = document.createElement('div');
		uiblockd.setAttribute('class','ui-block-c');
	
		var closeImage = document.createElement('img');
		closeImage.setAttribute('alt','image');
		closeImage.setAttribute('src','../img/close.png');
		closeImage.setAttribute('onclick','closeCamera()');
		closeImage.setAttribute('style','height:70px;width:70px;');
		uiblockd.appendChild(closeImage);		
		
		var uigridc = document.createElement('div');
		uigridc.setAttribute('class','ui-grid-c');
		//uigridc.appendChild(uiblocka);
		uigridc.appendChild(uiblockb);
		uigridc.appendChild(uiblockc);
		uigridc.appendChild(uiblockd);
		
		var videoElement = document.createElement('video');
		videoElement.setAttribute('autoplay','autoplay');
		videoElement.setAttribute('height','450');
		videoElement.setAttribute('width','340');
		videoElement.setAttribute('id','video');
		videoElement.muted = true;
		
		var videodiv = document.createElement('div');
		videodiv.setAttribute('id','videodiv');
		videodiv.setAttribute('style','width: 100%; height: 450px; position: relative; background-color: #fbfbfb; border: 1px solid #b8b8b8;');
		videodiv.setAttribute('data-controltype','image');

		videodiv.appendChild(videoElement);

		
		
		var cameraPopup = document.createElement('div');
		cameraPopup.setAttribute('data-role','content');
		
		
		cameraPopup.setAttribute('style','padding:10px;position:absolute;z-index: 99999;background-color:black');
		cameraPopup.setAttribute('id','cameraPopup');
		
		//cameraPopup.appendChild(closediv);
		cameraPopup.appendChild(videodiv);
		cameraPopup.appendChild(uigridc);
		
		var camera = document.getElementById(id);
		camera.appendChild(cameraPopup);
		
	
	var div = document.getElementById('videodiv');
	
	
	//Webcam.attach(div);
	
	
	
	
	
	
	
	
	
MediaStreamTrack.getSources(function(sourceInfos) {

    var videoSource = [];
var audioSource = null;

	
  for (var i = 0; i != sourceInfos.length; ++i) {
    var sourceInfo = sourceInfos[i];
    if (sourceInfo.kind === 'audio') {
      console.log(sourceInfo.id, sourceInfo.label || 'microphone');

      audioSource = sourceInfo.id;
	  audios.push(sourceInfo.id);
    } else if (sourceInfo.kind === 'video') {
	
      console.log(sourceInfo.id, sourceInfo.label || 'camera');
	  cameras.push(sourceInfo.id);
	  //if(count==1)
		//continue;
      videoSource[count] = sourceInfo.id;
		count++;
	
  }
	 else {
      console.log('Some other kind of source: ', sourceInfo);
    }
	
	}
	swapCamera();
	//swapCamera();
	
	//alert(count);
  
});
	
	
	
	console.log(cameras);


	
	
	
	
	
	
	
	
        function take_snapshot() {
            
			
			video = $("#video").get(0);
			var scale = 1.0;
			var canvas = document.createElement("canvas");
			canvas.width = video.videoWidth * scale;
			canvas.height = video.videoHeight * scale;
			canvas.getContext('2d')
              .drawImage(video, 0, 0, canvas.width, canvas.height);
 
			//var img = document.createElement("img");
			//img.src = canvas.toDataURL();
			
				var audio = document.createElement('audio');
				audio.src = '../sound/shutter.mp3';
				//audio.setAttribute("autoplay","autoplay");
				var audio1 = new Audio('../sound/shutter.mp3');
				audio1.play();
				console.log(canvas.toDataURL());
			sendMessage('pushtoX',canvas.toDataURL(),'image',[]);
			//console.log(img.src);
			
				
				
            
        }
		
    if(detectmob()==true)
    {
        //document.getElementById("swap").addEventListener("touchstart", function(event)
        //{	
				//event.preventDefault();
			//	swapCamera(0);
		//});	
		document.getElementById("capture").addEventListener("touchstart", function(event)
        {	
				event.preventDefault();
				console.log('touch start');
				take_snapshot();
		});
		document.getElementById("record").addEventListener("touchstart", function(event)
        {		
				event.preventDefault();
				startrecord();
		});
		document.getElementById("record").addEventListener("touchend", function(event)
        {	
				stoprecord();
				event.preventDefault();
				console.log('touch end');
				
		});		

    }
	else{
	
		document.getElementById("capture").addEventListener("click", function(event)
        {

				take_snapshot();
		});
		document.getElementById("record").addEventListener("mousedown", function(event)
        {
				startrecord();
		});
		document.getElementById("record").addEventListener("mouseup", function(event)
        {
				//console.log('touch end');
				stoprecord();
				
		});				
		
	}
	
			function detectmob() { 
		if( navigator.userAgent.match(/Android/i)
		|| navigator.userAgent.match(/webOS/i)
		|| navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i)
		){
			return true;
		}
		else {
			return false;
		}
		}

	function startrecord()
	{
		var img2 = document.getElementById('record');
		img2.setAttribute('src','../img/video_started.png');
		navigator.getUserMedia({
							audio: true,
				video:{
					optional: [{sourceId: cameras[1]}]
				},
					}, function(stream) {
										recordAudio = RecordRTC(stream,{type: 'video'});
										recordAudio.startRecording();
							console.log('recording started....');						
							}, function(error) {
									alert(JSON.stringify(error));
							});
	}
					
			function stoprecord()
			{
				var img2 = document.getElementById('record');
				img2.setAttribute('src','../img/videocapture.png');
				//alert('stopped recording');
				recordAudio.stopRecording(function() {
						onStopRecording();
						//alert('recording stopped');
					});
			}
			
			function onStopRecording() 
			{
				//alert('Stopped recording');
				
				
				
					recordAudio.getDataURL(function(audioDataURL) 
					{
							console.log(audioDataURL);
							//sendMessage('pushtoX',)
							//alert('sending video');
							sendMessage('pushtoX',audioDataURL,'video',[]);
					});
			}
			
	}
	  function closeCamera(){
				cameraPopup = document.getElementById('cameraPopup');
				cameraPopup.parentNode.removeChild(cameraPopup);
				
			}
			
			
			function swapCamera(){
				if(index==0){
				
					index = 1;
				}
				else{
				
					index = 0;
				}
				index = 1;
				function errorCallback(error){
			
					console.log(error);
				}
				var videoElement = document.getElementById('video');
				if(videoElement!=null){
					videoElement.parentNode.removeChild(videoElement);
					//alert('Not null');
				}
					videoElement = document.createElement('video');
					videoElement.setAttribute('autoplay','autoplay');
					videoElement.setAttribute('height','450');
					videoElement.setAttribute('width','340');
					videoElement.setAttribute('id','video');
					videoElement.muted = true;
					var videodiv = document.getElementById('videodiv');				
					videodiv.appendChild(videoElement);
				
				videoSource = cameras[index];
				if(videoSource==undefined){
				
					return;
				}
				 var constraints = {
				audio: {
					//optional: [{sourceId: audioSource}]
				},
				video: {
					optional: [{sourceId: videoSource}]
				}
				};


				navigator.getUserMedia(constraints, function(stream) {
				videoElement.src = window.URL.createObjectURL(stream);
				console.log(stream);
				localMediaStream = stream;
				//alert(stream);
				}, errorCallback);
			
			}
			function switchCamera(){
			
			function errorCallback(error){
			
			console.log(error);
			}
			var videoElement = document.getElementById('video');
			if(videoElement==null){
				
				videoElement = document.createElement('video');
				videoElement.setAttribute('autoplay','autoplay');
				videoElement.setAttribute('height','450');
				videoElement.setAttribute('width','340');
				videoElement.setAttribute('id','video');
				videoElement.muted = true;
				var videodiv = document.getElementById('videodiv');
				
				videodiv.appendChild(videoElement);
			
			}
	var videoSource;
	if(isRear){
		alert('open front camera/default laptop camera');
		isRear = false;
		videoSource = cameras[0];
		console.log(cameras[0]);
		 var constraints = {
		audio: {
		//optional: [{sourceId: audioSource}]
		},
		video: {
		optional: [{sourceId: videoSource}]
		}
	};


  navigator.getUserMedia(constraints, function(stream) {
    videoElement.src = window.URL.createObjectURL(stream);
	console.log(stream);
    localMediaStream = stream;
	//alert(stream);
  }, errorCallback);
	}
	else{
		//open rear camera
		
		isRear = true;
		videoSource = cameras[1];
		videoElement.parentNode.removeChild(videoElement);
		videoElement = document.createElement('video');
		videoElement.setAttribute('autoplay','autoplay');
		videoElement.setAttribute('height','450');
		videoElement.setAttribute('width','340');
		videoElement.setAttribute('id','video');
		videoElement.muted = true;
		var videodiv = document.getElementById('videodiv');
				
		videodiv.appendChild(videoElement);

		console.log(cameras[1]);
		 var constraints = {
		audio: {
		//optional: [{sourceId: audioSource}]
		},
		video: {
		optional: [{sourceId: videoSource}]
		}
	};


  navigator.getUserMedia(constraints, function(stream) {
    videoElement.src = window.URL.createObjectURL(stream);
	
	alert('open rear camera/throw error in laptop');
	console.log(stream);
    localMediaStream = stream;
	//alert(stream);
  }, errorCallback);
	}
	
	//console.log(cameras);
}
