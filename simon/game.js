var gamePattern=[];
var buttonColors=["red","blue","green","yellow"];
var userClickedPattern=[];
var Level=0;

var started = false;

function nextSequence(){

  userClickedPattern=[];

  Level++;
  $("h1").text("Level " + Level);

    var randomNumber=Math.random();
    randomNumber*=4;
    randomNumber=Math.floor(randomNumber);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

    
   
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {  console.log("success");
  if(userClickedPattern.length === gamePattern.length)
  {
    setTimeout(function(){
      nextSequence();
    }, 1000);
  }
    }
  else
  {
    console.log("wrong");
    //1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
    playSound("wrong");

    //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

$( ".btn" ).click(function() {
      
    var userChosenColor =   $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    
  });

  function playSound(names){
    var audio = new Audio("sounds/" + names + ".mp3");
    audio.play();

  }

  function animatePress(currentColor){
      $("#" + currentColor).addClass("pressed");
      setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
  }

  $(document).keypress(function() {
    
   if(!started){
    $("#level-title").text("Level" + Level);
     
    nextSequence();
    started = true;
   }
  });

  function startOver(){
      Level=0;
      gamePattern=[];
      started = false;

  }

