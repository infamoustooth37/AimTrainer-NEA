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
let buttonContainer = [];
//post game buttons
let mainMenuButton;
let tryAgainButton;

//Timer variables
//Time limit of the task - 60 seconds
let timeLimit = 10; 
//counter to trigger segment calc of accuracy
let segmentCounter = 0;

//score variables
//keep track of the user's score during the task - set to 0 initially
let userScore = 0;

//data collection
//shots hit in 10 second segment
let shotsHit = 0;
//total shots taken in 10 seond segment
let totalShots = 0;
//total shots taken in the whole 60 seconds
let taskTotalShots = 0;
//total shots hit target in the whole 60 seconds
let totalShotsHit = 0;

//calculated by totalShotsHit / taskTotal Shots *100
let avgAccuracy = 0;
//value of accuacy that gets calculated every 10 seconds
let accuracySegment = 0;
//array to store the accuracy values calculated - show on graph
let accuracyValues = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  //solid colour for background
  background(51);
  if(gameState == 0){
    if(isUISet == false){
        UISetUp();//so that when game is restarted all UI elements will be added again
    }
    background(72, 174, 73); //green background like main menu
    customiseTask();
  }
  else if (gameState == 1){
    //When targets are not made (Start of task)
    if(!isTargetsSet){
      //create 3 targets
      while(targetContainer.length < 3){
      createTarget()
      }
      //the targets are now created no more targets needed
      isTargetsSet = true;
    }
      //Target Management  
      //loops for all the targets in the array and runs the display method to show target on screen
      for(let i= 0; i<targetContainer.length-1; i++){
        targetContainer[i].display();
      }
      //runs the timer fucntion to check if timer should go down
      taskTimer();
      //displays the value of the timer to the user 
      text("Time Left:" + timeLimit, windowWidth/2+100, windowHeight/10);
      //displays the score to the user    
      text("Score: " + userScore, windowWidth/2-200, windowHeight/10);
    }
    else if(gameState == 2){
        if(isUISet == false){
            UISetUp();//so that button elements are added
        }
        background(72, 174, 73);
        //creates and manages the rest of the UI elements
        postGameUI();
        
    }
  }

      //OLD   
      // //If there less than 3 targets on screen then create new target
      // if(targetContainer.length -1 != 3){
      //   createTarget()
      // }

//p5 function that is called when mouse is pressed
function mousePressed(){
  if(gameState == 1){
    //incremnet shots taken variables
    taskTotalShots ++;
    totalShots ++;
    //checks which target has been hit 
    for (let i = 0; i < targetContainer.length; i++) {
      if (targetContainer[i].doesContain(mouseX, mouseY)) {
        //create new random x and y positions
        let newX = randomX();
        let newY = randomY();
        //chnages the position of the target that has been hit with new random values
        targetContainer[i].moveStatic(newX,newY);
        userScore += 5;
        //increment shots hit variables
        shotsHit++;
        totalShotsHit++;
        break;      
      }
      else if (i == targetContainer.length-1){
        userScore --;
      }
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
  textAlign(LEFT);
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
  //resets the boolean to false as no UI is set up
  isUISet = false;
  //reset framcount to 0 for timer
  frameCount = 0;
  //remove the slider
  sizeSlider.remove();
  //remove the buttons
  for(let i = 0; i < buttonContainer.length; i++){
      buttonContainer[i].remove();
  }
  taskTotalShots = 0;
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
   //create pre game elements
   if(gameState == 0){
    setButtons();   
    setSldiers();
    //changes variable to true as AI elements are set
    isUISet = true;
}
//create post game elements
else if(gameState == 2){
    postGameButtons();
    isUISet = true;

}
}

//This function will be in charge of timing the task - 60 seconds
function taskTimer(){
  //if the timer still hasnt reached to 0
  if(timeLimit > 0){
      //frames since reset / 60 will give the remander of 0 then 1 second has passed
      if(frameCount % 60 == 0){
          //reduce timer by 1
          timeLimit--;
          segmentCounter ++;
          //when ten seconds calc accuracy for segment
          if(segmentCounter == 10){
              //calculates the accuracy for the segment
              accuracySegment = calcAvgAccuracy(totalShots,shotsHit);
              //append value into the array for graph
              accuracyValues.push(accuracySegment);
              console.log(accuracyValues);
              //reset the values for next segment
              segmentCounter = 0;
              totalShots = 0;
              shotsHit = 0;
          }
      }
  }
  else{
      //next phase - post game
      gameState = 2;
      avgAccuracy = calcAvgAccuracy(taskTotalShots-1, totalShotsHit);
  }

}

// creates the UI elements for PostGame phase (gameState 2)
function postGameUI(){
  //text set up
  fill(252);
  textSize(28);
  textFont('Verdana');
  textAlign(CENTER);
  //text - Headers
  text("Task Score",windowWidth/50+110,windowHeight/4 - 40);
  text("Average Accuracy",windowWidth/50+110,windowHeight/4 + 210);
  text("Total Shots Taken",windowWidth/2+560,windowHeight/4 - 40);
  text("Total Shots Hit",windowWidth/2+560,windowHeight/4 + 210);
  // page title
  textSize(36);
  text("Results",windowWidth/2,windowHeight/15);

  //Rects for data to show
  //top left - score
  //rectMode(CORNER)
  rect(windowWidth/50, windowHeight/4, 220,75);
  //bottom left - average Accuracy 
  rect(windowWidth/50, windowHeight/4+250, 220,75);

  //top right - Total Shots Taken     
  rect(windowWidth/2+450, windowHeight/4, 220,75);
  //bottom right - Total Shots Hit
  rect(windowWidth/2+450, windowHeight/4+250, 220,75);
  
  //Navigation Buttons
  mainMenuButton.position(windowWidth/50+10,windowHeight/4+430);
  tryAgainButton.position(windowWidth/2+460,windowHeight/4+430);

  mainMenuButton.mousePressed(setMainMenu);
  tryAgainButton.mousePressed(setTryAgain);


  //change text colour to black
  fill(0)
  //text - Data 
  text(userScore,windowWidth/25+75, windowHeight/3.1);
  //total shots
  text(taskTotalShots-1,windowWidth/2+560,windowHeight/4+50)
  //total shots hit
  text(totalShotsHit,windowWidth/2+560,windowHeight/4+300)
  //average accuracy
  text(avgAccuracy + "%",windowWidth/25+75,windowHeight/4+300)
  
}


//creates the buttons in the post game phase
function postGameButtons(){
  //creates button with label
  mainMenuButton = createButton("Main Menu");
  //adds button to CSS class for styling
  mainMenuButton.addClass("gameButtons");

  tryAgainButton = createButton("Try Again");
  tryAgainButton.addClass("gameButtons")

}
//goes to main menu when main menu button is pressed
function setMainMenu(){
  //uses JS method window.open and goes to index.html which is the main menu
  //_slef makes it open in the same tab rather than a new tab
  window.open("/webPages/mainMenu/index.html","_self")
}

//function to set the program back to pre game
function setTryAgain(){
  //triggers new UI to be set up
  isUISet = false;
  //reset time limit to 60 seconds
  timeLimit = 60;
  //reset the score back to 0
  userScore = 0;
  //remove buttons
  tryAgainButton.remove();
  mainMenuButton.remove();
  //change game state to pregame
  gameState = 0;
// removes all target instances from array
  while(targetContainer.length > 0){
    targetContainer.pop();
  }
  //triggers new creation of target
  isTargetsSet = false

    //remove all values from array to prepare for next round
    while(accuracyValues.length > 0){
      accuracyValues.pop();
  }
  //reset data collectors
  totalShots = 0;
  taskTotalShots = 0;
  totalShotsHit = 0
  shotsHit = 0;
  avgAccuracy = 0
}


//function to calculate the average accuracy of the user throughout the whole task.
function calcAvgAccuracy(shotsTakenInp, shotsHitInp){
  //calculates the user's accuracy
 var accuracy = (shotsHitInp/shotsTakenInp)*100    

  //round avgAccuracy to 1dp
  accuracy = Math.round(accuracy * 10) / 10
  
  return accuracy;
}