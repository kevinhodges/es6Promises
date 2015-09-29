var yielder = require( './yield' );

yielder.run()
.then( function( result ) {
	console.log( 'result', result );
} );