(function(){
  var FoodModel = require("../models/food.model");

  exports.getAllFoods = getAllFoods;
  exports.createFood = createFood;
  exports.getFood = getFood;
  exports.deleteFood = deleteFood;
  exports.updateFood = updateFood;
  exports.searchFood = searchFood;

  function getAllFoods(req, res) {
    //console.log(FoodModel)
    FoodModel.find(function(err, food){
    console.log("gothere");
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).send(food);
    })
  }

  function getFood(req, res) {
    FoodModel.findById(req.params.id, function(err, food){
      if (err) {
        return res.status(500).send(err);
      }
      if (!food) {
        return res.status(404).json({message: "food not found"});
      }  
      return res.status(201).send(food);
    })
  }

  function createFood(req, res) {
    FoodModel.create(req.body, function(err, food) {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(201).send(food);
    });
  }

  function updateFood(req, res) {
    FoodModel.findOne({_id: req.params.id}, function(err, food) {
      if(err) {
        return res.status(500).send(err);
      }
      if(food) {
        var updatedFood = _.assignIn(food, req.body);
        updatedFood.save();
        return res.status(200).send(food);
      }
        return res.status(404).json({message: "Cannot update nn existing food"});
    })
  }

  function deleteFood(req, res) {
    FoodModel.remove({_id: req.params.id}, function(err, food) {
      if(err) {
        return res.status(500).send(err);
      }
      res.status(200).send(food);
    })
  }

  function searchFood(req, res) {
    console.log("query param", req.query.query);
    var queryString = req.query.query;

    FoodModel.find({
      $or: [
        {'name': {"$regex": queryString, "$options": "i" }}, 
        {"category": {"$regex": queryString, "$options": "i" }}, 
        {"description": {"$regex": queryString, "$options": "i" }}
      ]
    }).
    exec(function(err, food) {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).send(food);
    })
  }
})();
