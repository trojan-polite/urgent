const mongoose = require('mongoose');

const Model = mongoose.model('Setting');

const listBySettingKey = async (req, res) => {
  try {
    // Find document by id

    const settingKeyArray = req.query.settingKeyArray ? req.query.settingKeyArray.split(',') : [];

    const settingsToShow = { $or: [] };

    if (settingKeyArray.length === 0) {
      return res
        .status(202)
        .json({
          success: false,
          result: [],
          message: 'Please provide settings you need',
        })
        .end();
    }

    for (const settingKey of settingKeyArray) {
      settingsToShow.$or.push({ settingKey });
    }

    let results = await Model.find(settingsToShow).where('removed', false);

    // If no results found, return document not found
    if (results.length >= 1) {
      return res.status(200).json({
        success: true,
        result: results,
        message: 'Successfully found all documents',
      });
    } else {
      return res
        .status(202)
        .json({
          success: false,
          result: [],
          message: 'No document found by this request',
        })
        .end();
    }
  } catch (err) {
    // Server Error
    return res.status(500).json({
      success: false,
      result: null,
      message: 'Oops there is an Error',
      error: err,
    });
  }
};

module.exports = listBySettingKey;
