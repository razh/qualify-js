'use strict';

describe( 'Service: jasmine', function() {

  // load the service's module
  beforeEach( module( 'qualifyJsApp' ) );

  // instantiate service
  var jasmineService;
  beforeEach( inject( function( _jasmineService_ ) {
    jasmineService = _jasmineService_;
  }));

  it( 'should do something', function() {
    expect( !!jasmineService ).toBe( true );
  });

});
