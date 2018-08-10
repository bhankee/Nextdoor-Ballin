require('dotenv').config();
let express = require('express');
let exphbs = require('express-handlebars');
const cookieSession = require('cookie-session');
let bodyParser = require('body-parser');
let db = require('./models');
let passportGoogle = require('./services/PassportGoogleSetup');
let passportLocal = require('./services/PassportLocalSetup');
const keys = require('./config/keys');

let app = express();

let PORT = process.env.PORT || 8000;

// MIDDLEWARE
app.use(express.static('public'));

// parse data
app.use(bodyParser.urlencoded({ extended: true }));
// parse json
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);
app.use(passportGoogle.initialize());
app.use(passportGoogle.session());
app.use(passportLocal.initialize());
app.use(passportLocal.session());
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
