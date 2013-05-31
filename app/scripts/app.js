'use strict';

angular.module( 'qualifyJsApp', [ 'ui.ace', 'ui.bootstrap' ] )
  .constant( 'consts', (function() {
    return {
      drawerWidth: 265,
      config: './json/config.json',
      problems: './json/problems.json'
    };
  }) ())
  .filter( 'capitalize', function() {
    return function( string ) {
      return string.substring( 0, 1 ).toUpperCase() + string.substring(1);
    };
  })
  .config( [ '$routeProvider', function( $routeProvider ) {
    $routeProvider
      .when( '/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
