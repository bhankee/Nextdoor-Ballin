// NPM MODULES
let express = require('express');
let exphbs = require('express-handlebars');
let bodyParser = require('body-parser');
let db = require('./models');

let app = express();

let PORT = process.env.PORT || 8000;

// MIDDLEWARE
app.use(express.static('public'));

// parse data
app.use(bodyParser.urlencoded({ extended: true }));
// parse json
app.use(bodyParser.json());
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// ROUTES
let routes = require('./controllers/ballinController');
app.use(routes);

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log('Listing on Port: ' + PORT);
  });
});
