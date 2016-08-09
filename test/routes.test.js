process.env.NODE_ENV = 'test';

var mongoose = require("mongoose");
var should = require("should");
var assert = require("assert");
var request = require("supertest");

var app = require('../index');

var baseUrl = "http://localhost:8080";
var Food = require('../server/models/food.model');

describe("Food route tests", function(){
  beforeEach(function(done){
    Food.remove({}, function(err) {
      done();
    })
  });

  it("should get all foods",function(done){
    request(app)
      .get("/food/all")
      .expect(200)
      .end(function(err,res){
        if (err) {
          throw err;
        }
        res.body.should.be.instanceof(Array).and.have.lengthOf(0);
        done();
      });
  });


  it("should create food", function(done){

    var payload = {
      "name": "Rice",
      "description": "I love it",
      "category": "lunch"
    };

    request(app)
      .post('/food')
      .send(payload)
      .end(function(err, res) {
        if (err) {
          console.log("error", err);
          throw err;
        }
        console.log("responses", res.body);
        done();
      })
  })
})
