// TODO:
//
// Refactor handleSubmit to create items correctly
// Add toggleDone function
// Add Handlebars.js for templating new tasks
// Refactor into an object

//	Add more features to To-Do List
//	Due date (simple) & Priority (default priority is Medium)
//	Due date (next week means today +7, next monday, coming monday, etc...) 

var app = {};

app.createItem = function( item ){
	var source =  $( '#item-template' ).html();
	var template = Handlebars.compile( source );
	var task = template( item );

	$( '#favourites' ).append( task );
};

app.handleSubmit = function( event ){
	event.preventDefault();
	var itemName = $( '#new-thing' ).val();
	var itemDueDate = $( '#due-date' ).val();
	var itemPriority = $( '#priority' ).val();
	
	var itemObject = {
		name: itemName,
		dueDate: itemDueDate,
		priority: itemPriority,
		done: false
	};

	app.createItem( itemObject );
	$( '#new-thing' ).focus().val( '' );

};

app.removeItem = function( event ){
	event.preventDefault();

	// add a class to the li
	var $item = $( this ).parent( 'li' );
	console.log($item);
	$item.addClass( 'is-hidden' );

	// remove the li after a short delay
	setTimeout(function(){
		$item.remove();
	}, 500);

};

app.toggleDone = function() {
	var $task= $( this );
	$task.toggleClass( 'is-done');
};

app.showByPriority = function( event ) {
	event.preventDefault();
	var requiredPriority = $( '#priority' ).val();
	console.log("required priorty is: ", requiredPriority);

	$( "#favourites" ).each ( function( index ) {
		var $item = this;
		console.log( $item );
		if (value.priority != requiredPriority) {
			$item.addClass( 'is-hidden' );
			// remove the li after a short delay
			setTimeout(function(){
				$item.remove();
			}, 500);
		}
	});
};

app.init = function( ) {
	$.getJSON( 'data.json', function( response ) {
		console.log( response );
		$.each( response.items, function( key, value ) {
			// create an item for each object
			app.createItem( value );
		});
	});

	$( '#create-new-todo' ).on( 'submit', app.handleSubmit );
	$( '#display' ).on( 'submit', app.showByPriority );
	$( '#favourites' ).on( 'click', '.remove-item', app.removeItem );
	$( '#favourites' ).on( 'click', 'li', app.toggleDone );
};

$(document).ready( app.init );









