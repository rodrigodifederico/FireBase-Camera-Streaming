
$( document ).ready(function() {
    root = new Firebase('https://1oteste.firebaseio.com/mensagem');

	root.on('value', function(snapshot){
		$("#imagem").attr('src', snapshot.val())
	});
});