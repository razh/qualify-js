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

        scope.$watch( 'config.theme', function( newValue ) {
          scope.editor.setTheme( 'ace/theme/' + newValue );
        });

        scope.$watch( 'config.fontSize', function( newValue ) {
          scope.editor.setFontSize( newValue + 'px' );
          // 5:3 is the ratio of lineHeight:fontSize.
          element.css( 'lineHeight', newValue * 5 / 3 + 'px' );
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
