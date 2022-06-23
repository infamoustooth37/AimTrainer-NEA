function setup() {
    createCanvas(windowWidth, windowHeight);
    target = new targetObj(50,3,100,100)
  }
  
  function draw() {
    background(51);
    
    target.display();
    target.move();
    
  }
  
  