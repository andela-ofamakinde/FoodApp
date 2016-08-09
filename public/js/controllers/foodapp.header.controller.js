(function(){
  angular
  .module("FoodApp.controllers")
  .controller("HeaderCtrl", ["$scope", "$location", function($scope, $location) {
    $scope.getClass = function(path) {
      return ($location.path() === path) ? 'active' : '';
    }
  }]);
})();
