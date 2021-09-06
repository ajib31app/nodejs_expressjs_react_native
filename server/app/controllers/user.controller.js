const db = require("../models");
const config = require("../config/auth.config");
const { user: User, role: Role, refreshToken: RefreshToken } = db;
const Log = require('debug-level')
const log = new Log('test')

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.adminProfile = (req, res) => {
  const id = req.body.id;
  log.info('%s')   
  User.findByPk(id)
    .then(async (data) => {
      if (!data) {
        return res.status(404).send({ message: "User Not found." });
      }

      res.status(200).send({
        status: "200",
        message:"success",
        data: data
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};
