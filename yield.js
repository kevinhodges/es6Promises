// Q.async takes a generator and returns a function that runs it, 
// much like the suspend library. However, there's a key difference, 
// which is that the generator yields promises. Q takes each promise 
// and ties the generator to it, making it resume when the promise 
// is fulfilled, and sending back the result. We can use this as shown 
// below to control flow, keep the state mutations in 1 place (the run() 
// function) and make the individual functions work more cleanly than
// the current flow method of passing the state between them all.

var yielder = module.exports = {};

var Q = require( 'q' );

// simple straight up function call
yielder._generateNumber = function() {
    var x = 1;
    console.log( '_generateNumber: number generated returning' );
    return x;
};

// async simulation function 
yielder._subtract = function( startNumber, subtract ) {
  console.log( '_subtract: ' + subtract + ' from ' + startNumber );
  return new Promise( function( resolve, reject ) {
    setTimeout( function() {
      console.log('_subtract: function call complete', startNumber - subtract );
      resolve();
    }, 1000 );
  } );
};

// promise (all style) based multi async simulation
yielder._doTwoThings = function( aNumber ) {
  return Promise.all( [ yielder._subtract( aNumber, 3 ), yielder._subtract( aNumber, 5 ) ] );
};

// promise (deferred style) based single async simulation
yielder._add2 = function( aNumber ) {
  console.log( '_add2: called, adding 2 to passed argument ' + aNumber + ' asynchronously ' );
  return new Promise( function( resolve, reject ) {
    setTimeout( function() {
      var result = aNumber + 2;
      console.log('_add2: function call complete, returning result "' + result + '"' );
      resolve( result );
    }, 1000 );
  } );
};

// chain all the things, trying to keep mutations to the "state" together
// called functions perform our logic only knowing what they need to
yielder.run = Q.async( function*( arguments ) {
  console.log( 'run: initial arguments', arguments );
  // setup a state object for this "flow"
  var state = {};
  console.log( 'run: call _generateNumber' );
  state.initalNumber = yield this._generateNumber();
  console.log( 'run: new state', state );
  // do something we don't care about but wait till it's finished
  // yield will be `undefined`
  console.log( 'run: call _doTwoThings' );
  yield this._doTwoThings( state.initalNumber );
  console.log( 'run: new state', state );
  console.log( 'run: call _add2' );
  state.afterAdding2 = yield this._add2( state.initalNumber );
  console.log( 'run: new state', state );
  console.log( 'run: complete, returning state' );
  return Promise.resolve( state );
} );