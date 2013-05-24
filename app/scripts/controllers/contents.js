'use strict';

angular.module( 'qualifyJsApp' )
  .controller( 'ContentsCtrl', [ '$http', '$scope', function( $http, $scope ) {
    $http.get( './json/titles.json' ).then( function( response ) {
      $scope.sections = response.data;
    }, function( reason ) {
      $scope.error = true;
      $scope.errorMessage = reason.status;
    });
  }]);
