const { authJwt } = require("../middleware");
const interiorColoursController = require("../controllers/interiorColours.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/interiorColours/createIC",
    [authJwt.verifyToken],
    interiorColoursController.create
  );

  app.get("/api/interiorColours/getIC",
    [authJwt.verifyToken],
    interiorColoursController.getList
   );

};