(function(){
  angular
  .module("FoodApp.controllers")
  .controller("HeaderCtrl", ["$location", function($location) {
    var vm = this;
    vm.getClass = function(path) {
      return ($location.path() === path) ? 'active' : '';
    }
  }]);
})();
