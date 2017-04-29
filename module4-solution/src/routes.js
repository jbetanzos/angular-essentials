(function() {
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('home', {
      url: '/',
      templateUrl: 'src/menulist/templates/home.template.html'
    })

    .state('categories', {
      url: '/categories',
      templateUrl: 'src/menulist/templates/categories.template.html',
      controller: 'CategoriesController as catCtrl',
      resolve: {
        categories: ['MenuDataService', function(MenuDataService) {
          var cat = MenuDataService.getAllCategories();
          return cat;
        }]
      }
    })

    .state('items', {
      url: '/items/{catid}',
      templateUrl: 'src/menulist/templates/items.template.html',
      controller: 'ItemsController as itemsCtrl',
      resolve: {
        items: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams) {
          return MenuDataService.getItemsForCategory($stateParams.catid);
        }]
      }
    });

    $urlRouterProvider.otherwise('/');
  }
})();
