'use strict';

angular.module( 'qualifyJsApp' )
  .controller( 'MainCtrl',
    [ '$scope',
      '$document',
      '$http',
      '$timeout',
      function( $scope, $document, $http, $timeout ) {

    $scope.themes = [
      'ambiance',
      'chrome',
      'clouds',
      'clouds_midnight',
      'cobalt',
      'crimson_editor',
      'dawn',
      'dreamweaver',
      'eclipse',
      'github',
      'idle_fingers',
      'merbivore',
      'merbivore_soft',
      'mono_industrial',
      'monokai',
      'pastel_on_dark',
      'solarized_dark',
      'solarized_light',
      'textmate',
      'tomorrow',
      'tomorrow_night',
      'tomorrow_night_blue',
      'tomorrow_night_bright',
      'tomorrow_night_eighties',
      'twilight',
      'vibrant_ink',
      'xcode'
    ];

    $scope.currentTheme = 'monokai';

    $scope.code =
      '(function() {\n' +
      '  // These won\'t be seen by the test suite.\n' +
      '  var privateProperty = null;\n' +
      '  function privateMethod() { /* ... */ }\n' +
      '  return {\n' +
      '    // But it can see these.\n' +
      '    publicProperty: null,\n' +
      '    publicMethod: function() {\n' +
      '      // Private properties and methods can be accessed from here.\n' +
      '      console.log(privateProperty);\n' +
      '    }\n' +
      '  };\n' +
      '}) ();';

    $scope.logCode = function() {
      console.log( $scope.code );
    };

    // Get problems.
    $http.get( './json/problems.json' ).then( function( response ) {
      $scope.problems = response.data;
      $scope.selected = $scope.problems[0];
    }, function( reason ) {
      $scope.error = true;
      $scope.errorMessage = reason.status;
    });

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
