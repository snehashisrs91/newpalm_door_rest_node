const { authJwt } = require("../middleware");
const gpController = require("../controllers/globalProperty.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/globalProperty/createGlobalProperty",
    [authJwt.verifyToken],
    gpController.create
  );

  app.get("/api/globalProperty/getGlobalProperty",
    [authJwt.verifyToken],
    gpController.list
   );

   app.post("/api/globalProperty/updateGlobalProperty",
    [authJwt.verifyToken],
    gpController.updateGP
   );

};