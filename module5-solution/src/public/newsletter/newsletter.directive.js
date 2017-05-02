(function() {
  'use strict';

  angular.module('public')
  .directive('dish', DishDirective);

  DishDirective.$inject = ['MenuService', '$q'];
  function DishDirective(MenuService, $q) {
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        ctrl.$asyncValidators.dish = function(modelValue, viewValue) {
          modelValue = modelValue.toUpperCase();
          return MenuService.getDishDetails(modelValue);
        };
      }
    };
  }
})();
