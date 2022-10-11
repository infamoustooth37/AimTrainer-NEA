// File: flicking
// Iteration: 1
// Developer(s): Jonathan Lupu
// Date Due: 24 June 2022
// This file is responsible for the execution of the flicking task. In this task 3 targets will spwan with random x and y
//cooridinates, the user is tasked to shoot the targets as fast as possible while being as accurate as they possibly can
//Once a target has been shot it will be removed from play and a new target will change its place
//-----------------------------------------------------------------------------------------------------------------------


//array to manage targets
let targetContainer = [];
//fixed size of targets that will switch to user input in later iterations
let targetSize;

let gameState = 0;
// gameState = 0 --> Pre-game
// gameState = 1 --> Game
// gameState = 2 --> Post-game
//-------------------------------

let isTargetsSet = false;

//to check if UI elements are set up on screen when gameState = 0 
let isUISet = false;

//UI elements
//sliders
let sizeSlider;
//buttons
let buttonHard;
let buttonMed;
let buttonEasy;
let buttonStart;
let buttonContainer = []


function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  //solid colour for background
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
      //create 3 targets
      while(targetContainer.length < 3){
      createTarget()
      }
      //the targets are now created no more targets needed
      isTargetsSet = true;
    }
    else{ 
      //Target Management  
      //loops for all the targets in the array and runs the display method to show target on screen
      for(let i= 0; i<targetContainer.length-1; i++){
        targetContainer[i].display();
      }
    }
  }
}

      //OLD   
      // //If there less than 3 targets on screen then create new target
      // if(targetContainer.length -1 != 3){
      //   createTarget()
      // }

//p5 function that is called when mouse is pressed
function mousePressed(){
  //checks which target has been hit 
  for (let i = 0; i < targetContainer.length-1; i++) {
    if (targetContainer[i].doesContain(mouseX, mouseY)) {
      //create new random x and y positions
      let newX = randomX();
      let newY = randomY();
      //chnages the position of the target that has been hit with new random values
      targetContainer[i].moveStatic(newX,newY);
      
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
  while(targetContainer.length < 4){
    //runs the two functions to generate new random x and y positions for targets
    let newTargetX = randomX();
    let newTargetY = randomY();

    //create static target (speed = 0) with diameter 100 and random x and y position determined above
    let newTarget = new flickingObj(targetSize,0,newTargetX,newTargetY);

    //push target into targetContainer for management
    targetContainer.push(newTarget);
  }

}
//function dispaly the text and position UI elements in pregame state
function customiseTask(){
  //position sldier according to the size of the window
  sizeSlider.position(windowWidth/10-40,windowHeight/8+15); //kept in draw to ensure that position is fixed as window size may change during runtime
//retrieve value of each slider to then use in target settings.
  targetSize = sizeSlider.value();
//set the font to verdana
  textFont('Verdana')
// set the text colour to white which gives good contrast
  fill(252);
// size of text to be set to 30. Not too big nor too small
  textSize(30);
  //Text displaying the value of each slider
  text("Target size: " + targetSize,windowWidth/10-55,windowHeight/8 - 30, (windowWidth/1.5), (windowHeight/10)*1.5); 
  
  textWrap(WORD);
  textAlign(BASELINE)
  text("This will change the size of the targets. The higher the value is set to the bigger the targets will be.",windowWidth/10-65,windowHeight/3 - 30,(windowWidth/3))  
  
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
  sizeSlider.value(20);
}
//function to set the Medium difficulty
function setMed(){
  sizeSlider.value(40);
}
//function to set the Easy difficulty
function setEasy(){
  sizeSlider.value(80);
}

function setStart(){   
  //change state to game
  gameState = 1;
  //remove the slider
  sizeSlider.remove();
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
   //Min val = 20 , Max val = 100, Starting val = 40 Step = 5
   sizeSlider = createSlider(20,100,40,5);
   sizeSlider.addClass('sliders');
}

//sets up UI 
function UISetUp(){
  setButtons();   
  setSldiers();
  //changes variable to true as AI elements are set
  isUISet = true;
}