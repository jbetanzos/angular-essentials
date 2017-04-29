(function() {
  'use strict';

  angular.module('MenuApp')

  .component('itemsList', {
    templateUrl: 'src/menulist/templates/itemslist.html',
    bindings: {
      items: '<'
    }
  });
})();
