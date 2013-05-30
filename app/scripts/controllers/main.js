'use strict';

angular.module( 'qualifyJsApp' )
  .controller( 'MainCtrl',
    [ '$scope',
      '$document',
      '$http',
      '$timeout',
      function( $scope, $document, $http, $timeout ) {

    $scope.themes = [];
    $scope.currentTheme = 'monokai';

    $scope.code = '';
    $scope.selected = { problem: {} };

    function showError( message ) {
      $scope.error = true;
      $scope.errorMessage = message;
    }

    // Get config.
    $http.get( './json/config.json' ).then( function( response ) {
      var data = response.data;
      $scope.themes = data.themes;
      $scope.code = data.code.join( '\n' );
    }, function( reason ) {
      showError( reason.status );
    });

    // Get problems.
    $http.get( './json/problems.json' ).then( function( response ) {
      $scope.problems = response.data;
      $scope.selected.problem = $scope.problems[0];
    }, function( reason ) {
      showError( reason.status );
    });

    var jasmineEnv = jasmine.getEnv();

    // Configure jasmine environment.
    (function() {
      // Test definition code.
      var reporter = new jasmine.SimpleReporter();

      reporter.onRunnerFinished(function( output ) {
        $scope.alerts = $scope.alerts.concat( output );
      });

      jasmineEnv.addReporter( reporter );
    }) ();

    function resetJasmineRunner( runner ) {
      // We need to handle garbage collection.
      // It appears to have been improved in Jasmine 2.0.
      runner.queue.index = 0;
      runner.suites_ = [];
    }

    // Testing code.
    $scope.testingDisabled = false;

    // Results of evaluated code (to be called from testing suite).
    var results;
    $scope.evalCode = function() {
      results = eval( $scope.code );
      console.log( Object.keys( results ) );
    };

    $scope.testCode = function() {
      $scope.evalCode();

      // Disable button to stop clicks during the updateInterval.
      $scope.testingDisabled = true;
      resetJasmineRunner( jasmineEnv.currentRunner() );

      // Load test suite.
      console.log($scope.selected.problem.suite.join( '\n' ));
      eval( $scope.selected.problem.suite.join( '\n' ) );

      jasmineEnv.execute();

      $timeout(function() {
        $scope.testingDisabled = false;
      }, jasmineEnv.updateInterval );
    };

    // Alerts.
    $scope.alerts = [];

    $scope.closeAlert = function( $index ) {
      $scope.alerts.splice( $index, 1 );
    };

    $scope.clearAlerts = function() {
      $scope.alerts = [];
      $scope.$apply();
    };


    // Keyboard shortcuts.
    $document.bind( 'keyup', function( event ) {
      // Escape.
      if ( event.which === 27 ) {
        $scope.clearAlerts();
      }
    });

    $document.bind( 'keypress', function( event ) {
      if ( event.which === 13  && event.ctrlKey ) {
        event.preventDefault();
        $scope.testCode();
      }
    });
  }]);
