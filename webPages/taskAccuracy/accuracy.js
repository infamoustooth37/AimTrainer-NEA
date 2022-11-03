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

let chartCanvas;
let gameCanvas;
function setup(){
    gameCanvas = createCanvas(windowWidth,windowHeight);  

}

function draw(){
    background(51);
    //gameState checker
    //runs pre game
    if(gameState == 0){
        if(isUISet == false){
            UISetUp();//so that when game is restarted all UI elements will be added again (when post game is implemented)
        }
        background(72, 174, 73); //green background like main menu
        customiseTask();
    }
    //runs when in task
    else if(gameState == 1){
        //runs the timer fucntion to check if timer should go down
        taskTimer();
        //colour change to white for contrast with target elements
        fill(255)
        //displays the value of the timer to the user 
        text("Time Left:" + timeLimit, windowWidth/2+100, windowHeight/10);
        //displays the score to the user    
        text("Score: " + userScore, windowWidth/2-200, windowHeight/10);
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
    else if(gameState == 2){
        if(isUISet == false){
            UISetUp();//so that button elements are added
        }
        background(72, 174, 73);
        //creates and manages the rest of the UI elements
        postGameUI();
        
    }

    
}
//runs when mouse is pressed
function mousePressed(){
//only monitor hits / shots when in game i.e. gameState = 1
    if(gameState == 1){
        //incremnet shots taken variables
        taskTotalShots ++;
        totalShots ++;
        //calculates distance between target at index of i
        for(let i = 0; i < targetContainer.length; i++){
            if(targetContainer[i].doesContain(mouseX,mouseY)){
                //if true then mouse is over target - target is shot
                targetContainer.splice(i,1); //removed from array and no longer managed by program
                //add 5 points to the user for hitting target
                userScore += 5;
                //increment shots hit variables
                shotsHit++;
                totalShotsHit++;
                break
            }
            //checks if all targets have been checked if true then all targets have been missed
            else if(i == targetContainer.length-1){
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
    textAlign(LEFT);
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

// fucntion  to change the state of the game once start button clicked
function setStart(){   
    //reset framcount to 0 for timer
    frameCount = 0;
    //resets the boolean to false as no UI is set up
    isUISet = false;
    //remove the sliders
    for(let i = 0; i < sliderContainer.length; i++){
        sliderContainer[i].remove();
    }
    //remove the buttons
    for(let i = 0; i < buttonContainer.length; i++){
        buttonContainer[i].remove();
    }
    //change state to game
    gameState = 1;
    taskTotalShots = 0;
    
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
        //calculate whole task accuracy
        avgAccuracy = calcAvgAccuracy(taskTotalShots-1,totalShotsHit);
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
    // rectMode(CORNER)
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
    //score
    text(userScore,windowWidth/25+75, windowHeight/3.1);
    //total shots
    text(taskTotalShots-1,windowWidth/2+560,windowHeight/4+50)
    //total shots hit
    text(totalShotsHit,windowWidth/2+560,windowHeight/4+300)
    //average accuracy
    text(avgAccuracy + "%",windowWidth/25+75,windowHeight/4+300)

    // // //draws the graph at the end of task
    // accuracyChart();

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
    while(targetContainer.length > 0){
        targetContainer.pop();
    }
    //remove all values from array to prepare for next round
    while(accuracyValues.length > 0){
        accuracyValues.pop();
    }
    //reset data collectors
    totalShots = 0;
    taskTotalShots = 0;
    totalShotsHit = 0
    shotsHit = 0;
    avgAccuracy = 0;
}
//function to calculate the average accuracy of the user throughout the whole task.
function calcAvgAccuracy(shotsTakenInp, shotsHitInp){
    //calculates the user's accuracy
   var accuracy = (shotsHitInp/shotsTakenInp)*100    

    //round avgAccuracy to 1dp
    accuracy = Math.round(accuracy * 10) / 10
    
    return accuracy;
}

// // this function creates and displayes the charts
// function accuracyChart(){
//     var ctx = document.getElementById('accuracyChartCanvas').getContext('2d');
//     var chart = new Chart(ctx, {
//     // The type of chart we want to create
//     type: 'line',

//     // The data for our dataset
//     data: {
//         //segemnts of 10 seconds
//         labels: ["10", "20", "30", "40", "50", "60"],
//         datasets: [{
//             label: "Accuracy",
//             backgroundColor: 'rgb(255, 99, 132)',
//             borderColor: 'rgb(255, 99, 132)',
//             data: accuracyValues,
//             fill:false
//         }]
//     }
// });
// }