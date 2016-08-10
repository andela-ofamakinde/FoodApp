(function(){
  angular
  .module("FoodApp.controllers")
  .controller("SearchCtrl", ["Foods", function(Foods) {
    var vm = this;
    vm.searchCompleted = false;
    vm.searchBy = function(searchterm) {
      Foods.searchFood(searchterm).then(function(res){
        vm.searchCompleted = true;
        vm.searchResult = res.data;
      })
    }
  }]);
})()
