'use strict';

angular.module( 'qualifyJsApp' )
  .factory( 'jasmineService', function() {
    var jasmineEnv = jasmine.getEnv();

    // Configure jasmine environment.
    var reporter = new jasmine.SimpleReporter();
    jasmineEnv.addReporter( reporter );

    // We need to handle garbage collection.
    // It appears to have been improved in Jasmine 2.0.
    function resetJasmineRunner( runner ) {
      runner.queue.index = 0;
      runner.suites_ = [];
    }

    return {
      env: jasmineEnv,
      reporter: reporter,
      resetJasmineRunner: resetJasmineRunner,

      /**
       * Run jasmine suite with finishHandler attached to reporter.
       * @param {function} finishHandler
       */
      executeJasmine: function( finishHandler ) {
        // Reset jasmine environment and attach logging function.
        reporter.onRunnerFinished( finishHandler );
        // Execute tests and reset.
        jasmineEnv.execute();
        resetJasmineRunner( jasmineEnv.currentRunner() );
      }
    };
  });
