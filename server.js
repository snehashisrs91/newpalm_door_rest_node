const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const config = require("./app/config/api.config");

const app = express();

var corsOptions = {
  //origin: "http://localhost:8080"
  origin: config.OriginUrl
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))
//app.use(express.static('public'));
// database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to palma application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

require('./app/routes/project.routes')(app);
require('./app/routes/quotes.routes')(app);
require('./app/routes/customer.routes')(app);
require('./app/routes/hardware-finish.routes')(app);
require('./app/routes/hardware-type.routes')(app);
require('./app/routes/interioraccessories.routes')(app);
require('./app/routes/exterioraccessories.routes')(app);
require('./app/routes/series.routes')(app);
require('./app/routes/measurementType.routes')(app);
require('./app/routes/rsoGap.routes')(app);
require('./app/routes/glassType.routes')(app);
require('./app/routes/grilles.routes')(app);
require('./app/routes/fixedWindowProfiles.routes')(app);
require('./app/routes/exteriorColours.routes')(app);
require('./app/routes/interiorColours.routes')(app);
require('./app/routes/hardwareType.routes')(app);
require('./app/routes/globalProperty.routes')(app);
require('./app/routes/quoteWindowOption.routes')(app);
require('./app/routes/globalColour.routes')(app);
require('./app/routes/colourMaster.routes')(app);
require('./app/routes/glassMaterial.routes')(app);
require('./app/routes/glassTypesMaster.router')(app);
require('./app/routes/customerMarkup.routes')(app);
require('./app/routes/globalMarkup.routes')(app);
require('./app/routes/quotePrice.routes')(app);


// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}