var yielder = require( './packageRatesYield' );

var data = {
	agent: 'ABC01',
	name: 'Kevin',
	age: 33,
	beverage: 'beer',
	notRooms: [
		{
			adults: 2,
			children: 0,
			occupancyType: 'DBL'
		}
	]
};

// we can pass stuff to the generator here
yielder.run( data )
.then( function( result ) {
	// this is what gets resolved from the yielder
	console.log( 'result', result );
} );