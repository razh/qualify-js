'use strict';

angular.module( 'qualifyJsApp' )
  .directive( 'markdown', function() {
    var converter = new Markdown.getSanitizingConverter();

    return {
      require: '?ngModel',
      restrict: 'E',
      link: function postLink( scope, element, attrs, ngModel ) {
        if ( !ngModel ) {
          return;
        }

        ngModel.$render = function() {
          element.html( converter.makeHtml( ngModel.$viewValue || '' ) );
        };
      }
    };
  });
