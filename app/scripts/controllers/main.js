'use strict';

angular.module( 'qualifyJsApp' )
  .controller( 'MainCtrl',
    [ '$scope',
      '$document',
      '$http',
      '$timeout',
      'consts',
      'jasmineService',
    function( $scope, $document, $http, $timeout, consts, jasmineService ) {

    $scope.themes = [];

    $scope.code = '';
    $scope.selected = {
      problem: {},
    };

    // Editor configuration options.
    $scope.config ={
      fontSize: 12,
      theme: 'monokai'
    };


    function showError( message ) {
      $scope.error = true;
      $scope.errorMessage = message;
    }

    // Get config.
    $http.get( consts.config ).then( function( response ) {
      var data = response.data;
      $scope.themes = data.themes;
      $scope.code = data.code.join( '\n' );
    }, function( reason ) {
      showError( reason.status );
    });

    // Get problems.
    $http.get( consts.problems ).then( function( response ) {
      $scope.problems = response.data;
      $scope.selected.problem = $scope.problems[0];
    }, function( reason ) {
      showError( reason.status );
    });

    // Load methods and vars from jasmine service.
    var jasmineEnv = jasmineService.env,
        executeJasmine = jasmineService.executeJasmine;

    function finishHandler( output ) {
      $scope.alerts = $scope.alerts.concat( output );
    }

    // Testing code.
    $scope.testingDisabled = false;

    // Variables accessible from testing suite.
    // Code string.
    var $code;
    // Results of evaluated code.
    var $results;

    $scope.evalCode = function() {
      $code = $scope.code;
      $results = eval( $code );
      return $results;
    };

    $scope.testCode = function() {
      if ( !$scope.selected.problem || !$scope.selected.problem.suite ) {
        return;
      }

      $scope.evalCode();
      // Disable button to stop clicks during the updateInterval.
      $scope.testingDisabled = true;

      // Load test suite.
      console.log( $scope.selected.problem.suite.join( '\n' ) );
      eval( $scope.selected.problem.suite.join( '\n' ) );

      executeJasmine( finishHandler );

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


    // Settings.
    var showingSettings = false;

    $scope.isShowingSettings = function() {
      return showingSettings;
    };

    $scope.toggleSettings = function() {
      showingSettings = !showingSettings;
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
