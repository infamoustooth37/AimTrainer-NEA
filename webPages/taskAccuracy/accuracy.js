// File: accuracy
// Iteration: 1
// Developer(s): Jonathan Lupu
// Date Due: 24 June 2022
// This file is for the creation of the accuracy task for a web based aim trainer. This task will have multiple moving targets
// the user is tasked to shoot these targets as fast and as accurate as possible
//-----------------------------------------------------------------------------------------------------------------------

//Initialising global variables

let targetContainer = [];
let targetSize; //size of target
let targetSpeed; //speed of target

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
let sizeSlider;
let sliderContainer = [];
//buttons
let buttonHard;
let buttonMed;
let buttonEasy;
let buttonStart;
let buttonContainer = []


function setup(){
    createCanvas(windowWidth,windowHeight);  
}

function draw(){
    background(51);

    //gameState checker

    if(gameState == 0){
        if(isUISet == false){
            UISetUp();//so that when game is restarted all UI elements will be added again (when post game is implemented)
        }
        background(72, 174, 73); //green background like main menu
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
            targetSpeed *= -1
        }
        

        //create moving target (speed = 3) with diameter 100 and random x and y position determined above
        let newTarget = new targetObj(targetSize,targetSpeed,newTargetX,newTargetY);

        //push target into targetContainer for management
        targetContainer.push(newTarget);
    }
}

//function dispaly the text and position UI elements in pregame state
function customiseTask(){
    //position sldier according to the size of the window
    speedSlider.position(windowWidth/10-40,windowHeight/8+15);
    sizeSlider.position(windowWidth/3-10,windowHeight/8+15); //kept in draw to ensure that position is fixed as window size may change during runtime
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
    text("Target speed: " + targetSpeed,windowWidth/10-55,windowHeight/8 - 30,(windowWidth/1.5), (windowHeight/10)*1.5);
    text("Target size: " + targetSize,windowWidth/3-20,windowHeight/8 - 30, (windowWidth/1.5), (windowHeight/10)*1.5); 

    //text to give information about what each slider will affect in the task
    textWrap(WORD);
    textAlign(BASELINE)
    text("This will change the speed of the targets. The higher the value is set to the faster the targets will be",windowWidth/10-65,windowHeight/3 - 30,(windowWidth/4), (windowHeight/2))
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
    speedSlider.value(7);
    sizeSlider.value(30);
}
//function to set the Medium difficulty
function setMed(){
    speedSlider.value(5);
    sizeSlider.value(40);
}
//function to set the Easy difficulty
function setEasy(){
    speedSlider.value(3);
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