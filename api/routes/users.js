const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/users");
const checkAuth = require('../middleware/check-auth');

router.get("/", (req, res, next) => {
  User.find()
    .select('_id email first_name last_name personal_fone')
    .exec()
    .then(docs =>{
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "e-mail already exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              personal_fone: req.body.personal_fone,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created with success"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});

router.post("/login", (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id
              },
              process.env.JWT_KEY,
              {
                  expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token
            });
          }
          res.status(401).json({
            message: "Auth failed"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

router.get("/:userId", (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
        .select('_id email first_name last_name personal_fone')
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.patch("/:userId", checkAuth, (req, res, next) => {
    const id = req.params.userId;
    User.findByIdAndUpdate(id, {
        $set: {
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            personal_fone: req.body.personal_fone
        }
    })
    .select('_id email first_name last_name personal_fone')
    .then(user => {
        if(!user){
            res.status(404).json({
                message: 'User not found'
            })
        }
        res.status(200).json({message:'User updated', user});
    }).catch(err => {
        res.status(500).json({
            message: err.message || 'Something is wrong'
        });
    });
});

router.delete("/:userId", checkAuth, (req, res, next) => {
  const id = req.params.userId;
  User.findByIdAndRemove(id)
    .select('_id email first_name last_name personal_fone')
    .exec()
    .then(result => {
        res.status(200).json({message:'User deleted'});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;