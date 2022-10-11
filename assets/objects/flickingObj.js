// File: flickingObj
// Iteration: 2
// Developer(s): Jonathan Lupu
// Date Due: 09 September 2022
// The class will be used in a free web-based program to allow users to train and improve their aim to improve their
// performance in competitive FPS games
// This class will allow the creation of target objects in game as well as providing all the necessary functionality for the flicking task.
//This class inherits the core methods from targetObj and has the unique method(s) for the flicking tasks.
//-----------------------------------------------------------------------------------------------------------------------

class flickingObj extends targetObj{
//constructor for tracking task same parameters as targetObj, no special attribute
    constructor(sizeInp,speedInp,xInp,yInp){
        //access parent class and creates instance with these parameters
        super(sizeInp,speedInp,xInp,yInp);
    }
    // method to be used in flicking task allowing targets to change location efficiently
    moveStatic(newX,newY){
        this.xPos = newX;
        this.yPos = newY;
    }

}