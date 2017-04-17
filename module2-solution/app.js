(function(){
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .provider('ShoppingListCheckOffService', ShoppingListCheckOffServiceProvider);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var list = this;

    list.items = ShoppingListCheckOffService.getToBuyList();

    list.buyItem = function (itemIndex) {
      ShoppingListCheckOffService.buy(itemIndex);
    };

    list.isEmpty = function () {
      return list.items.length === 0;
    };
  };

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var list = this;

    list.items = ShoppingListCheckOffService.getBoughtList();

    list.isEmpty = function () {
      return list.items.length === 0;
    };
  };

  function ShoppingListCheckOffService() {
    var service = this;

    var toBuyList = [{'name': 'carrots', 'quantity': 3},{'name': 'apples', 'quantity': 5},{'name': 'peaches', 'quantity': 2},{'name': 'lemons', 'quantity': 10},{'name': 'cookies', 'quantity': 7}];
    var boughtList = [];

    service.getToBuyList = function () {
      return toBuyList;
    };

    service.getBoughtList = function () {
      return boughtList;
    };

    service.buy = function(itemIndex) {
      boughtList.push(toBuyList[itemIndex]);
      toBuyList.splice(itemIndex, 1);
    };
  };

  function ShoppingListCheckOffServiceProvider() {
    var provider = this;

    provider.$get = function() {
      return new ShoppingListCheckOffService();
    };
  };
})();
