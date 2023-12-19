const db = require("../models");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.userlist = (req, res) => {

  var whereStatement = {};
  //res.status(400).send({ message: "404 Wrong parameter!!!" });
  whereStatement.id = { [Op.ne]: 1 };

  if (req.query.mobile)
    whereStatement.mobile = req.query.mobile;
  if (req.query.email)
    whereStatement.email = req.query.email;
  if (req.query.user_type_id)
    whereStatement.user_type_id = req.query.user_type_id;
  if (req.query.status)
    whereStatement.status = req.query.status;
  if (req.query.client_id)
    whereStatement.client_id = req.query.client_id;


  if (whereStatement) {
    User.findAll({
      attributes: ['username', 'email', 'mobile', 'status', 'user_type_id'],
      where: whereStatement
    })
      .then(user => {
        res.status(200).send(user);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  } else {
    res.status(400).send({ message: "Wrong parameter!!!" });
  }

};

exports.detail = (req, res) => {

  var whereStatement = {};

  whereStatement.id = { [Op.ne]: 1 };
  whereStatement.id = req.userId;

  if (whereStatement) {

    User.findOne({
      where: whereStatement
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }

        sequelize.query("SELECT `roles`.id,`roles`.name,`roles`.label FROM `roles` left join `user_roles` ON `roles`.id = `user_roles`.roleId WHERE `user_roles`.userId = " + req.userId, { type: sequelize.QueryTypes.SELECT })
          .then(function (userroles) {

            var userdetails = {
              id: user.id,
              mobile: user.mobile,
              email: user.email,
              user_type_id: user.user_type_id,
              status: user.status,
              roles: userroles
            }
            res.status(200).send(userdetails);
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });

      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  } else {
    res.status(400).send({ message: "Wrong parameter!!!" });
  }


};

exports.update = (req, res) => {

  var whereStatement = {};

  whereStatement.id = req.userId;

  if (whereStatement) {
    User.findOne({
      where: whereStatement
    })
      .then(user => {

        if (user) {

          var updateuserdetails = {
            email: req.body.email,
            mobile: req.body.mobile,
            status: req.body.status,
            user_type_id: req.body.user_type_id
          };

          user.update(
            updateuserdetails
          )
            .then(function () {

              var rollsStr = req.body.roles.join("','");

              sequelize.query("SELECT id FROM `roles` WHERE name IN ('" + rollsStr + "')")
                .then(function (roles) {

                  sequelize.query("DELETE FROM user_roles WHERE userId = " + req.userId)
                    .then(function () {
                      var upsertsql = "INSERT INTO user_roles (roleId, userId) VALUES ";
                      var sqlpartStr = [];
                      roles[0].forEach(eachrole => {
                        sqlpartStr.push("(" + eachrole.id + "," + req.userId + ")");
                      });

                      var sqlpartStrConcat = sqlpartStr.join();
                      upsertsql += sqlpartStrConcat;

                      sequelize.query(upsertsql)
                        .then(function () {
                          res.status(200).send({ message: 'Success...' });
                        })
                        .catch(err => {
                          res.status(500).send({ message: err.message });
                        });

                    })
                    .catch(err => {
                      res.status(500).send({ message: err.message });
                    });

                })
                .catch(err => {
                  res.status(500).send({ message: err.message });
                });

            })
            .catch(err => {
              res.status(500).send({ message: err.message });
            });
        }

      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  } else {
    res.status(400).send({ message: "Wrong parameter!!!" });
  }

};

exports.find = (req, res) => {

  var whereStatement = {};

  whereStatement.id = { [Op.ne]: 1 };
  whereStatement.id = req.userId;

  if (whereStatement) {

    User.findOne({
      where: whereStatement
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }

        var whereStatementFind = {};
        whereStatementFind.id = { [Op.ne]: 1 };
        whereStatementFind.email = req.query.email;
        if (user.id != 1) {
          whereStatementFind.user_type_id = user.user_type_id;
        }

        User.findOne({
          where: whereStatementFind
        })
          .then(userfind => {
            if (!userfind) {
              return res.status(404).send({ message: "User Not found." });
            }
            sequelize.query("SELECT `roles`.id,`roles`.name,`roles`.label FROM `roles` left join `user_roles` ON `roles`.id = `user_roles`.roleId WHERE `user_roles`.userId = " + userfind.id, { type: sequelize.QueryTypes.SELECT })
              .then(function (userroles) {

                var userdetails = {
                  id: userfind.id,
                  mobile: userfind.mobile,
                  email: userfind.email,
                  user_type_id: userfind.user_type_id,
                  status: userfind.status,
                  roles: userroles
                }
                res.status(200).send(userdetails);
              })
              .catch(err => {
                res.status(500).send({ message: err.message });
              });
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });


      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  } else {
    res.status(400).send({ message: "Wrong parameter!!!" });
  }
};

exports.checkpageaccess = (req, res) => {

  if (req.userId && req.body.role) {
    sequelize.query("SELECT `roles`.name FROM `roles` inner join `user_roles` ON `roles`.id = `user_roles`.roleId WHERE `roles`.name = '" + req.body.role + "' AND `user_roles`.userId = " + req.userId, { type: sequelize.QueryTypes.SELECT })
      .then(function (role) {

        if (role.length < 1) {
          res.status(400).send({ message: "Not Authorised" });
        }
        res.status(200).send({ message: "Allowed" });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });

  } else {
    res.status(400).send({ message: "Wrong parameter!!!" });
  }
};

exports.modify = (req, res) => {

  var whereStatement = {};

  whereStatement.id = { [Op.ne]: 1 };
  whereStatement.id = req.userId;

  if (whereStatement) {

    User.findOne({
      where: whereStatement
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }

        var whereStatementModify = {};

        whereStatementModify.email = req.body.kemail;
        
        if (whereStatementModify) {
          User.findOne({
            where: whereStatementModify
          })
            .then(userModify => {
              
              if (userModify) {
                var created = new Date();
                var updateuserdetails = {
                  email: req.body.email,
                  mobile: req.body.mobile,
                  status: req.body.status,
                  user_type_id: req.body.user_type_id,
                  updatedBy: req.userId,
                  updatedAt: created
                };

                userModify.update(
                  updateuserdetails
                )
                  .then(function () {

                    var rollsStr = req.body.roles.join("','");

                    sequelize.query("SELECT id FROM `roles` WHERE name IN ('" + rollsStr + "')")
                      .then(function (roles) {

                        sequelize.query("DELETE FROM user_roles WHERE userId = " + userModify.id)
                          .then(function () {
                            var upsertsql = "INSERT INTO user_roles (roleId, userId) VALUES ";
                            var sqlpartStr = [];
                            roles[0].forEach(eachrole => {
                              sqlpartStr.push("(" + eachrole.id + "," + userModify.id + ")");
                            });

                            var sqlpartStrConcat = sqlpartStr.join();
                            upsertsql += sqlpartStrConcat;

                            sequelize.query(upsertsql)
                              .then(function () {
                                res.status(200).send({ message: 'Success...' });
                              })
                              .catch(err => {
                                res.status(500).send({ message: err.message });
                              });

                          })
                          .catch(err => {
                            res.status(500).send({ message: err.message });
                          });

                      })
                      .catch(err => {
                        res.status(500).send({ message: err.message });
                      });

                  })
                  .catch(err => {
                    res.status(500).send({ message: err.message });
                  });
              }

            })
            .catch(err => {
              res.status(500).send({ message: err.message });
            });
        } else {
          res.status(400).send({ message: "Wrong parameter!!!" });
        }


      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  } else {
    res.status(400).send({ message: "Wrong parameter!!!" });
  }

};