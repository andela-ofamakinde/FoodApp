(function(){
  angular
  .module("FoodApp.controllers")
  .controller("FoodCtrl", ["Foods", "toastr", function(Foods, toastr) {
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
        toastr.error("Error when Retrieving food.", "Error");
      });
    }

    vm.submitFood = function () {
      Foods.addFood(vm.food).then(function(res) {
        vm.food = {};
        updateFoodTable();
        toastr.info("Food Added", "Success");
      }, function(err){
        toastr.error("Error when Adding food", "Error");
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
        toastr.error("Error when Deleting food.", "Error");
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
        toastr.info("Food Edited", "Success");
      }), function(err){
        toastr.error("Error when Updating food.", "Error");
      }
    }

    toastr.clear();

  }])
})()
