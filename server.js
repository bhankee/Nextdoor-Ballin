let express = require('express');
let exphbs = require('express-handlebars');
let bodyParser = require('body-parser');
let db = require('./models');
let passport = require('./services/passportSetup');

let app = express();

let PORT = process.env.PORT || 8000;

// MIDDLEWARE
app.use(express.static('public'));

// parse data
app.use(bodyParser.urlencoded({ extended: true }));
// parse json
app.use(bodyParser.json());
app.use(passport.initialize());
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// ROUTES
//let routes = require('./controllers/teamController');
//app.use(routes);
require('./routes/viewRoutes')(app);
require('./routes/apiRoutes')(app);
require('./routes/authRoutes')(app);

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log('Listing on Port: ' + PORT);
  });
});
