var express = require('express');
var router = express.Router();
const userModel = require("./users");
const localStrategy = require("passport-local");
const passport = require('passport');
passport.use(new localStrategy(userModel.authenticate()));

/* Middleware for authentication */
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index');
});

// router.get("/create", async function (req, res) {
//   let userData = await userModel.create({
//     username: "Ali",
//     nickname: "Kamla",
//     description: "He is guy of 10 and he love to play badminton.",
//     categories: ['cricket', 'badminton', 'football']
//   });
//   res.send(userData);
// });

// router.get("/find", async function (req, res) {
  //by name searching code
  // var regex = new RegExp("^Ali$", 'i');
  // let user = await userModel.find({username: regex});
  // res.send(user);
  //by categories searching
  // let user = await userModel.find({categories: { $all: ['cricket'] }})
  // res.send(user);
  //if field exists then showes these 
  // let user = await userModel.find({categories: { $exists: true }})
  // res.send(user);
  //search by date
  // var date1 = new Date('2023-11-22');
  // var date2 = new Date('2023-11-23');
  // let user = await userModel.find({datecreated: {$gte: date1, $lte: date2}});
  // res.send(user);
  // to find in specific field length
//   let user = await userModel.find({
//     $expr: {
//       $and: [
//         { $gte: [{ $strLenCP: '$nickname' }, 0] },
//         { $lte: [{ $strLenCP: '$nickname' }, 12] }
//       ]
//     }
//   });
//   res.send(user);
// });

// router.get('/failed', function(req, res) {
//   req.flash("age", 12);
// });

// router.get('/checkkaro', function(req, res) {
//   req.flash("age");
// });

router.get('/profile', isLoggedIn, function(req, res){
  res.render('profile');
})

router.get('/logout', function(req, res, next) {
    req.logOut(function(err) {
      if(err) {return next(err);}
      res.redirect('/');
    });
});

router.post('/register', function(req, res){
  var userData = new userModel({
    username: req.body.username,
    secret: req.body.secret
  });

  userModel.register(userData, req.body.password)
    .then(function (registereduser) {
      passport.authenticate("local")(req, res, function(){
        res.redirect('/profile');
      })
    })
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/"
}), function (req, res){})

module.exports = router;