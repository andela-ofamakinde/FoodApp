(function(){
  angular
  .module("FoodApp.controllers")
  .controller("FoodCtrl", ["$scope", "$location", "Foods", function($scope, $location, Foods) {
    $scope.getClass = function(path) {
      return ($location.path() === path) ? 'active' : '';
    }

    $scope.keyword;
    $scope.order;
    $scope.categories = ["breakfast", "lunch", "dinner"];
    $scope.food = {};
    updateFoodTable();
    $scope.tempDB = [];

    function updateFoodTable() {
      Foods.getAll().then(function(res) {
        $scope.tempDB = res.data;
        $scope.sortByDate("newest");
      }, function(err) {
        console.log("food error", err);
      });
    }

    $scope.submitFood = function () {
      Foods.addFood($scope.food).then(function(res) {
        console.log("Added successfully");
        $scope.food = {};
        updateFoodTable();
      }, function(err){
        console.log("add food error", err);
      });
    };

    $scope.filterBy = function (value) {
      $scope.keyword = value;
    };

    $scope.sortByDate = function (condition) {

      $scope.tempDB.sort(function(a, b) {
        var aTimestamp = new Date(a.timestamp)
        var bTimestamp = new Date(b.timestamp)
        return condition === "newest" ? bTimestamp - aTimestamp : aTimestamp - bTimestamp;
      })
    };

    $scope.deleteFood = function(food, index){
      console.log("food to be deleted", food, index);
      Foods.deleteFood(food._id).then(function(res) {
        updateFoodTable();
      }), function(err){
        console.log("delete food error", err);
      }
    }

    // $scope.updateFood = function(food, index){
    //   console.log("food to be deleted", food, index);
    //   Foods.updateFood(food._id).then(function(res) {
    //     updateFoodTable();
    //   }), function(err){
    //     console.log("delete food error", err);
    //   }
    // }

  }])
})()
