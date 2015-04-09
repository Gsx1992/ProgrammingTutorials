'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



var CommentSchema = new Schema({
	UID: {type: String, required: true},
  email: {type: String, required: true},
	name: {type:String, required: true},
  rate: {type:Number, required: true, min: 1, max: 5},
	post: {type:String, required: true},
	created_at: {type:String, required: true},
	course_id: {type:String, required: true},

});


var CourseSchema = new Schema({
  title: {type:String, required: true},
  rate: {type:Number, required: true, min: 0, max: 5},
  language: {type:String, required: true},
  description: {type:String, required: true},
  youtube: {type:String, required: true, match: /youtube/},
  difficulty: {
    type:String,
    enum: ['Beginner', 'Intermediate', 'Advanced'], 
    required: true},
  views: {type:Number, required: true, min: 0},
  comments: [CommentSchema]
});

module.exports = mongoose.model('Course', CourseSchema);

