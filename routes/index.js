var express = require('express');
var router = express.Router();
var Note = require('../models/note');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/login');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/login', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('login', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/login',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/', isAuthenticated, function(req, res){
        Note.find(function (err, notes) {
            if (err) return next(err);
            res.render('index', { user: req.user, notes: notes });
        });
	});
    
    router.get('/addnote', isAuthenticated, function(req, res){
        res.render('addnote', {user: req.user});
    });
    
    router.get('/editnote/:id', isAuthenticated, function(req, res){
        Note.findOne({ '_id': req.params.id}, function(err, foundex) {
            if(err) return next(err);
            res.render('editnote', { note: foundex, user: req.user });
        });               
    });
    
    router.post('/editnote/:id', isAuthenticated, function(req, res, next) {
    Note.findByIdAndUpdate(req.params.id, req.body , function (err, post) {
        if (err) return next(err);
        res.redirect('/');
        });
    });
    
    router.post('/deletenote', isAuthenticated, function(req, res, next) {
    Note.findOneAndRemove({_id: req.body._id }, function(err) {
         if (err) return next(err);
        res.redirect('/');
    });
    });
    
    router.post('/addnote', isAuthenticated, function(req, res){
        var NewNote = new Note();
        NewNote.Title = req.body.title;
        NewNote.Text = req.body.content;
        NewNote.demo_text = req.body.demo_text;
        NewNote.save(function(err) {
        res.redirect('/');
    });
    });

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}





