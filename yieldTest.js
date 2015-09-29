var yielder = require( './yield' );

// we can pass stuff to the generator here
yielder.run( 'foo' )
.then( function( result ) {
	// this is what gets resolved from the yielder
	console.log( 'result', result );
} );