'use strict';

describe( 'Directive: markdown', function() {
  beforeEach( module( 'qualifyJsApp' ) );

  var element;

  it( 'convert Markdown problem description into HTML', inject( function( $rootScope, $compile ) {
    $rootScope.text = '**bold** *italic*';

    element = angular.element( '<markdown ng-model="text"></markdown>' );
    element = $compile( element )( $rootScope );

    $rootScope.$digest();

    expect( element.html() ).toBe( '<p><strong>bold</strong> <em>italic</em></p>' );
  }));
});
