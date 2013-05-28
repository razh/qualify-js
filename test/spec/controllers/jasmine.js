'use strict';

describe( 'Controller: JasmineCtrl', function() {

  beforeEach( module( 'qualifyJsApp' ) );

  var JasmineCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach( inject( function( $controller, $rootScope ) {
    scope = $rootScope.$new();
    JasmineCtrl = $controller( 'JasmineCtrl', {
      $scope: scope
    });
  }));

  it( 'should have an empty list of suites', function() {
    expect( scope.suites.length ).toBe(0);
  });
});
