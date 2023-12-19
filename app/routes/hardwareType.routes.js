const { authJwt } = require("../middleware");
const hardwareTypeController = require("../controllers/hardwareType.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/hardwaretypes/createHardwaretype",
    [authJwt.verifyToken],
    hardwareTypeController.create
  );

  

  app.get("/api/hardwaretypes/getHardwaretypes",
    [authJwt.verifyToken],
    hardwareTypeController.getList
   );

};