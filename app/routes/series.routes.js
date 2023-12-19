const { authJwt } = require("../middleware");
const seriesController = require("../controllers/series.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/series/createSeries",
    [authJwt.verifyToken],
    seriesController.series_create
  );

  app.put("/api/series/updateSeries",
    [authJwt.verifyToken],
    seriesController.update_series
  );

  app.get("/api/series/getSeries",
    [authJwt.verifyToken],
    seriesController.series_list
   );

};