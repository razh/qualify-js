'use strict';

describe( 'Controller: ContentsCtrl', function() {

  // load the controller's module
  beforeEach(module( 'qualifyJsApp' ) );

  var ContentsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach( inject( function( $controller, $rootScope ) {
    scope = $rootScope.$new();
    ContentsCtrl = $controller( 'ContentsCtrl', {
      $scope: scope
    });
  }));

  it( 'should attach a list of awesomeThings to the scope', function() {
    expect( scope.awesomeThings.length ).toBe(3);
  });
});
