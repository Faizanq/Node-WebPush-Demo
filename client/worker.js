console.log('Service Worker invloked');

self.addEventListener('push',e=>{

	const data = e.data.json();
	console.log('Push Recieved...');
	console.log('data:',data);

	self.registration.showNotification(data.title,{
		body:'Notification from Faizan Qureshi',
		icon:'https://picsum.photos/200/300'
	});

});