const { authJwt } = require("../middleware");
const glassMaterialController = require("../controllers/glassMaterial.controller");
const multer = require('multer');

const storage = multer.diskStorage ({
      
      destination: function (req, file, cb) {
         cb(null, 'public/images/glass/glazing') 
      },
      filename: function (req, file, cb) {
        cb(null, Math.floor(Math.random() * (200 - 10) + 10 )+file.originalname) 
     }

});

const fileFilter = (req, file, cb) => {
    if(file.mimeType === 'image/jpeg' || file.mimeType === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
};

const upload = multer({
  //storage: storage
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
  //fileFilter: fileFilter
});

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/glassMaterial/createGlassMaterials/:type",
    [authJwt.verifyToken],
    glassMaterialController.createGlassMaterials
  );

  app.get("/api/glassMaterial/getGlassGlazingMasterList",
   [authJwt.verifyToken],
   glassMaterialController.getGlassGlazingMasterList
  );

  app.get("/api/glassMaterial/getGlassLowEMasterList",
   [authJwt.verifyToken],
   glassMaterialController.getGlassLowEMasterList
  );

  app.get("/api/glassMaterial/getGlassObscureMasterList",
   [authJwt.verifyToken],
   glassMaterialController.getGlassObscureMasterList
  );

  app.get("/api/glassMaterial/getGlassSpacerFinishMasterList",
   [authJwt.verifyToken],
   glassMaterialController.getGlassSpacerFinishMasterList
  );

  app.get("/api/glassMaterial/getGlassSpacerTypesMasterList",
   [authJwt.verifyToken],
   glassMaterialController.getGlassSpacerTypesMasterList
  );

  app.get("/api/glassMaterial/getGlassStrengthTypesMasterList",
   [authJwt.verifyToken],
   glassMaterialController.getGlassStrengthTypesMasterList
  );

  app.get("/api/glassMaterial/getGlassThicknessMasterList",
   [authJwt.verifyToken],
   glassMaterialController.getGlassThicknessMasterList
  );

  app.get("/api/glassMaterial/getGlassTintMasterList",
   [authJwt.verifyToken],
   glassMaterialController.getGlassTintMasterList
  );

  app.post("/api/glassMaterial/uploadImage",
  upload.single('image_path'),
  //[authJwt.verifyToken],
   glassMaterialController.uploadGlazingImage
  );


};