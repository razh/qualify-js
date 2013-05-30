'use strict';

angular.module( 'qualifyJsApp', [ 'ui.ace', 'ui.bootstrap' ] )
  .constant( 'consts', (function() {
    return {
      drawerWidth: 265
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
