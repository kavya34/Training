'use strict';

module.exports = function(Coffeeshop) {
  // Coffeeshop.status = function(cb) {
  //   var currentDate = new Date();
  //   var currentHour = currentDate.getHours();
  //   var OPEN_HOUR = 6;
  //   var CLOSED_HOUR = 20;
  //   console.log('current date is ' + currentDate);
  //   var response;
  //   if (currentHour >= OPEN_HOUR && currentHour <= CLOSED_HOUR) {
  //     response = 'we are open for bussiness';
  //   } else {
  //     response = 'sorry! bussiness opens from 6AM to 8PM';
  //   }
  //   cb(null, response);
  // };
  Coffeeshop.getName = function(shopId, cb) {
    Coffeeshop.findById(shopId, function(err, instance) {
      var response = 'name of coffee shop is ' + instance.name;
      cb(null, response);
      console.log(response);
    });
  };
  Coffeeshop.getCity = function(shopId, cb) {
    Coffeeshop.findById(shopId, function(err, instance) {
      var response = 'name of city is ' + instance.city;
      cb(null, response);
      console.log(response);
    });
  };
  Coffeeshop.remoteMethod(
    // 'status', {

    //   http: {path: '/status', verb: 'get'},
    //   returns: {arg: 'status', type: 'string'}
    // },
    'getName',
    {
      http: {path: '/getname', verb: 'get'},
      accepts: {arg: 'id', type: 'string', required: 'true',
        http: {source: 'query'}},
      returns: {arg: 'name', type: 'string'},
    }
  );
  Coffeeshop.remoteMethod('getCity', {
    http: {path: '/getcity', verb: 'get'},
    accepts: {arg: 'id', type: 'string', required: 'true', http: {source: 'query'}},
    returns: {arg: 'city', type: 'string'},
  }
  );
};
