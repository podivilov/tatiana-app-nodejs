var uuid = require('uuid');
var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.__tatiana_session_id;
  if (cookie === undefined)
  {
    // no: set a new cookie
    global.sessionid=uuid.v4();
    res.cookie('__tatiana_session_id' , global.sessionid, { maxAge: 315569260000, httpOnly: true });
    console.log('New session created:', global.sessionid);
  }
  else
  {
    // yes, cookie was already present
    global.sessionid=cookie;
    console.log('Attached session:', cookie);
  }
  next(); // <-- important!
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'botUI_api.ai' });
});




module.exports = router;
