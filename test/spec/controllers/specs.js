'use strict';

describe( 'Controller: SpecsCtrl', function() {

  // load the controller's module
  beforeEach( module( 'qualifyJsApp' ) );

  var SpecsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach( inject( function( $controller, $rootScope ) {
    scope = $rootScope.$new();
    SpecsCtrl = $controller( 'SpecsCtrl', {
      $scope: scope
    });
  }));

  it( 'should attach a list of awesomeThings to the scope', function() {
  });
});
