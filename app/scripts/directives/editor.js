'use strict';

angular.module( 'qualifyJsApp' )
  .directive( 'editor', [ '$window', function( $window ) {
    return {
      restrict: 'A',
      link: function postLink( scope, element, attrs ) {
        // Configure editor.
        setTimeout(function() {
          var editor = scope.editor.getSession();

          editor.setTabSize(2);
          editor.setUseSoftTabs( true );

          fitToWindow();
        }, 16 );

        scope.$watch( 'currentTheme', function( newValue, oldValue ) {
          scope.editor.setTheme( 'ace/theme/' + newValue );
        });

        function fitToWindow() {
          // Subtract options panel width and padding.
          element.css( 'width', $window.innerWidth - 270 + 'px' );
          // Subtract navbar.
          element.css( 'height', $window.innerHeight - 40 + 'px' );
        }

        angular.element( $window ).bind( 'resize', function() {
          fitToWindow();
        });
      }
    };
  }]);
