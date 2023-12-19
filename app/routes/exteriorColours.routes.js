const { authJwt } = require("../middleware");
const exteriorColoursController = require("../controllers/exteriorColours.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/exteriorColours/createEC",
    [authJwt.verifyToken],
    exteriorColoursController.create
  );

  app.get("/api/exteriorColours/getEC",
    [authJwt.verifyToken],
    exteriorColoursController.getList
   );

};