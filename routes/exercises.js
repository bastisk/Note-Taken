var express = require('express');
var router = express.Router();
var Exercise = require('../models/exercise');

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}


router.get('/',isAuthenticated, function (req, res, next) {
    Exercise.find(function (err, exercises) {
        if (err) return next(err);
        res.render('exercises', {
            exercises: exercises,
            user: req.user
        });
    });
});

router.get('/add', isAuthenticated, function (req, res, next) {
        res.render('exercise_add');
    });

router.post('/add', isAuthenticated, function(req, res) {
    var newEx = new Exercise();
    newEx.Name = req.body.Name;
    newEx.Description = req.body.Description;
    newEx.IMG = req.body.IMG;
    newEx.save(function(err) {
        if (err)
            res.redirect('/');
        res.redirect('/exercises');
    });
});

router.post('/edit/:id', isAuthenticated, function(req, res, next) {
    Exercise.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.redirect('/exercises');
    });
});

router.post('/delete/:id', isAuthenticated, function(req, res, next) {
    Exercise.findOneAndRemove({ _id: req.params.id }, function (err) {
        if (err) return next(err);
        res.redirect('/exercises');
    });
});


// unbenutzte Development Routes
/*
router.get('/edit/:id', isAuthenticated, function(req, res, next) {
    Exercise.findOne({ '_id': req.params.id }, function(err, foundex) {
        if(err) return next(err);
        res.render('exercise_edit', { exercise: foundex, user: req.user });
    });
});
*/
/*
router.get('/delete/:id', isAuthenticated, function(req, res, next) {
    Exercise.findOne({ '_id': req.params.id }, function(err, foundex) {
        if(err) return next(err);
        res.render('exercise_remove', { exercise: foundex, user: req.user });
    });
});
*/

module.exports = router;