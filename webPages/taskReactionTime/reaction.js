// File: reaction 
// Iteration: 1
// Developer(s): Jonathan Lupu
// Date Due: 24 June 2022
// This file will be used to run the task Reaction Time to train the user's reaction speed by reacting to a change in background colour
// This file is part of a web based aim trainer used to improve player's skills in FPS games
//-----------------------------------------------------------------------------------------------------------------------

//Initialising global variables
let backgroundChange = false;

//---------------------------------------

function setup(){
    createCanvas(windowWidth,windowHeight)
}

function draw(){
    //displays instructions for 300 frames
    if(frameCount < 300){
        background(255,0,0)
        fill(255);
        textSize(20);
        text("Click when the background turns green", windowWidth / 2 -150 , windowHeight/2)
    }
    //once more than 300 frames 
    if(frameCount > 300){
        //saves current time in ms
        if(frameCount == 301){
            timeStart = millis();
        }
    //changes background colour
        background(0,255,0);
    //switches the boolean value to indicate background changes colour
        backgroundChange = true;
        mouseClicked();
    
    }
}
//checks if mouse has been clicked and the background changed colour
function mouseClicked(){
    if(mouseIsPressed && backgroundChange == true){
        //calculate reaction time by taking time now - time when background changed
        timeToReact = round(millis()-timeStart);
        //output result to user
        fill(0)
        text(timeToReact + "ms", windowWidth/2, windowHeight/2);
        noLoop();
    }
}