var yielder = module.exports = {};

var Q = require( 'q' );

// static function
yielder._generateNumber = function() {
    var x = 1;
    console.log( '2' );
    return x;
};

// promise based async simulation
yielder._add2 = function( aNumber ) {
    var deferred = Q.defer();
    console.log( '4', aNumber );
    setTimeout( function() {
        var result = aNumber + 2;
        deferred.resolve( result );
    }, 2000 );
    return deferred.promise;
};

// chain all the things
yielder.run = Q.async( function*( foo ) {
    console.log( 'f00', foo );
    var state = {};
    console.log( '1', state );
    state.initalNumber = yield this._generateNumber();
    console.log( '3', state );
    state.afterAdding2 = yield this._add2( state.initalNumber );
    console.log( '5', state );
    return Q.resolve( state );
} );