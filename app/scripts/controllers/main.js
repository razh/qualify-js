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
      '  // Those won\'t be seen by the test suite.\n' +
      '  var privateProperty = null;\n' +
      '  function privateMethod() { /* ... */ }\n' +
      '  return {\n' +
      '    // Everything to be tested.\n' +
      '    publicProperty: null,\n' +
      '    publicMethod: function() {\n' +
      '      // Private properties and methods are accessible here.\n' +
      '      console.log( privateProperty );\n' +
      '    }\n' +
      '  };\n' +
      '}) ();';

    $scope.logCode = function() {
      console.log( $scope.code );
    };

    $scope.evalCode = function() {
      console.log( Object.keys( eval( $scope.code ) ) );
    };
  }]);
