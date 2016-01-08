// Q.async takes a generator and returns a function that runs it, 
// much like the suspend library. However, there's a key difference, 
// which is that the generator yields promises. Q takes each promise 
// and ties the generator to it, making it resume when the promise 
// is fulfilled, and sending back the result.

var packageRatesYielder = module.exports = {};

var Q = require( 'q' );

// simple straight up function call
packageRatesYielder._prepareRequestData = function( data ) {
  // do a bunch of mapping
  return {
    firstname: data.name,
    numberOfyears: data.age,
    poison: data.beverage
  } 
};

packageRatesYielder._addRoomsToRequestData = function( data ) {
  if( data.notRooms ) {
    data.rooms = data.notRooms
  }
};

packageRatesYielder._sendRequest = function( data ) {
  console.log( 'data', data );
  return new Promise( function( resolve, reject ) {
    setTimeout( function() {
      console.log( 'response received from Revolver' );
      resolve( [
        {
          a: 1
        },
        {
          b: 2
        }
      ] );
    }, 1000 );
  } );
};

// chain all the things
packageRatesYielder.run = Q.async( function*( data ) {
    var requestData = yield this._prepareRequestData( data );
    yield this._addRoomsToRequestData( requestData );
    // get revolver result
    var result = yield this._sendRequest( requestData );
    return Promise.resolve( result );
} );