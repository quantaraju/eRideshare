var socket;
var connectionFlag = false;
var registerFlag = false;
var clientMDN = '';
var fnmap = [];

function makeConnection(fn,module){
	fnmap[module] = fn;
	socket = io();
	socket.on('connect', function(){
		console.log('Connected');
		connectionFlag = true;
		return true;
		
	});
}
function makeConnection(fn,module,mdn){
	fnmap[module] = fn;
	socket = io();
	socket.on('connect', function(){
		console.log('Connected');
		connectionFlag = true;
		
		
		return true;
		
	});
}

function makeConnectionAndRegister(fn,module,mdn,name,type){
        fnmap[module] = fn;
        socket = io();
        socket.on('connect', function(){
                console.log('Connected');
                connectionFlag = true;
                registerClient(mdn,name,type)
                return true;

        });
}


function registerCallback(fn,module){
	fnmap[module] = fn;
}


function registerClient(number,username){
	if(connectionFlag){
		if(registerFlag){
			console.log('Rider is already registered with MDN:'+clientMDN);		
		}
		else{
			clientMDN = number;
			socket.emit('register', {mdn:number,name:username});
			console.log('Rider registered with '+number);
			registerFlag= true;
			receiveMessage();
		}
	}
	else{
		console.log('Please make connection before registering');
	}
}
function registerClient(number,username,type){
	if(connectionFlag){
		if(registerFlag){
			console.log('Driver is already registered with MDN:'+clientMDN);		
		}
		else{
			clientMDN = number;
			socket.emit('register', {mdn:number,name:username,Type:type});
			console.log('Driver registered with '+number);
			registerFlag= true;
			receiveMessage();
		}
	}
	else{
		console.log('Please make connection before registering');
	}
}
function deregisterClient(){
	if(registerFlag){
		registerFlag = false;
		//socket.send('deregisterClient',{mdn:clientMDN})
		console.log('Client is deregistered successfully');
	}
	else{
		console.log('You are not registered');
	}

}

function receiveMessage()
{	
		socket.on('receive', function(data){
		console.log('Message received');

			var fun = fnmap[data.module];
			if(fun!=undefined)
			{
				fun(data);
			}
			else{
				console.log('Callback for this module is not defined');
			
			}


		
		});
}

function sendMessage(module,message,type,to){
	
		Message = {};
		Message.module = module;
		console.log(to);
		if(registerFlag){
			if(type=='file'){
				Message.fname = message.fname;
				
				Message.msg = message.contents;
				Message.type = type;
				Message.mdn = to;				
				socket.emit('msg', Message);
				console.log('File sent');				
			}
			else{
				Message.msg = message;
				Message.type = type;
				Message.mdn = to;
				console.log(Message);
				socket.emit('msg', Message);	
				console.log('Message sent');
			}
		}
		else{
			console.log('Please register your MDN before sending a message');
		}
		
	
}

