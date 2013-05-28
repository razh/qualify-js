'use strict';

angular.module( 'qualifyJsApp' )
  .controller( 'JasmineCtrl', function( $scope ) {
    $scope.suites = [{specs: [{name: 'hello'}]}, {specs: [{name: 'goodbye'}]}];
  });
