// File: trackingObj
// Iteration: 2
// Developer(s): Jonathan Lupu
// Date Due: 09 September 2022
// The class will be used in a free web-based program to allow users to train and improve their aim to improve their
// performance in competitive FPS games
// This class will allow the creation of target objects in game as well as providing all the necessary functionality for the tracking task.
//This class inherits the core methods from targetObj and has the unique method(s) for the tracking tasks.
//-----------------------------------------------------------------------------------------------------------------------

class trackingObj extends targetObj{
    //constructor for tracking task same parameters as targetObj, no special attribute
    constructor(sizeInp,speedInp,xInp,yInp){
        //access parent class and creates instance with these parameters
        super(sizeInp,speedInp,xInp,yInp);
    }

    //method to use for tracking target across screen
    //Target only moving across horizontally --> y speed = 0
    //runs every round to change speed of target
    setTrackingSpeed(newSpeed){
        this.xSpeed = newSpeed
    }
    //sets new y position when target has to reset
    setNewYpos(newYpos){
        this.yPos = newYpos;
    }
    //resets x position of target to be off screen runs when hits border
    resetXpos(){
        this.xPos = -50;
    }
    //used to check if target is off the screen
    getXpos(){
        return this.xPos;
    }
    //move target horizontally NO vertical movement 
    moveTracking(){
        this.xPos = this.xPos + this.xSpeed
    }
}