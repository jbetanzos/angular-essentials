(function() {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective);

  function FoundItemsDirective () {
    return {
      templateUrl: 'menuItemsList.html',
      restrict: 'E',
      scope: {
        foundItems: '<',
        onRemove: '&'
      },
      transclude: true
    }
  };

  NarrowItDownController.$inject = ['MenuSearchService', '$filter'];
  function NarrowItDownController(MenuSearchService, $filter) {
    var narrow = this;

    narrow.searchTerm = "";
    narrow.found;
    narrow.noResults = false;

    narrow.getMatchedMenuItems = function () {

      if (narrow.searchTerm.trim() === "") {
        narrow.found = [];
        return;
      }

      var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);

      promise.then(function (response) {
        narrow.found = response;
      })
      .catch(function (error) {
        narrow.found = [];
      });
    };

    narrow.onRemove = function (index) {
      narrow.found.splice(index, 1);
    };
  };

  MenuSearchService.$inject = ['$http', '$filter'];
  function MenuSearchService ($http, $filter) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      var response = $http({
        method: 'GET',
        url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
      }).then(function (result) {
        var lowercase = $filter('lowercase');
        var allMenuItems = result.data.menu_items;
        var menuItems = [];

        allMenuItems.forEach(function (element) {
          if (lowercase(element.description).indexOf(lowercase(searchTerm)) !== -1) {
            menuItems.push(element);
          }
        });

        return menuItems;
      });

      return response;
    };
  };
})();
