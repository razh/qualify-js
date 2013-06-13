'use strict';

describe( 'Controller: MainCtrl', function() {

  // load the controller's module
  beforeEach( module( 'qualifyJsApp' ) );

  var MainCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach( inject( function( $controller, $rootScope ) {
    scope = $rootScope.$new();
    MainCtrl = $controller( 'MainCtrl', {
      $scope: scope
    });
  }));

  it( 'should eval ace editor code content', function() {
    scope.code =
      '(function() {\n' +
      '  return {\n' +
      '    publicProperty: 7,\n' +
      '    publicMethod: function() {\n' +
      '      return 5;\n' +
      '    }\n' +
      '  };\n' +
      '}) ();';

    var $results = scope.evalCode();
    expect( $results.publicProperty ).toBe(7);
    expect( $results.publicMethod() ).toBe(5);
  });
});
