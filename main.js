// TODO:
//
// Refactor handleSubmit to create items correctly
// Add toggleDone function
// Add Handlebars.js for templating new tasks
// Refactor into an object

//	Add more features to To-Do List
//	Due date (simple) & Priority (default priority is Medium)
//	Due date (next week means today +7, next monday, coming monday, etc...) 

var dateUtil = require('date-util');
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
	var itemDueDateInput = $( '#due-date' ).val();
	var itemDueDate = new Date().strtotime(itemDueDateInput).format("dd/mm/yyyy");
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
	var requiredPriority = $( 'input:radio[name=priority-choices]:checked' ).val();
	console.log("required priorty is: ", requiredPriority);

	if (requiredPriority == 'All') {
		$( ".todo-priority" ).each ( function( index ) {
			console.log( "the index is ", index, " and the priority of todo is ", $( this ).text());
			var $item = $( this ).parent( 'li' );
			$item.removeClass( 'is-hidden' );
			console.log ("I just displayed ", $item);
		});
	} else {
		$( ".todo-priority" ).each ( function( index ) {
			console.log( "the index is ", index, " and the priority of todo is ", $( this ).text());
			if ( $(this).text() != requiredPriority) {
				var $item = $( this ).parent( 'li' );
				$item.addClass( 'is-hidden' );
				console.log ("I just hid ", $item);
				// // remove the li after a short delay
				// setTimeout(function(){
				// 	$item.remove();
				// }, 500);
			}
		});
	}
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
	$( '#priority-options' ).on( 'submit', app.showByPriority );
	$( '#favourites' ).on( 'click', '.remove-item', app.removeItem );
	$( '#favourites' ).on( 'click', 'li', app.toggleDone );
};

$(document).ready( app.init );









