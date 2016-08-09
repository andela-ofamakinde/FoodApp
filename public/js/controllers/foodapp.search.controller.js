(function(){
  angular
  .module("FoodApp.controllers")
  .controller("SearchCtrl", ["Foods", function(Foods) {
    var vm = this;
    vm.searchCompleted = !1;
    vm.searchBy = function(searchterm) {
      Foods.searchFood(searchterm).then(function(res){
        vm.searchCompleted = !0;
        vm.searchResult = res.data;
      })
    }
  }]);
})()
