(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController ($scope) {
  $scope.message = "";
  $scope.dishes = "";

  $scope.checker = function () {

    if ($scope.dishes == "") {
      $scope.message = "Please enter data first";
      return;
    }

    var arrayOfDishes = $scope.dishes.split(",");

    if (arrayOfDishes.length < 4) {
      $scope.message = "Enjoy!";
    } else {
      $scope.message = "Too much!";
    }
  }
}

})();
