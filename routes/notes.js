var express = require('express');
var router = express.Router();
var Note = require('../models/note');
var isAuthenticated = require('../auth');

router.get('/', isAuthenticated, function(req, res) {
  Note.find(function(err, notes) {
    if (err) return next(err);
    res.render('notes', {
      user: req.user,
      notes: notes
    });
  });
});

router.get('/view/:id', isAuthenticated, function(req, res) {
  Note.findOne({
    '_id': req.params.id
  }, function(err, foundex) {
    if (err) return next(err);
    res.render('viewnote', {
      note: foundex,
      user: req.user
    });
  });
});

router.get('/add', isAuthenticated, function(req, res) {
  res.render('newadd', {
    user: req.user
  });
});

router.post('/add', isAuthenticated, function(req, res) {
  var NewNote = new Note();
  NewNote.Title = req.body.title;
  NewNote.Text = req.body.content;
  NewNote.save(function(err) {
    res.redirect('/');
  });
});

router.get('/edit/:id', isAuthenticated, function(req, res) {
  Note.findOne({
    '_id': req.params.id
  }, function(err, foundex) {
    if (err) return next(err);
    res.render('newedit', {
      note: foundex,
      user: req.user
    });
  });
});

router.post('/edit/:id', isAuthenticated, function(req, res, next) {
  Note.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.redirect('/');
  });
});

router.post('/delete/:id', isAuthenticated, function(req, res, next) {
Note.findOneAndRemove({_id: req.body._id }, function(err) {
     if (err) return next(err);
    res.redirect('/notes');
});
});

module.exports = router;
