'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



var CommentSchema = new Schema({
	UID: {type: String, required: true},
  email: {type: String, required: true},
	name: {type:String, required: true},
  rate: {type:Number, required: true},
	post: {type:String, required: true},
	created_at: {type:String, required: true},
	course_id: {type:String, required: true},

});


var CourseSchema = new Schema({
  title: {type:String, required: true},
  rate: {type:Number, required: true},
  language: {type:String, required: true},
  description: {type:String, required: true},
  youtube: {type:String, required: true},
  difficulty: {type:String, required: true},
  views: {type:Number, required: true},
  comments: [CommentSchema]
});

module.exports = mongoose.model('Course', CourseSchema);

