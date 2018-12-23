const publicVapidKey = 'BKyOpiF6Fr4UPQsbO5xTosfXsPMqV3jgGijheMcUrA707-dwDJQqtkey4zP4sI2juaF9oE0U0rP996vXKJih-iE';


//Check for service Worker
if('serviceWorker' in navigator){
	send().catch(err=>console.error(err));
}

//Register SW,Register Push,Send Push
async function send(){

	//Rgister servceWorker
	console.log('Registering serviceWorker');
	const Register = await navigator.serviceWorker.register('./worker.js',{
		scope:'/'
	});
	console.log('serviceWorker registered');

	//Register Push Notification
	console.log('Registering Push... ');
	const Subscription = await Register.pushManager.subscribe({
		userVisibleOnly:true,
		applicationServerKey:urlBase64ToUint8Array(publicVapidKey)
	});
	console.log('Push registered');

	//Send Push Notification
	console.log('Sending Push Notification');

	await fetch('/subscribe',{
		method:'POST',
		body:JSON.stringify(Subscription),
		headers:{
			'Content-type':'application/json'
		}

	});

	console.log('Push Sent');
}


function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}