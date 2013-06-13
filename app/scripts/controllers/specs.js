'use strict';

angular.module( 'qualifyJsApp' )
  .controller( 'SpecsCtrl',
    [ '$scope',
      'jasmineService', function( $scope, jasmineService ) {
    $scope.suites = [];

    // Load methods and vars from jasmine service.
    var jasmineEnv = jasmineService.env,
        executeJasmine = jasmineService.executeJasmine;

    // Whenever the selected problem changes, update the specs view.
    $scope.$watch( 'selected.problem', function( newValue ) {
      // Reset specs array.
      $scope.suites = [];
      if ( !newValue.suite ) {
        return;
      }

      // Variables available to test suite.
      var $code, $results;
      // Execute the suites once so we can grab spec data.
      eval( newValue.suite.join( '\n' ) );

      var suites = jasmineEnv.currentRunner().suites();
      var specs, tempSuite;

      suites.forEach( function( suite ) {
        tempSuite = [];

        specs = suite.specs();
        specs.forEach( function( spec ) {
          tempSuite.push( spec.description );
        });

        $scope.suites.push( tempSuite );
      });

      executeJasmine( null );
    });
  }]);
