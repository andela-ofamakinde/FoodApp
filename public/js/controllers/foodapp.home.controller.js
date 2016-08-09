(function(){
  angular
  .module("FoodApp.controllers")
  .controller("FoodCtrl", ["$scope", "$location", "Foods", function($scope, $location, Foods) {

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
        alert("Error when Retrieving food.");
      });
    }

    $scope.submitFood = function () {
      Foods.addFood($scope.food).then(function(res) {
        $scope.food = {};
        updateFoodTable();
      }, function(err){
        alert("Error when Adding food.");
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
      Foods.deleteFood(food._id).then(function(res) {
        updateFoodTable();
      }), function(err){
        alert("Error when Deleting food.");
      }
    }

    $scope.editItem = function(food) {
      $('#editFoodModal').modal('show');
      $scope.modalFood = $.extend({}, food);
      $scope.originalFoodName = food.name;
    }

    $scope.updateFood = function(newFood){
      Foods.updateFood(newFood._id, newFood).then(function(res) {
        $('#editFoodModal').modal('hide');
        updateFoodTable();
      }), function(err){
        alert("Error when Updating food.");
      }
    }

  }])
})()
