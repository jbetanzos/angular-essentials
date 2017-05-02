(function() {
  'use strict';

  angular.module('public')
  .controller('RegistrationController', RegistrationController);

  RegistrationController.$inject = ['NewsletterService'];
  function RegistrationController(NewsletterService) {
    var regCtrl = this;
    regCtrl.saved = false;

    regCtrl.getSavedUser = function () {
      if (NewsletterService.isThereSubscriber()) {
        return NewsletterService.getSubscriber();
      }
      return false;
    }

    regCtrl.submit = function(form) {
      if (form.$valid) {
        NewsletterService.saveSubscriber(regCtrl.user);
        regCtrl.saved = true;
      }
    };
  }
})();
