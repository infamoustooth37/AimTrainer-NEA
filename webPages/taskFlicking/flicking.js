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
let size = 100;


function setup() {
    createCanvas(windowWidth, windowHeight);
    while(targetContainer.length < 3){
      createTarget()
    }
  }
  
  function draw() {
    //solid colour for background
    background(51);

    // //If there less than 3 targets on screen then create new target
    // if(targetContainer.length -1 != 3){
    //   createTarget()
    // }
    
    //loops for all the targets in the array and runs the display method to show target on screen
    for(let i= 0; i<targetContainer.length-1; i++){
      targetContainer[i].display();
    }

  }

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
      let newTarget = new targetObj(size,0,newTargetX,newTargetY);

      //push target into targetContainer for management
      targetContainer.push(newTarget);


    }
  
  }
  