'use strict';

angular.module( 'qualifyJsApp' )
  .controller( 'MainCtrl', [ '$scope', function( $scope ) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.$watch( 'code', function() {
      console.log( $scope.code );
    });
  }]);
