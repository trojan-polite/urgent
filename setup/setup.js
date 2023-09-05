require('dotenv').config({ path: __dirname + '/../.variables.env' });

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
const fs = require('fs');
async function setupApp() {
  try {
    const Admin = require('../models/coreModels/Admin');
    var newAdmin = new Admin();
    const passwordHash = newAdmin.generateHash('admin123');

    await new Admin({
      email: 'admin@demo.com',
      password: passwordHash,
      name: 'Salah Eddine',
      surname: 'Lalami',
      role: 'admin',
    }).save();

    console.log('👍 Admin created : Done!');

    const Setting = require('../models/coreModels/Setting');

    const appConfig = JSON.parse(fs.readFileSync(__dirname + '/config/appConfig.json', 'utf-8'));
    const companyConfig = JSON.parse(
      fs.readFileSync(__dirname + '/config/companyConfig.json', 'utf-8')
    );
    const financeConfig = JSON.parse(
      fs.readFileSync(__dirname + '/config/financeConfig.json', 'utf-8')
    );
    const customConfig = JSON.parse(
      fs.readFileSync(__dirname + '/config/customConfig.json', 'utf-8')
    );

    await Setting.insertMany([...appConfig, ...companyConfig, ...financeConfig, ...customConfig]);

    console.log('👍 Settings created : Done!');
  } catch (e) {
    console.log('\n🚫 Error! The Error info is below');
    console.log(e);
    process.exit();
  }
}

setupApp();
