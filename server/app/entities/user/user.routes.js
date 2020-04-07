const express = require('express');
const user = express.Router();
const userService = require('./user.service');

user.route('/login')
  .post(async (req, res) => {
    const token = await userService.login(req.body.login, req.body.password);
		console.log(token)
    if (!token) {
      res.sendStatus(401);
    } else {
      res.send({token});
    }
  });

module.exports = user;
