var express = require('express');
var app = express();
var request = require('request');
var async = require('async');
var path = require('path');


// importing api key from config file
var api_key = require('./config');

// telling our app to use build directory
app.use(express.static('./build'));

// allow CORS sharing
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// getting summoner ID from summoner name search
app.get('/api/summoners/:region/:name', function(req, res){
	var data = {};
  var region = req.params.region;
  var name = req.params.name.toLowerCase().replace(/\s/g, '');
  if ( region === 'NA') {
		region = 'NA1'
  	pref = 'na'
  }
  if ( region === 'EUW') {
  	region = 'EUW1'
  	pref = 'euw'
  }
  if ( region === 'EUNE') {
  	region = 'EUN1'
  	pref = 'eune'
  }
  var URL = 'https://' + pref + '.api.pvp.net/api/lol/' + pref + '/v1.4/summoner/by-name/' + name + '?api_key=' + api_key
  async.waterfall([
    function(callback) {
      request(URL, function(err, response, body) {
        if(!err && response.statusCode == 200) {
          var json = JSON.parse(body);
          data = json[name]
          callback(null, data);
        } else {
          callback(null, err);
        }
      });
    }
  ],
  function(err, data) {
    if(err) {
      console.log('search summonera', err);
      return;
    }
    res.send(data);
  });
})

// getting data from current match
app.get('/api/:region/:id', function(req, res) {
	var data = {};
  var id = req.params.id;
  var region = req.params.region;
  if ( region === 'NA') {
  	region = 'NA1'
  	pref = 'na'
  }
  if ( region === 'EUW') {
  	region = 'EUW1'
  	pref = 'euw'
  }
  if ( region === 'EUNE') {
  	region = 'EUN1'
  	pref = 'eune'
  }

  var URL = 'https://'+ pref + '.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/' + region + '/'+ id + '?api_key=' + api_key

  async.waterfall([
    function(callback) {
      request(URL, function(err, response, body) {
        if(!err && response.statusCode == 200) {
          var json = JSON.parse(body);
          callback(null, body);
        } else {
          callback(null, err);
        }
      });
    }
  ],
  function(err, data) {
    if(err) {
      console.log('jel ovaj', err);
      return;
    }
    res.send(data);
  });
});

// serving index html
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});


// starting server
var port = Number(process.env.PORT || 5000);
app.listen(port);