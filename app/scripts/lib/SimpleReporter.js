jasmine.SimpleReporter = function() {
  jasmine.Reporter.call( this );

  this.output = [];
  this.callbackEnd = null;
};

jasmine.SimpleReporter.prototype = new jasmine.Reporter();
jasmine.SimpleReporter.prototype.constructor = jasmine.SimpleReporter;

jasmine.SimpleReporter.prototype.onRunnerFinished = function( callback ) {
  this.callbackEnd = callback;
};

jasmine.SimpleReporter.prototype.reportRunnerStarting = function( runner ) {
  this.output = [];
};

jasmine.SimpleReporter.prototype.reportRunnerResults = function( runner ) {
  var result = runner.results();

  if ( this.callbackEnd ) {
    this.callbackEnd( this.output );
  }
};

jasmine.SimpleReporter.prototype.reportSuiteResults = function( suite ) {};
jasmine.SimpleReporter.prototype.reportSpecStarting = function( spec ) {};

jasmine.SimpleReporter.prototype.reportSpecResults = function( spec ) {
  var result = spec.results();

  this.output.push( spec.description + ': ' + ( result.passed() ? 'passed': 'failed' ) );
};

jasmine.SimpleReporter.prototype.log = function( str ) {};
