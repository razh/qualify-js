'use strict';

angular.module( 'qualifyJsApp' )
  .factory( 'jasmineService', function() {
    var jasmineEnv = jasmine.getEnv();

    // Configure jasmine environment.
    var reporter = new jasmine.SimpleReporter();
    jasmineEnv.addReporter( reporter );

    return {
      env: jasmineEnv,
      reporter: reporter,
      // We need to handle garbage collection.
      // It appears to have been improved in Jasmine 2.0.
      resetJasmineRunner: function( runner ) {
        runner.queue.index = 0;
        runner.suites_ = [];
      }
    };
  });
