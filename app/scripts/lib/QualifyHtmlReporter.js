(function( document, jasmine ) {
  'use strict';

  // Custom version of Jasmine's HtmlReporter.
  jasmine.QualifyHtmlReporter = function() {
    var self = this;

    var reporterView;

    self.reportRunnerStarting = function( runner ) {
      var specs = runner.specs() || [];

      if ( specs.length === 0 ) { return; }

      reporterView = new jasmine.QualifyHtmlReporter.ReporterView();
      reporterView.addSpecs( specs );
    };
  };


  jasmine.QualifyHtmlReporter.ReporterView = function() {
    this.totalSpecCount = 0;

    this.addSpecs = function( specs ) {
      this.totalSpecCount = specs.length;

      this.views = {
        specs: {},
        suites: {}
      };

      specs.forEach( function( spec ) {
        this.views.specs[ spec.id ] = new jasmine.QualifyHtmlReporter.SpecView( spec, this.views );
      });
    };

    return this;
  };


  jasmine.QualifyHtmlReporter.SuiteView = function( suite, views ) {
    this.suite = suite;
    this.views = views;
  };


  jasmine.QualifyHtmlReporter.SpecView = function( spec, views ) {
    this.spec = spec;
    this.views = views;
  };

}) ( document, jasmine );
