(function(){
  angular
  .module("FoodApp.controllers")
  .controller("FoodCtrl", ["Foods", function(Foods) {
    var vm = this;
    vm.keyword;
    vm.order;
    vm.categories = ["breakfast", "lunch", "dinner"];
    vm.food = {};
    updateFoodTable();
    vm.tempDB = [];

    function updateFoodTable() {
      Foods.getAll().then(function(res) {
        vm.tempDB = res.data;
        vm.sortByDate("newest");
      }, function(err) {
        alert("Error when Retrieving food.");
      });
    }

    vm.submitFood = function () {
      Foods.addFood(vm.food).then(function(res) {
        vm.food = {};
        updateFoodTable();
      }, function(err){
        alert("Error when Adding food.");
      });
    };

    vm.filterBy = function (value) {
      vm.keyword = value;
    };

    vm.sortByDate = function (condition) {

      vm.tempDB.sort(function(a, b) {
        var aTimestamp = new Date(a.timestamp)
        var bTimestamp = new Date(b.timestamp)
        return condition === "newest" ? bTimestamp - aTimestamp : aTimestamp - bTimestamp;
      })
    };

    vm.deleteFood = function(food, index){
      Foods.deleteFood(food._id).then(function(res) {
        updateFoodTable();
      }), function(err){
        alert("Error when Deleting food.");
      }
    }

    vm.editItem = function(food) {
      $('#editFoodModal').modal('show');
      vm.modalFood = $.extend({}, food);
      vm.originalFoodName = food.name;
    }

    vm.updateFood = function(newFood){
      Foods.updateFood(newFood._id, newFood).then(function(res) {
        $('#editFoodModal').modal('hide');
        updateFoodTable();
      }), function(err){
        alert("Error when Updating food.");
      }
    }

  }])
})()
