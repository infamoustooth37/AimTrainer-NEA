// File: tracking
// Iteration: 1
// Developer(s): Jonathan Lupu
// Date Due: 24 June 2022
// This file is for the tracking task where the user will have to hover over the targets as they move across the screen 
// with varying speeds. The user will then receive points, the longer they hovered over a target the more points they recieve.
//This task is for a web based aim trainer used to improve user's skills in FPS games.
//-----------------------------------------------------------------------------------------------------------------------

//Initialising global variables
let size = 100;
let speed;
let randomYpos;
let target;

//-------------------------------


function setup(){
    createCanvas(windowWidth, windowHeight);
    //random integer for speed between 1 and 5
    speed = randomSpeed();
    //random height for target
    randomYpos = randomY();
    //target starts off screen on left side and will move to the right hand side
    target = new targetObj(size,speed,-50,randomYpos)
}

function draw(){
    background(51);
    //displays and moves the target along the screen
    target.display();
    target.moveTracking();

    let targetXpos = target.getXpos();
    //If true then target is off screen and has to be reset with new height
    if(targetXpos > windowWidth){
        resetTarget();        
    }
//checks if the mouse is over the target i.e. tracking
    if(target.doesContain(mouseX,mouseY)){
        //if true points increase (points implemented in later iterations)
        console.log("Mouse is over target points ++")//placeholder
    }


}

//function generates random value to be used as y position for target
  function randomY(){
    //will choose random x position to create target 
    let randomYpos = random(50,windowHeight-50);
    return randomYpos;
  }
//generates new random value for the speed
  function randomSpeed(){
    newSpeed = Math.floor(Math.random() * 5)+2;
    return newSpeed;
  }
//runs to reset the target for next tracking run
  function resetTarget(){
    //generates new values for y position and speed of target
    randomYpos = randomY();
    speed = randomSpeed();
    //sets attributes with the new values
    target.setNewYpos(randomYpos);
    target.setTrackingSpeed(speed);
    //resets target to go off screen
    target.resetXpos();
    
  }