'use strict'

var after = require('after')
var express = require('../')
  , request = require('supertest');

describe('app.all()', function(){
  it('should add a router per method', function(done){
    var app = express();
    var cb = after(2, done)

    // 为每个请求添加路由
    app.all('/tobi', function(req, res){
      res.end(req.method);
    });

    request(app)
      .put('/tobi')
      .expect(200, 'PUT', cb)

    request(app)
      .get('/tobi')
      .expect(200, 'GET', cb)
  })

  it('should run the callback for a method just once', function(done){
    var app = express()
      , n = 0;

    // 只会进入一次
    app.all('/*', function(req, res, next){
      if (n++) return done(new Error('DELETE called several times'));
      next();
    });

    request(app)
    .del('/tobi')
    .expect(404, done);
  })
})
