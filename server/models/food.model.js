(function(){
  var mongoose = require("mongoose");
  var Schema = mongoose.Schema;

  var FoodModel = new Schema({
    name: {
      type: String,
      required:true
    },
    description: {
      type: String,
      required: true
    }, 
    category: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now()
    }
  });

  module.exports = mongoose.model("FoodModel", FoodModel);
})();
