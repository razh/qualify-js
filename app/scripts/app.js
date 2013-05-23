'use strict';

angular.module( 'qualifyJsApp', [ 'ui.ace' ] )
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
