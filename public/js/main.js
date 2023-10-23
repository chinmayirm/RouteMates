//frontend
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');


//get username and room from URL
const {username,room} = Qs.parse(location.search,{
	ignoreQueryPrefix:true
});
const socket = io();

//join chatroom
socket.emit('joinRoom',{username,room});

//Get room and users
socket.on('roomUsers',({room,users}) =>{
	outputRoomName(room);
	outputusers(users);
	
});
//message from server
socket.on('message',message =>{
	console.log(message);
	outputMessage(message);
	
	//scroll down 
	chatMessages.scrollTop = chatMessages.scrollHeight;
});

//message Submit
chatForm.addEventListener('submit',e=>{
	e.preventDefault();
	
	const msg = e.target.elements.msg.value;
	
	//emit messgae to server
	socket.emit('chatMessage',msg);
	
	//clear input
	e.target.elements.msg.value = '';
	e.target.elements.msg.focus();
});

//Output message to DOM 
function outputMessage(message){
	const div = document.createElement('div');
	div.classList.add('message');
	div.innerHTML= `<p class = "meta">${message.username}<span> ${message.time} </span> </p>
	<p class = "text">
		${message.text}
	</p>`;
	document.querySelector('.chat-messages').appendChild(div);
	  
}

//Add room name to DOM
function outputRoomName(room){
	roomName.innerText = room;
	
	
}