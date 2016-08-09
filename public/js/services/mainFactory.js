(function() {
    angular.module('FoodApp.factories', [])
    .constant('API_URL', 'http://localhost:3000/food')
    .factory('Foods', function($http, API_URL){
    return {
        getAll: function() {
            var url = API_URL + '/all';
            return $http.get(url).then(function(res){
                return res;
            });
        },
        addFood: function(foodItem) {
            return $http.post(API_URL, foodItem).then(function(res) {
                return res;
            })
        },
        updateFood: function(index, newFood) {
            factoryDB[index] = newFood;
        },
        searchFood: function(searchTerm) {
            var url = API_URL + "/search?query=" + searchTerm;
            return $http.get(url).then(function(res) {
                return res;
            }, function(err){
                return err;
            });
        },
        deleteFood: function(id) {
            console.log("api food", id);
            var url = API_URL + "/" + id;
            return $http.delete(url).then(function(res) {
                console.log("delete response", res);
            })
        }
    }
    });
})();
