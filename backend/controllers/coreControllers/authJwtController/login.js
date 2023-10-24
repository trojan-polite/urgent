const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { stubFalse } = require('lodash');
const url = require('url');

const mongoose = require('mongoose');

const Admin = mongoose.model('Admin');

require('dotenv').config({ path: '.variables.env' });

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('🚀 ~ file: app.js:33 ~  req.origin :', req.get('origin'));

    // URL address
    const address = req.get('origin');
    console.log('🚀 ~ file: login.js:21 ~ login ~ address:', address);
    console.log('🚀 ~ file: login.js:21 ~ login ~ req.hostname:', req.hostname);

    // Call parse() method using url module
    let urlObject = url.parse(address, true);

    const orginalHostname = urlObject.hostname;

    let isLocalhost = false;
    if (orginalHostname === '127.0.0.1' || orginalHostname === 'localhost') {
      // Connection is from localhost
      isLocalhost = true;
    }

    console.log('🚀 ~ file: login.js:22 ~ login ~ orginalHostname:', orginalHostname);

    console.log('🚀 ~ file: login.js:20 ~ login ~ isLocalhost:', isLocalhost);
    // validate
    const objectSchema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().required(),
    });

    const { error, value } = objectSchema.validate({ email, password });
    if (error) {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Invalid/Missing credentials.',
      });
    }

    const admin = await Admin.findOne({ email: email, removed: false });
    // console.log(admin);
    if (!admin)
      return res.status(400).json({
        success: false,
        result: null,
        message: 'No account with this email has been registered.',
      });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Invalid credentials.',
      });

    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: req.body.remember ? 365 * 24 + 'h' : '24h' }
    );

    const result = await Admin.findOneAndUpdate(
      { _id: admin._id },
      { $set: { isLoggedIn: 1 }, $push: { loggedSessions: token } },
      {
        new: true,
      }
    ).exec();

    res
      .status(200)
      .cookie('token', token, {
        maxAge: req.body.remember ? 365 * 24 * 60 * 60 * 1000 : null,
        sameSite: process.env.NODE_ENV === 'production' && isLocalhost ? 'none' : 'Lax',
        httpOnly: process.env.NODE_ENV === 'production' && isLocalhost ? true : !isLocalhost,
        secure: process.env.NODE_ENV === 'production' && isLocalhost ? true : !isLocalhost,
        domain: req.hostname,
        Path: '/',
      })
      .json({
        success: true,
        result: {
          _id: result._id,
          name: result.name,
          surname: result.surname,
          role: result.role,
          email: result.email,
          photo: result.photo,
          isLoggedIn: result.isLoggedIn > 0 ? true : false,
        },
        message: 'Successfully login admin',
      });
  } catch (err) {
    res.status(500).json({ success: false, result: null, message: err.message, error: err });
  }
};

module.exports = login;
