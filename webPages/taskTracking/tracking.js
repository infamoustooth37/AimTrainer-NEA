// File: tracking
// Iteration: 1
// Developer(s): Jonathan Lupu
// Date Due: 24 June 2022
// This file is for the tracking task where the user will have to hover over the targets as they move across the screen 
// with varying speeds. The user will then receive points, the longer they hovered over a target the more points they recieve.
//This task is for a web based aim trainer used to improve user's skills in FPS games.
//-----------------------------------------------------------------------------------------------------------------------

//Initialising global variables
let targetSize; //size of target
let targetSpeed; //speed of target
let randomYpos;
let target;
let isTargetsSet = false;

//------------------------------

let gameState = 0;
// gameState = 0 --> Pre-game
// gameState = 1 --> Game
// gameState = 2 --> Post-game
//-------------------------------

//to check if UI elements are set up on screen when gameState = 0 
let isUISet = false;

//UI elements
//sliders
let speedSlider;
let SpeedVal;
let sizeSlider;
let sliderContainer = [];
//buttons
let buttonHard;
let buttonMed;
let buttonEasy;
let buttonStart;
let buttonContainer = []


function setup(){
    createCanvas(windowWidth, windowHeight);
    
}

function draw(){
    background(51);
    if(gameState == 0){
      if(isUISet == false){
          UISetUp();//so that when game is restarted all UI elements will be added again (when post game is implemented)
      }
      background(72, 174, 73); //green background like main menu
      customiseTask();
    }
    else{
      //When targets are not made (Start of task)
      if(!isTargetsSet){
        //random integer for speed between 2 and value of slider
        targetSpeed = randomSpeed();
        //random height for target
        randomYpos = randomY();
        //target starts off screen on left side and will move to the right hand side
        target = new trackingObj(targetSize,targetSpeed,-50,randomYpos);
        isTargetsSet = true;
      }


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
}

//function generates random value to be used as y position for target
  function randomY(){
    //will choose random x position to create target 
    let randomYpos = random(50,windowHeight-50);
    return randomYpos;
  }
//generates new random value for the speed
  function randomSpeed(){
    //maximum speed will be set by slider minimum will be 2
    newSpeed = Math.floor(Math.random() * SpeedVal-1)+2;
    console.log(targetSpeed)
    return newSpeed;
  }
//runs to reset the target for next tracking run
  function resetTarget(){
    //generates new values for y position and speed of target
    randomYpos = randomY();
    targetSpeed = randomSpeed();
    //sets attributes with the new values
    target.setNewYpos(randomYpos);
    target.setTrackingSpeed(targetSpeed);
    //resets target to go off screen
    target.resetXpos();
    
  }

//function dispaly the text and position UI elements in pregame state
function customiseTask(){
  //position sldier according to the size of the window
  speedSlider.position(windowWidth/10-40,windowHeight/8+15);
  sizeSlider.position(windowWidth/3-10,windowHeight/8+15); //kept in draw to ensure that position is fixed as window size may change during runtime
//retrieve value of each slider to then use in target settings.
  SpeedVal = speedSlider.value();
  targetSize = sizeSlider.value();
//set the font to verdana
  textFont('Verdana')
// set the text colour to white which gives good contrast
  fill(252);
// size of text to be set to 30. Not too big nor too small
  textSize(30);
  //Text displaying the value of each slider
  text("Target speed: " + SpeedVal,windowWidth/10-55,windowHeight/8 - 30,(windowWidth/1.5), (windowHeight/10)*1.5);
  text("Target size: " + targetSize,windowWidth/3-20,windowHeight/8 - 30, (windowWidth/1.5), (windowHeight/10)*1.5); 
  
  textWrap(WORD);
  textAlign(BASELINE)
  text("This will change the maximum speed targets could have. The higher the value is set to the faster the targets may move",windowWidth/10-65,windowHeight/3 - 30,(windowWidth/4), (windowHeight/2))
  text("This will change the size of the targets. The higher the value is set to the bigger the targets will be.",windowWidth/3-20,windowHeight/3 - 30,(windowWidth/4), (windowHeight/2))    

//Button code
  
  text("Preset Difficulties ",windowWidth*0.78,windowHeight/8 - 30, (windowWidth/1.5), (windowHeight/10)*1.5); 
  //position the button on the page
  buttonHard.position(windowWidth*0.8,windowHeight/5+15); 
  buttonMed.position(windowWidth*0.8,windowHeight/5+100); 
  buttonEasy.position(windowWidth*0.8,windowHeight/5+185); 
  buttonStart.position(windowWidth*0.8,windowHeight*0.8); 

 //check if each button has been clicked. If so change the values
  buttonHard.mousePressed(setHard);
  buttonMed.mousePressed(setMed);
  buttonEasy.mousePressed(setEasy);
  buttonStart.mousePressed(setStart)
}

//function to set the Hard difficulty
function setHard(){
  speedSlider.value(10);
  sizeSlider.value(30);
}
//function to set the Medium difficulty
function setMed(){
  speedSlider.value(7);
  sizeSlider.value(40);
}
//function to set the Easy difficulty
function setEasy(){
  speedSlider.value(5);
  sizeSlider.value(80);
}

function setStart(){   
  //change state to game
  gameState = 1;
  //remove the sliders
  for(let i = 0; i < sliderContainer.length; i++){
      sliderContainer[i].remove();
  }
  //remove the buttons
  for(let i = 0; i < buttonContainer.length; i++){
      buttonContainer[i].remove();
  }
}


//function creates buttons and adds to class for CSS styling
function setButtons(){
  //creates button with Label in string 
  buttonHard = createButton('HARD');
  //adds the button to class to style in CSS
  buttonHard.addClass('gameButtons')
  //append to container
  buttonContainer.push(buttonHard);

  buttonMed = createButton('MEDIUM');
  buttonMed.addClass('gameButtons');
  buttonContainer.push(buttonMed);

  buttonEasy = createButton('EASY');
  buttonEasy.addClass('gameButtons');
  buttonContainer.push(buttonEasy);

  buttonStart = createButton('START');
  buttonStart.addClass('gameButtons');
  buttonContainer.push(buttonStart);
}

function setSldiers(){
   //Min val = 3 , Max val = 10, Starting val = 3, Step = 1
   speedSlider = createSlider(3,10,3,1);
   //adds slider to class so that can be styled in CSS
   speedSlider.addClass('sliders');
   //add slider to array named sliderContainer
   sliderContainer.push(speedSlider);

   //Min val = 20 , Max val = 100, Starting val = 40 Step = 5
   sizeSlider = createSlider(20,100,40,5);
   sizeSlider.addClass('sliders');
   sliderContainer.push(sizeSlider);  
}

//sets up UI 
function UISetUp(){
  setButtons();   
  setSldiers();
  //changes variable to true as AI elements are set
  isUISet = true;
}