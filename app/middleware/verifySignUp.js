const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const Op = db.Sequelize.Op;

checkDuplicateUsernameOrEmailOrMobile = (req, res, next) => {
  /*
   res.status(400).send({
     message: "Failed! Username is already in use!" + req.body.email
   }); */

  // Username
  var username = '';
  if (typeof req.body.username !== 'undefined' && req.body.username !== null) {
    username = req.body.username;
  }

  User.findOne({
    where: {
      username: username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }

    // Email

    var email = '';
    if (typeof req.body.email !== 'undefined' && req.body.email !== null) {
      email = req.body.email;
    }

    User.findOne({
      where: {
        email: email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      // Mobile
      var mobile = '';
      if (typeof req.body.mobile !== 'undefined' && req.body.mobile !== null) {
        mobile = req.body.mobile;
      }

      if (mobile) {
        User.findOne({
          where: {
            mobile: { [Op.ne]: 0 },
            mobile: mobile

          }
        }).then(user => {
          if (user) {
            res.status(400).send({
              message: "Failed! Mobile is already in use!"
            });
            return;
          }

          next();
        });
      } else {
        next();
      }





    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmailOrMobile: checkDuplicateUsernameOrEmailOrMobile,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
