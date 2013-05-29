'use strict';

angular.module( 'qualifyJsApp' )
  .controller( 'MainCtrl', [ '$scope', function( $scope ) {
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

    $scope.evalCode = function() {
      console.log( Object.keys( eval( $scope.code ) ) );
    };

    // Test definition code.
    var reporter = new jasmine.SimpleReporter();
    reporter.onRunnerFinished(function( output ) {
      $scope.output = output;
      $scope.$apply();
    });

    var jasmineEnv = jasmine.getEnv();

    jasmineEnv.updateInterval = 1000;
    jasmineEnv.addReporter( reporter );

    $scope.suites = [{specs: [{name: 'hello'}]}, {specs: [{name: 'goodbye'}]}];

    var number = 2;
    var nullObject = null;
    $scope.testCode = function() {
      describe( 'Test', function() {
        it( 'should add two numbers correctly', function() {
          console.log('first');
          expect( number + number ).toBe( 2 * number );
        });

        it( 'should have an object with a value of null', function() {
          console.log('second');

          expect( nullObject ).toBeNull();
        });
      });

      jasmineEnv.execute();

      setTimeout(function() {
        number++;
        nullObject = {};
      }, jasmine.updateInterval );
    };
  }]);
