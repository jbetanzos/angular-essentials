(function() {
  'use strict';

  angular.module('public')
  .service('NewsletterService', NewsletterService);

  function NewsletterService() {
    var service = this;
    service.user = {};

    service.saveSubscriber = function(user) {
      service.user = user;
    };

    service.getSubscriber = function() {
      return service.user;
    }

    service.isThereSubscriber = function () {
      return !angular.equals({}, service.user);
    }
  }
})();
