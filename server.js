const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const nodemailer = require("nodemailer");
const $ = require("jquery");
const port = 3000;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){
  res.render("home");
});

app.get("/contact", function(req, res){
  res.render("contact", {contactInstruction: "Please fill in the form below to send me an email."});
  })

app.post("/contact", function(req, res){

  const name = JSON.stringify(req.body.theirName);
  const email = JSON.stringify(req.body.theirEmail);
  const message = JSON.stringify(req.body.theirMessage);


let transporter = nodemailer.createTransport({
  service: "gmail",
  auth:{
    user: "louise.webemail@gmail.com",
    pass: "Webemail1"
  }
})

let mailOptions = {
  from: "louise.webemail@gmail.com",
  to: "louise.sandlan@gmail.com",
  subject: "email from website",
  text: "name: " + name + " email: " + email + " Message: " + message
}

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
    res.render("contact", {contactInstruction: "Email was not sent, please try agian."});
  } else {
    console.log("Email sent succesfully");
    res.render("contact", {contactInstruction: "Email successfully sent."});
  }
})

});

app.get("/photography", function(req, res){
  res.render("photography");
});

app.get("/game", function(req, res){
  res.render("game");
});

app.listen(3000, function(){
  console.log("Server is up and running on port 3000")
});
