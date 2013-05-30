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
      $scope.selected = $scope.problems[0];
    }, function( reason ) {
      showError( reason.status );
    });

    $scope.logCode = function() {
      console.log( $scope.code );
    };

    var results;
    $scope.evalCode = function() {
      results = eval( $scope.code );
      console.log( Object.keys( results ) );
    };

    // Test definition code.
    $scope.alerts = [];
    var reporter = new jasmine.SimpleReporter();

    reporter.onRunnerFinished(function( output ) {
      $scope.output = output;
      $scope.alerts = $scope.alerts.concat( output );
    });

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.addReporter( reporter );

    function resetJasmineRunner( runner ) {
      // We need to handle garbage collection.
      // It appears to have been improved in Jasmine 2.0.
      runner.queue.index = 0;
      runner.suites_ = [];
    }

    $scope.testingDisabled = false;

    $scope.testCode = function() {
      $scope.testingDisabled = true;
      resetJasmineRunner( jasmineEnv.currentRunner() );

      eval( $scope.selected.suite.join( '\n' ) );

      jasmineEnv.execute();

      $timeout(function() {
        $scope.testingDisabled = false;
      }, jasmineEnv.updateInterval );
    };

    $document.bind( 'keyup', function( event ) {
      // Escape.
      if ( event.which === 27 ) {
        $scope.alerts = [];
        $scope.$apply();
      }
    });

    $document.bind( 'keypress', function( event ) {
      if ( event.which === 13  && event.ctrlKey ) {
        event.preventDefault();
      }
    });

    $scope.closeAlert = function( $index ) {
      $scope.alerts.splice( $index, 1 );
    };

    $scope.showingAlerts = true;
  }]);
