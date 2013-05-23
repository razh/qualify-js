'use strict';

angular.module( 'qualifyJsApp' )
  .directive( 'editor', function() {
    return {
      restrict: 'A',
      link: function postLink( scope, element, attrs ) {
        scope.$watch( 'currentTheme', function( newValue, oldValue ) {
          scope.editor.setTheme( 'ace/theme/' + newValue );
        });
      }
    };
  });
