const { authJwt } = require("../middleware");
const fixedWindowProfileController = require("../controllers/fixedWindowProfiles.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/fwp/createFwp",
    [authJwt.verifyToken],
    fixedWindowProfileController.create
  );

  app.put("/api/fwp/updateFwp",
    [authJwt.verifyToken],
    fixedWindowProfileController.update
  );

  app.get("/api/fwp/getFwps",
    [authJwt.verifyToken],
    fixedWindowProfileController.getList
   );

};