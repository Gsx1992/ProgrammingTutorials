'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CourseSchema = new Schema({
  title: String,
  rate: Number,
  language: String,
  description: String,
  difficulty: String,
  views: Number,
  info: String
});

module.exports = mongoose.model('Course', CourseSchema);

