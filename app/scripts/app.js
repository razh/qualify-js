'use strict';

angular.module( 'qualifyJsApp', [ 'ui.ace', 'ui.bootstrap' ] )
  .constant( 'consts', (function() {
    return {
      drawerWidth: 265,
      config: './json/config.json',
      problems: './json/problems.json'
    };
  }) ())
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
