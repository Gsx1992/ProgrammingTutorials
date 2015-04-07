/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Course = require('../api/course/course.model');
var User = require('../api/user/user.model');

Course.find({}).remove(function() {
      Course.create({
        title:"Android 101",
        rate:1,
        language:"Java",
        youtube:"https://www.youtube.com/embed/mdMuwojYdAg",
         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
         difficulty:"Beginner",
         views:0,
         comments:[]
      });
    });




User.find({}).remove(function() {
  User.create({
    provider: 'local',
    role: 'admin',
    name: 'Gareth Lacey',
    email: 'gareth_1992@live.com',
    password: 'test123'
  }, function() {
      console.log('finished populating users');
    }
  );
});
