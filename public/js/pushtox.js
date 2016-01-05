function closeWindow(){
	var display  = document.getElementById('display');
		if(display!=null)
			display.parentNode.removeChild(display);

}
function displayContents(type,data){
		if(type=='image'){
			showImage('page2','image',data);
		}
		if(type=='video'){
			showVideo('page2','video',data);
			
		}		
				
		

}
function loadContents(){
		//display: none;
		var parentDiv = document.createElement('div');
		parentDiv.setAttribute('id','parent');
		parentDiv.setAttribute('style','left:15%;width: 70%;height:60%;z-index: 9999;position:absolute;   top: 20%;');

		
		if(parentDiv!=null)
			document.body.appendChild(parentDiv);


		var acceptButton = document.createElement('button');
		var t = document.createTextNode("ACCEPT");       // Create a text node
		acceptButton.appendChild(t); 
		//parentDiv.appendChild(acceptButton);
		acceptButton.setAttribute('onclick','acceptRide();');
		
		var div1 = document.createElement('div');
		div1.setAttribute('id','my_camera');
		div1.setAttribute('style','width:100%; height:100%;');
		if(div1!=null)
			parentDiv.appendChild(div1);
			
		var img1 = document.createElement('img');
		img1.setAttribute('id','snap');
		img1.setAttribute('src','../img/capture.png');
		img1.setAttribute('style','width:10%; height:10%;');
		img1.setAttribute('onclick','take_snapshot();');
		if(img1!=null)
			parentDiv.appendChild(img1);			
			
		var img2 = document.createElement('img');
		img2.setAttribute('id','record');
		img2.setAttribute('src','../img/videocapture.png');
		img2.setAttribute('style','width:10%; height:10%;');
		img2.setAttribute('onmousedown','startrecord();');
		img2.setAttribute('onmouseup','stoprecord();');
		if(img2!=null)
			parentDiv.appendChild(img2);			

		var closeButton = document.createElement('img');
		closeButton.setAttribute('src','../img/close.png');
		closeButton.setAttribute('style','width:50px; height:45px;');
		closeButton.setAttribute('onclick','hideDiv();');
		parentDiv.appendChild(closeButton);			
	

        Webcam.attach(div1);
		
		}
		function playVideo(){
			var x = document.getElementsByTagName("video");
			x[0].play();				
		}
        function take_snapshot() {
            Webcam.snap( function(data_uri) {
				var audio = document.createElement('audio');
				audio.src = '../sound/shutter.mp3';
				audio.setAttribute("onended","playVideo()");
				audio.play();
				var x = document.getElementsByTagName("video");
				x[0].pause();				
                console.log(data_uri);
				sendMessage('pushtoX',data_uri,'image',[]);
            } );
        }
		function startrecord()
{
	var canvas = document.createElement("canvas");
	var img2 = document.getElementById('record');
	img2.setAttribute('src','../img/video_started.png');
	navigator.getUserMedia({
                        audio: true,
			video:true,
         		}, function(stream) {
                        			recordAudio = RecordRTC(stream,{type: 'video'});
                        			recordAudio.startRecording();
						console.log('recording started....');
						var x = document.getElementsByTagName("video");
                    	}, function(error) {
                        		alert(JSON.stringify(error));
                    	});
}
				
function stoprecord()
{
	recordAudio.stopRecording(function() {
			onStopRecording();
			console.log('recording stopped');
        });
}

function onStopRecording() 
{
	console.log('Stopped recording');
	var img2 = document.getElementById('record');
	img2.setAttribute('src','../img/videocapture.png');
	
        recordAudio.getDataURL(function(audioDataURL) 
		{
                console.log(audioDataURL);
				sendMessage('pushtoX',audioDataURL,'video',[]);
        });
} 
function hideDiv(){
	var parentdiv = document.getElementById("parent");
	var div = document.getElementById("parent");
	div.parentNode.removeChild(div);	
	parentdiv.style.visibility = "hidden";

}
function acceptRide(){
	console.log('Driver Accepted');
	sendMessage('uber', 'Check_Req_id_status'+'$reqid$accepted', 'accepted', []);

}
$("#snap").on("tap",function(){
  take_snapshot();
});

$("#record").on("taphold",function(){
  startrecord();
});

$('#record').bind('touchend', function(e){
	stoprecord();
});