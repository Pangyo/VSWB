// config
var app = require('./config/app_express')();
var passport = require('./config/passport')(app);
var db = require('./config/db')();

// route
var main = require('./app/routes/main')();
var service = require('./app/routes/service')();
var auth = require('./app/routes/auth')(passport);

app.use('/', main);
app.use('/api', service);
app.use('/auth', auth);

app.listen(5000, function () {
    console.log('Server On. Port:5000');
});

var vswbhelper = require('./helper/vswbhelper');
vswbhelper.Initialize();

var intervalprocess = require('./helper/intervalprocess');
//intervalprocess.InitTimer(5000); // 5s
//intervalprocess.InitTimer(1800000);// 30m

module.exports = app;