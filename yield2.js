// Q.async takes a generator and returns a function that runs it, 
// much like the suspend library. However, there's a key difference, 
// which is that the generator yields promises. Q takes each promise 
// and ties the generator to it, making it resume when the promise 
// is fulfilled, and sending back the result.

var yielder = module.exports = {};

var Q = require( 'q' );

// simple straight up function call
yielder._generateNumber = function() {
    var x = 1;
    console.log( '2' );
    return x;
};

// async simulation function 
yielder._subtract = function( start, subtract ) {
  console.log( '_subtracting', subtract );
  return new Promise( function( resolve, reject ) {
    setTimeout( function() {
      console.log('subtracting finished with', start - subtract );
      resolve();
    }, 1000 );
  } );
};

// promise (all style) based multi async simulation
yielder._doTwoThings = function( aNumber ) {
  console.log( '4' );
  return Promise.all( [ yielder._subtract( aNumber, 3 ), yielder._subtract( aNumber, 5 ) ] );
};

// promise (deferred style) based single async simulation
yielder._add2 = function( aNumber ) {
  console.log( '6', aNumber );
  return new Promise( function( resolve, reject ) {
    setTimeout( function() {
      var result = aNumber + 2;
      console.log('setTimeout finished');
      resolve( result );
    }, 1000 );
  } );
};

// chain all the things
yielder.run = Q.async( function*( foo ) {
    console.log( 'f00', foo );
    var state = {};
    console.log( '1', state );
    state.initalNumber = yield this._generateNumber();
    console.log( '3', state );
    // do something we don't care about but wait till it's finished
    // yield will be `undefined`
    yield this._doTwoThings( state.initalNumber );
    console.log( '5' );
    state.afterAdding2 = yield this._add2( state.initalNumber );
    console.log( '7', state );
    return Promise.resolve( state );
} );