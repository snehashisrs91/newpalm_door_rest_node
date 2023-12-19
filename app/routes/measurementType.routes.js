const { authJwt } = require("../middleware");
const measurementTypeController = require("../controllers/measurementType.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/measurementType/createMeasurementType",
    [authJwt.verifyToken],
    measurementTypeController.create
  );

  app.put("/api/measurementType/updateMeasurementType",
    [authJwt.verifyToken],
    measurementTypeController.update_measurement
  );

  app.get("/api/measurementType/getMeasurementTypes",
    [authJwt.verifyToken],
    measurementTypeController.getList
   );

};