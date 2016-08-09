(function () {
  angular
  .module("AppRouter", ["ui.router"])
  .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");

    var homeSettings = {
      url: '/home',
      templateUrl: "views/home.html",
      controller: "FoodCtrl"
    }

    var searchSettings = {
      url: '/search',
      templateUrl: "views/search.html",
      controller: "SearchCtrl",
      controllerAs: "vm",
    }

    $stateProvider
      .state('home', homeSettings)
      .state('search', searchSettings)
  }])
})();
