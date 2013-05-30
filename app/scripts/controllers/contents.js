'use strict';

angular.module( 'qualifyJsApp' )
  .controller( 'ContentsCtrl', [ '$http', '$scope', function( $http, $scope ) {
    $http.get( './json/problems.json' ).then( function( response ) {
      $scope.problems = response.data;
    }, function( reason ) {
      $scope.error = true;
      $scope.errorMessage = reason.status;
    });
  }]);
