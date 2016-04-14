# FireBase-Camera-Streaming
Very simple project using Firebase to stream the camera image

JS/CAMERA.JS is the script that handles camera screenshots and send it to FireBase.
Change the variables AppURL and Interval.

AppURL must contain your Firebase app URL + the node that will save the streaming data.

Interval is how long it must wait before sending the new frame ( 600ms default )

The RECEPTOR folder contains a simple project that receives the streaming


#### IMPORTANT ####
You must understand that Firebase doesn't support video streaming, which means they could suspend or remove your project if you start overloading their servers with this kind of system.
Use it at your own risk.
