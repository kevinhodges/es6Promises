"use strict";

class Kev {
  constructor( options ) {
    console.log( 'kev constructor', options );
    this.age = options.age;
  }

  execute() {
    return new Promise( ( resolve, reject ) => {

      this.start().then( () => {
        return this.middle();
      } ).then( () => {
        return this.finish();
      } ).then( function() {
        resolve( 'ALL THE THINGS WERE DONE');
      } );

    } )
  }

  start() {
    return new Promise( ( resolve, reject ) => {
      console.log('start', this );
      // change the age
      this.age = 34;
      this.changed = true;
      // note we don't generally need to resolve with "this", "resolve()" will do but you can't then test it as it doesn't return anything
      resolve( this );
    } )
  }

  middle() {
    return new Promise( ( resolve, reject ) => {
      console.log('middle', this );
      resolve( this );
    } )
  }

  finish() {
    return new Promise( ( resolve, reject ) => {
      console.log('finish', this );
      resolve( this );
    } ) 
  }

}

// comment these out at your leisure

// executing...

var kevin = new Kev( {
  age: 33
} );

kevin.execute()
.then( function( result ) {
  console.log( 'Kev result', result );
} );


// to test...
// note the run asynchronously so results come back jumbled

console.log('--------');

var kevin = new Kev( {
  age: 33
} );

kevin.start()
.then( function( result ) {
  console.log( 'start result', result );
} );

console.log('--------');

var kevin = new Kev( {
  age: 33
} );

kevin.middle()
.then( function( result ) {
  console.log( 'middle result', result );
} );

