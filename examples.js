
// implicit args example

var data = {
	request: request
};

return a( data )
.then( b )
.then( c )

function a( data ) {
	// a() can access ANYTHING on `data` thus has the ability to break the solution while still passing the tests
	console.log( data.request ); // 'request'
	data.aResult = 'aAnswer';
	return data;
}

function b( data ) {
	console.log( data.request ); // 'request'
	console.log( data.aResult ); // 'aAnswer'
	data.bResult = 'bAnswer';
	return data;
}

function c( data ) {
	console.log( data.request ); // 'request'
	console.log( data.aResult ); // 'aAnswer'
	console.log( data.bResult ); // 'bAnswer'
	data.cResult = 'cAnswer';
	return data;
}



// explicit args example

var data = {
	request: 'request'
};

var aData = _.pick( data, 'request' );
return a( aData ).then( function( aResult ) {
	data.aResult = aResult;
	return data;
} )
.then( function( data ) {
	var bData = _.pick( data, 'request', 'aData' );
	return b( bData ).then( function( bResult ) {
		data.bResult = bResult;
		return data;
	} );
} )
.then( function( data ) {
	var cData = _.pick( data, 'request', 'aData', 'bData' );
	return c( cData ).then( function( cResult ) {
		data.cResult = cResult;
		return data;
	} );
} );

function a( data ) {
	// a() can only access what it is passed in it's args
	console.log( data.request ); // 'request'
	return 'aAnswer';
}

function b( data ) {
	console.log( data.request ); // 'request'
	console.log( data.aResult ); // 'aAnswer'
	return 'bAnswer';
}

function c( data ) {
	console.log( data.request ); // 'request'
	console.log( data.aResult ); // 'aAnswer'
	console.log( data.bResult ); // 'bAnswer'
	return 'cAnswer';
}
