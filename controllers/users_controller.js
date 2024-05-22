const User = require("../models/user");

module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "User Profile",
    profile_user: req.user,
  });
};

// updates user details
module.exports.update = async function (req, res) {
  try {
    const user = await User.findById(req.user.id);
    const { username, password, confirm_password } = req.body;

    if (password != confirm_password) {
      req.flash("error", "New password and Confirm password are not same!");
      return res.redirect("back");
    }

    if (!user) {
      req.flash("error", "User does not exist!");
      return res.redirect("back");
    }

    user.username = username;
    user.password = password;

    user.save();
    req.flash("success", "profile updated!");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", err);
    console.log(err);
    return res.redirect("back");
  }
};

// render the Sign In page
module.exports.signIn = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/profile");
  }
  return res.render("user_sign_in", {
    title: "Placement cell | Sign In",
  });
};

// render the Sign Up page
module.exports.signUp = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/profile");
  }
  return res.render("user_sign_up", {
    title: "Placement cell | Sign Up",
  });
};

// get Sign Up data
module.exports.create = async (req, res) => {
  try {
    console.log("this is the form data received",req.body);
    const { username, email, password, confirm_password } = req.body;

    // if password doesn't match
    if (password != confirm_password) {
      req.flash("error", "Password and Confirm password are not same");
      return res.redirect("back");
    }

    // check if user already exist
    let preUser =await User.findOne({ email:email });

      // console.log(user);

     
      
      if (!preUser) {
        await User.create(
          {
            email:email,
            password:password,
            username:username,
          });
        
            req.flash("success", "Account created!");
            return res.redirect("/");
      }
      
       else {
        req.flash("error", "Email already registed!");
        return res.redirect("back");
      }
    
  } catch (err) {
    console.log("error in signing up user and error is",err);
    return;
  }
};

// sign in and create a session for the user
module.exports.createSession = (req, res) => {
  req.flash("success", "Logged in successfully");
  return res.redirect("/dashboard");
};

// clears the cookie
module.exports.destroySession = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged out successfully!");
    return res.redirect("/");
  });
};
