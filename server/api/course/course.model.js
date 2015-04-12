'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var youtubeCheck = [
function(v){
  var test = v.trim()
  if(v.indexOf("youtube") == -1){
    return false
  }
},
'The value entered is not a valid {PATH} link'
]

var emptyCheck = [
function(v){
  return (v.trim().length > 0)
},
'{PATH} cannot be an empty variable!'
]

var ReplySchema = new Schema({
  UID: {type: String, required: true},
  email: {type: String, required: true},
  name: {type:String, required: true},
  post: {type:String, required: true},
  created_at: {type:String, required: true},
  course_id: {type:String, required: true},
  comment_id: {type:String, required: true},

});


var CommentSchema = new Schema({
	UID: {type: String, required: true},
  email: {type: String, required: true, match: /@/},
	name: {type:String, required: true},
  rate: {type:Number, required: true, min: 1, max: 5, default: 1},
	post: {type:String, required: true, validate: emptyCheck},
	created_at: {type:String, required: true},
	course_id: {type:String, required: true},
  replies: [ReplySchema]

});


var CourseSchema = new Schema({
  title: {type:String, required: true, validate: emptyCheck},
  rate: {type:Number, required: true, min: 0, max: 5, default: 0},
  language: {type:String, required: true, validate: emptyCheck},
  description: {type:String, required: true, validate: emptyCheck},
  youtube: {type:String, required: true, validate: youtubeCheck},
  difficulty: {
    type:String,
    enum: ['Beginner', 'Intermediate', 'Advanced'], 
    required: true},
  views: {type:Number, required: true, min: 0, default: 0},
  comments: [CommentSchema]
});




module.exports = mongoose.model('Course', CourseSchema);

