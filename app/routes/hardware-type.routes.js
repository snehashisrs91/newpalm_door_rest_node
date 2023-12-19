const { authJwt } = require("../middleware");
const hardwareTypeController = require("../controllers/hardware-type.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/hardwareType/createhardwareType",
    [authJwt.verifyToken],
    hardwareTypeController.hardware_type_create
  );

  app.put("/api/hardwareType/updatehardwareType",
  [authJwt.verifyToken],
  hardwareTypeController.update
  );

  app.get("/api/hardwareType/gethardwareType",
    [authJwt.verifyToken],
    hardwareTypeController.hardware_type_list
   );

};