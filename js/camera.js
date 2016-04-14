


var AppURL = 'https://myapp.firebaseio.com/node'; // INSERT YOUR APP NAME AND NODE TO SAVE THE STREAMING DATA
var Interval = 600;



// ###########################################

var context = null;
var video = null;
var root = new Firebase(AppURL);

$( document ).ready(function() {
	// Put event listeners into place
	window.addEventListener("DOMContentLoaded", function() {
		// Grab elements, create settings, etc.
		var canvas = document.getElementById("canvas"),
			videoObj = { "video": true },
			errBack = function(error) {
				console.log("Video capture error: ", error.code); 
			};
			
			
		context = canvas.getContext("2d");
		video = document.getElementById("video");

		// Put video listeners into place
		if(navigator.getUserMedia) { // Standard
			navigator.getUserMedia(videoObj, function(stream) {
				video.src = stream;
				video.play();
			}, errBack);
		} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
			navigator.webkitGetUserMedia(videoObj, function(stream){
				video.src = window.URL.createObjectURL(stream);
				video.play();
			}, errBack);
		}
		else if(navigator.mozGetUserMedia) { // Firefox-prefixed
			navigator.mozGetUserMedia(videoObj, function(stream){
				video.src = window.URL.createObjectURL(stream);
				video.play();
			}, errBack);
		}
	}, false);
});

var enviado = false;
var primeiro = true;

setInterval(function(){
	
		if(enviado==false && primeiro == false){
			// If it is still sending the data to Firebase, then return
			console.log("nao rodou");
			return false;
		}

		enviado = false;
		
		context.drawImage(video, 0, 0, 320,240);
		encodeImage(canvas.toDataURL(), function(encodedImage) { 

			root.set(encodedImage);
			
			root.on('value', function(snapshot){
				enviado = true;
				primeiro = false;
			});
			
		});
}, Interval);


function encodeImage(src, callback) {
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        img = new Image();
    
      img.onload = function(){
        canvas.width  = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        callback(canvas.toDataURL());
      }
      img.src = src;;
}
