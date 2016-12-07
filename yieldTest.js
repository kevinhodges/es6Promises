var yielder = require( './yield' );

// we can pass initial state/arguments here
yielder.run( 'foo' )
.then( function( result ) {
	// this is what gets resolved from the yielder
	console.log( 'result', result );
} );