var gamePattern = [];

var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;

var started = false;


$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    userClickedPattern.push()
    checkAnswer(userClickedPattern.length-1);
});

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

//function to generate random number
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNum = Math.floor((Math.random() * 4));
    var randomChosenColour = buttonColors[randomNum];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

//function for flash effect animation
function animatePress(currColor){
    $("#"+currColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currColor).removeClass("pressed");
    }, 100);
}

//fucntion to play sound according clicked btn
function playSound(currColor){
    var audio = new Audio("sounds/"+currColor+".mp3");
    audio.play();
}

function checkAnswer(currLevel){
    if(userClickedPattern[currLevel] === gamePattern[currLevel]){
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Level "+currLevel+", Game Over, Press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


