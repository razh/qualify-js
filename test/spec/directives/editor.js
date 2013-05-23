'use strict';

describe('Directive: editor', function () {
  beforeEach(module('qualifyJsApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<editor></editor>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the editor directive');
  }));
});
