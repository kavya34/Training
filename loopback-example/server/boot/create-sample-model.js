// 'use strict';
// module.exports = function(app) {
// //   app.dataSource.mydb.automigrate('CoffeeShop', function(err) {
// //     if (err) throw err;

//   app.models.CoffeeShop.create([{
//     name: 'Bel Cafe',
//     city: 'city1'
//   }, {
//     name: 'Three Bees Coffee House',
//     city: 'city2'
//   }, {
//     name: 'Caffe Artigiano',
//     city: 'city3'
//   }], function(err, Coffeeshops) {
//     if (err) throw err;

//     console.log('Models created: \n', Coffeeshops);
//   });
//   //});
// };

var async = require('async');
module.exports = function(app){
  var mydb = app.dataSource.mydb;
  var mysql = app.dataSource.mysql;
  async.parallel({
    reviewers: async.apply(createReviewers),
    coffeeshops: async.apply(createCoffeeShops),
  }, function(err, results){
    if (err) throw err;
    createReviews(results.reviewers, results.coffeeShops, function(err){
      console.log('models created successfully');
    });
  });
  function createReviewers(cb){
    var Reviewer = app.models.Reviewer;
    Reviewer.create([{
      email: 'one@gmail.com',
      password: 'one'
    }, {
      email: 'two@gmail.com',
      password: 'two'
    }, {
      email: 'three@gmail.com',
      password: 'three'
    }], cb);
  }
  function createCoffeeShops(cb){
    var CoffeeShop = app.models.CoffeeShop;
    CoffeeShop.create([{
      name: 'shop1',
      city: 'city1'
    }, {
      name: 'shop2',
      city: 'city2'
    }, {
      name: 'shop3',
      city: 'city3'
    }], cb);
  }
  function createReviews(reviewers, coffeeShops, cb){
    var Review = app.models.Review;
    var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
    Review.create([{
      date: Date.now() - (DAY_IN_MILLISECONDS * 3),
      rating: 4,
      comments: 'pleasant place',
      publisherId: reviewers[0].id,
      coffeeShopId: coffeeShops[0].id
    }, {
      date: Date.now() - (DAY_IN_MILLISECONDS * 3),
      rating: 5,
      comments: 'very good place',
      publisherId: reviewers[1].id,
      coffeeShopId: coffeeShops[1].id
    }, {
      date: Date.now() - (DAY_IN_MILLISECONDS * 3),
      rating: 4.5,
      comments: 'nice',
      publisherId: reviewers[3].id,
      coffeeShopId: coffeeShops[3].id
    }], cb);
  }
};
