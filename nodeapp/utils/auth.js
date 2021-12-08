const session = require("express-session");
const passport = require("passport");  // built in auth ?
const userModel = require("../models/person_model");
const pool = require("./db.js");

module.exports = {

  initialization(app){
    app.use(
      session({
        secret: "mysecretkey",
        resave: false,
        saveUninitialized: false,
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser(function (user, done){
      done(null, user.username);
    });
    passport.deserializeUser(async function (username, done){
      let user = await userModel.read(username);
      done(null, user);
    });
  },

  //authenticate user on login
  checkAuthentication(role){
    console.log("In auth function");
    return function (req, res, next){
      if (req.isAuthenticated()){
        if(role){
          if(role === req.user.role){
            return next();
          }else {
            return res.end("401 Unauthorized");
          }
        }else {
          return next();
        }
      }else {
        res.redirect("/login");
      }
    }
  },

  //check to see if username already exists when new user registers
  async checkNewAccount(username){
    return new Promise(async function(res, rej){
    try {
      conn = await pool.getConnection();
      sql = "SELECT * FROM People WHERE username = ?";
      await conn.query(sql, [username], function(err, results, fields){
        if (results.length > 0){
          res(false);
        }else{
          res(true);
        }
      });
     conn.release();
    }catch (err) {
      rej(err);
    }
  });
 },

 async checkNewProject(project_name){
   return new Promise(async function(res, rej){
     try {
       conn = await pool.getConnection();
       sql = "SELECT * FROM Projects WHERE project_name = ?";
       await conn.query(sql, [project_name], function(err, results, fields){
         if (results.length > 0){
           res(false);
         }else {
           res(true);
         }
       });
     }catch (err){
       rej(err);
     }
   });
 }

};
