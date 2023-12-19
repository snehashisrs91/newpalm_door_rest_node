const { authJwt } = require("../middleware");
const globalMarkupController = require("../controllers/globalMarkup.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/globalMarkup/createGlobalMarkup",
    [authJwt.verifyToken],
    globalMarkupController.global_markup_create_update
  );

  app.get("/api/globalMarkup/getGlobalMarkup",
    [authJwt.verifyToken],
    globalMarkupController.get_global_markup
   );

};