'use strict';

describe( 'Directive: markdown', function() {
  beforeEach( module( 'qualifyJsApp' ) );

  var element;

  it( 'should make hidden element visible', inject( function( $rootScope, $compile ) {
    element = angular.element( '<markdown></markdown>' );
    element = $compile( element )( $rootScope );
  }));
});
