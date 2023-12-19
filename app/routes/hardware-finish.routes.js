const { authJwt } = require("../middleware");
const controller = require("../controllers/hardware-finish.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/hardwareFinish/createhardwareFinish",
    [authJwt.verifyToken],
    controller.hardware_finish_create
  );

  app.put("/api/hardwareFinish/updatehardwareFinish",
    [authJwt.verifyToken],
    controller.hardware_finish_update
  );

  app.get("/api/hardwareFinish/gethardwareFinish",
    [authJwt.verifyToken],
    controller.hardware_finish_list
   );

};