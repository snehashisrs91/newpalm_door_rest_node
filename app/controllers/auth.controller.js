const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    mobile: req.body.mobile,
    password: bcrypt.hashSync(req.body.password, 8),
    user_type_id: req.body.user_type_id
  })
    .then(user => {

      sequelize.query("UPDATE `users` SET `createdBy` = "+user.id+", `updatedBy` = "+user.id+" WHERE id = "+user.id)
        .then(function () {
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });

      if (req.body.roles) {
       // console.log(req.body.roles);

        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
      } else {
        // user role = 1
        var userrole = 12; // 12 => Customer in role tbl
        user.setRoles([userrole]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.rolelist = (req, res) => {
  if (req.query.user_type_id) {
    Role.findAll({
      attributes: ['name', 'label'],
      where: {
        id: {
          [Op.ne]: 1
        },
        user_type_id: req.query.user_type_id,

      }
    })
      .then(role => {
        res.status(200).send(role);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  } else {
    Role.findAll({
      attributes: ['name', 'label'],
      where: {
        id: {
          [Op.ne]: '1'
        }

      }
    })
      .then(role => {
        res.status(200).send(role);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  }

};


