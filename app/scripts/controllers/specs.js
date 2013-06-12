'use strict';

angular.module( 'qualifyJsApp' )
  .controller( 'SpecsCtrl',
    [ '$scope',
      'jasmineService', function( $scope, jasmineService ) {
    $scope.suites = [];

    // Load methods and vars from jasmine service.
    var jasmineEnv = jasmineService.env,
        resetJasmineRunner = jasmineService.resetJasmineRunner,
        reporter = jasmineService.reporter;

    // Whenever the selected problem changes, update the specs view.
    $scope.$watch( 'selected.problem', function( newValue ) {
      if ( !newValue.suite ) {
        return;
      }

      // Variables available to test suite.
      var $code, $results;
      // Execute the suites once so we can grab spec data.
      eval( newValue.suite.join( '\n' ) );

      var suites = jasmineEnv.currentRunner().suites();
      var specs, tempSuite;

      // Reset specs array.
      $scope.suites = [];
      suites.forEach( function( suite ) {
        tempSuite = [];

        specs = suite.specs();
        specs.forEach( function( spec ) {
          tempSuite.push( spec.description );
        });

        $scope.suites.push( tempSuite );
      });

      // Remove onRunnerFinished handler from reporter.
      reporter.onRunnerFinished( null );
      // Executing and then reseting the jasmine runner prevents duplicate alerts
      // from popping up.
      jasmineEnv.execute();
      resetJasmineRunner( jasmineEnv.currentRunner() );
    });
  }]);
