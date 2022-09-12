// File: accuracy
// Iteration: 1
// Developer(s): Jonathan Lupu
// Date Due: 24 June 2022
// This file is for the creation of the accuracy task for a web based aim trainer. This task will have multiple moving targets
// the user is tasked to shoot these targets as fast and as accurate as possible
//-----------------------------------------------------------------------------------------------------------------------

//Initialising global variables

let targetContainer = [];
let size; //size of target
let speed; //speed of target

let gameState = 0;
// gameState = 0 --> Pre-game
// gameState = 1 --> Game
// gameState = 2 --> Post-game
//-------------------------------

//UI elements
let speedSlider;
let sizeSlider;
let sliderContainer = [];


function setup(){
    createCanvas(windowWidth,windowHeight);
    //Min val = 20 , Max val = 80, Starting val = 30, Step = 1
    speedSlider = createSlider(3,10,3,1);
    //add slider to array named sliderContainer
    sliderContainer.push(speedSlider);
    //Min val = 20 , Max val = 80, Starting val = 30 Step = 5
    sizeSlider = createSlider(20,100,40,5);
    //add slider to array named sliderContainer
    sliderContainer.push(sizeSlider);    
}

function draw(){
    background(51);

    //gameState checker

    if(gameState == 0){
        customiseTask();
    }
    else{
        //checks the number of targets in play. If 0 targets then new targets to be created
    if(targetContainer.length  == 0 ){
        createTarget();
    }
//loops through array and manages targets by displaying and moving them
    for (let i = 0; i < targetContainer.length; i++) {
        targetContainer[i].display();
        targetContainer[i].move();
    } 

    }

    
}
//runs when mouse is pressed
function mousePressed(){
    //calculates distance between target at index of i
    for(let i = 0; i < targetContainer.length; i++){
        if(targetContainer[i].doesContain(mouseX,mouseY)){
            //if true then mouse is over target - target is shot
            targetContainer.splice(i,1); //removed from array and no longer managed by program
        }
    }
}


//function generates random value to be used as x position for new target
function randomX(){
    //will choose random x position to create target 
    let randomXpos = random(50,windowWidth-50);//random number between 30 and windowWidth - 30 to keep targets of the border
    return randomXpos;

  }
//function generates random value to be used as y position for new target
  function randomY(){
    //will choose random x position to create target 
    let randomYpos = random(50,windowHeight-50);
    return randomYpos;
  }
  //function to create target object
function createTarget(){
    //create 10 targets
    while(targetContainer.length < 5){
        //runs the two functions to generate new random x and y positions for targets
        let newTargetX = randomX();
        let newTargetY = randomY();

        //choose random direction by changing speed between +Ve and -Ve
        let direction = Math.floor(Math.random() * 2)+1; //Either be 1 or 2. if direction = 1 then it will go -Ve
        if(direction == 1){
            speed *= -1
        }
        

        //create moving target (speed = 3) with diameter 100 and random x and y position determined above
        let newTarget = new targetObj(size,speed,newTargetX,newTargetY);

        //push target into targetContainer for management
        targetContainer.push(newTarget);
    }
}
function customiseTask(){
    speedSlider.position(windowWidth/10-40,windowHeight/8+15);
    sizeSlider.position(windowWidth/3-10,windowHeight/8+15);
   
//retrieve value of each slider to then use in target settings.
    targetSpeed = speedSlider.value();
    targetSize = sizeSlider.value();
//set the font to verdana
    textFont('Verdana')
// set the text colour to white which gives good contrast
    fill(252);
// size of text to be set to 30. Not too big nor too small
    textSize(30);
    //Text displaying the value of each slider
    text("Target speed: " + targetSpeed,windowWidth/10-80,windowHeight/8 - 20,(windowWidth/1.5), (windowHeight/10)*1.5);
    text("Target size: " + targetSize,windowWidth/3-60,windowHeight/8 - 20, (windowWidth/1.5), (windowHeight/10)*1.5);
}