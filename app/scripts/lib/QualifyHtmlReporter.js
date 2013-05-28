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

  // Abstract class for QualifyHtmlReporter view.
  jasmine.QualifyHtmlReporter.View = function() {};

  jasmine.QualifyHtmlReporter.View.prototype.createDOM = function( type, attrs, childrenVarArgs ) {
    var el = document.createElement( type );

    var i, child;
    // Create text nodes with child elements.
    for ( i = 2; i < arguments.length; i++ ) {
      child = arguments[i];

      if ( typeof child === 'string' ) {
        el.appendChild( document.createTextNode( child ) );
      } else {
        if ( child ) {
          el.appendChild( child );
        }
      }
    }

    // Add attributes.
    for ( var attr in attrs ) {
      if ( attr === 'className' ) {
        el[ attr ] = attrs[ attr ];
      } else {
        el.setAttribute( attr, attrs[ attr ] );
      }
    }

    return el;
  };

  jasmine.QualifyHtmlReporter.View.prototype.append = function( child, childElement ) {
    var parent = child[ parentSuite ];
  };

  jasmine.QualifyHtmlReporter.View.prototype.getSpecStatus = function( child ) {
    var results = child.results();

    var status = results.passed() ? 'passed' : 'failed';
    if ( results.skipped ) {
      status = 'skipped';
    }

    return status;
  };

  // Reporter view.
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

    this.createResultsMenu = function() {};

    return this;
  };

  jasmine.QualifyHtmlReporter.ReporterView.prototype = new jasmine.QualifyHtmlReporter.View();
  jasmine.QualifyHtmlReporter.ReporterView.prototype.constructor = jasmine.QualifyHtmlReporter.ReporterView;

  // Suite view.
  jasmine.QualifyHtmlReporter.SuiteView = function( suite, views ) {
    this.suite = suite;
    this.views = views;
  };

  jasmine.QualifyHtmlReporter.SuiteView.prototype = new jasmine.QualifyHtmlReporter.View();
  jasmine.QualifyHtmlReporter.SuiteView.prototype.constructor = jasmine.QualifyHtmlReporter.SuiteView;


  // Spec view.
  jasmine.QualifyHtmlReporter.SpecView = function( spec, views ) {
    this.spec = spec;
    this.views = views;
  };

  jasmine.QualifyHtmlReporter.SpecView.prototype = new jasmine.QualifyHtmlReporter.View();
  jasmine.QualifyHtmlReporter.SpecView.prototype.constructor = jasmine.QualifyHtmlReporter.SpecView;

}) ( document, jasmine );
