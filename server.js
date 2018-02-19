const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();



app.set("view engine","hbs");
app.use(express.static(__dirname + "/public"));

// Middleware lection
app.use( (req,res,next) => {
  var now = new Date().toUTCString();
  var logText = `${now}: ${req.method} ${req.url} - (${req.ip})`;
  console.log(logText);
  fs.appendFile("server.log",logText + "\n", (err)=>{
    if ( err) console.log('UNABLE to log to server.log');
  });
  next();
});

// app.use( (req,res,next) => {
//   res.render("maintenance.hbs");
// });

hbs.registerPartials(__dirname + "/views/partials");

hbs.registerHelper("getCurrentYear",()=>{
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt",(text)=>{
  return text.toUpperCase();
});

app.get("/", (req,res)=>{
    //res.send("<h2>Hello express!</h2>");
    res.render("home.hbs",{
      welcomeMessage : "A welcome message",
      pageTitle : "Home page"
    });
});

app.get("/about", (req,res)=>{
  res.render("about.hbs",{
    pageTitle : "About page",
  });
});

app.get("/bad", (req,res)=>{
  res.send(
    {
     error : "404",
     message : "Page not found"
    });
});

app.listen(3000, () =>{
  console.log("Server running");
});
console.log("After listen");
