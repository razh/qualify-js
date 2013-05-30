'use strict';

angular.module( 'qualifyJsApp' )
  .directive( 'editor', [ '$window', '$timeout', 'consts', function( $window, $timeout, consts ) {
    var navbarHeight = 40;
    return {
      restrict: 'A',
      link: function postLink( scope, element, attrs ) {
        // Configure editor.
        $timeout(function() {
          var editor = scope.editor.getSession();

          editor.setTabSize(2);
          editor.setUseSoftTabs( true );

          fitToWindow();
        }, 16 );

        scope.$watch( 'selected.theme', function( newValue, oldValue ) {
          scope.editor.setTheme( 'ace/theme/' + newValue );
        });

        function fitToWindow() {
          // Subtract options panel width and padding.
          element.css( 'width', $window.innerWidth - consts.drawerWidth + 'px' );
          // Subtract navbar.
          element.css( 'height', $window.innerHeight - navbarHeight + 'px' );
        }

        angular.element( $window ).bind( 'resize', function() {
          fitToWindow();
        });
      }
    };
  }]);
