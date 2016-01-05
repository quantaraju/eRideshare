var recordAudio;
var audioSrc = document.querySelector('audio');
var fname ='';
var fromMDN = '4698038689';
var toMDN = [];
toMDN.push('4698038698');
var fileTypes = ['jpg', 'jpeg', 'png', 'gif'];
var fileTypesAudio = ['mp3', 'wav', 'ogg'];
var fileTypesVideo = ['mp4', 'webm', 'ogg'];
var chunkLength = 16000000;
var arrayToStoreChunksToBeSent = [];
var arrayToStoreChunksToBeReceived = [];
var firstPacketFiles = true;
var name = "",
		email = "",
		img = "",
		friend = "";

	// cache some jQuery objects
var section = $(".section"),
	footer = $("footer"),
	onConnect = $(".connected"),
	inviteSomebody = $(".invite-textfield"),
	personInside = $(".personinside"),
	chatScreen = $(".chatscreen"),
	left = $(".left"),
	noMessages = $(".nomessages"),
	tooManyPeople = $(".toomanypeople");

// some more jquery objects
var chatNickname = $(".nickname-chat"),
	leftNickname = $(".nickname-left"),
	loginForm = $(".loginForm"),
	yourName = $("#yourName"),
	yourEmail = $("#yourEmail"),
	hisName = $("#hisName"),
	hisEmail = $("#hisEmail"),
	chatForm = $("#chatform"),
	textarea = $("#message"),
	messageTimeSent = $(".timesent"),
	chats = $(".chats");

// these variables hold images
var ownerImage = $("#ownerImage"),
	leftImage = $("#leftImage"),
	noMessagesImage = $("#noMessagesImage");	

function onReadAsData(text,socket,fileName) {
	var data = {}; // data object to transmit over data channel
	data.last = false;
	if (text.length > chunkLength) {
		data.audio = text.slice(0, chunkLength); // getting chunk using predefined chunk length
		arrayToStoreChunksToBeSent.push(data.audio);
		
	} else {
		data.audio = text;
		arrayToStoreChunksToBeSent.push(data.audio);
		var imgsrc= arrayToStoreChunksToBeSent.join('');
		arrayToStoreChunksToBeSent = [];			
		data.last = true;
	}
	console.log(data.audio);
	data.contents =text;
	data.fname = fileName;
	sendMessage(data,'file',toMDN);
	var remainingDataURL = text.slice(data.audio.length);
	if (remainingDataURL.length) setTimeout(function () {
		onReadAsData(remainingDataURL,socket); // continue transmitting
	}, 500)
}
function scrollToBottom(){
		$("html, body").animate({ scrollTop: $(document).height()-$(window).height() },1000);
	}
	
function createChatMessage(msg,user,imgg,now){
		var who = '';
		if(user===fromMDN) {
			who = 'me';
		}
		else {
			who = 'you';
		}
		
		if(msg=='showimage'){
			//alert('got image');
			var li = $(
			'<li class=' + who + '>'+
					'<div class="image">' +
					'<img src="../img/avatar.png" />' +
					'<b></b>' +
					'<i class="timesent" data-time=' + now + '></i> ' +
					'</div>' +
					'<img src=' + imgg + ' height = 200 width = 200/>' +
					
				
				
			'</li>');
			chats.append(li);
			li.find('b').text(user);
			messageTimeSent = $(".timesent");
			messageTimeSent.last().text(now.fromNow());
			return;
		}
		else if(msg=='showfile'){
			//console.log(msg);
			var li = $(
			'<li class=' + who + '>'+
					'<div class="image">' +
					'<img src="../img/avatar.png" />' +
					'<b></b>' +
					'<i class="timesent" data-time=' + now + '></i> ' +
					'</div>' +
					'<a href=' + imgg + ' download = "'+fname+'">'+fname+' </a>' +
					
				
				
			'</li>');
			chats.append(li);
			li.find('b').text(user);
			messageTimeSent = $(".timesent");
			messageTimeSent.last().text(now.fromNow());
			return;
		
		}
		else if(msg=='showaudio'){
			console.log(msg);
			var li = $(
			'<li class=' + who + '>'+
					'<div class="image">' +
					'<img src="../img/avatar.png" />' +
					'<b></b>' +
					'<i class="timesent" data-time=' + now + '></i> ' +
					'</div>' +
					'<audio controls autoplay><source src="'+imgg+'" type="audio/mpeg"></audio>' +
					
				
				
			'</li>');
			chats.append(li);
			li.find('b').text(user);
			messageTimeSent = $(".timesent");
			messageTimeSent.last().text(now.fromNow());
			return;
		
		}		
		else if(msg=='showvideo'){
			console.log(msg);
			var li = $(
			'<li class=' + who + '>'+
					'<div class="image">' +
					'<img src="../img/avatar.png" />' +
					'<b></b>' +
					'<i class="timesent" data-time=' + now + '></i> ' +
					'</div>' +
					'<video controls width="200" height="200" autoplay><source src="'+imgg+'" type="audio/mpeg"></video>' +
					
				
				
			'</li>');
			chats.append(li);
			li.find('b').text(user);
			messageTimeSent = $(".timesent");
			messageTimeSent.last().text(now.fromNow());
			return;
		
		}				
		else{
			var li = $(
			'<li class=' + who + '>'+
				'<div class="image">' +
					'<img src="../img/avatar.png" />' +
					'<b>'+user+'</b>' +
					'<i class="timesent" data-time=' + now + '></i> ' +
				'</div>' +
				'<p></p>' +
			'</li>');

		// use the 'text' method to escape malicious user input
		li.find('p').text(msg);
		li.find('b').text(user);

		chats.append(li);

		messageTimeSent = $(".timesent");
		messageTimeSent.last().text(now.fromNow());
		
		
		}
		
	}	
function showMessage(status,data){

		if(status === "connected"){

			section.children().css('display', 'none');
			onConnect.fadeIn(1200);
		}
		else if(status === "chatStarted"){

			section.children().css('display','none');
			chatScreen.css('display','block');
		}


	}	
function receiveCallBack(data){
		console.log(data);
		toMDN = [];
		toMDN.push(data.fromMDN);
		showMessage('chatStarted');
		if(data.type=='image'){
			console.log('Image receieved');
			createChatMessage('showimage',data.fromMDN,data.msg, moment());
		}
		else if(data.type=='audio'){
			console.log('Audio receieved');
			createChatMessage('showaudio',data.fromMDN,data.msg, moment());

		}
		else if(data.type=='video'){
			console.log('Audio receieved');
			createChatMessage('showvideo',data.fromMDN,data.msg, moment());

		}		
		else if(data.type=='file'){
			console.log('File receieved');
			//createChatMessage('showfile','',data.msg, moment());
			fname = data.fname;
			createChatMessage('showfile', data.fromMDN, data.msg, moment());

		}			
		else if(data.msg.trim().length) {
			createChatMessage(data.msg,data.fromMDN,'', moment());
			scrollToBottom();
		}
}
$(function(){



	// connect to the socket
	
	makeConnection();
				
	// variables which hold the data for each person
	
	left.fadeOut(1200, function() {
				inviteSomebody.fadeOut(1200,function(){
					noMessages.fadeIn(1200);
					footer.fadeIn(1200);
				});
			});


		$('#attachfiles').click(function(){
			$('#imagefile').click();
		
		});
		$('#sendRegister').click(function(){
			fromMDN = $('#mdn').val();
			registerClient(fromMDN,'Nish');
			receiveMessage();
			console.log($('#mdn').val());
			chats.empty();
		});

		$('#startrecording').mousedown(function(){
			$('#startrecording').attr("src", "../img/start.jpg"); 
			 navigator.getUserMedia({
                        audio: true,
                    }, function(stream) {
                        console.log(window.URL.createObjectURL(stream));
                        recordAudio = RecordRTC(stream, {
                            bufferSize: 16384
                        });
                        recordAudio.startRecording();
                    }, function(error) {
                        alert(JSON.stringify(error));
                    });
		});
				$('#startrecording').mouseup(function(){
						$('#startrecording').attr("src", "../img/init.jpg"); 
			                recordAudio.stopRecording(function() {
							onStopRecording();
							//Function implementation is pending
                });
		});
		 function onStopRecording() {
					console.log('Stopped recording');
                    recordAudio.getDataURL(function(audioDataURL) {
						//audioSrc.src = audioDataURL;
						showMessage("chatStarted");
						
						createChatMessage('showaudio', name, audioDataURL, moment());
						socket.emit('user audio', {user: name, img: audioDataURL});
					scrollToBottom();

                        console.log(audioDataURL);
                    });
                }
		
		$('#imagefile').on('change', function(e){
			var file = e.originalEvent.target.files[0],
			reader = new FileReader();
			//When the file has been read...
			reader.onload = function(evt){
			var extension = e.originalEvent.target.files[0].name.split('.').pop().toLowerCase(),  //file extension from input file
			filename = file.name;
			isSuccess = fileTypes.indexOf(extension) > -1;
			isSuccessAudio = fileTypesAudio.indexOf(extension) > -1;
			isSuccessVideo = fileTypesVideo.indexOf(extension) > -1;
			if(isSuccess){
				console.log('Image uplaoded');
				showMessage("chatStarted");
				sendMessage(evt.target.result,'image',toMDN);
				createChatMessage('showimage', fromMDN, evt.target.result, moment());			
				scrollToBottom();
			}
			else if(isSuccessAudio){
				console.log('Audio File uplaoded');
				showMessage("chatStarted");
				
				createChatMessage('showaudio', fromMDN, evt.target.result, moment());
				sendMessage(evt.target.result,'audio',toMDN);
				//socket.emit('user audio', {user: name, img: evt.target.result});
				scrollToBottom();
			}
			else if(isSuccessVideo){
				console.log('Video File uplaoded');
				showMessage("chatStarted");
				createChatMessage('showvideo', fromMDN, evt.target.result, moment());
				sendMessage(evt.target.result,'video',toMDN);
				scrollToBottom();
			}
			else{
				console.log('File uplaoded');
				showMessage("chatStarted");
				fname = file.name;
				createChatMessage('showfile', fromMDN, evt.target.result, moment());
				onReadAsData(evt.target.result,socket,file.name);
				scrollToBottom();
			}
    };
    //And now, read the image and base64
    reader.readAsDataURL(file);  
});
	textarea.keypress(function(e){
		if(e.which == 13) {
			e.preventDefault();
			chatForm.trigger('submit');
		}

	});

	// Sends a text message
	chatForm.on('submit', function(e){
		e.preventDefault();
		showMessage("chatStarted");
		if(textarea.val().trim().length) {
			createChatMessage(textarea.val(), fromMDN, img, moment());
			scrollToBottom();
			console.log(toMDN);
			console.log(fromMDN);
			if(fromMDN!=toMDN){
				sendMessage(textarea.val(),'text',toMDN);			
			}
			
		}
		// Empty the textarea
		textarea.val("");
	});

	// Update the relative time stamps on the chat messages every minute
	setInterval(function(){
		messageTimeSent.each(function(){
			var each = moment($(this).data('time'));
			$(this).text(each.fromNow());
		});

	},60000);
});