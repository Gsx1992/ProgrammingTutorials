'use strict';

var _ = require('lodash');
var Course = require('./course.model');

// Get list of courses
exports.index = function(req, res) {
  Course.find(function (err, courses) {
    if(err) { return handleError(res, err); }
    return res.json(200, courses);
  });
};

exports.userComments = function(req, res) {
  Course.find(function (err, courses) {
    var commentArray = []
    for (var i = 0; i < courses.length; i++){
     for(var z = 0; z < courses[i].comments.length; z++){
       if(courses[i].comments[z].UID == req.params.id){
         commentArray.push(courses[i].comments[z])
       }
     }
   }

     if(commentArray.length > 0){
      return res.json(200, commentArray);
     }
     else {
              return res.send(404,"No Comments found")
          }          

  });
};

// Get a single course
exports.show = function(req, res) {
  Course.findById(req.params.id, function (err, course) {
    if(err) { return handleError(res, err); }
    if(!course) { return res.send(404); }
    return res.json(course);
  });
};



// Creates a new course in the DB.
exports.create = function(req, res) {
  Course.create(req.body, function(err, course) {
    if(err) { return handleError(res, err); }
    return res.json(201, course);
  });
};

// Updates an existing course in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Course.findById(req.params.id, function (err, course) {
    if (err) { return handleError(res, err); }
    if(!course) { return res.send(404); }
    var updated = _.merge(course, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, course);
    });
  });
};

exports.update_views = function(req, res) {
       Course.findById(req.params.id, function (err, course) {
            if(course.views == null || course.views < 1){
              course.views = 0
            }
            course.views += 1
            course.save(function (err) {
                if(err) { return handleError(res, err); }
                return res.json(200, course);
            });
        });
    };

// Deletes a course from the DB.
exports.destroy = function(req, res) {
  Course.findById(req.params.id, function (err, course) {
    if(err) { return handleError(res, err); }
    if(!course) { return res.send(404); }
    course.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.delete_comment = function(req, res) {
        Course.findById(req.params.course_id, function (err, course) {
            var comment_index = _.findIndex(course.comments, 
               function(comment) {
                  return comment._id == req.params.comment_id;
              }); 
           if (comment_index != -1) {
              course.comments.splice([comment_index], 1)
              course.save(function (err) {
                  if(err) { return handleError(res, err); }
                  return res.json(200,course.comments[comment_index])
                });
            } else {
              return res.send(401,"Bad comment id")
            }

         })
      };



exports.add_comment = function(req, res) {
       Course.findById(req.params.id, function (err, course) {
              var comment = {
                  UID: req.body.UID,
                  name: req.body.name,
                  email: req.body.email,
                  post: req.body.post,
                  rate: req.body.rate,
                  created_at: req.body.created_at,
                  course_id: req.body.course_id
               }
              course.comments.push(comment)
              course.save(function (err) {
                if(err) { return handleError(res, err); }
                var last = _.last(course.comments)
                if (last != undefined) {
                   return res.json(200, last);
                } else {
                  return res.send(500,"Database error")
                   }
              });
        });
    };


function handleError(res, err) {
  return res.send(500, err);
}