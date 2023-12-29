const { authJwt } = require("../middleware");
const glassTypeController = require("../controllers/doorCreate.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/glassType/createGlassType",
    [authJwt.verifyToken],
    glassTypeController.create
  );

  app.get("/api/glassType/getGlassType",
    [authJwt.verifyToken],
    glassTypeController.getList
   );

};