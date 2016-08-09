(function(){
  var express = require("express");
  var router = express.Router();
  var foodController = require("../controllers/food.controller");

  router.get('/all', foodController.getAllFoods);
  router.get('/search', foodController.searchFood);
  router.get('/:id', foodController.getFood);
  router.put('/:id', foodController.updateFood);
  router.delete('/:id', foodController.deleteFood);
  router.post('/', foodController.createFood);

  module.exports = router;
})()
