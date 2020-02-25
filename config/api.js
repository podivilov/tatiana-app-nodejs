var apiai = require('apiai');

// read the api.ai docs : https://api.ai/docs/

// Session ID
var setSid = function(sessionId) {
  global.sid = sessionId;
}

// Token
var app = apiai('your_token_here');

// Function which returns speech from api.ai
var getRes = function(query) {
  var request = app.textRequest(query, {
      sessionId: global.sid
  });
const responseFromAPI = new Promise(
        function (resolve, reject) {
request.on('error', function(error) {
    reject(error);
});
request.on('response', function(response) {
  resolve(response.result.fulfillment.speech);
});
});
request.end();
return responseFromAPI;
};

module.exports = {setSid,getRes}
