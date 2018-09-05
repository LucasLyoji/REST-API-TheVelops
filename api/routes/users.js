const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/users");

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
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        personal_fone: req.body.personal_fone
    });
    user
      .save()
      .then(result => {
        console.log(result);
        res.status(200).json({
            message: "User created with success",
            createdUser: result
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

router.patch("/:userId", (req, res, next) => {
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

router.delete("/:userId", (req, res, next) => {
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