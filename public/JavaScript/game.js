const buttonColours = ["orange", "green", "blue", "purple"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

$(document).keydown(function(){
  if (!started){
    $("#level-title").text("level "+level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
    setTimeout(function(){nextSequence();}, 1000);
  }
  } else {
    console.log ("wrong");
    var wrongSound = new Audio ("/sounds/wrong.mp3");
    wrongSound.play;
    $("body").addClass("game-over");
    setTimeout (function(){
      $("body").removeClass("game-over");}, 400);
      $("#level-title").text("Game Over, Press Any Key To Restart");
      startOver();
    }};


function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("level "+level);
  let randomNumber = Math.floor(Math.random()*4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

};

$(".btn").click(function(){
  let userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
  let sound = new Audio ("sounds/" + name + ".mp3");
  sound.play();

};

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function (){
    $("#"+currentColour).removeClass("pressed");
  }, 100);
};

function startOver(){
 level = 0;
 gamePattern = [];
 started = false;
};
