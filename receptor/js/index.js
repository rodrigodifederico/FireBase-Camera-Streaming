
$( document ).ready(function() {
    root = new Firebase('https://myapp.firebaseio.com/node');

	root.on('value', function(snapshot){
		$("#imagem").attr('src', snapshot.val())
	});
});
