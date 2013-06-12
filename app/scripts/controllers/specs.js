'use strict';

angular.module( 'qualifyJsApp' )
  .controller( 'SpecsCtrl',
    [ '$scope',
      'jasmineService', function( $scope, jasmineService ) {
    $scope.specs = [];

    // Load methods and vars from jasmine service.
    var jasmineEnv = jasmineService.env,
        resetJasmineRunner = jasmineService.resetJasmineRunner,
        reporter = jasmineService.reporter;

    $scope.$watch( 'selected.problem', function( newValue ) {
      if ( !newValue.suite ) {
        return;
      }

      // Execute the suites once so we can grab spec data.
      eval( newValue.suite.join( '\n' ) );

      var suites = jasmineEnv.currentRunner().suites();
      suites.forEach(function() {

      });

      // Remove onRunnerFinished handler from reporter.
      reporter.onRunnerFinished( null );
      jasmineEnv.execute();
      resetJasmineRunner( jasmineEnv.currentRunner() );
    });
  }]);
