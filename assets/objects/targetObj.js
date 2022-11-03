// File: targetObj
// Iteration: 1
// Developer(s): Jonathan Lupu
// Date Due: 24 June 2022
// The class will be used in a free web-based program to allow users to train and improve thier aim to improve thier 
// performance in competative FPS games 
// This class will allow the creation of target objects in game as well as providing all the neccassary functionality

//-----------------------------------------------------------------------------------------------------------------------

class targetObj{
    //Method allows the creation of an instance of this object
    constructor(sizeInp,speedInp,xInp,yInp){
        //Defines the size of the target
        this.size = sizeInp;
        
        //Defines the speed of the target
        this.xSpeed = speedInp;
        this.ySpeed = speedInp;

        //Defines starting position
        this.xPos = xInp;
        this.yPos = yInp;
    }
    //Method to physically display the target on the screen
    display(){
        //colour change to green for contrast with text elements
        fill(87, 252, 81)
        //"Draws" a circle on screen for user to visualise using p5 method
        circle(this.xPos,this.yPos,this.size); 
    }
    //Method is run to constantly update the value of the x and y position of the target move it across the screen
    move(){
       //Updates the values of x and y position of the targets on the screen
        this.xPos = this.xPos + this.xSpeed;
        this.yPos = this.yPos + this.ySpeed;
      
        //Validation to ensure if the target has gone off screen then speed is flipped to moves opposite direction
      
        //Horizontal validation
        if (this.xPos > windowWidth-25 || this.xPos < 25) {
           this.xSpeed *= -1;
        }
        //Vertical validation
        if (this.yPos > windowHeight-25 || this.yPos < 25) {
            this.ySpeed *= -1;
        }
    }
//Method to calculate to check if the mouse is on target. Run when mouse is clicked
//Takes the x and y coordinates of mouse as parameters
    doesContain(mouseXpos,mouseYpos){
        //uses p5 method, dist, to calculate the distance between mouse and target
        this.distance = dist(mouseXpos,mouseYpos,this.xPos,this.yPos);
        //compares the distance with diameter of target
        if(this.distance < this.size - (this.size/2)){
            //mouse is over target
            return true;
        }
        else{
            //mouse is not over target
            return false;
        }
    }

}
